/* CATALOG.JS — Grid de catálogo con filtro por categoría y por rubro.
   Lee ?cat= y ?rubro= de la URL y actualiza sin recargar. */
(function () {
  var R = window.RENDER;
  var params = new URLSearchParams(location.search);
  var state = {
    cat: params.get('cat') || 'todas',
    rubro: params.get('rubro') || 'todos'
  };

  var elGrid = document.getElementById('catalog-grid');
  var elResult = document.getElementById('catalog-result');
  var elCats = document.getElementById('filter-cats');
  var elRubros = document.getElementById('filter-rubros');
  if (!elGrid) return;

  function countCat(slug) {
    return window.PRODUCTS.filter(function (p) {
      return (slug === 'todas' || p.categoria === slug) &&
             (state.rubro === 'todos' || (p.rubros || []).indexOf(state.rubro) > -1);
    }).length;
  }
  function countRubro(slug) {
    return window.PRODUCTS.filter(function (p) {
      return (state.cat === 'todas' || p.categoria === state.cat) &&
             (slug === 'todos' || (p.rubros || []).indexOf(slug) > -1);
    }).length;
  }

  function buildFilters() {
    var catItems = [{ slug: 'todas', nombre: 'Todas las categorías' }].concat(window.CATEGORIES);
    elCats.innerHTML = catItems.map(function (c) {
      var on = state.cat === c.slug;
      return '<li><button type="button" data-cat="' + c.slug + '" aria-pressed="' + on + '">' +
        lbl(c.nombre) + '<span class="count">' + countCat(c.slug) + '</span></button></li>';
    }).join('');

    var rubroItems = [{ slug: 'todos', nombre: 'Todos los rubros' }].concat(window.RUBROS);
    elRubros.innerHTML = rubroItems.map(function (r) {
      var on = state.rubro === r.slug;
      return '<li><button type="button" data-rubro="' + r.slug + '" aria-pressed="' + on + '">' +
        lbl(r.nombre) + '<span class="count">' + countRubro(r.slug) + '</span></button></li>';
    }).join('');
  }
  function lbl(s) { return '<span>' + R.esc(s) + '</span>'; }

  function currentList() {
    return window.PRODUCTS.filter(function (p) {
      return (state.cat === 'todas' || p.categoria === state.cat) &&
             (state.rubro === 'todos' || (p.rubros || []).indexOf(state.rubro) > -1);
    });
  }

  function catName(slug) {
    var c = window.CATEGORIES.filter(function (x) { return x.slug === slug; })[0];
    return c ? c.nombre : 'Todas las categorías';
  }

  function render() {
    var list = currentList();
    elResult.textContent = list.length + (list.length === 1 ? ' producto' : ' productos') +
      (state.cat !== 'todas' ? ' · ' + catName(state.cat) : '');
    elGrid.innerHTML = list.length
      ? list.map(R.productCard).join('')
      : '<p class="form-note">No hay productos con estos filtros. <a href="a-medida.html">Solicítalo a medida</a> o <a href="productos.html">quita los filtros</a>.</p>';
    buildFilters();
    // Sincroniza URL
    var q = new URLSearchParams();
    if (state.cat !== 'todas') q.set('cat', state.cat);
    if (state.rubro !== 'todos') q.set('rubro', state.rubro);
    var qs = q.toString();
    history.replaceState(null, '', qs ? '?' + qs : location.pathname);
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-cat],[data-rubro]');
    if (!b) return;
    if (b.hasAttribute('data-cat')) state.cat = b.getAttribute('data-cat');
    if (b.hasAttribute('data-rubro')) state.rubro = b.getAttribute('data-rubro');
    render();
  });

  // Toggle de filtros en móvil
  var ftoggle = document.getElementById('filters-toggle');
  var fpanel = document.getElementById('filters-panel');
  if (ftoggle && fpanel) {
    ftoggle.addEventListener('click', function () {
      var open = fpanel.classList.toggle('open');
      ftoggle.setAttribute('aria-expanded', String(open));
    });
  }

  render();
})();
