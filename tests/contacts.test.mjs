// Ejecutar con: node --test tests/contacts.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContact, escapeHtml, tooManyRequests } from '../lib/contactUtils.mjs';

const ok = { nombre: 'Ana', alojamiento: 'Hotel Sol', email: 'Ana@Hotel.es', telefono: '+34 600 11 22 33', tipo_negocio: 'Hotel Urbano', mensaje: 'Hola' };

test('acepta un contacto válido y normaliza el email', () => {
  const r = validateContact(ok);
  assert.equal(r.ok, true);
  assert.equal(r.data.email, 'ana@hotel.es');
});
test('rechaza campos obligatorios vacíos', () => assert.equal(validateContact({ ...ok, mensaje: '' }).ok, false));
test('rechaza email inválido', () => assert.equal(validateContact({ ...ok, email: 'ana@@x' }).ok, false));
test('rechaza tipo de negocio fuera de la lista', () => assert.equal(validateContact({ ...ok, tipo_negocio: 'Hackeo' }).ok, false));
test('rechaza teléfono con letras', () => assert.equal(validateContact({ ...ok, telefono: 'abc<script>' }).ok, false));
test('rechaza tipos no string (objetos/arrays)', () => assert.equal(validateContact({ ...ok, nombre: { $ne: 1 } }).ok, false));
test('rechaza body vacío o no objeto', () => { assert.equal(validateContact(null).ok, false); assert.equal(validateContact('x').ok, false); });
test('el honeypot marca spam', () => assert.equal(validateContact({ ...ok, website: 'http://spam' }).spam, true));
test('elimina saltos de línea en nombre (inyección de cabeceras)', () => {
  const r = validateContact({ ...ok, nombre: 'Ana\r\nBcc: x@y.com' });
  assert.equal(/[\r\n]/.test(r.data.nombre), false);
});
test('recorta mensajes demasiado largos', () => assert.equal(validateContact({ ...ok, mensaje: 'a'.repeat(5000) }).data.mensaje.length, 2000));
test('escapeHtml neutraliza etiquetas y comillas', () => {
  const s = escapeHtml('<img src=x onerror="alert(1)">');
  assert.equal(s.includes('<'), false);
  assert.equal(s.includes('"'), false);
});
test('límite de envíos: el 6.º en 10 min se bloquea', () => {
  const t = 1_000_000;
  for (let i = 0; i < 5; i++) assert.equal(tooManyRequests('1.1.1.1', t + i), false);
  assert.equal(tooManyRequests('1.1.1.1', t + 6), true);
  assert.equal(tooManyRequests('1.1.1.1', t + 11 * 60 * 1000), false);
});
