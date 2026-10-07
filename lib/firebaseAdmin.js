// lib/firebaseAdmin.js
// Inicializa Firebase Admin UNA sola vez, usando variables de entorno.
// Nunca pongas la clave privada directamente en este archivo ni en el repo.

import admin from 'firebase-admin';

let initError = null;

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // La clave privada llega con "\n" como texto literal (2 caracteres:
        // barra invertida + n). Hay que convertirlos en saltos de línea reales
        // para que la librería pueda leer la clave correctamente.
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '')
  .trim()
  .replace(/^["']|["']$/g, '')
  .replace(/\\n/g, '\n'),,
      }),
    });
  } catch (err) {
    // No dejamos que esto tire abajo toda la función: guardamos el error
    // para poder devolverlo en la respuesta y diagnosticar rápido.
    initError = err.message;
    console.error('Error inicializando Firebase Admin:', err);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
export const firebaseInitError = initError;
export default admin;
