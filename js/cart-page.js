/* CART-PAGE.JS — Render de la página de carrito (carrito.html). */
(function () {
  var root = document.getElementById('cart-root');
  if (!root) return;
  var R = window.RENDER, C = window.CART, money = window.money;

  function emptyHtml() {
    return '<div class="cart-empty">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 5h2l1.5 11h10L20 8H7"/><circle cx="9" cy="20" r="1.5"/><circle cx="17" cy="20" r="1.5"/></svg>' +
      '<h2 style="font-size:1.4rem">Tu carrito está vacío</h2>' +
      '<p class="form-note">Agrega productos estándar desde el catálogo o cotiza un trabajo a medida.</p>' +
      '<div class="btn-row" style="justify-content:center;margin-top:1rem">' +
        '<a class="btn" href="productos.html">Ver catálogo</a>' +
        '<a class="btn btn--ghost" href="a-medida.html">Cotizar a medida</a>' +
      '</div></div>';
  }

  function itemHtml(it) {
    var p = it.producto;
    return '<div class="cart-item" data-id="' + R.esc(p.id) + '">' +
      '<a class="ci-thumb" href="producto.html?id=' + encodeURIComponent(p.id) + '"><img src="' + R.esc(p.img) + '" alt="' + R.esc(p.nombre) + '"></a>' +
      '<div>' +
        '<div class="ci-name"><a href="producto.html?id=' + encodeURIComponent(p.id) + '">' + R.esc(p.nombre) + '</a></div>' +
        '<div class="ci-code">' + R.esc(p.id) + '</div>' +
        '<div class="ci-controls">' +
          '<div class="qty"><button type="button" data-step="-" aria-label="Quitar uno">&minus;</button>' +
          '<input type="number" min="1" value="' + it.qty + '" data-qty-input aria-label="Cantidad"><button type="button" data-step="+" aria-label="Agregar uno">+</button></div>' +
          '<button type="button" class="ci-remove" data-remove>Quitar</button>' +
        '</div>' +
      '</div>' +
      '<div class="ci-price">' + money(p.precio * it.qty) + '<span class="ci-unit">' + money(p.precio) + ' c/u</span></div>' +
    '</div>';
  }

  function summaryHtml() {
    var d = C.desglose();
    return '<aside class="summary">' +
      '<h2>Resumen</h2>' +
      '<div class="summary-row"><span class="muted">Valor de venta</span><span>' + money(d.base) + '</span></div>' +
      '<div class="summary-row"><span class="muted">IGV (18%)</span><span>' + money(d.igv) + '</span></div>' +
      '<div class="summary-row total"><span>Total</span><span>' + money(d.total) + '</span></div>' +
      '<p class="summary-note">Precios con IGV incluido. El flete a provincias y la instalación (si aplica) se cotizan aparte. Para fabricación bajo pedido se inicia con un adelanto sugerido de ' + money(d.adelanto) + '.</p>' +
      '<a class="btn btn--lg btn--block" href="checkout.html">Continuar con el pedido</a>' +
      '<a class="btn btn--ghost btn--block" href="productos.html" style="margin-top:.6rem">Seguir viendo productos</a>' +
    '</aside>';
  }

  function render() {
    var items = C.items();
    if (!items.length) { root.innerHTML = emptyHtml(); return; }
    root.innerHTML = '<div class="cart-layout">' +
      '<div><div class="cart-items">' + items.map(itemHtml).join('') + '</div>' +
      '<div class="btn-row" style="margin-top:1rem"><button class="btn btn--ghost" id="cart-clear" type="button">Vaciar carrito</button></div></div>' +
      summaryHtml() +
    '</div>';
  }

  root.addEventListener('click', function (e) {
    var row = e.target.closest('.cart-item');
    if (e.target.id === 'cart-clear') { C.clear(); return; }
    if (!row) return;
    var id = row.getAttribute('data-id');
    var input = row.querySelector('[data-qty-input]');
    if (e.target.closest('[data-step]')) {
      var dir = e.target.closest('[data-step]').getAttribute('data-step');
      C.setQty(id, (parseInt(input.value, 10) || 1) + (dir === '+' ? 1 : -1));
    } else if (e.target.closest('[data-remove]')) {
      C.remove(id);
    }
  });
  root.addEventListener('change', function (e) {
    if (e.target.matches('[data-qty-input]')) {
      var row = e.target.closest('.cart-item');
      C.setQty(row.getAttribute('data-id'), e.target.value);
    }
  });

  document.addEventListener('cart:change', render);
  render();
})();
