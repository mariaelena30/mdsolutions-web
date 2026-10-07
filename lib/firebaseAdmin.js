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
        // Quita comillas sobrantes y convierte los "\n" literales en saltos de línea reales.
        privateKey: (process.env.FIREBASE_PRIVATE_KEY || '')
          .trim()
          .replace(/^["']|["']$/g, '')
          .replace(/\\n/g, '\n'),
      }),
    });
  } catch (err) {
    // Guardamos el error para registrarlo en los logs sin tirar abajo la función.
    initError = err.message;
    console.error('Error inicializando Firebase Admin:', err);
  }
}

export const db = admin.apps.length ? admin.firestore() : null;
export const firebaseInitError = initError;
export default admin;
