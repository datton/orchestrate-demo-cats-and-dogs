/* Navigation behaviour: owned by UI/UX */
(function () {
  var nav = document.querySelector('.site-header nav');
  if (!nav) return;
  document.documentElement.classList.add('js');

  // Mark the current page.
  var here = location.pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
  nav.querySelectorAll('a').forEach(function (a) {
    var p = new URL(a.href, location.href).pathname.replace(/\/index\.html$/, '/').replace(/\/$/, '');
    if (p === here) a.setAttribute('aria-current', 'page');
  });

  // Menu button for small screens.
  var list = nav.querySelector('ul');
  list.id = list.id || 'site-menu';
  var btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-controls', list.id);
  btn.setAttribute('aria-expanded', 'false');
  btn.innerHTML = '<span class="bars" aria-hidden="true"></span><span>Menu</span>';
  nav.parentNode.insertBefore(btn, nav);
  nav.setAttribute('data-collapsed', 'true');

  function set(open) {
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    nav.setAttribute('data-collapsed', open ? 'false' : 'true');
  }
  btn.addEventListener('click', function () { set(btn.getAttribute('aria-expanded') !== 'true'); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') { set(false); btn.focus(); }
  });
})();
