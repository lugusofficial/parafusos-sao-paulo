// Transições suaves ao rolar. Só com JS e só sem prefers-reduced-motion; sem isso tudo fica visível.
(function () {
  if (!('IntersectionObserver' in window)) { return; }
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { return; }
  document.documentElement.classList.add('js');
  var selectors = ['.hero__inner > *', '.services__head', '.services__columns > li', '.proof__head', '.proof__list > li', '.location__row > div', '.location__media', '.contact__inner > *'];
  var items = [];
  selectors.forEach(function (sel) {
    var nodes = document.querySelectorAll(sel);
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].classList.add('reveal');
      nodes[i].style.transitionDelay = Math.min(i, 5) * 80 + 'ms';
      items.push(nodes[i]);
    }
  });
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) { return; }
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  items.forEach(function (el) { observer.observe(el); });
})();
