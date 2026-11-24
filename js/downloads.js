/* Downloads page: folder-based collapsible sections (config: data/downloads.config.json) */
(function () {
  'use strict';
  function start() {
    var M = window.MM, B = window.MM_BROWSE, host = M && M.$('#dlSections');
    if (!M || !B || !host) return;
    var cfg = null, lists = {};
    function draw() {
      var shut = M.$$('.c-sec.shut', host).map(function (s) { return s.id; });
      var parts = cfg.sections.map(function (c) { return B.folderSection(c, lists[c.id] || []); });
      host.innerHTML = parts.map(function (p) { return p.html; }).join('');
      parts.forEach(function (p) { p.fill(host); });
      shut.forEach(function (id) { var s = document.getElementById(id); if (s) { s.classList.add('shut'); M.$('.c-head', s).setAttribute('aria-expanded', 'false'); } });
    }
    function openHash() {
      var el = location.hash && document.getElementById(location.hash.slice(1));
      if (el && el.classList.contains('c-sec')) { el.classList.remove('shut'); M.$('.c-head', el).setAttribute('aria-expanded', 'true'); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
    M.toggleAll(host, 'beforebegin', function () { return host; });
    host.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div>';
    fetch(M.ROOT + 'data/downloads.config.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function () { return { sections: [] }; }).then(function (c) {
      cfg = c;
      return Promise.all(c.sections.map(function (s) { return B.listDir(s).then(function (items) { lists[s.id] = items; }); }));
    }).then(function () { draw(); openHash(); });
    document.addEventListener('mm:lang', function () { if (cfg) draw(); });
    window.addEventListener('hashchange', openHash);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
