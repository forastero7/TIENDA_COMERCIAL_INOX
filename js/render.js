/* ============================================================================
   RENDER.JS — Constructores de tarjetas reutilizables (inicio y catálogo).
   Depende de products.js (CATEGORIES, RUBROS, PRODUCTS) y config.js (waLink).
   ============================================================================ */
(function () {
  var AVAIL = {
    stock:         { txt: 'En stock',      cls: 'badge--stock' },
    pedido:        { txt: 'Bajo pedido',    cls: 'badge--pedido' },
    personalizado: { txt: 'Personalizado',  cls: 'badge--personalizado' }
  };

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function precioTxt(p) {
    return p == null ? 'Cotizar precio' : 'S/ ' + Number(p).toLocaleString('es-PE');
  }

  // Tarjeta de producto -----------------------------------------------------
  function productCard(p) {
    var a = AVAIL[p.disponibilidad] || AVAIL.pedido;
    var medidas = (p.specs && p.specs.medidas) ? p.specs.medidas.split('—')[0].trim() : '';
    return '' +
      '<a class="prod-card" href="producto.html?id=' + encodeURIComponent(p.id) + '">' +
        '<div class="thumb">' +
          '<span class="code">' + esc(p.id) + '</span>' +
          '<img src="' + esc(p.img) + '" alt="' + esc(p.nombre) + '" loading="lazy">' +
        '</div>' +
        '<div class="body">' +
          '<h3>' + esc(p.nombre) + '</h3>' +
          '<span class="meta">' + esc(medidas) + '</span>' +
          '<div class="foot">' +
            '<span class="price">' + precioTxt(p.precio) + '</span>' +
            '<span class="badge ' + a.cls + '">' + a.txt + '</span>' +
          '</div>' +
        '</div>' +
      '</a>';
  }

  // Tarjeta de categoría ----------------------------------------------------
  function categoryCard(c) {
    return '' +
      '<a class="cat-card" href="productos.html?cat=' + encodeURIComponent(c.slug) + '">' +
        '<div class="thumb"><img src="' + esc(c.img) + '" alt="' + esc(c.nombre) + '" loading="lazy"></div>' +
        '<div class="body"><span>' + esc(c.nombre) + '</span><span class="arrow" aria-hidden="true">&rarr;</span></div>' +
      '</a>';
  }

  // Chip de rubro -----------------------------------------------------------
  function rubroChip(r) {
    return '<a class="rubro-chip" href="productos.html?rubro=' + encodeURIComponent(r.slug) + '">' + esc(r.nombre) + '</a>';
  }

  window.RENDER = {
    esc: esc,
    precioTxt: precioTxt,
    productCard: productCard,
    categoryCard: categoryCard,
    rubroChip: rubroChip,
    AVAIL: AVAIL
  };
})();
