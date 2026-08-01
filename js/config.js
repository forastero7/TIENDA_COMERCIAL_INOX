/* ============================================================================
   CONFIGURACIÓN DEL SITIO — INDUSTRIAS CÉSPEDES
   ----------------------------------------------------------------------------
   >>> REEMPLAZA AQUÍ TODOS LOS DATOS ANTES DE PUBLICAR <<<
   Este es el ÚNICO archivo que necesitas editar para poner los datos reales
   del negocio. Todo lo marcado como "PLACEHOLDER" son datos de ejemplo.
   ============================================================================ */

window.SITE = {
  // --- Marca ---
  marca: 'Industrias Céspedes',
  eslogan: 'Fabricamos el corazón de tu cocina profesional',

  // --- WhatsApp (canal principal de conversión) ---
  // Formato internacional SIN "+", SIN espacios. Perú = 51 + número (9 dígitos).
  whatsapp: '51999999999',            // PLACEHOLDER — número de ejemplo
  whatsappTexto: 'Hola, quiero cotizar', // saludo base de los mensajes prellenados

  // --- Contacto ---
  telefono: '(01) 000 0000',          // PLACEHOLDER
  correoVentas: 'ventas@industriascespedes.pe',        // PLACEHOLDER
  correoCotizaciones: 'cotizaciones@industriascespedes.pe', // PLACEHOLDER

  // --- Datos de empresa (obligatorios en el pie de página en Perú) ---
  razonSocial: 'INDUSTRIAS CÉSPEDES S.A.C.', // PLACEHOLDER — razón social real
  ruc: '20000000000',                 // PLACEHOLDER — RUC de 11 dígitos
  direccion: 'Av. Ejemplo 000, Lima, Perú', // PLACEHOLDER — dirección del taller
  distrito: 'Lima',                   // PLACEHOLDER
  horario: 'Lun a Sáb, 8:00 a.m. – 6:00 p.m.', // PLACEHOLDER
  mapsUrl: 'https://maps.google.com/?q=Lima+Peru', // PLACEHOLDER — Google Maps del taller

  // --- Cifras de confianza (reemplaza por las reales o quítalas) ---
  aniosExperiencia: '10+',            // PLACEHOLDER
  proyectosEntregados: '500+',        // PLACEHOLDER

  // --- Medios de pago ---
  pagos: {
    yape: '999 999 999',              // PLACEHOLDER — número Yape a nombre de la empresa
    plin: '999 999 999',             // PLACEHOLDER — número Plin
    bancos: ['BCP', 'Interbank', 'BBVA', 'Scotiabank'],
    // Cuenta para transferencias (PLACEHOLDER — reemplaza por la cuenta real de la empresa)
    cuenta: { banco: 'BCP', numero: '000-0000000-0-00', cci: '000-000-0000000000-00', titular: 'INDUSTRIAS CÉSPEDES S.A.C.' },
    nota: 'Cuentas a nombre de la empresa. Emitimos boleta o factura electrónica (SUNAT).'
  },

  // --- Tienda / carrito (Fase 3) ---
  tienda: {
    moneda: 'S/',
    igvIncluido: true,               // los precios ya incluyen IGV (18%)
    igv: 0.18,
    adelanto: 0.5,                   // adelanto sugerido para iniciar fabricación
    // Pasarelas de pago con tarjeta: requieren backend + credenciales de comercio.
    // Actívalas cuando integres el proveedor (ver README, Fase 3).
    pasarelas: { culqi: false, niubiz: false, izipay: false, mercadopago: false }
  },

  // --- Envío por zona (Fase 3) ---
  // TARIFAS DE EJEMPLO en soles. Reemplaza por tus costos reales por distrito
  // y tamaño. El envío en Lima es un estimado; se confirma al procesar el pedido.
  envio: {
    // Recargo si el pedido incluye un producto voluminoso (según categorías de abajo)
    recargoVoluminoso: 40,
    categoriasVoluminosas: ['campanas', 'exhibidoras', 'cocinas', 'lavaderos', 'mesas'],
    provinciaNota: 'Despacho por agencia de carga; el flete se paga en destino, salvo acuerdo distinto.',
    recojoNota: 'Recojo gratuito en el taller, dentro del horario de atención.',
    limaZonas: [
      { id: 'centro',  nombre: 'Lima Centro',  costo: 30, distritos: ['Cercado de Lima', 'Breña', 'La Victoria', 'Rímac', 'Lince', 'Jesús María', 'Pueblo Libre'] },
      { id: 'moderna', nombre: 'Lima Moderna', costo: 35, distritos: ['Miraflores', 'San Isidro', 'Surco', 'San Borja', 'Barranco', 'Magdalena', 'San Miguel', 'Surquillo'] },
      { id: 'norte',   nombre: 'Lima Norte',   costo: 45, distritos: ['Los Olivos', 'San Martín de Porres', 'Comas', 'Independencia', 'Carabayllo', 'Puente Piedra'] },
      { id: 'sur',     nombre: 'Lima Sur',     costo: 45, distritos: ['Villa María del Triunfo', 'Villa El Salvador', 'San Juan de Miraflores', 'Chorrillos', 'Lurín', 'Pachacámac'] },
      { id: 'este',    nombre: 'Lima Este',    costo: 45, distritos: ['San Juan de Lurigancho', 'Ate', 'Santa Anita', 'El Agustino', 'La Molina', 'Chaclacayo'] },
      { id: 'callao',  nombre: 'Callao',       costo: 40, distritos: ['Callao', 'Bellavista', 'La Perla', 'La Punta', 'Carmen de la Legua', 'Ventanilla'] }
    ]
  },

  // --- Redes sociales (deja '' para ocultar el ícono) ---
  redes: {
    facebook: 'https://facebook.com/',   // PLACEHOLDER
    instagram: 'https://instagram.com/', // PLACEHOLDER
    tiktok: 'https://tiktok.com/'        // PLACEHOLDER
  }
};

/* Helper global: arma un enlace wa.me con mensaje prellenado.
   Uso: waLink('Mesa de trabajo 120×60×90 – MT-120')  */
window.waLink = function (mensaje) {
  var base = window.SITE.whatsapp.replace(/[^0-9]/g, '');
  var texto = mensaje
    ? window.SITE.whatsappTexto + ': ' + mensaje
    : window.SITE.whatsappTexto;
  return 'https://wa.me/' + base + '?text=' + encodeURIComponent(texto);
};
