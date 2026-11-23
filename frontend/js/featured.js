/* Home page: "Celebrities married the Mantra Mangalya way" (data/celebrities.json) and
   "Mantra Mangalya in main streams" (data/mainstream.json). Photo and video are optional per item. */
(function () {
  'use strict';
  var M = window.MM, B = window.MM_BROWSE; if (!M || !B) return;
  var t = M.t, esc = M.esc, $ = M.$;
  var kn = { "ft.cel.title": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ರೀತಿಯಲ್ಲಿ ವಿವಾಹವಾದ ಗಣ್ಯರು", "ft.cel.sub": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆಯನ್ನು ಆರಿಸಿಕೊಂಡ ಪ್ರಸಿದ್ಧ ದಂಪತಿಗಳು",
    "ft.ms.title": "ಮುಖ್ಯವಾಹಿನಿಯಲ್ಲಿ ಮಂತ್ರ ಮಾಂಗಲ್ಯ", "ft.ms.sub": "ಚಲನಚಿತ್ರಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ರಮಗಳಲ್ಲಿ ಮಂತ್ರ ಮಾಂಗಲ್ಯ",
    "ft.none": "ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "ft.watch": "ವೀಡಿಯೊ ನೋಡಿ", "ft.video": "ವೀಡಿಯೊ" };
  var en = { "ft.cel.title": "Celebrities married in the Mantra Mangalya way", "ft.cel.sub": "Well-known couples who chose a Mantra Mangalya wedding",
    "ft.ms.title": "Mantra Mangalya in main streams", "ft.ms.sub": "Mantra Mangalya in movies and events",
    "ft.none": "Details will be added soon.", "ft.watch": "Watch video", "ft.video": "Video" };
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
  function card(it, dir) {
    var img = it.image ? M.ROOT + dir + '/' + encodeURIComponent(it.image) : '', url = safeUrl(it.video), p = url ? platform(url) : null;
    var text = B.pick(it.text);
    return '<article class="card ft-card">' +
      (img ? '<div class="ft-img"><img src="' + esc(img) + '" alt="' + esc(B.pick(it.title)) + '" loading="lazy" decoding="async" onerror="this.parentNode.remove()"></div>' : '') +
      '<div class="ft-b"><h3><strong>' + esc(B.pick(it.title)) + '</strong></h3>' +
      (text ? '<p>' + esc(text).replace(/\n/g, '<br>') + '</p>' : '') +
      (p ? '<a class="btn btn-light ft-vid" href="' + esc(url) + '" target="_blank" rel="noopener"><i class="bi ' + p.i + '"></i>' + esc(t('ft.watch')) + ' <i class="bi bi-box-arrow-up-right"></i></a>' : '') +
      '</div></article>';
  }
  function init(boxId, file, fallbackDir) {
    var box = $('#' + boxId); if (!box) return;
    var state = { items: null, dir: fallbackDir };
    function draw() {
      if (state.items === null) { box.innerHTML = '<div class="skeleton" style="min-height:120px"></div>'; return; }
      if (!state.items.length) { box.innerHTML = '<div class="na"><i class="bi bi-inbox"></i><p>' + esc(t('ft.none')) + '</p></div>'; return; }
      B.paged(box, state.items, 6, function (it) { return card(it, state.dir); }, 'cards');
    }
    fetch(M.ROOT + file).then(function (r) { if (!r.ok) throw 0; return r.json(); }).then(function (j) {
      state.dir = (j.imageDir || fallbackDir).replace(/^\/+|\/+$/g, '');
      state.items = (j.items || []).filter(function (x) { return x && x.title; });
    }).catch(function () { state.items = []; }).then(draw);
    draw();
    document.addEventListener('mm:lang', draw);
  }
  init('celBox', 'data/celebrities.json', 'images/celebraties-photo');
  init('msBox', 'data/mainstream.json', 'images/mm-main-stream-photo');
})();
