/* Home page: "Celebrities married the Mantra Mangalya way" (data/celebrities.json) and
   "Mantra Mangalya in main streams" (data/mainstream.json). Photo and video are optional per item. */
(function () {
  'use strict';
  var M = window.MM, B = window.MM_BROWSE; if (!M || !B) return;
  var t = M.t, esc = M.esc, $ = M.$;
  var kn = { "ft.cel.title": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ರೀತಿಯಲ್ಲಿ ವಿವಾಹವಾದ ಗಣ್ಯರು", "ft.cel.sub": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆಯನ್ನು ಆರಿಸಿಕೊಂಡ ಪ್ರಸಿದ್ಧ ದಂಪತಿಗಳು",
    "ft.ms.title": "ಮುಖ್ಯವಾಹಿನಿಯಲ್ಲಿ ಮಂತ್ರ ಮಾಂಗಲ್ಯ", "ft.ms.sub": "ಚಲನಚಿತ್ರಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಮಂತ್ರ ಮಾಂಗಲ್ಯ",
    "ft.none": "ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "ft.watch": "ವೀಡಿಯೊ ನೋಡಿ", "ft.video": "ವೀಡಿಯೊ", "ft.more": "ಇನ್ನಷ್ಟು", "ft.close": "ಮುಚ್ಚಿ" };
  var en = { "ft.cel.title": "Celebrities married in the Mantra Mangalya way", "ft.cel.sub": "Well-known couples who chose a Mantra Mangalya wedding",
    "ft.ms.title": "Mantra Mangalya in main streams", "ft.ms.sub": "Mantra Mangalya in movies and events",
    "ft.none": "Details will be added soon.", "ft.watch": "Watch video", "ft.video": "Video", "ft.more": "More", "ft.close": "Close" };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });

  function safeUrl(u) { return /^https?:\/\//i.test(String(u || '')) ? u : ''; }
  function platform(u) {
    var x = String(u).toLowerCase();
    if (/youtu\.?be/.test(x)) return { n: 'YouTube', i: 'bi-youtube', c: 'yt' };
    if (x.indexOf('instagram.com') > -1) return { n: 'Instagram', i: 'bi-instagram', c: 'ig' };
    if (x.indexOf('facebook.com') > -1 || x.indexOf('fb.watch') > -1) return { n: 'Facebook', i: 'bi-facebook', c: 'fb' };
    return { n: t('ft.video'), i: 'bi-play-circle-fill', c: 'ot' };
  }
  var ITEMS = {};
  /* image: file name in the folder (any case / extension), a path under the site, or a full https link */
  var ALT_DIRS = ['images/mm-main-stream-photo', 'images/mm-main-stream-photos', 'images/mm-mainstream-photo', 'images/mm-main-streams-photo', 'images/celebrities-photo', 'images/celebraties-photo'];
  function imgUrl(it, dir) {
    var im = String(it.image || '').trim(); if (!im) return '';
    if (/^https?:\/\//i.test(im)) return im;
    if (im.indexOf('/') > -1) return M.ROOT + im.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
    var list = window.MM_MANIFEST && window.MM_MANIFEST.dirs && window.MM_MANIFEST.dirs[dir], name = im;
    if (Array.isArray(list) && list.length) {
      var low = im.toLowerCase(), base = low.replace(/\.[^.]+$/, ''), hit = null;
      list.forEach(function (f) { if (!hit && f.file.toLowerCase() === low) hit = f.file; });
      list.forEach(function (f) { if (!hit && f.file.toLowerCase().replace(/\.[^.]+$/, '') === base) hit = f.file; });
      if (hit) name = hit;
    }
    return M.ROOT + dir + '/' + encodeURIComponent(name);
  }
  /* if a photo does not load from the configured folder, try the other likely folder names before hiding it */
  document.addEventListener('error', function (e) {
    var im = e.target; if (!im || im.tagName !== 'IMG' || !im.hasAttribute('data-ftimg')) return;
    var n = +(im.getAttribute('data-try') || 0), f = im.getAttribute('data-file'), cur = im.getAttribute('src');
    var c = ALT_DIRS.map(function (d) { return M.ROOT + d + '/' + f; }).filter(function (u) { return u !== cur; });
    if (n < c.length && f) { im.setAttribute('data-try', n + 1); im.src = c[n]; return; }
    if (window.console) console.warn('[Mantra Mangalya] photo not found: ' + f + ' (looked in ' + ALT_DIRS.join(', ') + ')');
    var host = im.closest('.ft-img'); if (host) host.remove(); else im.remove();
  }, true);
  function imgAttr(it) { return 'data-ftimg="1" data-file="' + esc(encodeURIComponent(String(it.image || '').split('/').pop())) + '"'; }
  function card(it, dir, key, n) {
    var img = imgUrl(it, dir), url = safeUrl(it.video), p = url ? platform(url) : null, text = B.pick(it.text);
    return '<article class="card ft-card' + (img ? '' : ' no-img') + '">' +
      (img ? '<button type="button" class="ft-img" data-ft="' + key + ':' + n + '" aria-label="' + esc(t('ft.more')) + '"><img src="' + esc(img) + '" ' + imgAttr(it) + ' alt="' + esc(B.pick(it.title)) + '" loading="lazy" decoding="async"></button>' : '') +
      '<div class="ft-b"><h3><strong>' + esc(B.pick(it.title)) + '</strong></h3>' +
      (text ? '<p class="ft-t">' + esc(text).replace(/\n/g, ' ') + '</p>' : '') +
      '<div class="ft-act"><button type="button" class="btn btn-primary" data-ft="' + key + ':' + n + '">' + esc(t('ft.more')) + ' <i class="bi bi-arrow-right"></i></button>' +
      (p ? '<a class="btn btn-light" href="' + esc(url) + '" target="_blank" rel="noopener" aria-label="' + esc(t('ft.watch')) + '"><i class="bi ' + p.i + '"></i><span>' + esc(t('ft.watch')) + '</span></a>' : '') + '</div></div></article>';
  }
  /* details modal: full photo, full write-up, video link */
  var modal = null, opener = null;
  function closeModal() { if (!modal || modal.hidden) return; modal.hidden = true; document.body.style.overflow = ''; if (opener && opener.focus) opener.focus(); }
  function openModal(ref, from) {
    var parts = ref.split(':'), src = ITEMS[parts[0]]; if (!src) return; var it = src.items[+parts[1]]; if (!it) return;
    if (!modal) {
      modal = document.createElement('div'); modal.className = 'modal'; modal.hidden = true; modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true');
      document.body.appendChild(modal);
      modal.addEventListener('click', function (e) { if (e.target === modal || e.target.closest('.modal-x')) closeModal(); });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
    }
    opener = from;
    var img = imgUrl(it, src.dir), url = safeUrl(it.video), p = url ? platform(url) : null, text = B.pick(it.text);
    modal.innerHTML = '<div class="modal-box ft-modal"><button type="button" class="modal-x" aria-label="' + esc(t('ft.close')) + '"><i class="bi bi-x-lg"></i></button>' +
      (img ? '<img class="ft-mimg" src="' + esc(img) + '" ' + imgAttr(it) + ' alt="' + esc(B.pick(it.title)) + '">' : '') +
      '<h2><strong>' + esc(B.pick(it.title)) + '</strong></h2>' + (text ? '<p class="ft-mt">' + esc(text).replace(/\n/g, '<br>') + '</p>' : '') +
      (p ? '<a class="btn btn-primary" href="' + esc(url) + '" target="_blank" rel="noopener"><i class="bi ' + p.i + '"></i><span>' + esc(t('ft.watch')) + '</span> <i class="bi bi-box-arrow-up-right"></i></a>' : '') + '</div>';
    modal.hidden = false; document.body.style.overflow = 'hidden'; $('.modal-x', modal).focus();
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-ft]'); if (b) openModal(b.getAttribute('data-ft'), b); });
  function init(boxId, file, fallbackDir) {
    var box = $('#' + boxId); if (!box) return;
    var state = { items: null, dir: fallbackDir };
    function draw() {
      if (state.items === null) { box.innerHTML = '<div class="skeleton" style="min-height:120px"></div>'; return; }
      if (!state.items.length) { box.innerHTML = '<div class="na"><i class="bi bi-inbox"></i><p>' + esc(t('ft.none')) + '</p></div>'; return; }
      ITEMS[boxId] = state; B.paged(box, state.items, 3, function (it, n) { return card(it, state.dir, boxId, state.items.indexOf(it)); }, 'cards');
    }
    fetch(M.ROOT + file).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) {
      state.dir = (j.imageDir || fallbackDir).replace(/^\/+|\/+$/g, '');
      var list = Array.isArray(j) ? j : (j.items || j.entries || j.data || []);
      state.items = list.map(function (x) {            // accept a few alternative field names
        if (!x) return null;
        return { title: x.title || x.name || x.heading, text: x.text || x.description || x.writeup || x.details, image: x.image || x.photo || x.img || x.imageFile || x.file, video: x.video || x.videoLink || x.video_url || x.link || x.url };
      }).filter(function (x) { return x && x.title; });
    }).catch(function () { state.items = []; }).then(draw);
    draw();
    document.addEventListener('mm:lang', draw);
  }
  init('celBox', 'data/celebrities.json', 'images/celebrities-photo');
  init('msBox', 'data/mainstream.json', 'images/mm-main-stream-photo');
})();
