/* ============================================================================
   SITE.JS — Header, footer y botón flotante de WhatsApp compartidos.
   Inyecta la navegación y el pie en cada página para no duplicar markup.
   Depende de js/config.js (window.SITE, window.waLink).
   ============================================================================ */
(function () {
  var S = window.SITE || {};

  // Íconos SVG reutilizables ------------------------------------------------
  var ICON = {
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zM6.597 20.13c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.82 9.82 0 001.523 5.26l-.999 3.648 3.945-1.035zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.3-1.5 1.6-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="3.5"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none"/></svg>',
    tk: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.5 3c.3 2 1.5 3.5 3.5 3.8V9c-1.3 0-2.5-.4-3.5-1.1V15c0 3-2.2 5-5 5s-5-2.2-5-5 2.4-5.2 5.4-4.9v2.4c-.3-.1-.6-.1-.9-.1-1.4 0-2.5 1.1-2.5 2.6S9 17.5 10.4 17.5s2.6-1.1 2.6-2.6V3h3.5z"/></svg>',
    libro: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 4h9a2 2 0 012 2v14H6a2 2 0 01-2-2V4z"/><path d="M20 4h-3v16h3V4z"/><path d="M7 8h6M7 11h6"/></svg>'
  };

  // Estructura de navegación ------------------------------------------------
  var NAV = [
    { href: 'index.html',      label: 'Inicio' },
    { href: 'productos.html',  label: 'Productos' },
    { href: 'a-medida.html',   label: 'A medida' },
    { href: 'proyectos.html',  label: 'Proyectos' },
    { href: 'envios.html',     label: 'Envíos' },
    { href: 'nosotros.html',   label: 'Nosotros' },
    { href: 'faq.html',        label: 'Preguntas' },
    { href: 'contacto.html',   label: 'Contacto' }
  ];

  var current = location.pathname.split('/').pop() || 'index.html';

  function markSvg() {
    // Logotipo: bloque de acero con cordón de soldadura (diagonal) — sencillo y propio.
    return '<svg class="mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
      '<rect x="1" y="1" width="38" height="38" rx="4" fill="#0f2444"/>' +
      '<path d="M8 26 L20 8 L32 26" stroke="#7fb0ea" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M8 31 L32 31" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-dasharray="0.2 4.2"/>' +
      '</svg>';
  }

  function brandHtml(footer) {
    return '<a class="brand" href="index.html">' + markSvg() +
      '<span class="brand-txt">' + (S.marca || 'Industrias Céspedes') +
      '<small>Acero inoxidable · Perú</small></span></a>';
  }

  // Header ------------------------------------------------------------------
  function buildHeader(el) {
    var links = NAV.map(function (n) {
      var cur = n.href === current ? ' aria-current="page"' : '';
      return '<li><a href="' + n.href + '"' + cur + '>' + n.label + '</a></li>';
    }).join('');

    el.className = 'site-header';
    el.innerHTML =
      '<div class="container nav">' +
        brandHtml() +
        '<button class="nav-toggle" aria-expanded="false" aria-controls="nav-links" aria-label="Abrir menú">' + ICON.menu + '</button>' +
        '<ul class="nav-links" id="nav-links">' + links + '</ul>' +
        '<div class="nav-cta">' +
          '<a class="btn btn--wa hide-mobile" href="' + window.waLink() + '" target="_blank" rel="noopener">' + ICON.wa + 'Cotizar</a>' +
        '</div>' +
      '</div>';

    var toggle = el.querySelector('.nav-toggle');
    var menu = el.querySelector('.nav-links');
    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.innerHTML = open ? ICON.close : ICON.menu;
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });
  }

  // Footer ------------------------------------------------------------------
  function socialsHtml() {
    var r = S.redes || {}, out = '';
    if (r.facebook)  out += '<a href="' + r.facebook + '" target="_blank" rel="noopener" aria-label="Facebook">' + ICON.fb + '</a>';
    if (r.instagram) out += '<a href="' + r.instagram + '" target="_blank" rel="noopener" aria-label="Instagram">' + ICON.ig + '</a>';
    if (r.tiktok)    out += '<a href="' + r.tiktok + '" target="_blank" rel="noopener" aria-label="TikTok">' + ICON.tk + '</a>';
    return out ? '<div class="footer-socials">' + out + '</div>' : '';
  }

  function buildFooter(el) {
    var year = new Date().getFullYear();
    el.className = 'site-footer';
    el.innerHTML =
      '<div class="container">' +
        '<div class="footer-top">' +
          '<div class="footer-brand">' +
            brandHtml() +
            '<p>' + (S.eslogan || '') + '. Fabricación propia en acero inoxidable de uso alimentario, con medidas a pedido y atención directa de fábrica.</p>' +
            socialsHtml() +
          '</div>' +
          '<div>' +
            '<h4>Catálogo</h4>' +
            '<ul class="footer-links">' +
              '<li><a href="productos.html">Todos los productos</a></li>' +
              '<li><a href="productos.html?cat=mesas">Mesas de trabajo</a></li>' +
              '<li><a href="productos.html?cat=lavaderos">Lavaderos</a></li>' +
              '<li><a href="productos.html?cat=campanas">Campanas extractoras</a></li>' +
              '<li><a href="a-medida.html">Fabricación a medida</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Empresa</h4>' +
            '<ul class="footer-links">' +
              '<li><a href="nosotros.html">Nosotros</a></li>' +
              '<li><a href="proyectos.html">Proyectos</a></li>' +
              '<li><a href="envios.html">Envíos y entregas</a></li>' +
              '<li><a href="faq.html">Preguntas frecuentes</a></li>' +
              '<li><a href="contacto.html">Contacto / Cotizar</a></li>' +
            '</ul>' +
          '</div>' +
          '<div>' +
            '<h4>Contacto</h4>' +
            '<ul class="footer-links">' +
              '<li><a href="' + window.waLink() + '" target="_blank" rel="noopener">WhatsApp de ventas</a></li>' +
              '<li><a href="mailto:' + (S.correoVentas || '') + '">' + (S.correoVentas || '') + '</a></li>' +
              '<li>' + (S.telefono || '') + '</li>' +
              '<li>' + (S.horario || '') + '</li>' +
            '</ul>' +
            '<a class="libro-badge" href="libro-reclamaciones.html">' + ICON.libro +
              '<span><b>Libro de Reclamaciones</b><span>Reclamos y quejas</span></span></a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-legal-data">' +
          (S.razonSocial || '') + ' · RUC ' + (S.ruc || '') + '<br>' +
          (S.direccion || '') + ' · ' + (S.horario || '') +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + year + ' ' + (S.marca || '') + '. Todos los derechos reservados.</span>' +
          '<span>' +
            '<a href="privacidad.html">Privacidad</a> · ' +
            '<a href="terminos.html">Términos</a> · ' +
            '<a href="cookies.html">Cookies</a> · ' +
            '<a href="libro-reclamaciones.html">Libro de Reclamaciones</a>' +
          '</span>' +
        '</div>' +
      '</div>';
  }

  // Botón flotante de WhatsApp ---------------------------------------------
  function buildFloat() {
    var a = document.createElement('a');
    a.className = 'wa-float';
    a.href = window.waLink();
    a.target = '_blank';
    a.rel = 'noopener';
    a.setAttribute('aria-label', 'Cotizar por WhatsApp');
    a.innerHTML = ICON.wa + '<span class="txt">Cotizar por WhatsApp</span>';
    document.body.appendChild(a);
  }

  // Init --------------------------------------------------------------------
  function init() {
    var h = document.querySelector('[data-site-header]');
    var f = document.querySelector('[data-site-footer]');
    if (h) buildHeader(h);
    if (f) buildFooter(f);
    buildFloat();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Exponer íconos por si otras páginas los necesitan
  window.ICONS = ICON;
})();
