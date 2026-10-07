import Head from 'next/head';
import { useState, useEffect } from 'react';

const NAV = [['inicio','Inicio'],['plataforma','Plataforma'],['modulos','Módulos'],['mapa-demos','Zonas piloto'],['compromiso','Compromiso']];
const SLIDES = [
  { label: 'Reservas', bg: 'rgb(22, 37, 42)', fg: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/5371683/pexels-photo-5371683.jpeg', alt: 'Recepción de hotel' },
  { label: 'Habitaciones', bg: 'rgb(37, 37, 26)', fg: 'rgb(197, 243, 76)', img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Habitación de hotel boutique' },
  { label: 'Experiencias', bg: 'rgb(42, 33, 69)', fg: 'rgb(203, 183, 255)', img: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Resort en la costa' },
  { label: 'Servicios', bg: 'rgb(42, 29, 28)', fg: 'rgb(255, 156, 141)', img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Restaurante de hotel' },
  { label: 'Bienestar', bg: 'rgb(22, 37, 42)', fg: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=800', alt: 'Spa urbano' }
];
const MODULES = [
  { id: 'm1', cat: 'recepcion', icon: '💻', title: 'Reservas y CRM', soon: false, text: 'La recepción se transforma en una vista clara de llegadas, estancias y conversaciones.', detail: 'Conecta consulta, reserva y bienvenida sin perder el contexto de cada estancia.', color: '#25d6e8' },
  { id: 'm2', cat: 'housekeeping', icon: '🔌', title: 'Habitaciones y Gobernanta', soon: false, text: 'Estados de habitación, partes de limpieza y coordinación visual para el equipo.', detail: 'Recepción y gobernanta trabajan sobre la misma vista de habitaciones.', color: '#c5f34c' },
  { id: 'm3', cat: 'facturacion', icon: '🧾', title: 'Facturación y TPV', soon: true, text: 'Consumos, TPV y facturas adaptadas a la normativa fiscal de España.', detail: 'Restaurante, bar, spa o tasa turística como parte de la estancia del huésped.', color: '#ff765e' },
  { id: 'm4', cat: 'operaciones', icon: '📊', title: 'Analítica y RevPAR', soon: true, text: 'Ocupación, ADR, RevPAR y ritmo de reservas por canal.', detail: 'Señales para decidir precios y disponibilidad con datos de tu propio hotel.', color: '#9a6cff' }
];
const ZONES = [
  { id: 'esp1', nombre: 'Madrid', tipo: 'hoteles', ciudad: 'Madrid (Centro)', foco: 'Hoteles urbanos', pinColor: '#25d6e8', x: '48%', y: '45%', texto: 'Buscamos hoteles urbanos de 10 a 50 habitaciones para probar reservas, recepción y partes de viajeros.' },
  { id: 'esp2', nombre: 'Costa del Sol', tipo: 'resorts', ciudad: 'Málaga', foco: 'Resorts y hoteles de costa', pinColor: '#c5f34c', x: '40%', y: '82%', texto: 'Buscamos alojamientos de costa con alta rotación de habitaciones para probar el módulo de Gobernanta.' },
  { id: 'esp3', nombre: 'Baleares', tipo: 'cabanas', ciudad: 'Islas Baleares', foco: 'Casas rurales y villas', pinColor: '#ff765e', x: '78%', y: '58%', texto: 'Buscamos casas rurales y villas que quieran simplificar el check-in y el registro de huéspedes.' }
];
const FAQS = [
  ['¿Está pensada para alojamientos en España?', 'Sí. Diseñamos el producto para hoteles, casas rurales y apartamentos turísticos de España, incluido el registro de viajeros y el RGPD. Lo validamos con hoteles piloto.'],
  ['¿Qué áreas conecta la plataforma?', 'Hoy trabajamos en reservas, recepción y gobernanta. Facturación, TPV y analítica de RevPAR llegan después.'],
  ['¿Qué significa SaaS?', 'Software que usas desde el navegador y pagas con suscripción mensual. No instalas nada y las mejoras llegan solas.'],
  ['¿Cómo funciona el piloto?', 'Analizamos cómo gestionas hoy tu alojamiento, configuramos el panel y lo usas en tu hotel. Ajustamos contigo antes de que contrates.']
];
const PLEDGES = [
  ['🔒', 'Tus datos, bajo RGPD', 'Los datos de reservas y huéspedes se tratan conforme al RGPD, con contrato de encargado de tratamiento.', '#25d6e8'],
  ['🛠️', 'Soporte directo', 'Atención por teléfono y correo con el equipo que desarrolla el producto.', '#c5f34c'],
  ['⚡', 'WhatsApp para check-in', 'En desarrollo: envío de datos de check-in y confirmaciones al móvil del huésped.', '#ff765e'],
  ['📈', 'Crece contigo', 'Pensado para empezar con una casa rural o boutique y llegar a varias propiedades.', '#9a6cff']
];
const card = 'bg-[#181e27] border border-[#34404e] rounded-xl';
const field = 'w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]';
const eyebrow = 'text-xs font-bold uppercase tracking-widest';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [rooms, setRooms] = useState('11-50');
  const [modFilter, setModFilter] = useState('todos');
  const [openMods, setOpenMods] = useState({});
  const [openFaqs, setOpenFaqs] = useState({});
  const [gi, setGi] = useState(0);
  const [auto, setAuto] = useState(true);
  const [sel, setSel] = useState('esp1');
  const [mapFilter, setMapFilter] = useState('todos');
  const empty = { nombre: '', alojamiento: '', email: '', telefono: '', tipo_negocio: '', mensaje: '', website: '' };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setGi((p) => (p + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, [auto]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      const res = await fetch('/api/contacts', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setStatus({ loading: false, success: 'Gracias. Tu solicitud se ha enviado correctamente.', error: null }); setForm(empty); }
      else setStatus({ loading: false, success: null, error: 'No pudimos confirmar el envío. Inténtalo de nuevo.' });
    } catch { setStatus({ loading: false, success: null, error: 'Error al procesar la solicitud.' }); }
  };

  const mods = modFilter === 'todos' ? MODULES : MODULES.filter((m) => m.cat === modFilter);
  const zones = mapFilter === 'todos' ? ZONES : ZONES.filter((z) => z.tipo === mapFilter);
  const zone = ZONES.find((z) => z.id === sel) || ZONES[0];
  const plan = rooms === '1-10' ? 'Básico' : rooms === '11-50' ? 'Pro' : 'Multipropiedad';

  return (
    <div className="w-full overflow-x-hidden bg-[#0a0c10] text-[#f6f8fb] font-sans selection:bg-[#25d6e8] selection:text-[#071014]">
      <Head>
        <title>M&D Solutions Technology | SaaS para hotelería en España</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Software en la nube para hoteles, casas rurales y apartamentos turísticos en España. Acceso anticipado." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Work+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="h-1 w-full bg-gradient-to-r from-[#25d6e8] via-[#9a6cff] via-[#ff765e] to-[#c5f34c] bg-[length:200%_100%] animate-pulse"></div>

      <header className="sticky top-0 z-50 border-b border-[#34404e] bg-[#0a0c10]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#inicio" className="font-extrabold hover:text-[#25d6e8] transition-colors">M&D Solutions Technology</a>
          <div className="hidden items-center gap-6 md:flex text-sm font-semibold text-slate-300">
            {NAV.map(([id, l]) => <a key={id} href={'#' + id} className="hover:text-[#25d6e8] transition-colors">{l}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <a href="#contacto" className="hidden sm:block rounded-full bg-[#25d6e8] px-4 py-2 text-sm font-bold text-[#071014] hover:bg-[#1fbecf] transition-all">Solicitar acceso anticipado</a>
            <button onClick={() => setMenu(!menu)} type="button" aria-label="Abrir menú" className="p-2 md:hidden text-white text-xl">☰</button>
          </div>
        </nav>
        {menu && (
          <div className="border-t border-[#34404e] bg-[#12161d] px-5 py-5 md:hidden flex flex-col gap-4 text-sm font-semibold">
            {[...NAV, ['contacto', 'Contacto']].map(([id, l]) => <a key={id} href={'#' + id} onClick={() => setMenu(false)}>{l}</a>)}
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="relative isolate overflow-hidden border-b border-[#34404e] py-12">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
            <div>
              <p className={eyebrow + ' text-[#25d6e8]'}>SaaS PARA HOTELERÍA · ESPAÑA</p>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">El SaaS para hoteles de España, aquí reunimos tu gestión en una sola escena.</h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-[#c7d0da]">Software en la nube para hoteles, casas rurales y alojamientos turísticos. Se usa desde el navegador, con suscripción mensual y sin instalar nada.</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" className="rounded-full bg-[#ff765e] px-6 py-3 text-center font-bold text-[#17100e] hover:opacity-90 transition-opacity">Solicitar acceso anticipado</a>
                <a href="#modulos" className="rounded-full border border-[#51606e] bg-[#181e27] px-6 py-3 text-center font-bold hover:bg-[#202834] transition-colors">Explorar módulos</a>
              </div>
              <div className="mt-9 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#25d6e8]/30 bg-[#16252a] px-3 py-2 text-sm font-bold text-[#25d6e8]">Reservas Directas</span>
                <span className="rounded-full border border-[#c5f34c]/30 bg-[#25251a] px-3 py-2 text-sm font-bold text-[#c5f34c]">Gobernanta</span>
                <span className="rounded-full border border-[#ff9c8d]/30 bg-[#2a1d1c] px-3 py-2 text-sm font-bold text-[#ff9c8d]">Partes de Viajeros</span>
              </div>
            </div>

            <div className="relative bg-[#181e27] border border-[#34404e] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#34404e] pb-4">
                <span className="font-bold text-white">Simulador de plan</span>
                <span className="h-3 w-3 rounded-full bg-[#c5f34c] shadow-[0_0_12px_#c5f34c]"></span>
              </div>
              <p className="mt-4 text-xs font-semibold text-[#a9b5c3] uppercase tracking-wider">¿Cuántas habitaciones o plazas gestionas?</p>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {['1-10', '11-50', '50+'].map((r) => (
                  <button key={r} onClick={() => setRooms(r)} className={`py-2 text-xs font-bold rounded-lg border transition-all ${rooms === r ? 'bg-[#25d6e8] text-[#071014] border-[#25d6e8]' : 'bg-[#0e131a] text-slate-300 border-[#34404e] hover:border-[#25d6e8]'}`}>{r} habs.</button>
                ))}
              </div>
              <div className="mt-6 border-t border-[#34404e] pt-4">
                <p className="text-xs font-bold text-[#25d6e8] uppercase">Configuración recomendada:</p>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>✔ Recepción y fichas de viajeros</li>
                  <li>✔ Gobernanta y estado de habitaciones</li>
                  {rooms !== '1-10' && <li className="text-[#c5f34c]">✔ Facturación y TPV (próximamente)</li>}
                  {rooms === '50+' && <li className="text-[#9a6cff]">✔ Analítica y RevPAR (próximamente)</li>}
                </ul>
              </div>
              <div className="mt-6 border border-[#34404e] bg-[#0e131a] p-3 rounded-lg text-xs flex justify-between items-center">
                <span className="text-[#a9b5c3]">Plan sugerido:</span>
                <span className="font-bold text-[#c5f34c]">{plan} · precio a consultar</span>
              </div>
            </div>
          </div>
        </section>

        <section id="plataforma" className="border-b border-[#34404e] py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
              <div>
                <p className={eyebrow + ' text-[#25d6e8]'}>EL HOTEL EN MOVIMIENTO</p>
                <h2 className="mt-2 text-3xl font-extrabold">Cada módulo pensado para la hospitalidad en España.</h2>
              </div>
              <div className="flex gap-2">
                {[['←', () => setGi((p) => (p - 1 + SLIDES.length) % SLIDES.length), 'Anterior'], [auto ? '⏸' : '▶', () => setAuto(!auto), 'Pausar o reanudar'], ['→', () => setGi((p) => (p + 1) % SLIDES.length), 'Siguiente']].map(([s, f, a]) => (
                  <button key={a} onClick={f} aria-label={a} className="rounded-full border border-[#475565] p-3 text-white hover:bg-[#181e27]">{s}</button>
                ))}
              </div>
            </div>
            <div className={'relative overflow-hidden h-72 sm:h-96 ' + card}>
              <img src={SLIDES[gi].img} alt={SLIDES[gi].alt} className="w-full h-full object-cover transition-all duration-500" />
              <span className="absolute top-4 left-4 px-3 py-1 rounded text-sm font-bold shadow-md" style={{ backgroundColor: SLIDES[gi].bg, color: SLIDES[gi].fg }}>{SLIDES[gi].label}</span>
            </div>
            <div className="mt-4 flex gap-2 justify-center">
              {SLIDES.map((_, i) => <button key={i} aria-label={'Imagen ' + (i + 1)} onClick={() => setGi(i)} className={`h-2 rounded-full transition-all ${i === gi ? 'w-8 bg-[#25d6e8]' : 'w-2 bg-[#56616f]'}`}></button>)}
            </div>
          </div>
        </section>

        <section id="modulos" className="bg-[#12161d] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className={eyebrow + ' text-[#ff9c8d]'}>MÓDULOS</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Empezamos por lo que más tiempo consume en recepción.</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {[['todos', 'Todos'], ['recepcion', 'Recepción'], ['housekeeping', 'Gobernanta'], ['facturacion', 'Facturación / TPV'], ['operaciones', 'RevPAR & Análisis']].map(([k, l]) => (
                <button key={k} onClick={() => setModFilter(k)} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${modFilter === k ? 'bg-[#25d6e8] text-[#071014]' : 'bg-[#181e27] text-slate-300 border border-[#34404e] hover:border-[#25d6e8]'}`}>{l}</button>
              ))}
            </div>
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {mods.map((m) => (
                <article key={m.id} className={card + ' p-6'}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{m.icon}</span>
                      <h3 className="text-xl font-bold text-white">{m.title}</h3>
                      <span className="rounded-full border px-2 py-0.5 text-[11px] font-bold" style={{ color: m.color, borderColor: m.color }}>{m.soon ? 'Próximamente' : 'En desarrollo'}</span>
                    </div>
                    <button onClick={() => setOpenMods({ ...openMods, [m.id]: !openMods[m.id] })} aria-label="Ver detalle" className="text-2xl font-bold" style={{ color: m.color }}>{openMods[m.id] ? '−' : '+'}</button>
                  </div>
                  <p className="mt-2 text-sm text-[#a9b5c3]">{m.text}</p>
                  {openMods[m.id] && <p className="mt-4 pt-4 border-t border-[#34404e] text-sm text-[#c7d0da]">{m.detail}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="mapa-demos" className="py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className={eyebrow + ' text-[#25d6e8]'}>HOTELES PILOTO EN ESPAÑA</p>
            <h2 className="mt-2 text-3xl font-extrabold">Mapa interactivo de zonas piloto.</h2>
            <p className="text-sm text-[#a9b5c3] mt-1 mb-8">Toca un punto del mapa para ver qué tipo de alojamiento buscamos en esa zona.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[['todos', '🌐 Todos en España'], ['hoteles', '🏨 Hoteles Urbanos'], ['cabanas', '🏡 Casas Rurales'], ['resorts', '🌴 Resorts de Costa']].map(([k, l]) => (
                <button key={k} onClick={() => setMapFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${mapFilter === k ? 'bg-[#181e27] text-[#25d6e8] border-[#25d6e8]' : 'bg-[#0e131a] text-[#a9b5c3] border-[#34404e] hover:border-[#25d6e8]'}`}>{l}</button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[340px] bg-[#0e131a] border border-[#34404e] rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="relative z-10 flex items-center justify-between border-b border-[#34404e]/80 pb-3">
                  <span className="text-xs font-mono font-bold text-[#a9b5c3] tracking-wider uppercase">ZONAS PENINSULARES E INSULARES</span>
                  <span className="flex items-center gap-2 text-xs font-bold text-[#25d6e8]"><span className="h-2 w-2 rounded-full bg-[#25d6e8] animate-ping"></span>Piloto abierto</span>
                </div>
                <div className="relative z-10 my-12 min-h-[200px] w-full">
                  {zones.map((z) => (
                    <button key={z.id} onClick={() => setSel(z.id)} style={{ left: z.x, top: z.y }} className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none" aria-label={'Zona ' + z.nombre}>
                      <span className="relative flex h-6 w-6 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: z.pinColor }}></span>
                        <span className={`relative inline-flex rounded-full h-4 w-4 border-2 border-[#0a0c10] shadow-lg transition-transform group-hover:scale-125 ${sel === z.id ? 'scale-125 ring-4 ring-white/20' : ''}`} style={{ backgroundColor: z.pinColor }}></span>
                      </span>
                      <span className="mt-1 block rounded bg-[#181e27]/90 px-2 py-0.5 text-[10px] font-bold text-white whitespace-nowrap border border-[#34404e]">{z.nombre}</span>
                    </button>
                  ))}
                </div>
                <p className="relative z-10 text-xs text-[#a9b5c3] italic">💡 Toca un marcador para ver qué hoteles piloto buscamos.</p>
              </div>

              <div className={card + ' p-6 flex flex-col justify-between'}>
                <div>
                  <div className="flex items-center justify-between border-b border-[#34404e] pb-3">
                    <span className={eyebrow + ' text-[#25d6e8]'}>ZONA PILOTO</span>
                    <span className="text-xs font-mono text-[#c5f34c]">{zone.ciudad}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{zone.nombre}</h3>
                  <div className="mt-4 rounded-xl bg-[#0e131a] border border-[#34404e] p-4 text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-[#a9b5c3]">Buscamos:</span><span className="font-bold text-[#c5f34c]">{zone.foco}</span></div>
                    <div className="flex justify-between"><span className="text-[#a9b5c3]">Estado:</span><span className="font-bold text-[#25d6e8]">Plazas piloto abiertas</span></div>
                  </div>
                  <p className="mt-5 text-sm text-[#c7d0da] leading-relaxed bg-[#12161d] p-3 rounded-lg border-l-2 border-[#25d6e8]">{zone.texto}</p>
                </div>
                <a href="#contacto" className="mt-6 block w-full rounded-full bg-[#25d6e8] py-2.5 text-center text-xs font-bold text-[#071014] hover:bg-[#1fbecf] transition-all">Quiero ser hotel piloto</a>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-4xl px-5">
            <p className={eyebrow + ' text-[#25d6e8] text-center'}>PREGUNTAS FRECUENTES</p>
            <h2 className="mt-3 text-3xl font-extrabold text-center">Respuestas claras para tu establecimiento.</h2>
            <div className="mt-8 space-y-3">
              {FAQS.map(([q, a], i) => (
                <article key={i} className={card + ' p-5'}>
                  <button onClick={() => setOpenFaqs({ ...openFaqs, [i]: !openFaqs[i] })} className="flex w-full items-center justify-between text-left font-bold text-white">
                    <span>{q}</span><span className="text-[#25d6e8] text-xl">{openFaqs[i] ? '−' : '+'}</span>
                  </button>
                  {openFaqs[i] && <p className="mt-3 pt-3 border-t border-[#34404e] text-sm text-[#a9b5c3]">{a}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="compromiso" className="py-16 border-t border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <p className={eyebrow + ' text-[#c5f34c]'}>NUESTRO COMPROMISO</p>
              <h2 className="mt-2 text-3xl font-extrabold">Lo que te prometemos como hotel piloto.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {PLEDGES.map(([ic, t, d, c]) => (
                <div key={t} className={card + ' p-6'}>
                  <span className="text-3xl mb-4 block">{ic}</span>
                  <h3 className="text-xl font-bold mb-2" style={{ color: c }}>{t}</h3>
                  <p className="text-sm text-[#a9b5c3] leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contacto" className="bg-[#12161d] py-16 border-t border-[#34404e]">
          <div className="mx-auto grid max-w-7xl gap-9 px-5 lg:grid-cols-[.82fr_1.18fr] lg:px-8">
            <div>
              <p className={eyebrow + ' text-[#25d6e8]'}>CONTACTO DIRECTO</p>
              <h2 className="mt-4 text-3xl font-extrabold">Pide acceso anticipado.</h2>
              <p className="mt-4 text-sm text-[#a9b5c3]">Cuéntanos cómo es tu alojamiento y te respondemos para analizar tus necesidades.</p>
              <div className={card + ' mt-6 space-y-3 p-5'}>
                <p className="text-sm text-white font-bold">Atención directa:</p>
                <p className="text-sm text-[#25d6e8]">📞 Daniel: <a href="tel:+34647564733" className="text-white font-mono">+34 647 56 47 33</a></p>
                <p className="text-sm text-[#c5f34c]">📞 María Elena: <a href="https://wa.me/5493625391283" className="text-white font-mono">+54 9 362 539 1283</a></p>
                <p className="text-sm text-[#ff765e]">✉️ <a href="mailto:mdsolutionstecnology@gmail.com" className="text-white font-mono hover:underline break-all">mdsolutionstecnology@gmail.com</a></p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="border border-[#40505f] bg-[#181e27] p-6 sm:p-8 rounded-xl flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {[['nombre', 'Nombre', 'text', true], ['alojamiento', 'Nombre del Hotel o Empresa', 'text', true], ['email', 'Correo electrónico', 'email', true], ['telefono', 'Teléfono de contacto', 'tel', false]].map(([n, l, t, r]) => (
                  <div key={n}>
                    <label className="mb-1 block text-sm font-bold text-white">{l}</label>
                    <input type={t} name={n} value={form[n]} onChange={onChange} required={r} className={field} />
                  </div>
                ))}
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white">Tipo de establecimiento</label>
                <select name="tipo_negocio" value={form.tipo_negocio} onChange={onChange} required className={field}>
                  <option value="">Selecciona una opción</option>
                  <option value="Hotel Urbano">Hotel Urbano</option>
                  <option value="Resort">Resort / Hotel de Costa</option>
                  <option value="Casa Rural">Casa Rural / Alojamiento con Encanto</option>
                  <option value="Apartamentos Turísticos">Apartamentos Turísticos</option>
                  <option value="Otro">Otro tipo de alojamiento</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold text-white">¿Qué aspecto te gustaría optimizar?</label>
                <textarea name="mensaje" rows="4" value={form.mensaje} onChange={onChange} required className={field}></textarea>
              </div>
              <input type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button type="submit" disabled={status.loading} className="mt-2 rounded-full bg-[#25d6e8] py-3 px-6 font-bold text-[#071014] hover:bg-[#1fbecf] transition-all disabled:opacity-50">{status.loading ? 'Enviando...' : 'Enviar solicitud'}</button>
              {status.success && <p className="text-[#c5f34c] text-sm font-semibold">{status.success}</p>}
              {status.error && <p className="text-[#ff765e] text-sm font-semibold">{status.error}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#34404e] bg-[#0a0c10] py-9 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3 text-xs text-[#a9b5c3]">
          <p className="font-bold text-white text-sm">M&D Solutions Technology</p>
          <p>Daniel (+34 647 56 47 33) · María Elena (+54 9 362 539 1283) · mdsolutionstecnology@gmail.com</p>
          {/* TODO: completar razón social, NIF y domicilio (obligatorio por LSSI) */}
          <p>Titular: [razón social o nombre completo] · NIF [número] · Domicilio [dirección]. Los datos del formulario se usan solo para responder tu consulta; puedes pedir su acceso o eliminación por correo.</p>
          <p>&copy; {new Date().getFullYear()} M&D Solutions Technology. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
