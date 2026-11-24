/* Home page: Core Ideals at a glance, short "About Mantra Mangalya Wedding", two random quotes.
   Content comes from js/about-content.js and data/quotes.json (single source, no duplicate text). */
(function () {
  'use strict';
  var M = window.MM; if (!M || !window.MM_ABOUT) return;
  var t = M.t, esc = M.esc, $ = M.$;
  var kn = { "hm.ideals.title": "ಮೂಲ ಆಶಯ", "hm.ideals.sub": "ಮಂತ್ರ ಮಾಂಗಲ್ಯದ ಆಶಯಗಳು ಒಂದೇ ನೋಟದಲ್ಲಿ", "hm.about.title": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆ ಕುರಿತು",
    "hm.quotes.title": "ಮಹನೀಯರ ಮಾತುಗಳು", "hm.more": "ಇನ್ನಷ್ಟು ಓದಿ", "hm.moreq": "ಇನ್ನಷ್ಟು ಮಾತುಗಳನ್ನು ನೋಡಿ" };
  var en = { "hm.ideals.title": "Core Ideals", "hm.ideals.sub": "Mantra Mangalya's core ideals at a glance", "hm.about.title": "About Mantra Mangalya Wedding",
    "hm.quotes.title": "Quotes from Great Personalities", "hm.more": "Read more", "hm.moreq": "See more quotes" };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });

  function sec(id) { return window.MM_ABOUT.filter(function (s) { return s.id === id; })[0]; }
  function more(href, key) { return '<a class="btn btn-light" href="' + M.ROOT + href + '"><span>' + esc(t(key)) + '</span><i class="bi bi-arrow-right"></i></a>'; }

  function drawIdeals() {
    var box = $('#homeIdeals'), s = sec('ideals'); if (!box || !s) return;
    box.innerHTML = '<div class="ideal-chips">' + s[M.lang()].items.map(function (x) {
      return '<span class="ideal-chip"><i class="bi ' + esc(x[0]) + '"></i>' + esc(x[1]) + '</span>';
    }).join('') + '</div><div class="home-more">' + more('about/#ideals', 'hm.more') + '</div>';
  }
  function drawAbout() {
    var box = $('#homeAboutBox'), s = sec('intro'); if (!box || !s) return;
    box.innerHTML = '<div class="card home-about"><div class="prose">' + s[M.lang()].paras.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div></div>' +
      '<div class="home-more">' + more('about/', 'hm.more') + '</div>';
  }

  var chosen = null, all = null;
  function drawQuotes() {
    var box = $('#homeQuotesBox'); if (!box) return;
    if (!all) { box.innerHTML = '<div class="skeleton" style="min-height:90px"></div>'; return; }
    if (!all.length) { $('#homeQuotes').hidden = true; return; }
    if (!chosen) { chosen = all.slice().sort(function () { return Math.random() - .5; }).slice(0, 2); }   // new pair on every page load
    var l = M.lang(), pk = function (o) { return o == null ? '' : typeof o === 'string' ? o : (o[l] || o.kn || o.en || ''); };
    box.innerHTML = '<div class="quotes">' + chosen.map(function (q) {
      return '<figure class="qcard"><i class="bi bi-quote qcard-i"></i><blockquote>' + esc(pk(q.text)).replace(/\n/g, '<br>') + '</blockquote><figcaption>— ' + esc(pk(q.author)) + '</figcaption></figure>';
    }).join('') + '</div><div class="home-more">' + more('about/#quotes', 'hm.moreq') + '</div>';
  }
  function draw() { drawIdeals(); drawAbout(); drawQuotes(); }
  draw(); document.addEventListener('mm:lang', draw);
  fetch(M.ROOT + 'data/quotes.json').then(function (r) { if (!r.ok) throw 0; return r.json(); })
    .then(function (j) { all = (j.quotes || []).filter(function (x) { return x && x.text; }); }).catch(function () { all = []; }).then(drawQuotes);
})();
