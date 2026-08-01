/* HOME.JS — Rellena categorías, rubros y productos destacados en el inicio. */
(function () {
  function fill(id, html) { var el = document.getElementById(id); if (el) el.innerHTML = html; }

  var cats = document.getElementById('home-categorias');
  if (cats) fill('home-categorias', window.CATEGORIES.map(window.RENDER.categoryCard).join(''));

  var rubros = document.getElementById('home-rubros');
  if (rubros) fill('home-rubros', window.RUBROS.map(window.RENDER.rubroChip).join(''));

  var dest = document.getElementById('home-destacados');
  if (dest) {
    var items = window.PRODUCTS.filter(function (p) { return p.destacado; }).slice(0, 4);
    fill('home-destacados', items.map(window.RENDER.productCard).join(''));
  }
})();
