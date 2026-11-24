/* Mantra Mangalya - main app (vanilla JS, no dependencies) */
(function () {
  'use strict';
  var C = window.MM_CONFIG, I = window.MM_I18N;
  var PAGE = document.body.dataset.page || 'home';
  var ROOT = document.body.dataset.root || '';   // '' on home, '../' on sub-pages (clean folder routes)
  var NAV = [
    ['home', '', 'bi-house-heart'], ['about', 'about/', 'bi-book'],
    ['guidance', 'guidance/', 'bi-compass'],
    ['downloads', 'downloads/', 'bi-download'], ['community', 'community/', 'bi-people'],
    ['contact', 'contact/', 'bi-envelope']
  ];
  var TOPICS = ['General guidance', 'Wedding procedure', 'Wedding venue', 'Someone to conduct wedding', 'Marriage registration / Legal', 'Others'];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }

  function href(slug) { return (ROOT + slug) || './'; }

  var lang = 'kn';
  try { var saved = localStorage.getItem('mm_lang'); if (saved === 'en' || saved === 'kn') lang = saved; } catch (e) {}
  function t(k) { return (I[lang] && I[lang][k]) || I.kn[k] || k; }

  /* message for a failed backend call: not connected / offline / service down / server said no */
  function failMsg(e, key) {
    if (e && e.message === 'not-configured') return t('err.notconf');
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return t('err.offline');
    if (e && e.message === 'api') return t(key);
    return t('err.down');
  }
  function toast(msg) {
    var d = document.createElement('div'); d.className = 'mm-toast'; d.setAttribute('role', 'alert'); d.textContent = msg; document.body.appendChild(d);
    setTimeout(function () { d.classList.add('out'); setTimeout(function () { d.remove(); }, 400); }, 4500);
  }
  function apiReady() { return C.API_URL && C.API_URL.indexOf('PASTE_') !== 0; }

  /* ---------- Layout ---------- */
  function buildLayout() {
    var hdr = $('#app-header'), ftr = $('#app-footer');
    if (hdr) {
      hdr.outerHTML = '<header class="site-header" id="siteHeader"><div class="wrap bar">' +
        '<a class="brand" href="' + href('') + '" aria-label="Home"><img class="brand-logo" src="' + esc(ROOT + (C.LOGO || 'favicon.svg')) + '" alt="" width="40" height="40" onerror="this.onerror=null;this.src=\'' + ROOT + 'favicon.svg\'"><span data-i18n="site.name"></span></a>' +
        '<nav class="nav" id="nav" aria-label="Main">' + NAV.map(function (n) {
          return '<a href="' + href(n[1]) + '" class="' + (n[0] === PAGE ? 'active' : '') + '"' + (n[0] === PAGE ? ' aria-current="page"' : '') + '><i class="bi ' + n[2] + '"></i><span data-i18n="nav.' + n[0] + '"></span></a>';
        }).join('') + '</nav>' +
        '<div class="actions"><a class="soc-ic ig" href="' + esc(C.INSTAGRAM_URL) + '" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a class="soc-ic fb" href="' + esc(C.FACEBOOK_URL) + '" target="_blank" rel="noopener" aria-label="Facebook"><i class="bi bi-facebook"></i></a><button class="lang-toggle" id="langToggle" aria-label="Language / ಭಾಷೆ"><span data-l="kn">ಕನ್ನಡ</span><span data-l="en">EN</span></button>' +
        '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false" aria-controls="nav"><i class="bi bi-list"></i></button></div></div></header>';
    }
    if (ftr) {
      ftr.outerHTML = '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
        '<div><h4 data-i18n="foot.blogs"></h4><div class="foot-social">' +
        '<a href="' + esc(C.KUVEMPU_BLOG_URL) + '" target="_blank" rel="noopener"><i class="bi bi-journal-richtext"></i><span data-i18n="foot.blog.kuvempu"></span></a>' +
        '<a href="' + esc(C.TEJASWI_BLOG_URL) + '" target="_blank" rel="noopener"><i class="bi bi-journal-richtext"></i><span data-i18n="foot.blog.tejaswi"></span></a></div></div>' +
        '<div><h4 data-i18n="foot.contact"></h4><div class="foot-social">' +
        '<a href="mailto:' + esc(C.EMAIL) + '"><i class="bi bi-envelope-fill"></i>' + esc(C.EMAIL) + '</a>' +
        '<a href="' + esc(C.INSTAGRAM_URL) + '" target="_blank" rel="noopener"><i class="bi bi-instagram"></i>' + esc(C.INSTAGRAM_HANDLE) + '</a>' +
        '<a href="' + esc(C.FACEBOOK_URL) + '" target="_blank" rel="noopener"><i class="bi bi-facebook"></i>' + esc(C.FACEBOOK_HANDLE) + '</a></div></div></div>' +
        '<div class="foot-quote" data-i18n="foot.quote"></div><p class="copy">© ' + new Date().getFullYear() + ' <span data-i18n="site.name"></span></p></div></footer>' +
        '<button class="to-top" id="toTop" aria-label="Back to top"><i class="bi bi-arrow-up"></i></button>';
    }
  }

  function setFavicon() {
    var f = C.LOGO || 'favicon.svg', link = document.querySelector('link[rel="icon"]');
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    var ext = (f.split('.').pop() || '').toLowerCase();
    link.type = { svg: 'image/svg+xml', png: 'image/png', ico: 'image/x-icon', webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg' }[ext] || '';
    if (!link.type) link.removeAttribute('type');
    link.href = ROOT + f;
  }

  /* ---------- Image helpers: any format (png / jpg / webp ...), file-name pattern decides ---------- */
  var EXTS = ['webp', 'jpg', 'jpeg', 'png', 'avif', 'gif', 'svg'], EXT_RE = /\.(webp|jpe?g|png|gif|avif|svg|bmp)$/i;
  function imgDir(d) { return (d || 'images').replace(/\/+$/, ''); }          // e.g. 'images/home-page-images'
  function imgFile(b, dir) {                    // 'kuvempu' or 'kuvempu.webp' -> real file name inside that folder
    var raw = String(b), base = raw.replace(EXT_RE, ''), all = (window.MM_MANIFEST && window.MM_MANIFEST.images) || {}, m = all[imgDir(dir)] || {};
    return m[base] || (EXT_RE.test(raw) ? raw : base + '.webp');
  }
  function imgSrc(b, dir) { return ROOT + imgDir(dir) + '/' + imgFile(b, dir); }
  function imgFail(img) {
    var c = img.closest('.pers-card'); if (c) { c.remove(); return; }
    var f = img.closest('.img-frame'); if (f) { f.classList.add('noimg'); f.removeAttribute('data-full'); }
    img.remove();
  }
  function imgErr(img) {                        // tries the other image extensions, then gives up
    var base = img.getAttribute('data-base'); if (!base) return imgFail(img);
    var dir = imgDir(img.getAttribute('data-dir'));
    var tried = (img.getAttribute('data-tried') || '').split(',').filter(Boolean), cur = (img.getAttribute('src') || '').split('.').pop().toLowerCase();
    if (tried.indexOf(cur) < 0) tried.push(cur);
    var next = EXTS.filter(function (e) { return tried.indexOf(e) < 0; })[0];
    if (!next) return imgFail(img);
    img.setAttribute('data-tried', tried.join(','));
    var file = base + '.' + next, url = ROOT + dir + '/' + file; img.src = url;
    var h = img.closest('[data-full]');
    if (h) {
      h.dataset.full = url; h.dataset.dl = url; h.dataset.name = file;
      var a = h.querySelector('a[data-act="dl"]'); if (a) { a.href = url; a.setAttribute('download', file); }
    }
  }

  /* ---------- Great personalities cards (Home page only) ---------- */
  function initPersonalities() {
    var list = C.PERSONALITIES || []; if (!list.length || PAGE !== 'home') return;
    var hero = $('#heroSlider'); if (!hero) return;
    var box = document.createElement('div');
    box.className = 'pers'; box.id = 'personalities'; box.setAttribute('role', 'list');
    var band = document.createElement('section'); band.className = 'pers-band';
    band.innerHTML = '<div class="wrap"><div class="pers-wrap"><button type="button" class="pers-nav pers-prev" aria-label="Previous" hidden><i class="bi bi-chevron-left"></i></button><button type="button" class="pers-nav pers-next" aria-label="Next" hidden><i class="bi bi-chevron-right"></i></button></div></div>'; $('.pers-wrap', band).insertBefore(box, $('.pers-next', band));
    hero.insertAdjacentElement('afterend', band);
    var pv = $('.pers-prev', band), nx = $('.pers-next', band);
    function navState() {
      var more = box.scrollWidth > box.clientWidth + 4;
      pv.hidden = !more || box.scrollLeft < 4; nx.hidden = !more || box.scrollLeft + box.clientWidth >= box.scrollWidth - 4;
    }
    function slide(d) { box.scrollBy({ left: d * Math.max(120, box.clientWidth * 0.75), behavior: 'smooth' }); }
    pv.addEventListener('click', function () { slide(-1); }); nx.addEventListener('click', function () { slide(1); });
    box.addEventListener('scroll', navState, { passive: true }); window.addEventListener('resize', navState); window.addEventListener('load', navState);
    function draw() {
      box.innerHTML = list.map(function (p, i) {
        var dir = imgDir(C.HOME_IMAGES_DIR || 'images/home-page-images'), file = imgFile(p.img, dir), src = ROOT + dir + '/' + file, name = p[lang] || p.kn || p.en || '';
        return '<figure class="pers-card" role="listitem" style="animation-delay:' + (i * 80) + 'ms" data-full="' + esc(src) + '" data-name="' + esc(file) + '" data-dl="' + esc(src) + '" data-local="1" title="' + esc(name) + '">' +
          '<div class="pers-img"><img src="' + esc(src) + '" data-base="' + esc(String(p.img).replace(EXT_RE, '')) + '" data-dir="' + esc(dir) + '" alt="' + esc(name) + '" loading="lazy" decoding="async" onerror="MM.imgErr(this)"></div><figcaption>' + esc(name) + '</figcaption></figure>';
      }).join('');
      setTimeout(navState, 60);
    }
    draw(); document.addEventListener('mm:lang', draw); setTimeout(navState, 400);
  }

  function applyI18n(root) {
    root = root || document;
    $$('[data-i18n]', root).forEach(function (el) { el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-placeholder]', root).forEach(function (el) { el.placeholder = t(el.dataset.i18nPlaceholder); });
    $$('[data-i18n-aria]', root).forEach(function (el) { el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    document.documentElement.lang = lang === 'kn' ? 'kn' : 'en';
    document.title = t('title.' + PAGE) + ' | ' + t('site.name');
    $$('#langToggle span').forEach(function (s) { s.classList.toggle('on', s.dataset.l === lang); });
  }

  function setLang(l) {
    lang = l;
    try { localStorage.setItem('mm_lang', l); } catch (e) {}
    applyI18n();
    document.dispatchEvent(new CustomEvent('mm:lang'));
  }

  function initChrome() {
    var burger = $('#burger'), nav = $('#nav');
    if (burger) burger.addEventListener('click', function () {
      var o = nav.classList.toggle('open'); burger.setAttribute('aria-expanded', o);
      burger.firstElementChild.className = 'bi ' + (o ? 'bi-x-lg' : 'bi-list');
    });
    $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); }); });
    var lt = $('#langToggle');
    if (lt) lt.addEventListener('click', function () { setLang(lang === 'kn' ? 'en' : 'kn'); });
    var hdr = $('#siteHeader'), top = $('#toTop');
    function onScroll() {
      var y = window.scrollY;
      if (hdr) hdr.classList.toggle('scrolled', y > 8);
      if (top) top.classList.toggle('show', y > 500);
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
    if (top) top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  /* ---------- Reveal + counters ---------- */
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); if (e.target.dataset.count) countUp(e.target); } });
  }, { threshold: 0.12 }) : null;
  function observe(root) {
    $$('.reveal,[data-count]', root || document).forEach(function (el) {
      if (io) io.observe(el); else { el.classList.add('in'); if (el.dataset.count) el.textContent = el.dataset.count; }
    });
  }
  function countUp(el) {
    var end = parseInt(el.dataset.count, 10), start = performance.now(), dur = 1400;
    (function step(n) { var p = Math.min((n - start) / dur, 1); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(step); })(start);
  }

  /* ---------- Slider ---------- */
  function initSlider() {
    var root = $('#heroSlider'); if (!root) return;
    var slides = $$('.slide', root), dotsBox = $('.dots', root), i = 0, timer, sx = 0;
    slides.forEach(function (_, n) { var b = document.createElement('button'); b.setAttribute('aria-label', 'Slide ' + (n + 1)); b.addEventListener('click', function () { go(n, true); }); dotsBox.appendChild(b); });
    var dots = $$('button', dotsBox);
    function go(n, user) { i = (n + slides.length) % slides.length; slides.forEach(function (s, k) { s.classList.toggle('on', k === i); dots[k].classList.toggle('on', k === i); }); if (user) restart(); }
    function restart() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6500); }
    $('.s-prev', root).addEventListener('click', function () { go(i - 1, true); });
    $('.s-next', root).addEventListener('click', function () { go(i + 1, true); });
    root.addEventListener('pointerdown', function (e) { sx = e.clientX; });
    root.addEventListener('pointerup', function (e) { var d = e.clientX - sx; if (Math.abs(d) > 50) go(i + (d < 0 ? 1 : -1), true); });
    root.addEventListener('mouseenter', function () { clearInterval(timer); });
    root.addEventListener('mouseleave', restart);
    document.addEventListener('visibilitychange', function () { document.hidden ? clearInterval(timer) : restart(); });
    go(0); restart();
  }

  /* ---------- About rendering ---------- */
  function actions(dl, name, local) {
    var v = esc(t('img.view')), d = esc(t('img.download'));
    return '<div class="img-actions"><button type="button" class="ia-btn" data-act="view" title="' + v + '" aria-label="' + v + '"><i class="bi bi-arrows-fullscreen"></i></button>' +
      '<a class="ia-btn" data-act="dl" href="' + esc(dl) + '" ' + (local ? 'download="' + esc(name) + '"' : 'target="_blank" rel="noopener"') + ' title="' + d + '" aria-label="' + d + '"><i class="bi bi-download"></i></a></div>';
  }
  function imgBlock(name, alt, cls, cap) {
    var dir = imgDir(C.ABOUT_IMAGES_DIR || 'images/about-page-images'), file = imgFile(name, dir), src = ROOT + dir + '/' + file;
    return '<figure class="img-frame ' + (cls || '') + '" data-full="' + esc(src) + '" data-name="' + esc(file) + '" data-dl="' + esc(src) + '" data-local="1">' +
      '<img src="' + esc(src) + '" data-base="' + esc(String(name).replace(EXT_RE, '')) + '" data-dir="' + esc(dir) + '" alt="' + esc(alt) + '" loading="lazy" decoding="async" onerror="MM.imgErr(this)">' +
      (cap ? '<figcaption>' + esc(cap) + '</figcaption>' : '') + actions(src, file, true) + '</figure>';
  }

  /* ---------- Full-view image viewer (view / download / close) ---------- */
  function initViewer() {
    var v = document.createElement('div');
    v.className = 'viewer'; v.id = 'viewer'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true');
    v.innerHTML = '<div class="viewer-bar"><a class="btn btn-primary" id="vDl" href="#"><i class="bi bi-download"></i><span data-i18n="img.download"></span></a>' +
      '<button type="button" class="btn btn-light" id="vClose"><i class="bi bi-x-lg"></i><span data-i18n="close"></span></button></div>' +
      '<div class="viewer-stage"><img id="vImg" alt=""></div>';
    document.body.appendChild(v);
    var img = $('#vImg', v), dl = $('#vDl', v), opener = null;
    function open(h) {
      opener = document.activeElement;
      img.src = h.dataset.full; img.alt = h.dataset.name || '';
      dl.href = h.dataset.dl || h.dataset.full;
      if (h.dataset.local) { dl.setAttribute('download', h.dataset.name || ''); dl.removeAttribute('target'); dl.removeAttribute('rel'); }
      else { dl.removeAttribute('download'); dl.target = '_blank'; dl.rel = 'noopener'; }
      v.classList.add('open'); document.body.style.overflow = 'hidden';
      $('#vClose', v).focus();
    }
    function close() {
      if (!v.classList.contains('open')) return;
      v.classList.remove('open'); img.removeAttribute('src'); document.body.style.overflow = '';
      if (opener && opener.focus) opener.focus();
    }
    document.addEventListener('click', function (e) {
      var h = e.target.closest('[data-full]');
      if (!h || e.target.closest('a')) return;
      open(h);
    });
    $('#vClose', v).addEventListener('click', close);
    v.addEventListener('click', function (e) { if (e.target === v || e.target.classList.contains('viewer-stage')) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  }
  var QUOTES = null, QPAGE = 1, SHUT = {};
  function pickL(o) { return o == null ? '' : typeof o === 'string' ? o : (o[lang] || o.kn || o.en || ''); }
  function paras(a) { return '<div class="prose">' + a.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>'; }
  function body(s) {
    var d = s[lang];
    switch (s.type) {
      case 'text': return paras(d.paras);
      case 'ideals':
        return '<div class="split rev"><div class="ideals">' + d.items.map(function (x) {
          return '<div class="ideal"><i class="bi ' + x[0] + '"></i><div><h3>' + esc(x[1]) + '</h3><p>' + esc(x[2]) + '</p></div></div>';
        }).join('') + '</div>' + imgBlock(s.img, d.imgAlt, 'tall') + '</div>';
      case 'quote':
        return '<div class="split">' + imgBlock(s.img, d.imgAlt, 'tall') + '<div><p class="prose" style="margin-bottom:14px">' + esc(d.intro) + '</p><blockquote class="quote">' + esc(d.quote) + '</blockquote></div></div>';
      case 'wedding':
        return '<div class="gallery2">' + s.imgs.map(function (m, k) { return imgBlock(m[0], d.caps[k], 'wide', d.caps[k]); }).join('') + '</div>' + paras(d.paras);
      case 'quotes':
        if (QUOTES === null) return '<div class="skeleton" style="min-height:90px"></div>';
        var QN = 10, pages = Math.max(1, Math.ceil(QUOTES.length / QN)), pg = Math.min(QPAGE, pages), from = (pg - 1) * QN, chunk = QUOTES.slice(from, from + QN);
        return '<div class="quotes stack">' + chunk.map(function (q) {
          return '<figure class="qcard"><i class="bi bi-quote qcard-i"></i><blockquote>' + esc(pickL(q.text)).replace(/\n/g, '<br>') + '</blockquote><figcaption>— ' + esc(pickL(q.author)) + '</figcaption></figure>';
        }).join('') + '</div>' + (pages < 2 ? '' : '<div class="pager pg-nav q-pager"><span class="pg-info">' + esc(t('v.showing')) + ' ' + (from + 1) + '–' + (from + chunk.length) + ' ' + esc(t('v.of')) + ' ' + QUOTES.length + '</span>' +
          '<div class="pg-btns"><button type="button" data-qp="' + (pg - 1) + '"' + (pg === 1 ? ' disabled' : '') + ' aria-label="' + esc(t('v.prev')) + '"><i class="bi bi-chevron-left"></i></button>' +
          Array.apply(null, Array(pages)).map(function (_, i) { var n = i + 1; return '<button type="button" data-qp="' + n + '"' + (n === pg ? ' class="on" aria-current="page"' : '') + '>' + n + '</button>'; }).join('') +
          '<button type="button" data-qp="' + (pg + 1) + '"' + (pg === pages ? ' disabled' : '') + ' aria-label="' + esc(t('v.next')) + '"><i class="bi bi-chevron-right"></i></button></div></div>');
      case 'soon':
        return '<div class="placeholder-box"><i class="bi bi-hourglass-split"></i><b>' + esc(t('soon')) + '</b><br>' + esc(t('soon.detail')) + '</div>';
    }
    return '';
  }
  function renderAbout(box, accordion) {
    box.innerHTML = window.MM_ABOUT.map(function (s, n) {
      var d = s[lang];
      if (accordion) {
        return '<article class="acc reveal" id="acc-' + s.id + '"><button class="acc-head" aria-expanded="false" aria-controls="p-' + s.id + '"><span class="acc-ic"><i class="bi ' + s.icon + '"></i></span><span class="acc-title">' + esc(d.title) + '</span><i class="bi bi-chevron-down chev"></i></button><div class="acc-panel" id="p-' + s.id + '" role="region"><div class="acc-inner"><div class="acc-body">' + body(s) + '</div></div></div></article>';
      }
      var shut = !!SHUT[s.id];
      return '<section class="about-sec reveal' + (shut ? ' shut' : '') + '" id="' + s.id + '"><h2 class="about-h" role="button" tabindex="0" aria-expanded="' + !shut + '"><span class="acc-ic"><i class="bi ' + s.icon + '"></i></span><span class="about-t">' + esc(d.title) + '</span><i class="bi bi-chevron-down chev"></i></h2><div class="about-body">' + body(s) + '</div></section>';
    }).join('');
    if (accordion) $$('.acc', box).forEach(function (a) { $('.acc-head', a).addEventListener('click', function () { toggle(a); }); });
    observe(box);
  }
  function toggle(a, force) {
    var open = force == null ? !a.classList.contains('open') : force;
    a.classList.toggle('open', open); $('.acc-head', a).setAttribute('aria-expanded', open);
  }
  function initAbout() {
    var box = $('#aboutBox'); if (!box) return;
    var accordion = box.dataset.mode === 'accordion', openIds = [];
    function draw() {
      $$('.acc.open', box).forEach(function (a) { openIds.push(a.id); });
      renderAbout(box, accordion);
      openIds.forEach(function (id) { var a = document.getElementById(id); if (a) toggle(a, true); }); openIds = [];
      $$('.acc', box).forEach(function (a) { a.classList.add('in'); });
    }
    var aboutBar = null;
    function aboutRefresh() {
      if (!aboutBar) return;
      var secs = $$('.about-sec', box), expand = secs.some(function (x) { return x.classList.contains('shut'); }), b = $('button', aboutBar);
      b.dataset.mode = expand ? 'expand' : 'collapse'; $('span', b).textContent = t(expand ? 'btn.expand' : 'btn.collapse'); $('i', b).className = 'bi ' + (expand ? 'bi-arrows-expand' : 'bi-arrows-collapse');
    }
    function aboutSet(sec, open) { sec.classList.toggle('shut', !open); SHUT[sec.id] = !open; $('.about-h', sec).setAttribute('aria-expanded', open); }
    if (!accordion && PAGE === 'about') {
      aboutBar = document.createElement('div'); aboutBar.className = 'acc-tools'; aboutBar.innerHTML = '<button type="button" class="tl-link"><i class="bi"></i><span></span></button>';
      var atools = pageTools(); if (atools) atools.insertBefore(aboutBar, atools.firstChild); else box.insertAdjacentElement('beforebegin', aboutBar);
      $('button', aboutBar).addEventListener('click', function () { var o = this.dataset.mode === 'expand'; $$('.about-sec', box).forEach(function (x) { aboutSet(x, o); }); aboutRefresh(); });
      document.addEventListener('mm:lang', function () { setTimeout(aboutRefresh, 0); });
      box.addEventListener('click', function (e) { var h = e.target.closest('.about-h'); if (h) { var sec = h.parentNode; aboutSet(sec, sec.classList.contains('shut')); aboutRefresh(); } });
      box.addEventListener('keydown', function (e) { var h = e.target.closest && e.target.closest('.about-h'); if (h && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); h.click(); } });
      window.addEventListener('hashchange', function () { var a = location.hash && document.getElementById(location.hash.slice(1)); if (a && a.classList.contains('about-sec') && a.classList.contains('shut')) { aboutSet(a, true); aboutRefresh(); } });
      var _draw = draw; draw = function () { _draw(); aboutRefresh(); };
    }
    box.addEventListener('click', function (e) {
      var b = e.target.closest('[data-qp]'); if (!b || b.disabled) return;
      QPAGE = +b.dataset.qp; draw(); var q = document.getElementById('quotes') || document.getElementById('acc-quotes'); if (q) q.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    draw(); document.addEventListener('mm:lang', draw);
    fetch(ROOT + 'data/quotes.json').then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) { QUOTES = (j.quotes || []).filter(function (x) { return x && x.text; }); })
      .catch(function () { QUOTES = []; }).then(draw);
    var all = $('#expandAll');
    if (all) {
      var expanded = false;
      all.addEventListener('click', function () {
        expanded = !expanded; $$('.acc', box).forEach(function (a) { toggle(a, expanded); });
        var s = $('span', all); s.dataset.i18n = expanded ? 'btn.collapse' : 'btn.expand'; s.textContent = t(s.dataset.i18n);
        $('i', all).className = 'bi ' + (expanded ? 'bi-arrows-collapse' : 'bi-arrows-expand');
      });
    }
    if (accordion && location.hash) { var a = $(location.hash); if (a && a.classList.contains('acc')) toggle(a, true); }
  }

  /* ---------- API helpers ---------- */
  function apiGet(action) {
    if (!apiReady()) return Promise.reject(new Error('not-configured'));
    var key = 'mm_cache_' + action;
    return fetch(C.API_URL + '?action=' + encodeURIComponent(action), { redirect: 'follow' })
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (j) { if (!j || j.ok === false) throw new Error('api'); try { sessionStorage.setItem(key, JSON.stringify(j)); } catch (e) {} return j; });
  }
  function cached(action) { try { return JSON.parse(sessionStorage.getItem('mm_cache_' + action)); } catch (e) { return null; } }

  /* ---------- Downloads ---------- */
  function fileIcon(f) {
    var m = f.mimeType || '';
    if (m.indexOf('pdf') > -1) return 'bi-file-earmark-pdf';
    if (m.indexOf('image') === 0) return 'bi-file-earmark-image';
    if (m.indexOf('word') > -1 || m.indexOf('document') > -1) return 'bi-file-earmark-word';
    return 'bi-file-earmark-text';
  }
  function kind(f) { var m = f.mimeType || ''; return m.indexOf('pdf') > -1 ? 'pdf' : m.indexOf('image') === 0 ? 'images' : 'docs'; }
  function fmtSize(b) { if (!b) return ''; return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }

  function initDownloads() {
    var grid = $('#dlGrid'); if (!grid) return;
    var files = null, filter = 'all', q = '', status = 'loading';
    grid.innerHTML = '<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';
    function draw() {
      if (status === 'loading') return;
      if (status !== 'ok') { grid.innerHTML = '<div class="card empty-state" style="grid-column:1/-1"><i class="bi bi-cloud-slash" style="font-size:2rem;color:var(--saffron)"></i><p>' + esc(t(status === 'nc' ? 'dl.notconf' : 'dl.error')) + '</p></div>'; return; }
      var list = files.filter(function (f) { return (filter === 'all' || kind(f) === filter) && (!q || (f.name || '').toLowerCase().indexOf(q) > -1); });
      if (!list.length) { grid.innerHTML = '<div class="card empty-state" style="grid-column:1/-1"><i class="bi bi-folder2-open" style="font-size:2rem;color:var(--saffron)"></i><p>' + esc(t(files.length ? 'dl.nomatch' : 'dl.empty')) + '</p></div>'; return; }
      grid.innerHTML = list.map(function (f) {
        var isImg = kind(f) === 'images' && f.thumbnail;
        return '<article class="card file hover reveal in"><div class="thumb"' + (isImg ? ' data-full="' + esc(f.fullUrl || f.thumbnail) + '" data-name="' + esc(f.name) + '" data-dl="' + esc(f.downloadUrl) + '"' : '') + '><i class="bi ' + fileIcon(f) + '"></i>' + (f.thumbnail ? '<img src="' + esc(f.thumbnail) + '" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="var th=this.parentNode;th.removeAttribute(\'data-full\');var a=th.querySelector(\'.img-actions\');if(a)a.remove();this.remove()">' : '') + (isImg ? actions(f.downloadUrl, f.name, false) : '') + '</div><h3>' + esc(f.name) + '</h3><div class="meta">' + esc(fmtSize(f.size)) + '</div><div class="row"><a class="btn btn-light" href="' + esc(f.viewUrl) + '" target="_blank" rel="noopener"><i class="bi bi-eye"></i>' + esc(t('dl.view')) + '</a><a class="btn btn-primary" href="' + esc(f.downloadUrl) + '" rel="noopener"><i class="bi bi-download"></i>' + esc(t('dl.download')) + '</a></div></article>';
      }).join('');
    }
    function load(data) { files = data.files || []; status = 'ok'; draw(); }
    var c = cached('downloads'); if (c) load(c);
    apiGet('downloads').then(load).catch(function (e) { if (!files) { status = e.message === 'not-configured' ? 'nc' : 'err'; draw(); } });
    $('#dlSearch').addEventListener('input', function (e) { q = e.target.value.trim().toLowerCase(); draw(); });
    $$('#dlChips .chip').forEach(function (b) { b.addEventListener('click', function () { filter = b.dataset.f; $$('#dlChips .chip').forEach(function (x) { x.classList.toggle('on', x === b); }); draw(); }); });
    document.addEventListener('mm:lang', draw);
  }

  /* ---------- Community gallery ---------- */
  function initCommunity() {
    var g = $('#photoGrid'); if (!g) return;
    var st = 'loading', photos = [];
    function draw() {
      if (st === 'loading') { g.innerHTML = '<div class="skeleton" style="min-height:140px"></div>'; g.className = 'cards'; return; }
      if (st !== 'ok' || !photos.length) { g.className = 'cards'; g.innerHTML = '<div class="placeholder-box" style="grid-column:1/-1"><i class="bi bi-images"></i>' + esc(t('com.nophotos')) + '</div>'; return; }
      g.className = 'masonry';
      g.innerHTML = photos.map(function (p) {
        var full = p.fullUrl || p.thumbnail;
        return '<div class="gal-item" data-full="' + esc(full) + '" data-name="' + esc(p.name) + '" data-dl="' + esc(p.downloadUrl || full) + '"><img src="' + esc(p.thumbnail) + '" alt="' + esc(p.name) + '" loading="lazy" referrerpolicy="no-referrer">' + actions(p.downloadUrl || full, p.name, false) + '</div>';
      }).join('');
    }
    function load(d) { photos = d.photos || []; st = 'ok'; draw(); }
    var c = cached('photos'); if (c) load(c); else draw();
    apiGet('photos').then(load).catch(function () { if (st === 'loading') { st = 'err'; draw(); } });
    document.addEventListener('mm:lang', draw);
  }

  /* ---------- Contact form ---------- */
  function initContact() {
    var f = $('#queryForm'); if (!f) return;
    var sel = $('#f-topic');
    function fillTopics() { var cur = sel.value || TOPICS[0]; sel.innerHTML = TOPICS.map(function (v) { return '<option value="' + esc(v) + '">' + esc(t('topic.' + v)) + '</option>'; }).join(''); sel.value = cur; }
    fillTopics();
    var V = {
      name: function (v) { v = v.trim(); return !v ? 'err.name.req' : (v.length < 3 || v.length > 30) ? 'err.name.len' : ''; },
      phone: function (v) { v = v.trim(); return !v ? 'err.phone.req' : !/^[6-9]\d{9}$/.test(v) ? 'err.phone.fmt' : ''; },
      email: function (v) { v = v.trim(); return !v ? 'err.email.req' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'err.email.fmt' : ''; },
      place: function (v) { v = v.trim(); return !v ? 'err.place.req' : v.length > 200 ? 'err.place.len' : ''; },
      topic: function (v) { return !v ? 'err.topic.req' : ''; },
      message: function (v) { return !v.trim() ? 'err.message.req' : ''; }
    };
    function check(k) {
      var el = $('#f-' + k), wrap = el.closest('.field'), key = V[k](el.value), msg = $('.err', wrap);
      wrap.classList.toggle('invalid', !!key); el.setAttribute('aria-invalid', !!key);
      msg.dataset.key = key; msg.textContent = key ? t(key) : ''; return !key;
    }
    Object.keys(V).forEach(function (k) {
      var el = $('#f-' + k);
      el.addEventListener('blur', function () { check(k); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) check(k); if (k === 'phone') el.value = el.value.replace(/\D/g, '').slice(0, 10); });
    });
    document.addEventListener('mm:lang', function () { fillTopics(); $$('.err', f).forEach(function (m) { if (m.dataset.key) m.textContent = t(m.dataset.key); }); });
    var ok = $('#alertOk'), bad = $('#alertBad'), btn = $('#submitBtn'), busy = false;
    function setBusy(b) { busy = b; btn.disabled = b; btn.innerHTML = b ? '<span class="spin"></span><span>' + esc(t('form.sending')) + '</span>' : '<i class="bi bi-send-fill"></i><span data-i18n="form.submit">' + esc(t('form.submit')) + '</span>'; }
    f.addEventListener('submit', function (e) {
      e.preventDefault(); if (busy) return;
      ok.classList.remove('show'); bad.classList.remove('show');
      var valid = Object.keys(V).map(check).every(Boolean);
      if (!valid) { var first = $('.field.invalid input,.field.invalid select,.field.invalid textarea', f); if (first) first.focus(); return; }
      if ($('#f-website').value) return; // honeypot
      if (!apiReady()) { $('span', bad).textContent = t('form.notconf'); bad.classList.add('show'); return; }
      var payload = {
        'Name': $('#f-name').value.trim(), 'Contact Number': $('#f-phone').value.trim(), 'Email': $('#f-email').value.trim(),
        'Place': $('#f-place').value.trim(), 'Topic': sel.value, 'Message': $('#f-message').value.trim(),
        'Language': lang === 'kn' ? 'Kannada' : 'English', 'lang': lang, 'type': 'query'
      };
      setBusy(true);
      fetch(C.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.ok) throw new Error('api');
          $('span', ok).textContent = t('form.ok'); ok.classList.add('show'); f.reset(); sel.value = TOPICS[0];
          $$('.field', f).forEach(function (w) { w.classList.remove('invalid'); });
          ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function (e) { $('span', bad).textContent = failMsg(e, 'form.fail'); bad.classList.add('show'); })
        .then(function () { setBusy(false); });
    });
    var mc = $('#f-message'), pc = $('#f-place');
    function counter() { $('#cnt-place').textContent = pc.value.length + '/200'; }
    pc.addEventListener('input', counter); counter();
    void mc;
  }

  /* ---------- Collapsible sections (.c-sec > .c-head + .c-body), used on Guidance / Downloads ---------- */
  function initCollapsibles() {
    function flip(h) { var sec = h.closest('.c-sec'); if (!sec) return; var shut = sec.classList.toggle('shut'); h.setAttribute('aria-expanded', !shut); }
    document.addEventListener('click', function (e) { var h = e.target.closest('.c-head'); if (h && !e.target.closest('a')) flip(h); });
    document.addEventListener('keydown', function (e) { var h = e.target.closest && e.target.closest('.c-head'); if (h && h === e.target && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); flip(h); } });
  }

  /* ---------- Expand all / Collapse all (for .c-sec sections and .acc accordions inside a scope) ---------- */
  /* one compact row right below the page banner: expand/collapse link + Join button */
  function pageTools() {
    var row = $('.page-tools .pt-row'); if (row) return row;
    var anchor = $('.page-hero') || $('#heroSlider'); if (!anchor) return null;
    var sec = document.createElement('div'); sec.className = 'page-tools'; sec.innerHTML = '<div class="wrap pt-row"></div>';
    anchor.insertAdjacentElement('afterend', sec); return $('.pt-row', sec);
  }
  function toggleAll(anchor, where, scopeFn) {
    var bar = document.createElement('div'); bar.className = 'acc-tools'; bar.innerHTML = '<button type="button" class="tl-link"><i class="bi"></i><span></span></button>';
    var tools = pageTools();
    if (tools) tools.insertBefore(bar, tools.firstChild); else anchor.insertAdjacentElement(where, bar);
    var btn = $('button', bar), ic = $('i', btn), lb = $('span', btn);
    function items() { var sc = scopeFn(); return sc ? $$('.c-sec,.acc', sc) : []; }
    function isOpen(x) { return x.classList.contains('acc') ? x.classList.contains('open') : !x.classList.contains('shut'); }
    function setOpen(x, o) {
      if (x.classList.contains('acc')) toggle(x, o);
      else { x.classList.toggle('shut', !o); var h = $('.c-head', x); if (h) h.setAttribute('aria-expanded', o); }
    }
    function refresh() {
      var it = items(); bar.hidden = !it.length;
      var expand = it.some(function (x) { return !isOpen(x); });
      btn.dataset.mode = expand ? 'expand' : 'collapse';
      lb.textContent = t(expand ? 'btn.expand' : 'btn.collapse'); ic.className = 'bi ' + (expand ? 'bi-arrows-expand' : 'bi-arrows-collapse');
    }
    btn.addEventListener('click', function () { var o = btn.dataset.mode === 'expand'; items().forEach(function (x) { setOpen(x, o); }); refresh(); });
    document.addEventListener('click', function () { setTimeout(refresh, 0); });
    document.addEventListener('mm:lang', function () { setTimeout(refresh, 0); });
    window.addEventListener('hashchange', function () { setTimeout(refresh, 0); });
    var root = scopeFn(); var host = root ? (root.parentNode && root.classList.contains('pane') ? root.parentNode : root) : null;
    if (host && window.MutationObserver) { var tm; new MutationObserver(function () { clearTimeout(tm); tm = setTimeout(refresh, 30); }).observe(host, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] }); }
    refresh(); return bar;
  }
  /* Community / Contact: make each titled section collapsible (title bar toggles it) */
  function makeSectionsCollapsible() {
    $$('main .block > .wrap').forEach(function (w) {
      var head = $(':scope > .sec-head', w); if (!head) return;
      var body = document.createElement('div'); body.className = 'c-body';
      var n = head.nextSibling; while (n) { var nx = n.nextSibling; body.appendChild(n); n = nx; }
      w.appendChild(body); w.classList.add('c-sec', 'plain');
      head.classList.add('c-head'); head.setAttribute('role', 'button'); head.tabIndex = 0; head.setAttribute('aria-expanded', 'true');
      head.insertAdjacentHTML('beforeend', '<i class="bi bi-chevron-down chev"></i>');
    });
  }
  function initPageToggles() {
    if (PAGE !== 'community') return;
    makeSectionsCollapsible();
  }

  window.MM = {
    toggleAll: toggleAll, imgDir: imgDir,
    imgFile: imgFile, imgSrc: imgSrc, imgErr: imgErr, EXT_RE: EXT_RE,
    t: t, lang: function () { return lang; }, esc: esc, $: $, $$: $$, ROOT: ROOT, actions: actions,
    apiGet: apiGet, pageTools: pageTools, failMsg: failMsg, toast: toast, cached: cached, apiReady: apiReady, toggle: toggle, observe: observe, applyI18n: applyI18n
  };

  /* ---------- Boot ---------- */
  function boot() {
    buildLayout(); setFavicon(); initChrome(); initViewer(); initCollapsibles(); initPersonalities(); initPageToggles(); applyI18n();
    initSlider(); initAbout(); initDownloads(); initContact();
    observe();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
