/* PRODUCT.JS — Renderiza la ficha de producto desde ?id=. */
(function () {
  var R = window.RENDER;
  var root = document.getElementById('ficha-root');
  if (!root) return;

  var id = new URLSearchParams(location.search).get('id');
  var p = (window.PRODUCTS || []).filter(function (x) { return x.id === id; })[0];

  if (!p) {
    root.innerHTML = '<div class="prose"><h1>Producto no encontrado</h1>' +
      '<p>El producto que buscas no está disponible o cambió de código. ' +
      'Vuelve al <a href="productos.html">catálogo</a> o escríbenos por WhatsApp.</p></div>';
    return;
  }

  document.title = p.nombre + ' — Industrias Céspedes';
  var av = R.AVAIL[p.disponibilidad] || R.AVAIL.pedido;
  var waMsg = p.nombre.split('–')[0].trim() + ' – ' + p.id + '. Mis medidas aproximadas son: ___';
  var wa = window.waLink(waMsg);

  var specRows = Object.keys(p.specs || {}).map(function (k) {
    var labels = { acero: 'Tipo de acero', calibre: 'Calibre / espesor', medidas: 'Medidas',
      niveles: 'Niveles', capacidad: 'Capacidad', acabado: 'Acabado' };
    return '<tr><th>' + (labels[k] || k) + '</th><td>' + R.esc(p.specs[k]) + '</td></tr>';
  }).join('');

  var precio = p.precio == null
    ? '<span class="price" style="font-size:1.3rem">Cotizar precio</span>'
    : '<span class="price" style="font-size:1.3rem">S/ ' + Number(p.precio).toLocaleString('es-PE') + '</span> <span class="form-note">precio referencial</span>';

  var dias = p.dias ? '<span class="days">Fabricación aprox. ' + p.dias + ' días hábiles</span>' : '<span class="days">Disponible para entrega inmediata</span>';

  var waIcon = window.ICONS ? window.ICONS.wa : '';
  var vendible = p.precio != null;

  var acciones = vendible
    ? '<div class="qty-row"><span class="qty-label">Cantidad</span>' +
        '<div class="qty"><button type="button" data-q="-" aria-label="Quitar uno">&minus;</button>' +
        '<input id="f-qty" type="number" min="1" value="1" inputmode="numeric" aria-label="Cantidad">' +
        '<button type="button" data-q="+" aria-label="Agregar uno">+</button></div></div>' +
      '<div class="btn-row">' +
        '<button class="btn btn--add btn--lg" id="add-cart" type="button">Agregar al carrito</button>' +
        '<button class="btn btn--ghost btn--lg" id="buy-now" type="button">Comprar ahora</button>' +
      '</div>' +
      '<div class="btn-row" style="margin-top:.6rem">' +
        '<a class="btn btn--wa" href="' + wa + '" target="_blank" rel="noopener">' + waIcon + 'Consultar por WhatsApp</a>' +
      '</div>'
    : '<div class="btn-row">' +
        '<a class="btn btn--wa btn--lg" href="' + wa + '" target="_blank" rel="noopener">' + waIcon + 'Cotizar por WhatsApp</a>' +
        '<a class="btn btn--ghost" href="contacto.html">Formulario de cotización</a>' +
      '</div>';

  root.innerHTML =
    '<div class="ficha">' +
      '<div class="gallery">' +
        '<div class="main"><img id="ficha-main" src="' + R.esc(p.img) + '" alt="' + R.esc(p.nombre) + '"></div>' +
        '<div class="thumbs">' +
          '<button aria-current="true"><img src="' + R.esc(p.img) + '" alt="Vista principal"></button>' +
          ((p.imgs && p.imgs[1] && p.imgs[1] !== p.img)
            ? '<button aria-current="false"><img src="' + R.esc(p.imgs[1]) + '" alt="Otra vista de ' + R.esc(p.nombre) + '"></button>'
            : '') +
        '</div>' +
      '</div>' +
      '<div class="details">' +
        '<div class="code-line">CÓDIGO ' + R.esc(p.id) + '</div>' +
        '<h1>' + R.esc(p.nombre) + '</h1>' +
        '<p class="desc">' + R.esc(p.descripcion) + '</p>' +
        '<table class="spec-table"><tbody>' + specRows + '</tbody></table>' +
        '<div style="margin-bottom:1rem">' + precio + '</div>' +
        '<div class="avail"><span class="badge ' + av.cls + '">' + av.txt + '</span>' + dias + '</div>' +
        acciones +
        '<div class="a-medida-note"><b>¿Necesitas otra medida?</b> La fabricamos. Indícanos tus dimensiones y te cotizamos a tu espacio. <a href="a-medida.html">Solicitar a medida &rarr;</a></div>' +
        '<div class="share">Compartir:' +
          '<a href="https://wa.me/?text=' + encodeURIComponent(p.nombre + ' ' + location.href) + '" target="_blank" rel="noopener" aria-label="Compartir por WhatsApp">' + waIcon + '</a>' +
          '<a href="https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(location.href) + '" target="_blank" rel="noopener" aria-label="Compartir en Facebook"><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M13 22v-8h2.7l.4-3H13V9.1c0-.9.3-1.5 1.6-1.5H16V5c-.3 0-1.2-.1-2.2-.1-2.2 0-3.8 1.4-3.8 3.9V11H7.5v3H10v8h3z"/></svg></a>' +
        '</div>' +
      '</div>' +
    '</div>';

  // Cambiar imagen principal desde miniaturas
  var thumbs = root.querySelectorAll('.thumbs button');
  var main = document.getElementById('ficha-main');
  thumbs.forEach(function (b) {
    b.addEventListener('click', function () {
      main.src = b.querySelector('img').src;
      thumbs.forEach(function (x) { x.setAttribute('aria-current', 'false'); });
      b.setAttribute('aria-current', 'true');
    });
  });

  // Carrito: selector de cantidad y botones (solo productos vendibles)
  if (vendible) {
    var qtyInput = document.getElementById('f-qty');
    root.querySelectorAll('[data-q]').forEach(function (b) {
      b.addEventListener('click', function () {
        var v = Math.max(1, (parseInt(qtyInput.value, 10) || 1) + (b.getAttribute('data-q') === '+' ? 1 : -1));
        qtyInput.value = v;
      });
    });
    var addBtn = document.getElementById('add-cart');
    addBtn.addEventListener('click', function () {
      var q = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      window.CART.add(p.id, q);
      var prev = addBtn.getAttribute('data-label') || addBtn.textContent;
      addBtn.setAttribute('data-label', prev);
      addBtn.textContent = 'Agregado ✓';
      addBtn.classList.add('is-added');
      clearTimeout(addBtn._t);
      addBtn._t = setTimeout(function () {
        addBtn.textContent = addBtn.getAttribute('data-label');
        addBtn.classList.remove('is-added');
      }, 1400);
    });
    document.getElementById('buy-now').addEventListener('click', function () {
      var q = Math.max(1, parseInt(qtyInput.value, 10) || 1);
      window.CART.add(p.id, q);
      location.href = 'carrito.html';
    });
  }

  // Relacionados (misma categoría)
  var rel = window.PRODUCTS.filter(function (x) { return x.categoria === p.categoria && x.id !== p.id; }).slice(0, 4);
  if (!rel.length) rel = window.PRODUCTS.filter(function (x) { return x.id !== p.id; }).slice(0, 4);
  var relEl = document.getElementById('relacionados');
  if (relEl && rel.length) relEl.innerHTML = rel.map(R.productCard).join('');

  // Breadcrumb
  var bc = document.getElementById('ficha-crumb');
  if (bc) {
    var c = window.CATEGORIES.filter(function (x) { return x.slug === p.categoria; })[0];
    bc.innerHTML = '<a href="index.html">Inicio</a> / <a href="productos.html">Productos</a> / ' +
      '<a href="productos.html?cat=' + p.categoria + '">' + (c ? R.esc(c.nombre) : 'Catálogo') + '</a>';
  }

  // Datos estructurados schema.org (SEO) ------------------------------------
  var availMap = {
    stock: 'https://schema.org/InStock',
    pedido: 'https://schema.org/PreOrder',
    personalizado: 'https://schema.org/MadeToOrder'
  };
  var ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.nombre,
    sku: p.id,
    description: p.descripcion,
    material: (p.specs && p.specs.acero) || 'Acero inoxidable',
    brand: { '@type': 'Brand', name: (window.SITE && window.SITE.marca) || 'Industrias Céspedes' }
  };
  if (p.precio != null) {
    ld.offers = {
      '@type': 'Offer', priceCurrency: 'PEN', price: String(p.precio),
      availability: availMap[p.disponibilidad] || availMap.pedido
    };
  }
  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);
})();
