import Head from 'next/head';
import { useState, useEffect } from 'react';

const SLIDES = [
  { label: 'Reservas', bg: 'rgb(22, 37, 42)', fg: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/5371683/pexels-photo-5371683.jpeg', alt: 'Recepción de hotel' },
  { label: 'Habitaciones', bg: 'rgb(37, 37, 26)', fg: 'rgb(197, 243, 76)', img: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Habitación de hotel boutique' },
  { label: 'Experiencias', bg: 'rgb(42, 33, 69)', fg: 'rgb(203, 183, 255)', img: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Resort en la costa' },
  { label: 'Servicios', bg: 'rgb(42, 29, 28)', fg: 'rgb(255, 156, 141)', img: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Restaurante de hotel' },
  { label: 'Bienestar', bg: 'rgb(22, 37, 42)', fg: 'rgb(37, 214, 232)', img: 'https://images.pexels.com/photos/3188/love-romantic-bath-candlelight.jpg?auto=compress&cs=tinysrgb&w=800', alt: 'Spa urbano' }
];
const PRICES = [
  { t: 'Web para tu alojamiento', p: 'Desde 150 €', n: 'pago único', color: '#25d6e8', cta: 'Quiero mi web', items: ['Diseño adaptado al móvil', 'Con tus fotos y tus datos de contacto', 'Te decimos el precio final antes de empezar'] },
  { t: 'Mantenimiento', p: '4 € al mes', n: 'por alojamiento · opcional', color: '#c5f34c', cta: 'Quiero mantenimiento', items: ['Nos ocupamos de que tu web siga funcionando', 'Te echamos una mano si algo falla', 'Atención directa por teléfono o correo'] },
  { t: 'Programa de gestión (SaaS)', p: 'Próximamente', n: 'aún no está a la venta', color: '#ff9c8d', cta: 'Avísame cuando esté', items: ['Parte de viajeros', 'Estado de limpieza de las habitaciones', 'Te avisamos en cuanto esté listo'] }
];
const MODULES = [
  { id: 'm5', cat: 'recepcion', icon: '🛂', title: 'Parte de viajeros', soon: false, text: 'El registro de viajeros preparado con los datos que te manda el huésped, sin copiar y pegar.', detail: 'Pensado para el registro obligatorio de viajeros en España. Estamos preparándolo.', color: '#ff9c8d' },
  { id: 'm1', cat: 'recepcion', icon: '💻', title: 'Reservas y huéspedes', soon: false, text: 'Llegadas, salidas y estancias de un vistazo, con reservas directas desde tu web.', detail: 'Desde que el huésped pregunta hasta que se va, todo queda en el mismo sitio y sin perder el hilo.', color: '#25d6e8' },
  { id: 'm2', cat: 'housekeeping', icon: '🔌', title: 'Habitaciones y limpieza', soon: false, text: 'Qué está limpio, qué falta por limpiar y qué está ocupado, para que el equipo no tenga que preguntar.', detail: 'Recepción y limpieza miran la misma pantalla, así no hay llamadas ni mensajes de "¿ya está lista la 3?".', color: '#c5f34c' },
  { id: 'm3', cat: 'facturacion', icon: '🧾', title: 'Facturación y TPV', soon: true, text: 'Consumos, TPV y facturas adaptadas a la normativa fiscal de España.', detail: 'Restaurante, bar, spa o tasa turística dentro de la cuenta del huésped.', color: '#ff765e' },
  { id: 'm4', cat: 'operaciones', icon: '📊', title: 'Analítica y RevPAR', soon: true, text: 'Ocupación, ADR, RevPAR y ritmo de reservas por canal.', detail: 'Datos de tu propio alojamiento para decidir precios y disponibilidad con cabeza.', color: '#9a6cff' }
];
const ZONES = [
  { id: 'esp0', nombre: 'Salamanca', tipo: 'apartamentos', ciudad: 'Salamanca', foco: 'Apartamentos turísticos', pinColor: '#9a6cff', x: '30%', y: '38%', texto: 'Hacemos la web de tu apartamento turístico para que te encuentren más fácil y te escriban directamente.' },
  { id: 'esp1', nombre: 'Madrid', tipo: 'hoteles', ciudad: 'Madrid (Centro)', foco: 'Hoteles y pensiones', pinColor: '#25d6e8', x: '48%', y: '45%', texto: 'Hacemos webs para hoteles pequeños y pensiones, o mejoramos la que ya tienes.' },
  { id: 'esp2', nombre: 'Costa del Sol', tipo: 'resorts', ciudad: 'Málaga', foco: 'Hoteles y apartamentos de costa', pinColor: '#c5f34c', x: '40%', y: '82%', texto: 'Hacemos webs para alojamientos de costa: hoteles, apartamentos y villas.' },
  { id: 'esp3', nombre: 'Baleares', tipo: 'cabanas', ciudad: 'Islas Baleares', foco: 'Casas rurales y villas', pinColor: '#ff765e', x: '78%', y: '58%', texto: 'Hacemos webs para casas rurales y villas, con tus fotos y tus datos de contacto.' }
];
const FAQS = [
  ['¿Cuánto cuesta?', 'La web sale desde 150 € (pago único). Si quieres que nos encarguemos del mantenimiento, son 4 € al mes. Te decimos el precio final antes de empezar, ¿vale?'],
  ['¿Qué incluye la web?', 'Diseño adaptado al móvil, con tus fotos y tus datos de contacto. Cuéntanos qué necesitas y te decimos qué entra en el precio.'],
  ['¿Y si ya tengo una web?', 'Podemos mejorarla y dejarla más profesional. Cuéntanos cuál es y te decimos qué se puede hacer.'],
  ['¿Y si no tengo ni idea de webs?', 'Vale, no pasa nada. Tú nos cuentas cómo es tu alojamiento y nosotros nos encargamos del resto.'],
  ['¿Qué es el mantenimiento?', 'Por 4 € al mes nos ocupamos de que tu web siga funcionando y te echamos una mano si algo falla.'],
  ['¿Qué es eso del programa de gestión?', 'Es un software (SaaS) que estamos preparando para llevar el parte de viajeros y la limpieza de las habitaciones desde el navegador. Todavía no está a la venta.']
];
const PLEDGES = [
  ['💶', 'Precio claro', 'La web, desde 150 €. El mantenimiento, 4 € al mes. Te decimos el precio final antes de empezar.', '#25d6e8'],
  ['🤝', 'Trato directo', 'Hablas con las personas que hacen tu web, por teléfono, correo o WhatsApp.', '#c5f34c'],
  ['📱', 'Pensada para el móvil', 'Mucha gente reserva desde el móvil, así que tu web se ve bien en cualquier pantalla.', '#ff765e'],
  ['🔧', 'Mantenimiento sin líos', 'Por 4 € al mes nos ocupamos de que tu web siga funcionando y te ayudamos si algo falla.', '#9a6cff']
];
const I18N = {
 "es": {
  "nav": [
   [
    "inicio",
    "Inicio"
   ],
   [
    "ejemplos",
    "Ejemplos"
   ],
   [
    "precios",
    "Precios"
   ],
   [
    "modulos",
    "Próximamente"
   ],
   [
    "mapa-demos",
    "Dónde trabajamos"
   ],
   [
    "preguntas",
    "Preguntas"
   ]
  ],
  "tag": "Webs para alojamientos",
  "h1": "Una web para tu alojamiento desde 150 €. Sin líos y sin rodeos.",
  "sub": "Hacemos la web de tu hotel, casa rural o apartamento turístico para que te encuentren más fácil y los huéspedes puedan escribirte directamente. Y si ya tienes una, te la dejamos más profesional. Mantenimiento por 4 € al mes, si quieres.",
  "cta1": "Quiero mi web",
  "cta2": "Ver precios",
  "book": "Pedir mi web",
  "chips": [
   "Web propia",
   "Mantenimiento",
   "Atención directa"
  ],
  "calcT": "Calcula lo que pagarías",
  "calcQ": "¿Cuántos alojamientos tienes?",
  "one": "1 web",
  "many": " webs",
  "calcWeb": "Tu web (pago único):",
  "calcMant": "Mantenimiento (opcional):",
  "from": "Desde ",
  "tbd": "A consultar",
  "month": " € al mes",
  "calcNote": "Precio orientativo. Te decimos el precio final antes de empezar.",
  "exEy": "EJEMPLOS",
  "exTitle": "Mira cómo puede quedar tu web.",
  "exSub": "Webs de ejemplo, diseños de muestra para que te hagas una idea.",
  "exBadge": "Ejemplo",
  "exView": "Ver ejemplo",
  "exClose": "Cerrar",
  "exRooms": "Habitaciones",
  "exWa": "Reservar por WhatsApp",
  "ex": [
   [
    "Apartamentos Plaza Mayor",
    "Apartamentos turísticos · Salamanca"
   ],
   [
    "Casa Rural El Encinar",
    "Casa rural · sierra"
   ],
   [
    "Hotel Boutique Calle Mayor",
    "Hotel pequeño · centro"
   ]
  ],
  "inEy": "QUÉ INCLUYE",
  "inTitle": "Todo lo que lleva tu web.",
  "inItems": [
   "Diseño adaptado al móvil",
   "Tus fotos y mapa de ubicación",
   "Formulario y botón de WhatsApp",
   "Te ayudamos con dominio y hosting",
   "Tu web en varios idiomas",
   "Que te encuentren en Google (SEO básico)",
   "Entrega en pocos días",
   "Atención directa con nosotros"
  ],
  "stEy": "TRES PASOS",
  "stTitle": "Así de fácil.",
  "steps": [
   "Nos cuentas cómo es tu alojamiento y nos mandas tus fotos.",
   "Te decimos el precio final antes de empezar.",
   "Te entregamos la web y te explicamos cómo usarla."
  ],
  "wa": "WhatsApp",
  "waMsg": "Hola, quiero información sobre una web para mi alojamiento."
 },
 "en": {
  "nav": [
   [
    "inicio",
    "Home"
   ],
   [
    "ejemplos",
    "Examples"
   ],
   [
    "precios",
    "Prices"
   ],
   [
    "modulos",
    "Coming soon"
   ],
   [
    "mapa-demos",
    "Where we work"
   ],
   [
    "preguntas",
    "FAQ"
   ]
  ],
  "tag": "Websites for accommodations",
  "h1": "A website for your accommodation from €150. No fuss, no detours.",
  "sub": "We build the website for your hotel, rural house or tourist apartment so guests can find you easily and write to you directly. Already have one? We make it look more professional. Maintenance for €4 a month, if you want.",
  "cta1": "I want my website",
  "cta2": "See prices",
  "book": "Get my website",
  "chips": [
   "Your own website",
   "Maintenance",
   "Direct support"
  ],
  "calcT": "Work out what you would pay",
  "calcQ": "How many properties do you have?",
  "one": "1 website",
  "many": " websites",
  "calcWeb": "Your website (one-off):",
  "calcMant": "Maintenance (optional):",
  "from": "From ",
  "tbd": "On request",
  "month": " € a month",
  "calcNote": "Indicative price. We tell you the final price before we start.",
  "exEy": "EXAMPLES",
  "exTitle": "See how your website could look.",
  "exSub": "Example websites, sample designs to give you an idea.",
  "exBadge": "Example",
  "exView": "View example",
  "exClose": "Close",
  "exRooms": "Rooms",
  "exWa": "Book on WhatsApp",
  "ex": [
   [
    "Apartamentos Plaza Mayor",
    "Tourist apartments · Salamanca"
   ],
   [
    "Casa Rural El Encinar",
    "Rural house · mountains"
   ],
   [
    "Hotel Boutique Calle Mayor",
    "Small hotel · city centre"
   ]
  ],
  "inEy": "WHAT IS INCLUDED",
  "inTitle": "Everything your website comes with.",
  "inItems": [
   "Mobile-friendly design",
   "Your photos and a location map",
   "Contact form and WhatsApp button",
   "We help you with domain and hosting",
   "Your website in several languages",
   "Be found on Google (basic SEO)",
   "Delivered in just a few days",
   "Direct support from us"
  ],
  "stEy": "THREE STEPS",
  "stTitle": "It is that easy.",
  "steps": [
   "You tell us about your accommodation and send your photos.",
   "We tell you the final price before we start.",
   "We deliver the website and show you how to use it."
  ],
  "wa": "WhatsApp",
  "waMsg": "Hello, I would like information about a website for my accommodation."
 },
 "ca": {
  "nav": [
   [
    "inicio",
    "Inici"
   ],
   [
    "ejemplos",
    "Exemples"
   ],
   [
    "precios",
    "Preus"
   ],
   [
    "modulos",
    "Aviat"
   ],
   [
    "mapa-demos",
    "On treballem"
   ],
   [
    "preguntas",
    "Preguntes"
   ]
  ],
  "tag": "Webs per a allotjaments",
  "h1": "Una web per al teu allotjament des de 150 €. Sense embolics.",
  "sub": "Fem la web del teu hotel, casa rural o apartament turístic perquè et trobin més fàcilment i els hostes puguin escriure’t directament. I si ja en tens una, te la deixem més professional. Manteniment per 4 € al mes, si vols.",
  "cta1": "Vull la meva web",
  "cta2": "Veure preus",
  "book": "Demanar la meva web",
  "chips": [
   "Web pròpia",
   "Manteniment",
   "Atenció directa"
  ],
  "calcT": "Calcula el que pagaries",
  "calcQ": "Quants allotjaments tens?",
  "one": "1 web",
  "many": " webs",
  "calcWeb": "La teva web (pagament únic):",
  "calcMant": "Manteniment (opcional):",
  "from": "Des de ",
  "tbd": "A consultar",
  "month": " € al mes",
  "calcNote": "Preu orientatiu. Et diem el preu final abans de començar.",
  "exEy": "EXEMPLES",
  "exTitle": "Mira com pot quedar la teva web.",
  "exSub": "Webs d’exemple, dissenys de mostra perquè te’n facis una idea.",
  "exBadge": "Exemple",
  "exView": "Veure exemple",
  "exClose": "Tancar",
  "exRooms": "Habitacions",
  "exWa": "Reservar per WhatsApp",
  "ex": [
   [
    "Apartamentos Plaza Mayor",
    "Apartaments turístics · Salamanca"
   ],
   [
    "Casa Rural El Encinar",
    "Casa rural · serra"
   ],
   [
    "Hotel Boutique Calle Mayor",
    "Hotel petit · centre"
   ]
  ],
  "inEy": "QUÈ INCLOU",
  "inTitle": "Tot el que porta la teva web.",
  "inItems": [
   "Disseny adaptat al mòbil",
   "Les teves fotos i mapa d’ubicació",
   "Formulari i botó de WhatsApp",
   "T’ajudem amb domini i hosting",
   "La teva web en diversos idiomes",
   "Que et trobin a Google (SEO bàsic)",
   "Lliurament en pocs dies",
   "Atenció directa amb nosaltres"
  ],
  "stEy": "TRES PASSOS",
  "stTitle": "Així de fàcil.",
  "steps": [
   "Ens expliques com és el teu allotjament i ens envies les fotos.",
   "Et diem el preu final abans de començar.",
   "Et lliurem la web i t’expliquem com utilitzar-la."
  ],
  "wa": "WhatsApp",
  "waMsg": "Hola, voldria informació sobre una web per al meu allotjament."
 },
 "fr": {
  "nav": [
   [
    "inicio",
    "Accueil"
   ],
   [
    "ejemplos",
    "Exemples"
   ],
   [
    "precios",
    "Tarifs"
   ],
   [
    "modulos",
    "Bientôt"
   ],
   [
    "mapa-demos",
    "Où nous travaillons"
   ],
   [
    "preguntas",
    "Questions"
   ]
  ],
  "tag": "Sites web pour hébergements",
  "h1": "Un site web pour votre hébergement dès 150 €. Simple et sans détour.",
  "sub": "Nous créons le site de votre hôtel, gîte rural ou appartement touristique pour qu’on vous trouve plus facilement et que vos clients puissent vous écrire directement. Vous en avez déjà un ? Nous le rendons plus professionnel. Maintenance à 4 € par mois, si vous le souhaitez.",
  "cta1": "Je veux mon site",
  "cta2": "Voir les tarifs",
  "book": "Demander mon site",
  "chips": [
   "Site à vous",
   "Maintenance",
   "Contact direct"
  ],
  "calcT": "Calculez ce que vous paieriez",
  "calcQ": "Combien d’hébergements avez-vous ?",
  "one": "1 site",
  "many": " sites",
  "calcWeb": "Votre site (paiement unique) :",
  "calcMant": "Maintenance (facultative) :",
  "from": "Dès ",
  "tbd": "Sur demande",
  "month": " € par mois",
  "calcNote": "Prix indicatif. Nous vous donnons le prix final avant de commencer.",
  "exEy": "EXEMPLES",
  "exTitle": "Voyez à quoi pourrait ressembler votre site.",
  "exSub": "Sites d’exemple, maquettes pour vous faire une idée.",
  "exBadge": "Exemple",
  "exView": "Voir l’exemple",
  "exClose": "Fermer",
  "exRooms": "Chambres",
  "exWa": "Réserver sur WhatsApp",
  "ex": [
   [
    "Apartamentos Plaza Mayor",
    "Appartements touristiques · Salamanque"
   ],
   [
    "Casa Rural El Encinar",
    "Gîte rural · montagne"
   ],
   [
    "Hotel Boutique Calle Mayor",
    "Petit hôtel · centre"
   ]
  ],
  "inEy": "CE QUI EST INCLUS",
  "inTitle": "Tout ce que comprend votre site.",
  "inItems": [
   "Conception adaptée au mobile",
   "Vos photos et une carte de localisation",
   "Formulaire et bouton WhatsApp",
   "Nous vous aidons pour le domaine et l’hébergement",
   "Votre site en plusieurs langues",
   "Soyez trouvé sur Google (SEO de base)",
   "Livraison en quelques jours",
   "Contact direct avec nous"
  ],
  "stEy": "TROIS ÉTAPES",
  "stTitle": "Aussi simple que ça.",
  "steps": [
   "Vous nous décrivez votre hébergement et nous envoyez vos photos.",
   "Nous vous donnons le prix final avant de commencer.",
   "Nous livrons le site et vous expliquons comment l’utiliser."
  ],
  "wa": "WhatsApp",
  "waMsg": "Bonjour, je voudrais des informations sur un site web pour mon hébergement."
 }
};
const WA_NUMBER = '34647564733';
const card = 'bg-[#181e27] border border-[#34404e] rounded-xl';
const field = 'w-full bg-[#0e131a] border border-[#40505f] p-3 rounded text-white focus:outline-none focus:border-[#25d6e8]';
const eyebrow = 'text-xs font-bold uppercase tracking-widest';

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [lang, setLang] = useState('es');
  const [demo, setDemo] = useState(null);
  const t = I18N[lang];
  const [rooms, setRooms] = useState('1');
  const [modFilter, setModFilter] = useState('todos');
  const [openMods, setOpenMods] = useState({});
  const [openFaqs, setOpenFaqs] = useState({});
  const [gi, setGi] = useState(0);
  const [auto, setAuto] = useState(true);
  const [sel, setSel] = useState('esp0');
  const [mapFilter, setMapFilter] = useState('todos');
  const empty = { nombre: '', alojamiento: '', email: '', telefono: '', tipo_negocio: '', mensaje: '', website: '' };
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    try { const l = localStorage.getItem('lang'); if (l && I18N[l]) setLang(l); } catch {}
  }, []);
  const changeLang = (l) => { setLang(l); try { localStorage.setItem('lang', l); } catch {} };

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
      if (res.ok) { setStatus({ loading: false, success: '¡Hecho! Hemos recibido tu mensaje y te escribimos pronto.', error: null }); setForm(empty); }
      else setStatus({ loading: false, success: null, error: 'No hemos podido enviar tu mensaje. Inténtalo otra vez o llámanos.' });
    } catch { setStatus({ loading: false, success: null, error: 'Error al procesar la solicitud.' }); }
  };

  const mods = modFilter === 'todos' ? MODULES : MODULES.filter((m) => m.cat === modFilter);
  const zones = mapFilter === 'todos' ? ZONES : ZONES.filter((z) => z.tipo === mapFilter);
  const zone = ZONES.find((z) => z.id === sel) || ZONES[0];
  
  return (
    <div className="w-full overflow-x-hidden bg-[#0a0c10] text-[#f6f8fb] font-sans selection:bg-[#25d6e8] selection:text-[#071014]">
      <Head>
        <title>M&D Solutions Technology | Webs para alojamientos en España</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Webs para hoteles, casas rurales y apartamentos turísticos desde 150 €. Mantenimiento por 4 € al mes. Hablas directamente con nosotros." />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Work+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
      </Head>

      <div className="h-1 w-full bg-gradient-to-r from-[#25d6e8] via-[#9a6cff] via-[#ff765e] to-[#c5f34c] bg-[length:200%_100%] animate-pulse"></div>

      <header className="sticky top-0 z-50 border-b border-[#34404e] bg-[#0a0c10]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a href="#inicio" className="flex items-center gap-3 font-extrabold hover:text-[#25d6e8] transition-colors"><img src="/logo.png" alt="" className="h-9 w-auto" /><span className="hidden sm:inline">M&D Solutions</span></a>
          <div className="hidden items-center gap-6 md:flex text-sm font-semibold text-slate-300">
            {t.nav.map(([id, l]) => <a key={id} href={'#' + id} className="hover:text-[#25d6e8] transition-colors">{l}</a>)}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex overflow-hidden rounded-full border border-[#34404e] text-xs font-bold" role="group" aria-label="Idioma">
              {['es','en','ca','fr'].map((l) => <button key={l} type="button" onClick={() => changeLang(l)} aria-pressed={lang === l} className={'px-2.5 py-1.5 uppercase ' + (lang === l ? 'bg-[#25d6e8] text-[#071014]' : 'text-slate-300 hover:text-white')}>{l}</button>)}
            </div>
            <a href="#contacto" className="hidden sm:block rounded-full bg-[#25d6e8] px-4 py-2 text-sm font-bold text-[#071014] hover:bg-[#1fbecf] transition-all">{t.book}</a>
            <button onClick={() => setMenu(!menu)} type="button" aria-label="Abrir menú" className="p-2 md:hidden text-white text-xl">☰</button>
          </div>
        </nav>
        {menu && (
          <div className="border-t border-[#34404e] bg-[#12161d] px-5 py-5 md:hidden flex flex-col gap-4 text-sm font-semibold">
            {[...t.nav, ['contacto', t.book]].map(([id, l]) => <a key={id} href={'#' + id} onClick={() => setMenu(false)}>{l}</a>)}
          </div>
        )}
      </header>

      <main>
        <section id="inicio" className="relative isolate flex min-h-[calc(100vh-72px)] items-center overflow-hidden border-b border-[#34404e] py-12">
          <img src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0a0c10] via-[#0a0c10]/85 to-[#0a0c10]/50"></div>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 lg:grid-cols-[.92fr_1.08fr] lg:px-8">
            <div>
              <div className="mb-6 flex items-center gap-4"><img src="/logo.png" alt="M&D Solutions Technology" className="h-24 w-auto" /><div><p className="text-2xl font-extrabold leading-tight">M&D Solutions</p><p className="text-sm font-semibold uppercase tracking-widest text-[#a9b5c3]">Technology</p><p className="mt-1 text-sm font-bold text-[#25d6e8]">{t.tag}</p></div></div>
              <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-6xl">{t.h1}</h1>
              <p className="mt-6 max-w-xl text-lg leading-7 text-[#c7d0da]">{t.sub}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" className="rounded-full bg-[#ff765e] px-6 py-3 text-center font-bold text-[#17100e] hover:opacity-90 transition-opacity">{t.cta1}</a>
                <a href="#precios" className="rounded-full border border-[#51606e] bg-[#181e27] px-6 py-3 text-center font-bold hover:bg-[#202834] transition-colors">{t.cta2}</a>
              </div>
              <div className="mt-9 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#25d6e8]/30 bg-[#16252a] px-3 py-2 text-sm font-bold text-[#25d6e8]">{t.chips[0]}</span>
                <span className="rounded-full border border-[#c5f34c]/30 bg-[#25251a] px-3 py-2 text-sm font-bold text-[#c5f34c]">{t.chips[1]}</span>
                <span className="rounded-full border border-[#ff9c8d]/30 bg-[#2a1d1c] px-3 py-2 text-sm font-bold text-[#ff9c8d]">{t.chips[2]}</span>
              </div>
            </div>

            <div className="relative bg-[#181e27] border border-[#34404e] rounded-2xl p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#34404e] pb-4">
                <span className="font-bold text-white">{t.calcT}</span>
                <span className="h-3 w-3 rounded-full bg-[#c5f34c] shadow-[0_0_12px_#c5f34c]"></span>
              </div>
              <p className="mt-4 text-xs font-semibold text-[#a9b5c3] uppercase tracking-wider">{t.calcQ}</p>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {['1', '2', '3', '4+'].map((r) => (
                  <button key={r} onClick={() => setRooms(r)} className={`py-2 text-xs font-bold rounded-lg border transition-all ${rooms === r ? 'bg-[#25d6e8] text-[#071014] border-[#25d6e8]' : 'bg-[#0e131a] text-slate-300 border-[#34404e] hover:border-[#25d6e8]'}`}>{r === '1' ? t.one : r + t.many}</button>
                ))}
              </div>
              <div className="mt-6 space-y-3 border-t border-[#34404e] pt-4 text-sm">
                <div className="flex items-center justify-between gap-3"><span className="text-[#a9b5c3]">{t.calcWeb}</span><span className="font-bold text-[#25d6e8]">{rooms === '4+' ? t.tbd : t.from + Number(rooms) * 150 + ' €'}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="text-[#a9b5c3]">{t.calcMant}</span><span className="font-bold text-[#c5f34c]">{rooms === '4+' ? t.tbd : Number(rooms) * 4 + t.month}</span></div>
              </div>
              <p className="mt-5 text-xs text-[#a9b5c3]">{t.calcNote}</p>
            </div>
          </div>
        </section>

        <section id="ejemplos" className="border-b border-[#34404e] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className={eyebrow + ' text-[#25d6e8]'}>{t.exEy}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t.exTitle}</h2>
            <p className="mt-3 max-w-2xl text-[#c7d0da]">{t.exSub}</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {t.ex.map(([name, kind], i) => (
                <article key={name} className={card + ' overflow-hidden flex flex-col'}>
                  <div className="relative h-44">
                    <img src={SLIDES[[1, 3, 2][i]].img} alt={name} className="h-full w-full object-cover" />
                    <span className="absolute left-3 top-3 rounded-full bg-[#0a0c10]/85 px-3 py-1 text-xs font-bold text-[#c5f34c] border border-[#c5f34c]/40">{t.exBadge}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="font-bold text-white">{name}</h3>
                    <p className="mt-1 text-sm text-[#a9b5c3]">{kind}</p>
                    <button type="button" onClick={() => setDemo(demo === i ? null : i)} className="mt-4 self-start rounded-full border border-[#25d6e8] px-4 py-2 text-sm font-bold text-[#25d6e8] hover:bg-[#16252a]">{demo === i ? t.exClose : t.exView}</button>
                  </div>
                </article>
              ))}
            </div>
            {demo !== null && (
              <div className={card + ' mt-6 overflow-hidden'}>
                <div className="flex items-center justify-between border-b border-[#34404e] bg-[#0e131a] px-5 py-3">
                  <span className="font-bold text-white">{t.ex[demo][0]}</span>
                  <span className="rounded-full border border-[#c5f34c]/40 px-3 py-1 text-xs font-bold text-[#c5f34c]">{t.exBadge}</span>
                </div>
                <div className="relative h-56 sm:h-72">
                  <img src={SLIDES[[1, 3, 2][demo]].img} alt="" className="h-full w-full object-cover opacity-80" />
                  <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0a0c10] to-transparent p-6">
                    <p className="text-2xl font-extrabold">{t.ex[demo][0]}</p>
                    <p className="text-sm text-[#c7d0da]">{t.ex[demo][1]}</p>
                  </div>
                </div>
                <div className="p-5">
                  <p className={eyebrow + ' text-[#a9b5c3]'}>{t.exRooms}</p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    {[0, 1, 2].map((k) => <div key={k} className="h-16 rounded-lg border border-[#34404e] bg-[#0e131a]"></div>)}
                  </div>
                  <span className="mt-4 inline-block rounded-full bg-[#25D366] px-5 py-2 text-sm font-bold text-[#06210f]">{t.exWa}</span>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="precios" className="bg-[#12161d] py-16 border-b border-[#34404e]">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className={eyebrow + ' text-[#c5f34c]'}>PRECIOS CLAROS</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Lo que cuesta, sin rodeos.</h2>
            <p className="mt-3 max-w-2xl text-[#c7d0da]">Pagas la web una vez y, si quieres, nos encargamos de mantenerla. Así de fácil.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {PRICES.map((x) => (
                <article key={x.t} className={card + ' p-6 flex flex-col'}>
                  <h3 className="text-lg font-bold text-white">{x.t}</h3>
                  <p className="mt-3 text-3xl font-extrabold" style={{ color: x.color }}>{x.p}</p>
                  <p className="text-xs text-[#a9b5c3]">{x.n}</p>
                  <ul className="mt-4 space-y-2 text-sm text-[#c7d0da] flex-1">
                    {x.items.map((it) => <li key={it}>✔ {it}</li>)}
                  </ul>
                  <a href="#contacto" className="mt-6 block rounded-full py-2.5 text-center text-sm font-bold text-[#071014] hover:opacity-90 transition-opacity" style={{ backgroundColor: x.color }}>{x.cta}</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="incluye" className="border-b border-[#34404e] py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className={eyebrow + ' text-[#c5f34c]'}>{t.inEy}</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t.inTitle}</h2>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {t.inItems.map((it) => <div key={it} className={card + ' p-4 text-sm text-[#c7d0da]'}><span className="mr-2 text-[#c5f34c]">✔</span>{it}</div>)}
            </div>
            <p className={eyebrow + ' mt-14 text-[#25d6e8]'}>{t.stEy}</p>
            <h2 className="mt-3 text-3xl font-extrabold">{t.stTitle}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {t.steps.map((st, i) => <div key={i} className={card + ' p-5'}><span className="text-2xl font-extrabold text-[#25d6e8]">{i + 1}</span><p className="mt-2 text-sm text-[#c7d0da]">{st}</p></div>)}
            </div>
          </div>
        </section>

        <section id="plataforma" className="border-b border-[#34404e] py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-5 mb-6">
              <div>
                <p className={eyebrow + ' text-[#25d6e8]'}>ALOJAMIENTOS DE TODO TIPO</p>
                <h2 className="mt-2 text-3xl font-extrabold">Webs hechas para alojamientos como el tuyo.</h2>
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
            <p className={eyebrow + ' text-[#ff9c8d]'}>PRÓXIMAMENTE</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Estamos preparando un programa de gestión para tu alojamiento. Aún no está a la venta.</h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {[['todos', 'Todos'], ['recepcion', 'Recepción'], ['housekeeping', 'Limpieza'], ['facturacion', 'Facturación / TPV'], ['operaciones', 'RevPAR & Análisis']].map(([k, l]) => (
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
            <p className={eyebrow + ' text-[#25d6e8]'}>DÓNDE TRABAJAMOS</p>
            <h2 className="mt-2 text-3xl font-extrabold">Webs para alojamientos de toda España.</h2>
            <p className="text-sm text-[#a9b5c3] mt-1 mb-8">Toca un punto del mapa para ver con qué alojamientos trabajamos en cada zona.</p>

            <div className="flex flex-wrap gap-2 mb-6">
              {[['todos', '🌐 Todos en España'], ['hoteles', '🏨 Hoteles Urbanos'], ['cabanas', '🏡 Casas Rurales'], ['resorts', '🌴 Resorts de Costa'], ['apartamentos', '🏢 Apartamentos']].map(([k, l]) => (
                <button key={k} onClick={() => setMapFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${mapFilter === k ? 'bg-[#181e27] text-[#25d6e8] border-[#25d6e8]' : 'bg-[#0e131a] text-[#a9b5c3] border-[#34404e] hover:border-[#25d6e8]'}`}>{l}</button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="relative min-h-[340px] bg-[#0e131a] border border-[#34404e] rounded-2xl p-6 overflow-hidden flex flex-col justify-between shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <div className="relative z-10 flex items-center justify-between border-b border-[#34404e]/80 pb-3">
                  <span className="text-xs font-mono font-bold text-[#a9b5c3] tracking-wider uppercase">PENÍNSULA E ISLAS</span>
                  <span className="flex items-center gap-2 text-xs font-bold text-[#25d6e8]"><span className="h-2 w-2 rounded-full bg-[#25d6e8] animate-ping"></span>Trabajamos en toda España</span>
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
                <p className="relative z-10 text-xs text-[#a9b5c3] italic">💡 Toca un marcador para ver qué hacemos en cada zona.</p>
              </div>

              <div className={card + ' p-6 flex flex-col justify-between'}>
                <div>
                  <div className="flex items-center justify-between border-b border-[#34404e] pb-3">
                    <span className={eyebrow + ' text-[#25d6e8]'}>ZONA</span>
                    <span className="text-xs font-mono text-[#c5f34c]">{zone.ciudad}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{zone.nombre}</h3>
                  <div className="mt-4 rounded-xl bg-[#0e131a] border border-[#34404e] p-4 text-xs space-y-2">
                    <div className="flex justify-between"><span className="text-[#a9b5c3]">Trabajamos con:</span><span className="font-bold text-[#c5f34c]">{zone.foco}</span></div>
                    <div className="flex justify-between"><span className="text-[#a9b5c3]">Web:</span><span className="font-bold text-[#25d6e8]">Desde 150 €</span></div>
                  </div>
                  <p className="mt-5 text-sm text-[#c7d0da] leading-relaxed bg-[#12161d] p-3 rounded-lg border-l-2 border-[#25d6e8]">{zone.texto}</p>
                </div>
                <a href="#contacto" className="mt-6 block w-full rounded-full bg-[#25d6e8] py-2.5 text-center text-xs font-bold text-[#071014] hover:bg-[#1fbecf] transition-all">Pedir mi web</a>
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
              <h2 className="mt-2 text-3xl font-extrabold">Cómo trabajamos.</h2>
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
              <h2 className="mt-4 text-3xl font-extrabold">Cuéntanos qué necesitas.</h2>
              <p className="mt-4 text-sm text-[#a9b5c3]">Rellena el formulario o llámanos. Te respondemos sin compromiso y te decimos el precio exacto, ¿vale?</p>
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
                <label className="mb-1 block text-sm font-bold text-white">¿Qué necesitas? (web nueva, mejorar la que tienes…)</label>
                <textarea name="mensaje" rows="4" value={form.mensaje} onChange={onChange} required className={field}></textarea>
              </div>
              <input type="text" name="website" value={form.website} onChange={onChange} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
              <button type="submit" disabled={status.loading} className="mt-2 rounded-full bg-[#25d6e8] py-3 px-6 font-bold text-[#071014] hover:bg-[#1fbecf] transition-all disabled:opacity-50">{status.loading ? 'Enviando...' : 'Enviar'}</button>
              {status.success && <p className="text-[#c5f34c] text-sm font-semibold">{status.success}</p>}
              {status.error && <p className="text-[#ff765e] text-sm font-semibold">{status.error}</p>}
            </form>
          </div>
        </section>
      </main>

      <a href={'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(t.waMsg)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-bold text-[#06210f] shadow-2xl hover:opacity-90 transition-opacity">
        <span aria-hidden="true">💬</span>{t.wa}
      </a>

      <footer className="border-t border-[#34404e] bg-[#0a0c10] py-9 px-5 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-3 text-xs text-[#a9b5c3]">
          <p className="font-bold text-white text-sm">M&D Solutions Technology</p>
          <p>Daniel (+34 647 56 47 33) · María Elena (+54 9 362 539 1283) · mdsolutionstecnology@gmail.com</p>
          <p>Los datos que nos envías por el formulario solo se usan para responderte.</p>
          <p>&copy; {new Date().getFullYear()} M&D Solutions Technology. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
