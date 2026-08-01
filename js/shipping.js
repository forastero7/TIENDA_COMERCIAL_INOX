/* ============================================================================
   SHIPPING.JS — Cálculo de envío por zona (Fase 3).
   Tarifas de EJEMPLO desde SITE.envio (config.js). El envío en Lima es un
   estimado; se confirma al procesar el pedido. Provincia = flete en destino.
   ============================================================================ */
(function () {
  var E = (window.SITE && window.SITE.envio) || {};

  function money(n) { return window.money ? window.money(n) : ('S/ ' + n.toFixed(2)); }

  function zona(id) {
    return (E.limaZonas || []).filter(function (z) { return z.id === id; })[0];
  }

  // ¿El carrito incluye un producto voluminoso? (según categorías configuradas)
  function carritoVoluminoso() {
    if (!window.CART) return false;
    var cats = E.categoriasVoluminosas || [];
    return window.CART.items().some(function (it) { return cats.indexOf(it.producto.categoria) > -1; });
  }

  /* estimate(modalidad, opts)
     modalidad: 'lima' | 'provincia' | 'recojo'
     opts: { zonaId, grande }  (grande fuerza el recargo por volumen)
     -> { costo, porCobrar, texto, nota } */
  function estimate(modalidad, opts) {
    opts = opts || {};
    if (modalidad === 'recojo') {
      return { costo: 0, porCobrar: false, texto: 'Gratis', nota: E.recojoNota || '' };
    }
    if (modalidad === 'provincia') {
      return { costo: 0, porCobrar: true, texto: 'Por cobrar en destino', nota: E.provinciaNota || '' };
    }
    if (modalidad === 'lima') {
      var z = zona(opts.zonaId);
      if (!z) return { costo: null, porCobrar: false, texto: 'Elige tu zona', nota: '' };
      var costo = z.costo + (opts.grande ? (E.recargoVoluminoso || 0) : 0);
      return {
        costo: costo, porCobrar: false, texto: money(costo) + ' (estimado)',
        nota: opts.grande ? 'Incluye recargo por producto voluminoso. Se confirma al procesar el pedido.'
                          : 'Estimado para ' + z.nombre + '. Se confirma al procesar el pedido.'
      };
    }
    return { costo: null, porCobrar: false, texto: '—', nota: '' };
  }

  // Estimador autónomo para la página de Envíos ----------------------------
  function mountEstimator(el) {
    if (!el) return;
    var zonasOpts = (E.limaZonas || []).map(function (z) {
      return '<option value="' + z.id + '">' + z.nombre + '</option>';
    }).join('');
    el.innerHTML =
      '<div class="field"><label>¿A dónde enviamos?</label>' +
        '<select id="est-mod"><option value="lima">Lima Metropolitana y Callao</option>' +
        '<option value="provincia">Provincia (agencia de carga)</option>' +
        '<option value="recojo">Recojo en taller</option></select></div>' +
      '<div class="field" id="est-zona-wrap"><label>Zona</label><select id="est-zona">' + zonasOpts + '</select></div>' +
      '<div class="field" id="est-size-wrap"><label>Tamaño del producto</label>' +
        '<select id="est-size"><option value="normal">Estándar (repisa, carrito, estante)</option>' +
        '<option value="grande">Voluminoso (mesa, lavadero, campana, cocina, exhibidora)</option></select></div>' +
      '<div class="pay-detail" id="est-result" style="margin-top:.4rem"></div>';

    var mod = el.querySelector('#est-mod');
    var zonaWrap = el.querySelector('#est-zona-wrap');
    var zonaSel = el.querySelector('#est-zona');
    var sizeWrap = el.querySelector('#est-size-wrap');
    var sizeSel = el.querySelector('#est-size');
    var result = el.querySelector('#est-result');

    function update() {
      var m = mod.value;
      zonaWrap.hidden = m !== 'lima';
      sizeWrap.hidden = m !== 'lima';
      var r = estimate(m, { zonaId: zonaSel.value, grande: sizeSel.value === 'grande' });
      var costoTxt = r.porCobrar ? 'Por cobrar en destino' : (r.costo === 0 ? 'Gratis' : (r.costo == null ? '—' : money(r.costo) + ' (estimado)'));
      result.innerHTML = '<b>Envío:</b> ' + costoTxt + (r.nota ? '<br><span class="form-note">' + r.nota + '</span>' : '');
    }
    [mod, zonaSel, sizeSel].forEach(function (c) { c.addEventListener('change', update); });
    update();
  }

  window.SHIPPING = { estimate: estimate, zonasLima: function () { return E.limaZonas || []; }, carritoVoluminoso: carritoVoluminoso, mountEstimator: mountEstimator };
})();
