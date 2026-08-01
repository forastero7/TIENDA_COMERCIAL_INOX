/* ============================================================================
   CATÁLOGO DE MUESTRA — INDUSTRIAS CÉSPEDES
   ----------------------------------------------------------------------------
   Productos de EJEMPLO con fichas técnicas realistas. Reemplaza por tus
   productos reales: edita/duplica los objetos de PRODUCTS y cambia "img" por
   la ruta de tu foto real (ej. 'images/productos/mi-mesa.jpg').

   Cada producto:
     id            código de producto (aparece en el mensaje de WhatsApp)
     nombre        nombre claro y específico (medidas + tipo de acero)
     categoria     una de CATEGORIES[].slug
     rubros        colecciones por rubro: 'polleria' | 'cevicheria' | 'panaderia'
     img           imagen principal (placeholder por categoría por ahora)
     descripcion   beneficio en 1–2 frases
     specs         { acero, calibre, medidas, niveles, capacidad, acabado }
     precio        número en soles (S/) o null para mostrar "Cotizar precio"
     disponibilidad 'stock' | 'pedido' | 'personalizado'
     dias          tiempo estimado de fabricación (días hábiles) o null
     destacado     true para "Productos más solicitados" en el inicio
   ============================================================================ */

window.CATEGORIES = [
  { slug: 'mesas',        nombre: 'Mesas de trabajo',              img: 'images/cat/mesas.svg' },
  { slug: 'estanterias',  nombre: 'Estanterías y anaqueles',       img: 'images/cat/estanterias.svg' },
  { slug: 'repisas',      nombre: 'Repisas de pared',              img: 'images/cat/repisas.svg' },
  { slug: 'lavaderos',    nombre: 'Lavaderos y lavamanos',         img: 'images/cat/lavaderos.svg' },
  { slug: 'campanas',     nombre: 'Campanas extractoras',          img: 'images/cat/campanas.svg' },
  { slug: 'cocinas',      nombre: 'Cocinas industriales',          img: 'images/cat/cocinas.svg' },
  { slug: 'exhibidoras',  nombre: 'Exhibidoras y mostradores',     img: 'images/cat/exhibidoras.svg' },
  { slug: 'carritos',     nombre: 'Carritos y transporte',         img: 'images/cat/carritos.svg' }
];

window.RUBROS = [
  { slug: 'polleria',   nombre: 'Línea pollería' },
  { slug: 'ceviceria',  nombre: 'Línea cevichería' },
  { slug: 'panaderia',  nombre: 'Línea panadería' }
];

