// pages/api/contacts.js
// Guarda el contacto en Firestore y avisa por email con Brevo.
// Los detalles técnicos de los errores se registran en el servidor, nunca se envían al navegador.
import admin, { db, firebaseInitError } from '../../lib/firebaseAdmin';
import { validateContact, escapeHtml, tooManyRequests } from '../../lib/contactUtils.mjs';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ message: 'Método no permitido' });
    }

    const ip = (req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'desconocida').toString().split(',')[0].trim();
    if (tooManyRequests(ip)) {
      return res.status(429).json({ message: 'Demasiados envíos. Inténtalo de nuevo en unos minutos.' });
    }

    const result = validateContact(req.body);
    if (result.spam) return res.status(200).json({ success: true }); // a los bots les decimos que fue bien
    if (!result.ok) return res.status(400).json({ message: result.error });
    const { nombre, alojamiento, email, telefono, tipo_negocio, mensaje } = result.data;

    // 1. Firestore (no bloqueante)
    let contactId = null;
    if (db) {
      try {
        const ref = await db.collection('contacts').add({
          nombre, alojamiento, email, telefono, tipo_negocio, mensaje,
          status: 'pendiente',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        contactId = ref.id;
      } catch (e) {
        console.error('Firestore:', e.message);
      }
    } else {
      console.error('Firestore no inicializado:', firebaseInitError);
    }

    // 2. Email con Brevo
    if (!process.env.BREVO_API_KEY || !process.env.ADMIN_EMAIL) {
      console.error('Faltan BREVO_API_KEY o ADMIN_EMAIL');
      return res.status(500).json({ message: 'No pudimos enviar tu mensaje. Inténtalo más tarde.' });
    }
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json', 'api-key': process.env.BREVO_API_KEY },
      body: JSON.stringify({
        sender: { name: 'M&D Solutions - Web', email: process.env.ADMIN_EMAIL },
        to: [{ email: process.env.ADMIN_EMAIL, name: 'M&D Solutions' }],
        replyTo: { email, name: nombre },
        subject: `Nuevo contacto: ${nombre} (${alojamiento})`.slice(0, 200),
        htmlContent: `
          <p><strong>Nombre:</strong> ${escapeHtml(nombre)}</p>
          <p><strong>Alojamiento/Empresa:</strong> ${escapeHtml(alojamiento)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Teléfono:</strong> ${escapeHtml(telefono || 'No indicado')}</p>
          <p><strong>Tipo:</strong> ${escapeHtml(tipo_negocio)}</p>
          <p><strong>Mensaje:</strong><br>${escapeHtml(mensaje).replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!response.ok) {
      console.error('Brevo:', response.status, await response.text().catch(() => ''));
      return res.status(502).json({ message: 'No pudimos enviar tu mensaje. Inténtalo más tarde.' });
    }
    return res.status(200).json({ success: true, message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error('Error en /api/contacts:', error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}
