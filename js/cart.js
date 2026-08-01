/* ============================================================================
   CART.JS — Carrito de compras (Fase 3). Estado en localStorage.
   Solo productos con precio (precio != null) son "vendibles"; los cotizables
   se atienden por WhatsApp. Emite el evento 'cart:change' al modificarse.
   Depende de products.js (PRODUCTS) y config.js (SITE.tienda).
   ============================================================================ */
(function () {
  var KEY = 'ic_cart_v1';

  function read() {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; }
    catch (e) { return {}; }
  }
  function write(obj) {
    localStorage.setItem(KEY, JSON.stringify(obj));
    document.dispatchEvent(new CustomEvent('cart:change'));
  }
  function product(id) {
    return (window.PRODUCTS || []).filter(function (p) { return p.id === id; })[0];
  }
  function vendible(p) { return p && p.precio != null; }

  var Cart = {
    raw: read,
    // { id, qty, producto } combinando con el catálogo
    items: function () {
      var data = read(), out = [];
      Object.keys(data).forEach(function (id) {
        var p = product(id);
        if (p) out.push({ id: id, qty: data[id], producto: p });
      });
      return out;
    },
    count: function () {
      var data = read(), n = 0;
      Object.keys(data).forEach(function (id) { n += data[id]; });
      return n;
    },
    add: function (id, qty) {
      var p = product(id);
      if (!vendible(p)) return false;
      var data = read();
      data[id] = (data[id] || 0) + (qty || 1);
      if (data[id] < 1) delete data[id];
      write(data);
      return true;
    },
    setQty: function (id, qty) {
      var data = read();
      qty = Math.max(0, parseInt(qty, 10) || 0);
      if (qty === 0) delete data[id]; else data[id] = qty;
      write(data);
    },
    remove: function (id) { var d = read(); delete d[id]; write(d); },
    clear: function () { write({}); },
    subtotal: function () {
      return this.items().reduce(function (s, it) { return s + it.producto.precio * it.qty; }, 0);
    },
    // Desglose de IGV asumiendo precios con IGV incluido
    desglose: function () {
      var t = (window.SITE && window.SITE.tienda) || {};
      var total = this.subtotal();
      var igv = t.igvIncluido ? total - total / (1 + (t.igv || 0.18)) : total * (t.igv || 0.18);
      return {
        total: total,
        igv: igv,
        base: total - igv,
        adelanto: total * (t.adelanto || 0.5)
      };
    },
    esVendible: function (id) { return vendible(product(id)); }
  };

  function money(n) {
    var m = (window.SITE && window.SITE.tienda && window.SITE.tienda.moneda) || 'S/';
    return m + ' ' + Number(n).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Actualiza cualquier badge [data-cart-count] en la página
  function refreshBadges() {
    var n = Cart.count();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }
  document.addEventListener('cart:change', refreshBadges);
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', refreshBadges);
  } else { refreshBadges(); }

  // Delegación: botones "Agregar al carrito" en cualquier página con cart.js
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (!b) return;
    e.preventDefault();
    var qty = b.getAttribute('data-qty') ? parseInt(b.getAttribute('data-qty'), 10) : 1;
    if (Cart.add(b.getAttribute('data-add'), qty)) {
      var prev = b.getAttribute('data-label') || b.textContent;
      if (!b.getAttribute('data-label')) b.setAttribute('data-label', prev);
      b.textContent = 'Agregado ✓';
      b.classList.add('is-added');
      clearTimeout(b._t);
      b._t = setTimeout(function () {
        b.textContent = b.getAttribute('data-label');
        b.classList.remove('is-added');
      }, 1400);
    }
  });

  window.CART = Cart;
  window.money = money;
})();