window.PRODUCTS = [
  {
    id: 'MT-120',
    nombre: 'Mesa de trabajo 120×60×90 cm con repisa inferior – AISI 304',
    categoria: 'mesas',
    rubros: ['polleria', 'ceviceria'],
    img: 'images/cat/mesas.svg',
    descripcion: 'Superficie de acero de uso alimentario, fácil de limpiar y resistente al trabajo diario intenso. Repisa inferior para aprovechar el espacio.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '120 × 60 × 90 cm (largo × ancho × alto)',
      niveles: '2 (superficie + repisa inferior)',
      capacidad: 'Hasta 120 kg distribuidos',
      acabado: 'Satinado sanitario, esquinas redondeadas'
    },
    precio: 850,
    disponibilidad: 'pedido',
    dias: 5,
    destacado: true
  },
  {
    id: 'MT-150R',
    nombre: 'Mesa de trabajo 150×70×90 cm con respaldo – AISI 304',
    categoria: 'mesas',
    rubros: ['polleria', 'panaderia'],
    img: 'images/cat/mesas.svg',
    descripcion: 'Respaldo posterior que protege la pared y evita derrames. Ideal para líneas de producción y emplatado.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '150 × 70 × 90 cm + respaldo 10 cm',
      niveles: '2 (superficie + repisa inferior)',
      capacidad: 'Hasta 150 kg distribuidos',
      acabado: 'Satinado sanitario'
    },
    precio: 1150,
    disponibilidad: 'pedido',
    dias: 6,
    destacado: false
  },
  {
    id: 'LV-2P',
    nombre: 'Lavadero de 2 pozas 120×60 cm con escurridero – AISI 304',
    categoria: 'lavaderos',
    rubros: ['ceviceria', 'polleria'],
    img: 'images/cat/lavaderos.svg',
    descripcion: 'Dos pozas profundas y escurridero para alto volumen de lavado. Pensado para la exigencia de higiene de cocinas peruanas.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '120 × 60 × 90 cm — pozas 40 × 45 × 30 cm',
      niveles: '2 pozas + escurridero',
      capacidad: 'Desagüe reforzado 2"',
      acabado: 'Satinado sanitario, soldadura sellada'
    },
    precio: 1350,
    disponibilidad: 'pedido',
    dias: 7,
    destacado: true
  },
  {
    id: 'LM-1',
    nombre: 'Lavamanos de acción a rodilla – AISI 304',
    categoria: 'lavaderos',
    rubros: ['polleria', 'ceviceria', 'panaderia'],
    img: 'images/cat/lavaderos.svg',
    descripcion: 'Accionamiento sin manos para cumplir buenas prácticas de manipulación de alimentos. Compacto y de fácil instalación.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 20 (0.9 mm)',
      medidas: '40 × 40 × 85 cm',
      niveles: '1 poza + dispensador',
      capacidad: 'Accionamiento a rodilla',
      acabado: 'Satinado sanitario'
    },
    precio: 520,
    disponibilidad: 'stock',
    dias: null,
    destacado: false
  },
  {
    id: 'CE-160',
    nombre: 'Campana extractora 160×110 cm con filtros trampa-grasa – AISI 430',
    categoria: 'campanas',
    rubros: ['polleria'],
    img: 'images/cat/campanas.svg',
    descripcion: 'Extracción eficiente de humo y grasa para pollerías y parrillas. Filtros desmontables para limpieza rápida.',
    specs: {
      acero: 'AISI 430 (estructura)',
      calibre: 'Calibre 20 (0.9 mm)',
      medidas: '160 × 110 × 50 cm',
      niveles: 'Canal perimetral recolector de grasa',
      capacidad: 'Filtros trampa-grasa desmontables',
      acabado: 'Satinado, preparada para ducto'
    },
    precio: null,
    disponibilidad: 'personalizado',
    dias: 10,
    destacado: true
  },
  {
    id: 'ES-4N',
    nombre: 'Estantería de 4 niveles 120×50×180 cm – AISI 430',
    categoria: 'estanterias',
    rubros: ['panaderia', 'ceviceria'],
    img: 'images/cat/estanterias.svg',
    descripcion: 'Almacenamiento robusto y ventilado para insumos y utensilios. Niveles regulables en altura.',
    specs: {
      acero: 'AISI 430 (estructura)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '120 × 50 × 180 cm',
      niveles: '4 regulables',
      capacidad: 'Hasta 80 kg por nivel',
      acabado: 'Satinado, patas niveladoras'
    },
    precio: 780,
    disponibilidad: 'pedido',
    dias: 5,
    destacado: false
  },
  {
    id: 'RP-120',
    nombre: 'Repisa de pared 120×30 cm – AISI 304',
    categoria: 'repisas',
    rubros: ['ceviceria', 'panaderia'],
    img: 'images/cat/repisas.svg',
    descripcion: 'Libera espacio en la mesa manteniendo a la mano lo más usado. Soportes reforzados incluidos.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 20 (0.9 mm)',
      medidas: '120 × 30 cm',
      niveles: '1',
      capacidad: 'Hasta 40 kg distribuidos',
      acabado: 'Satinado, bordes doblados'
    },
    precio: 260,
    disponibilidad: 'stock',
    dias: null,
    destacado: false
  },
  {
    id: 'EX-180',
    nombre: 'Exhibidora / mostrador 180×60×90 cm con vitrina – AISI 304',
    categoria: 'exhibidoras',
    rubros: ['panaderia', 'polleria'],
    img: 'images/cat/exhibidoras.svg',
    descripcion: 'Mostrador de atención con vitrina para exhibir productos. Combina presentación e higiene en el punto de venta.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '180 × 60 × 90 cm',
      niveles: 'Vitrina + repisa interior',
      capacidad: 'Vidrio templado frontal',
      acabado: 'Satinado sanitario'
    },
    precio: null,
    disponibilidad: 'personalizado',
    dias: 12,
    destacado: true
  },
  {
    id: 'CO-2H',
    nombre: 'Mueble para cocina industrial 2 hornillas 100×70×85 cm – AISI 430',
    categoria: 'cocinas',
    rubros: ['polleria', 'ceviceria'],
    img: 'images/cat/cocinas.svg',
    descripcion: 'Base de acero para equipos de cocción, con repisa inferior para ollas y utensilios. Resistente al calor y la limpieza diaria.',
    specs: {
      acero: 'AISI 430 (estructura)',
      calibre: 'Calibre 16 (1.5 mm)',
      medidas: '100 × 70 × 85 cm',
      niveles: '2 (base + repisa inferior)',
      capacidad: 'Hasta 200 kg distribuidos',
      acabado: 'Satinado, patas niveladoras'
    },
    precio: 990,
    disponibilidad: 'pedido',
    dias: 8,
    destacado: false
  },
  {
    id: 'CT-3N',
    nombre: 'Carrito de transporte 3 niveles 90×50×95 cm – AISI 304',
    categoria: 'carritos',
    rubros: ['panaderia', 'ceviceria'],
    img: 'images/cat/carritos.svg',
    descripcion: 'Traslado interno de insumos y platos entre estaciones. Ruedas con freno para operar con seguridad.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 20 (0.9 mm)',
      medidas: '90 × 50 × 95 cm',
      niveles: '3',
      capacidad: 'Hasta 60 kg por nivel',
      acabado: 'Satinado, 4 ruedas (2 con freno)'
    },
    precio: 690,
    disponibilidad: 'stock',
    dias: null,
    destacado: true
  },
  {
    id: 'ES-P',
    nombre: 'Estante panadero para bandejas 18 posiciones – AISI 304',
    categoria: 'estanterias',
    rubros: ['panaderia'],
    img: 'images/cat/estanterias.svg',
    descripcion: 'Coche portabandejas para panaderías y pastelerías. Guías para bandejas estándar y desplazamiento sobre ruedas.',
    specs: {
      acero: 'AISI 304 (contacto con alimentos)',
      calibre: 'Calibre 18 (1.2 mm)',
      medidas: '46 × 66 × 170 cm',
      niveles: '18 guías',
      capacidad: 'Bandejas 45 × 65 cm',
      acabado: 'Satinado, 4 ruedas (2 con freno)'
    },
    precio: 1250,
    disponibilidad: 'pedido',
    dias: 9,
    destacado: false
  },
  {
    id: 'MT-A',
    nombre: 'Mesa de trabajo a medida – AISI 304 / 430',
    categoria: 'mesas',
    rubros: ['polleria', 'ceviceria', 'panaderia'],
    img: 'images/cat/mesas.svg',
    descripcion: 'La fabricamos según el espacio real de tu local: largo, ancho, alto, cajones, entrepaños y respaldo a elección.',
    specs: {
      acero: 'AISI 304 o 430, según uso',
      calibre: 'Calibre 16 / 18 / 20 a elección',
      medidas: 'A tu medida (indica largo × ancho × alto)',
      niveles: 'Configurable',
      capacidad: 'Según diseño',
      acabado: 'Satinado sanitario'
    },
    precio: null,
    disponibilidad: 'personalizado',
    dias: 10,
    destacado: false
  }
];
