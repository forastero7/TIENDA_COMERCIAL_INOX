/* CHECKOUT.JS — Finalizar pedido (checkout.html).
   Sin backend: reúne datos + método de pago y confirma el pedido por WhatsApp,
   mostrando las instrucciones de pago. Las pasarelas con tarjeta se activan en
   config (SITE.tienda.pasarelas) cuando se integre un proveedor con backend. */
(function () {
  var root = document.getElementById('checkout-root');
  if (!root) return;
  var R = window.RENDER, C = window.CART, money = window.money;
  var S = window.SITE, pagos = S.pagos || {}, cuenta = pagos.cuenta || {};

  if (!C.items().length) {
    root.innerHTML = '<div class="cart-empty">' +
      '<h2 style="font-size:1.4rem">No hay productos en tu pedido</h2>' +
      '<p class="form-note">Agrega productos al carrito antes de finalizar.</p>' +
      '<div class="btn-row" style="justify-content:center;margin-top:1rem"><a class="btn" href="productos.html">Ver catálogo</a></div></div>';
    return;
  }

  function orderLines() {
    return C.items().map(function (it) {
      return '• ' + it.qty + ' × ' + it.producto.nombre + ' (' + it.producto.id + ') — ' + money(it.producto.precio * it.qty);
    }).join('\n');
  }

  function summaryHtml() {
    var d = C.desglose();
    var rows = C.items().map(function (it) {
      return '<div class="summary-row"><span class="muted">' + it.qty + ' × ' + R.esc(it.producto.id) + '</span><span>' + money(it.producto.precio * it.qty) + '</span></div>';
    }).join('');
    return '<aside class="summary">' +
      '<h2>Tu pedido</h2>' + rows +
      '<div class="summary-row" style="border-top:var(--borde);margin-top:.4rem;padding-top:.7rem"><span class="muted">IGV (18%) incl.</span><span>' + money(d.igv) + '</span></div>' +
      '<div class="summary-row total"><span>Total</span><span>' + money(d.total) + '</span></div>' +
      '<p class="summary-note">Flete a provincias e instalación se cotizan aparte. Adelanto sugerido para iniciar: ' + money(d.adelanto) + '.</p>' +
      '<a class="btn btn--ghost btn--block" href="carrito.html">Volver al carrito</a>' +
    '</aside>';
  }

  var metodos = [
    { id: 'yape', title: 'Yape', desc: 'Pago inmediato al número de la empresa.' },
    { id: 'plin', title: 'Plin', desc: 'Pago inmediato al número de la empresa.' },
    { id: 'transferencia', title: 'Transferencia bancaria', desc: 'BCP, Interbank, BBVA o Scotiabank.' },
    { id: 'contraentrega', title: 'Efectivo contra entrega', desc: 'Según cobertura y acuerdo previo.' }
  ];
  var pasarelas = (S.tienda && S.tienda.pasarelas) || {};
  var tarjeta = { id: 'tarjeta', title: 'Tarjeta (Culqi / Niubiz / Izipay / Mercado Pago)', desc: 'Pago en línea con tarjeta y cuotas.',
    disabled: !(pasarelas.culqi || pasarelas.niubiz || pasarelas.izipay || pasarelas.mercadopago) };

  function payOptionHtml(m) {
    var dis = m.disabled ? ' disabled' : '';
    return '<label class="pay-option' + dis + '">' +
      '<input type="radio" name="pago" value="' + m.id + '"' + (m.disabled ? ' disabled' : '') + '>' +
      '<span><span class="po-title">' + R.esc(m.title) + '</span><br><span class="po-desc">' + R.esc(m.desc) + '</span></span>' +
    '</label>';
  }

  function formHtml() {
    return '<div class="cart-layout"><form id="checkout-form" novalidate><div class="form-card">' +
      '<p class="eyebrow">Tus datos</p>' +
      '<div class="field-row">' +
        '<div class="field"><label>Nombre <span class="req">*</span></label><input name="nombre" required></div>' +
        '<div class="field"><label>Celular <span class="req">*</span></label><input name="celular" inputmode="tel" required></div>' +
      '</div>' +
      '<div class="field"><label>Correo electrónico</label><input name="correo" type="email"></div>' +

      '<p class="eyebrow" style="margin-top:1.4rem">Comprobante</p>' +
      '<div class="field"><label>Tipo</label>' +
        '<select name="comprobante" id="comprobante"><option value="Boleta">Boleta</option><option value="Factura">Factura (empresa)</option></select></div>' +
      '<div id="factura-fields" hidden>' +
        '<div class="field-row">' +
          '<div class="field"><label>RUC</label><input name="ruc" inputmode="numeric"></div>' +
          '<div class="field"><label>Razón social</label><input name="razon"></div>' +
        '</div>' +
      '</div>' +

      '<p class="eyebrow" style="margin-top:1.4rem">Entrega</p>' +
      '<div class="field"><label>Modalidad <span class="req">*</span></label>' +
        '<select name="entrega" required><option value="Lima Metropolitana y Callao">Entrega en Lima Metropolitana y Callao</option>' +
        '<option value="Provincia (agencia de carga)">Provincia (agencia de carga)</option>' +
        '<option value="Recojo en taller">Recojo en taller</option></select></div>' +
      '<div class="field-row">' +
        '<div class="field"><label>Distrito o ciudad</label><input name="distrito"></div>' +
        '<div class="field"><label>Dirección (si aplica)</label><input name="direccion"></div>' +
      '</div>' +
      '<p class="form-note">El costo de envío se coordina y confirma al procesar tu pedido. Ver <a href="envios.html">Envíos y entregas</a>.</p>' +

      '<p class="eyebrow" style="margin-top:1.4rem">Medio de pago <span class="req" style="color:#b3271e">*</span></p>' +
      '<div class="pay-options">' + metodos.map(payOptionHtml).join('') + payOptionHtml(tarjeta) + '</div>' +
      '<div id="pay-detail"></div>' +

      '<div class="field" style="margin-top:1.4rem"><label>Notas del pedido</label><textarea name="notas" placeholder="Medidas especiales, referencias de entrega, etc."></textarea></div>' +

      '<p class="form-note">Al confirmar se abrirá WhatsApp con el detalle de tu pedido para coordinar el pago y la entrega. Aceptas la <a href="privacidad.html">política de privacidad</a> y los <a href="terminos.html">términos</a>.</p>' +
      '<div class="btn-row" style="margin-top:1rem"><button class="btn btn--wa btn--lg" type="submit" id="confirm-btn">Confirmar pedido por WhatsApp</button></div>' +
    '</div></form>' + summaryHtml() + '</div>';
  }

  function payDetailHtml(metodo) {
    if (metodo === 'yape') return '<div class="pay-detail">Yapea al <span class="mono"><b>' + R.esc(pagos.yape || '—') + '</b></span> (' + R.esc(cuenta.titular || S.razonSocial) + ') y envíanos la captura por WhatsApp.</div>';
    if (metodo === 'plin') return '<div class="pay-detail">Plinea al <span class="mono"><b>' + R.esc(pagos.plin || '—') + '</b></span> (' + R.esc(cuenta.titular || S.razonSocial) + ') y envíanos la captura por WhatsApp.</div>';
    if (metodo === 'transferencia') return '<div class="pay-detail">Transfiere a:<br><span class="mono">' + R.esc(cuenta.banco || 'BCP') + ' · Cuenta ' + R.esc(cuenta.numero || '—') + '<br>CCI ' + R.esc(cuenta.cci || '—') + '<br>' + R.esc(cuenta.titular || S.razonSocial) + '</span><br>Envíanos el voucher por WhatsApp.</div>';
    if (metodo === 'contraentrega') return '<div class="pay-detail">Pago en efectivo al momento de la entrega, según cobertura y acuerdo previo.</div>';
    return '';
  }

  function successHtml(metodo, waUrl) {
    return '<div class="form-card" style="max-width:680px;margin-inline:auto;text-align:center">' +
      '<div class="steps" style="justify-content:center"><span>1. Carrito</span><span>›</span><span>2. Datos y pago</span><span>›</span><b>3. Confirmación</b></div>' +
      '<h2 style="font-size:1.5rem">¡Pedido listo para confirmar!</h2>' +
      '<p>Se abrió WhatsApp con el detalle de tu pedido. Si no se abrió, usa el botón de abajo.</p>' +
      payDetailHtml(metodo) +
      '<div class="btn-row" style="justify-content:center;margin-top:1.2rem">' +
        '<a class="btn btn--wa btn--lg" href="' + waUrl + '" target="_blank" rel="noopener">Abrir WhatsApp</a>' +
        '<a class="btn btn--ghost" href="productos.html">Seguir comprando</a>' +
      '</div>' +
      '<p class="form-note" style="margin-top:1rem">Guardamos tu carrito hasta que confirmes por WhatsApp.</p>' +
    '</div>';
  }

  function bind() {
    var form = document.getElementById('checkout-form');
    // Mostrar campos de factura
    var comp = form.querySelector('#comprobante');
    comp.addEventListener('change', function () {
      form.querySelector('#factura-fields').hidden = comp.value !== 'Factura';
    });
    // Detalle del medio de pago + estado seleccionado
    var detail = form.querySelector('#pay-detail');
    form.querySelectorAll('input[name="pago"]').forEach(function (r) {
      r.addEventListener('change', function () {
        form.querySelectorAll('.pay-option').forEach(function (o) { o.classList.remove('selected'); });
        r.closest('.pay-option').classList.add('selected');
        detail.innerHTML = payDetailHtml(r.value);
      });
    });
    // Envío
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var f = form.elements;
      if (!f.nombre.value.trim() || !f.celular.value.trim()) { f.nombre.reportValidity(); f.celular.reportValidity(); return; }
      var pago = form.querySelector('input[name="pago"]:checked');
      if (!pago) { alert('Elige un medio de pago.'); return; }

      var d = C.desglose();
      var partes = [
        'Hola, quiero confirmar mi pedido:',
        '',
        orderLines(),
        '',
        'Total: ' + money(d.total) + ' (IGV incluido)',
        'Comprobante: ' + f.comprobante.value + (f.comprobante.value === 'Factura' ? ' — RUC ' + f.ruc.value + ' / ' + f.razon.value : ''),
        'Entrega: ' + f.entrega.value + (f.distrito.value ? ' — ' + f.distrito.value : '') + (f.direccion.value ? ', ' + f.direccion.value : ''),
        'Pago: ' + pago.value,
        'Cliente: ' + f.nombre.value + ' — ' + f.celular.value + (f.correo.value ? ' — ' + f.correo.value : '')
      ];
      if (f.notas.value.trim()) partes.push('Notas: ' + f.notas.value.trim());

      var num = (S.whatsapp || '').replace(/[^0-9]/g, '');
      var waUrl = 'https://wa.me/' + num + '?text=' + encodeURIComponent(partes.join('\n'));
      window.open(waUrl, '_blank', 'noopener');
      root.innerHTML = successHtml(pago.value, waUrl);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  root.innerHTML = formHtml();
  bind();
})();
