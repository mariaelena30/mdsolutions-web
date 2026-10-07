// Funciones puras para /api/contacts: validación, limpieza y límite de envíos.
const LIMITS = { nombre: 100, alojamiento: 120, email: 120, telefono: 30, tipo_negocio: 40, mensaje: 2000 };
const TIPOS = ['Hotel Urbano', 'Resort', 'Casa Rural', 'Apartamentos Turísticos', 'Otro'];
const EMAIL_RE = /^[^\s@<>"',;]+@[^\s@<>"',;]+\.[^\s@<>"',;]{2,}$/;

export function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// Campos de una sola línea: sin saltos ni caracteres de control (evita inyección en cabeceras).
function oneLine(v, max) {
  return typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F]+/g, ' ').trim().slice(0, max) : '';
}

export function validateContact(body) {
  if (!body || typeof body !== 'object') return { ok: false, error: 'Solicitud inválida' };
  if (body.website) return { ok: false, spam: true, error: 'Solicitud inválida' }; // campo trampa para bots
  const data = {
    nombre: oneLine(body.nombre, LIMITS.nombre),
    alojamiento: oneLine(body.alojamiento, LIMITS.alojamiento),
    email: oneLine(body.email, LIMITS.email).toLowerCase(),
    telefono: oneLine(body.telefono, LIMITS.telefono),
    tipo_negocio: oneLine(body.tipo_negocio, LIMITS.tipo_negocio),
    mensaje: typeof body.mensaje === 'string' ? body.mensaje.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, LIMITS.mensaje) : '',
  };
  if (!data.nombre || !data.alojamiento || !data.email || !data.tipo_negocio || !data.mensaje)
    return { ok: false, error: 'Todos los campos obligatorios deben completarse' };
  if (!EMAIL_RE.test(data.email)) return { ok: false, error: 'El correo electrónico no es válido' };
  if (!TIPOS.includes(data.tipo_negocio)) return { ok: false, error: 'Tipo de establecimiento no válido' };
  if (data.telefono && !/^[0-9+()\-\s.]{6,30}$/.test(data.telefono)) return { ok: false, error: 'El teléfono no es válido' };
  return { ok: true, data };
}

// Límite simple en memoria: máx. N envíos por IP en la ventana. En serverless es "mejor esfuerzo".
const hits = new Map();
export function tooManyRequests(ip, now = Date.now(), max = 5, windowMs = 10 * 60 * 1000) {
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > max;
}
