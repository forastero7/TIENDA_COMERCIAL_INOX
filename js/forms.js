/* FORMS.JS — Sin backend: los formularios arman un mensaje y abren WhatsApp
   (cotización / a medida) o el correo de la empresa (Libro de Reclamaciones).
   Para producción puedes conectar estos formularios a un servicio de correo
   (Formspree, Getform) o a WhatsApp Business API. */
(function () {
  var S = window.SITE || {};

  function val(form, name) {
    var el = form.elements[name];
    return el ? el.value.trim() : '';
  }

  // --- Formulario de cotización / a medida -> WhatsApp ---------------------
  function toWhatsApp(form) {
    var lineas = [];
    var campos = form.querySelectorAll('[data-label]');
    campos.forEach(function (el) {
      var v = el.value.trim();
      if (v) lineas.push(el.getAttribute('data-label') + ': ' + v);
    });
    var num = (S.whatsapp || '').replace(/[^0-9]/g, '');
    var texto = 'Hola, quisiera una cotización.\n' + lineas.join('\n');
    window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
  }

  // --- Libro de Reclamaciones -> correo -----------------------------------
  function toEmail(form) {
    var lineas = [];
    form.querySelectorAll('[data-label]').forEach(function (el) {
      var v = el.value ? el.value.trim() : '';
      if (el.type === 'radio') { if (el.checked) lineas.push(el.getAttribute('data-label') + ': ' + el.value); }
      else if (v) lineas.push(el.getAttribute('data-label') + ': ' + v);
    });
    var correo = S.correoVentas || '';
    var asunto = 'Libro de Reclamaciones — nuevo registro';
    location.href = 'mailto:' + correo + '?subject=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(lineas.join('\n'));
  }

  document.querySelectorAll('form[data-action="whatsapp"]').forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); toWhatsApp(form); });
  });
  document.querySelectorAll('form[data-action="email"]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      toEmail(form);
      var ok = form.querySelector('.form-ok');
      if (ok) ok.hidden = false;
    });
  });
})();
