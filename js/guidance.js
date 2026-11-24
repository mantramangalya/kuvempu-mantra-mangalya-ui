/* Guidance page: tabs + panels (loaded after app.js) */
(function () {
  'use strict';
  function start() {
    var M = window.MM;
    if (!M || !document.getElementById('gTabs')) return;
    var t = M.t, esc = M.esc, $ = M.$, $$ = M.$$;
    var TABS = ['guidance', 'gallery', 'plan', 'code', 'faq'];
    var inited = {}, firstShow = true;

    function L() { return M.lang(); }
    function pick(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[L()] || o.kn || o.en || ''; }

    /* ---------- tabs ---------- */
    function current() { var h = (location.hash || '').slice(1); if (h === 'samples') h = 'gallery'; if (h === 'venue') h = 'plan'; return TABS.indexOf(h) > -1 ? h : 'guidance'; }
    function show(tab, scroll) {
      TABS.forEach(function (k) {
        var on = k === tab, b = $('#tabbtn-' + k), p = $('#tab-' + k);
        b.classList.toggle('on', on); b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1; p.hidden = !on;
        if (on) p.classList.remove('pane-in'), void p.offsetWidth, p.classList.add('pane-in');
      });
      if (!inited[tab]) { inited[tab] = true; INIT[tab](); }
      var cur = $('#tabbtn-' + tab); if (cur && cur.scrollIntoView) cur.scrollIntoView({ block: 'nearest', inline: 'center' });
      if (scroll) $('#gTabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    $$('#gTabs .tab').forEach(function (b) {
      b.addEventListener('click', function () { var k = b.dataset.tab; if (location.hash === '#' + k) show(k, false); else location.hash = k; });
      b.addEventListener('keydown', function (e) {
        var i = TABS.indexOf(b.dataset.tab);
        if (e.key === 'ArrowRight') { location.hash = TABS[(i + 1) % TABS.length]; $('#tabbtn-' + TABS[(i + 1) % TABS.length]).focus(); }
        if (e.key === 'ArrowLeft') { location.hash = TABS[(i + TABS.length - 1) % TABS.length]; $('#tabbtn-' + TABS[(i + TABS.length - 1) % TABS.length]).focus(); }
      });
    });
    window.addEventListener('hashchange', function () { show(current(), true); });

    function link(l) {
      if (!l) return '';
      var href = l.tab ? '#' + l.tab : M.ROOT + l.page + '/';
      return '<a class="mini-link" href="' + esc(href) + '">' + esc(l[L()]) + ' <i class="bi bi-arrow-right"></i></a>';
    }

    /* ---------- 1. Guidance ---------- */
    function renderGuide() {
      var G = window.MM_GUIDE, l = L(), h = '';
      h += G.phases.map(function (p, n) {
        var body;
        if (p.style === 'flow') {
          body = '<ol class="flow">' + p.items.map(function (it, i) {
            var d = it[l];
            return '<li class="flow-item"><span class="flow-n">' + (i + 1) + '</span><div class="flow-card"><span class="flow-ic"><i class="bi ' + it.icon + '"></i></span><div><h4>' + esc(d.t) + '</h4><p>' + esc(d.d) + '</p>' + link(it.link) + '</div></div></li>';
          }).join('') + '</ol>';
        } else {
          body = '<div class="step-grid">' + p.items.map(function (it) {
            var d = it[l];
            return '<article class="step"><div class="step-ic"><i class="bi ' + it.icon + '"></i></div>' + (d.tag ? '<span class="step-tag">' + esc(d.tag) + '</span>' : '') + '<h4>' + esc(d.t) + '</h4><p>' + esc(d.d) + '</p>' + link(it.link) + '</article>';
          }).join('') + '</div>';
        }
        var call = p.callout ? '<div class="callout"><i class="bi ' + p.callout.icon + '"></i><span>' + esc(p.callout[l]) + '</span></div>' : '';
        return '<section class="phase c-sec reveal" id="ph-' + esc(p.id || n) + '"><div class="phase-head c-head" role="button" tabindex="0" aria-expanded="true"><span class="phase-n">' + (n + 1) + '</span><div><h3>' + esc(p[l].title) + '</h3><p>' + esc(p[l].sub) + '</p></div><i class="bi ' + p.icon + ' phase-ic"></i><i class="bi bi-chevron-down chev"></i></div><div class="c-body">' + body + call + '</div></section>';
      }).join('');
      var shut = $$('#tab-guidance .c-sec.shut').map(function (x) { return x.id; });
      $('#tab-guidance').innerHTML = h; M.observe($('#tab-guidance'));
      shut.forEach(function (id) { var x = document.getElementById(id); if (x) { x.classList.add('shut'); $('.c-head', x).setAttribute('aria-expanded', 'false'); } });
    }

    /* ---------- 2. Marriage Code ---------- */
    function renderCode() {
      var d = window.MM_CODE[L()];
      var h = '<div class="code-dl"><div class="code-dl-t"><i class="bi bi-cloud-arrow-down-fill"></i><b>' + esc(t('code.dl.title')) + '</b></div><div class="code-dl-b">' +
        '<button type="button" class="btn btn-light" data-dl="docx"><i class="bi bi-file-earmark-word"></i><span>' + esc(t('code.dl.word')) + '</span></button>' +
        '<button type="button" class="btn btn-light" data-dl="pdf"><i class="bi bi-file-earmark-pdf"></i><span>' + esc(t('code.dl.pdf')) + '</span></button></div>' +
        '<small>' + esc(t('code.pdf.note')) + '</small></div>';
      h += '<div class="code-bg"><h3><i class="bi bi-journal-bookmark"></i>' + esc(d.bgTitle) + '</h3>' + d.background.map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('') + '</div>';
      h += '<article class="code-doc"><div class="code-orn"><i class="bi bi-flower1"></i></div><h3>' + esc(d.title) + '</h3>' +
        '<div class="code-to">' + d.addressee.map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('') + '</div><p class="code-intro">' + esc(d.intro) + '</p>' +
        '<ol class="pledges">' + d.statements.map(function (s) { return '<li><p>' + esc(s) + '</p></li>'; }).join('') + '</ol>' +
        '<p class="code-close">' + esc(d.closing) + '</p>' +
        '<div class="sign-grid"><div class="sign"><span>' + esc(d.sign.groom) + '</span></div><div class="sign"><span>' + esc(d.sign.bride) + '</span></div></div>' +
        '<div class="sign-wit"><b>' + esc(d.sign.witnessTitle) + '</b><div class="sign-grid">' + d.sign.witnesses.map(function (w) { return '<div class="sign"><span>' + esc(w) + '</span></div>'; }).join('') + '</div></div></article>';
      $('#tab-code').innerHTML = h;
      $$('#tab-code [data-dl]').forEach(function (b) {
        b.addEventListener('click', function () {
          var doc = window.MM_CODE[L()], site = t('site.name'), base = 'kuvempu-mantra-mangalya-vivaha-samhite-' + L();
          if (b.dataset.dl === 'docx') window.MM_DOC.downloadDocx(doc, site, base + '.docx');
          else window.MM_DOC.printPdf(doc, site, L(), base);
        });
      });
    }

    /* ---------- 3. Marriage Venue ---------- */
    var V = { rows: null, state: 'loading', district: '', q: '', key: 'district', dir: 1, page: 1, size: 10 };
    var COLS = [['district', 'v.district'], ['venue', 'v.venue'], ['address', 'v.address'], ['contact', 'v.contact']];
    function normVenue(r) {
      function g(k) { return String(r[k] == null ? '' : r[k]).trim(); }
      return { district: g('district'), venue: g('venue'), address: g('address'), contact: g('contact') };
    }
    function loadVenues() {
      var c = M.cached('venues');
      if (c) { V.rows = (c.venues || []).map(normVenue); V.state = 'ok'; }
      M.apiGet('venues').then(function (j) { V.rows = (j.venues || []).map(normVenue); V.state = 'ok'; drawVenue(true); })
        .catch(function (e) { if (!V.rows) { V.state = e.message === 'not-configured' ? 'nc' : 'err'; } drawVenue(true); });
    }
    function soonBox() { return '<div class="placeholder-box"><i class="bi bi-hourglass-split"></i><b>' + esc(t('soon')) + '</b><br>' + esc(t('soon.detail')) + '</div>'; }
    function renderPlan() {
      var Bw = window.MM_BROWSE, host = $('#tab-plan');
      var shut = $$('#tab-plan .c-sec.shut').map(function (x) { return x.id; });
      host.innerHTML = Bw.shell('plan-venue', 'bi-geo-alt-fill', t('p.venue'), null, '<div id="venueBody"></div>') +
        Bw.shell('plan-guests', 'bi-people-fill', t('p.guests'), null, soonBox()) +
        Bw.shell('plan-expense', 'bi-cash-coin', t('p.expense'), null, soonBox());
      shut.forEach(function (id) { var x = document.getElementById(id); if (x) { x.classList.add('shut'); $('.c-head', x).setAttribute('aria-expanded', 'false'); } });
    }
    function venueShell() {
      var districts = [];
      (V.rows || []).forEach(function (r) { if (r.district && districts.indexOf(r.district) < 0) districts.push(r.district); });
      districts.sort(function (a, b) { return a.localeCompare(b); });
      var h = '<p class="v-intro">' + esc(t('v.intro')) + '</p><div class="v-tools">' +
        '<label class="search"><i class="bi bi-search"></i><span class="sr-only">' + esc(t('v.search')) + '</span><input id="vQ" type="search" placeholder="' + esc(t('v.search')) + '" value="' + esc(V.q) + '"></label>' +
        '<select id="vD" aria-label="' + esc(t('v.district')) + '"><option value="">' + esc(t('v.all')) + '</option>' + districts.map(function (d) { return '<option' + (d === V.district ? ' selected' : '') + ' value="' + esc(d) + '">' + esc(d) + '</option>'; }).join('') + '</select>' +
        '</div>' +
        '<div id="vOut"></div>';
      $('#venueBody').innerHTML = h;
      $('#vQ').addEventListener('input', function (e) { V.q = e.target.value.trim().toLowerCase(); V.page = 1; drawVenue(); });
      $('#vD').addEventListener('change', function (e) { V.district = e.target.value; V.page = 1; drawVenue(); });
      V.q = V.q || '';
    }
    function pageList(cur, total) {
      var out = [], i; for (i = 1; i <= total; i++) { if (i === 1 || i === total || Math.abs(i - cur) <= 1) out.push(i); else if (out[out.length - 1] !== '…') out.push('…'); }
      return out;
    }
    function drawVenue(rebuild) {
      if (!$('#venueBody')) return;
      if (rebuild || !$('#vOut')) venueShell();
      var out = $('#vOut');
      if (V.state === 'loading') { out.innerHTML = '<div class="skeleton"></div>'; return; }
      if (V.state !== 'ok') { out.innerHTML = '<div class="na"><i class="bi bi-cloud-slash"></i><p>' + esc(t(V.state === 'nc' ? 'v.notconf' : 'v.error')) + '</p></div>'; return; }
      if (!V.rows.length) { out.innerHTML = '<div class="na"><i class="bi bi-buildings"></i><p>' + esc(t('v.empty')) + '</p></div>'; return; }
      var list = V.rows.filter(function (r) {
        return (!V.district || r.district === V.district) && (!V.q || (r.district + ' ' + r.venue + ' ' + r.address + ' ' + r.contact).toLowerCase().indexOf(V.q) > -1);
      });
      list.sort(function (a, b) { return V.dir * a[V.key].localeCompare(b[V.key], undefined, { numeric: true, sensitivity: 'base' }); });
      if (!list.length) { out.innerHTML = '<div class="na"><i class="bi bi-search"></i><p>' + esc(t('v.none')) + '</p></div>'; return; }
      var pages = Math.max(1, Math.ceil(list.length / V.size)); if (V.page > pages) V.page = pages;
      var from = (V.page - 1) * V.size, rows = list.slice(from, from + V.size);
      var h = '<div class="tbl-wrap"><table class="vtable"><thead><tr>' + COLS.map(function (c) {
        return '<th aria-sort="' + (V.key === c[0] ? (V.dir > 0 ? 'ascending' : 'descending') : 'none') + '"><button type="button" data-k="' + c[0] + '">' + esc(t(c[1])) + (V.key === c[0] ? ' <i class="bi bi-caret-' + (V.dir > 0 ? 'up' : 'down') + '-fill"></i>' : ' <i class="bi bi-chevron-expand"></i>') + '</button></th>';
      }).join('') + '</tr></thead><tbody>' + rows.map(function (r) {
        return '<tr>' + COLS.map(function (c) { return '<td data-label="' + esc(t(c[1])) + '">' + (esc(r[c[0]]) || '–') + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
      h += '<div class="pager"><span class="pg-info">' + esc(t('v.showing')) + ' ' + (from + 1) + '–' + (from + rows.length) + ' ' + esc(t('v.of')) + ' ' + list.length + '</span>' +
        '<div class="pg-btns"><button type="button" data-p="' + (V.page - 1) + '"' + (V.page === 1 ? ' disabled' : '') + ' aria-label="' + esc(t('v.prev')) + '"><i class="bi bi-chevron-left"></i></button>' +
        pageList(V.page, pages).map(function (p) { return p === '…' ? '<span class="pg-dots">…</span>' : '<button type="button" data-p="' + p + '"' + (p === V.page ? ' class="on" aria-current="page"' : '') + '>' + p + '</button>'; }).join('') +
        '<button type="button" data-p="' + (V.page + 1) + '"' + (V.page === pages ? ' disabled' : '') + ' aria-label="' + esc(t('v.next')) + '"><i class="bi bi-chevron-right"></i></button></div>' +
        '<label class="pg-size">' + esc(t('v.rows')) + ' <select id="vSize">' + [10, 25, 50].map(function (n) { return '<option' + (n === V.size ? ' selected' : '') + '>' + n + '</option>'; }).join('') + '</select></label></div>';
      out.innerHTML = h;
      $$('#vOut th button').forEach(function (b) { b.addEventListener('click', function () { if (V.key === b.dataset.k) V.dir *= -1; else { V.key = b.dataset.k; V.dir = 1; } drawVenue(); }); });
      $$('#vOut .pg-btns button').forEach(function (b) { b.addEventListener('click', function () { V.page = +b.dataset.p; drawVenue(); $('#plan-venue').scrollIntoView({ behavior: 'smooth', block: 'start' }); }); });
      $('#vSize').addEventListener('change', function (e) { V.size = +e.target.value; V.page = 1; drawVenue(); });
    }

    /* ---------- 4. Photo Gallery (Videos + Photos) ---------- */
    var B = window.MM_BROWSE, S = { videos: undefined, photos: undefined };
    var PHOTOS = { id: 'g-photos', dir: 'images/mm-marriage-photos', kind: 'images', icon: 'bi-images', caption: false };
    function getJson(path) { return fetch(M.ROOT + path).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); }).catch(function () { return null; }); }
    function loadGallery() {
      $('#tab-gallery').innerHTML = '<div class="skeleton"></div>';
      Promise.all([getJson('data/videos.json'), B.listDir(PHOTOS)]).then(function (r) { S.videos = r[0] || {}; S.photos = r[1]; drawGallery(); });
    }
    function platform(u) {
      var x = String(u).toLowerCase();
      if (/youtu\.?be/.test(x)) return { n: 'YouTube', i: 'bi-youtube', c: 'yt' };
      if (x.indexOf('instagram.com') > -1) return { n: 'Instagram', i: 'bi-instagram', c: 'ig' };
      if (x.indexOf('facebook.com') > -1 || x.indexOf('fb.watch') > -1) return { n: 'Facebook', i: 'bi-facebook', c: 'fb' };
      return { n: t('s.video'), i: 'bi-play-circle-fill', c: 'ot' };
    }
    function ytThumb(u) { var m = String(u).match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{11})/); return m ? 'https://img.youtube.com/vi/' + m[1] + '/hqdefault.jpg' : ''; }
    function safeUrl(u) { return /^https?:\/\//i.test(String(u)) ? u : ''; }
    function videoCard(v) {
      var url = safeUrl(v.url); if (!url) return '';
      var p = platform(url), th = p.c === 'yt' ? ytThumb(url) : '', title = pick(v.title) || p.n;
      return '<a class="vid" href="' + esc(url) + '" target="_blank" rel="noopener"><div class="vid-th ' + p.c + '">' + (th ? '<img src="' + esc(th) + '" alt="" loading="lazy" decoding="async" referrerpolicy="no-referrer" onerror="this.remove()">' : '') + '<i class="bi ' + p.i + ' vid-pl"></i></div>' +
        '<div class="vid-b"><span class="vid-badge ' + p.c + '"><i class="bi ' + p.i + '"></i>' + esc(p.n) + '</span><h4>' + esc(title) + '</h4>' + (v.description ? '<p>' + esc(pick(v.description)) + '</p>' : '') + '<span class="mini-link">' + esc(t('s.watch')) + ' <i class="bi bi-box-arrow-up-right"></i></span></div></a>';
    }
    function drawGallery() {
      var host = $('#tab-gallery'), vids = (S.videos.videos || []).filter(function (v) { return v && safeUrl(v.url); }), photos = S.photos || [];
      var shut = $$('#tab-gallery .c-sec.shut').map(function (x) { return x.id; });
      host.innerHTML = B.shell('g-videos', 'bi-play-btn-fill', t('s.videos'), vids.length, vids.length ? '<div class="pg-box" id="vidBox"></div>' : B.na()) +
        B.shell('g-photos', 'bi-images', t('s.photos'), photos.length, photos.length ? '<div class="pg-box" id="photoBox"></div>' : B.na());
      if (vids.length) B.paged($('#vidBox'), vids, 6, videoCard, 'cards');
      if (photos.length) B.paged($('#photoBox'), photos, 12, function (it) { return B.itemCard(it, PHOTOS); }, 'masonry');
      shut.forEach(function (id) { var x = document.getElementById(id); if (x) { x.classList.add('shut'); $('.c-head', x).setAttribute('aria-expanded', 'false'); } });
    }

    /* ---------- 5. FAQ ---------- */
    function faqLinks(f) {
      if (!f.links || !f.links.length) return '';
      return '<div class="faq-links">' + f.links.map(function (x) { return '<a class="mini-link" href="' + esc(M.ROOT + x.to) + '">' + esc(x[L()]) + ' <i class="bi bi-arrow-right"></i></a>'; }).join('') + '</div>';
    }
    function renderFaq() {
      var l = L();
      $('#tab-faq').innerHTML = '<p class="faq-intro">' + esc(t('g.faq.intro')) + '</p>' + window.MM_FAQ.map(function (f) {
        return '<article class="acc"><button class="acc-head" aria-expanded="false"><span class="acc-ic"><i class="bi bi-patch-question"></i></span><span class="acc-title">' + esc(f.q[l]) + '</span><i class="bi bi-chevron-down chev"></i></button><div class="acc-panel"><div class="acc-inner"><div class="acc-body prose"><p>' + esc(f.a[l]) + '</p>' + faqLinks(f) + '</div></div></div></article>';
      }).join('');
      $$('#tab-faq .acc').forEach(function (a) { $('.acc-head', a).addEventListener('click', function () { M.toggle(a); }); });
    }

    var INIT = {
      guidance: renderGuide, code: renderCode, faq: renderFaq,
      plan: function () { renderPlan(); loadVenues(); drawVenue(true); },
      gallery: loadGallery
    };

    document.addEventListener('mm:lang', function () {
      if (inited.guidance) renderGuide();
      if (inited.code) renderCode();
      if (inited.faq) renderFaq();
      if (inited.plan) { renderPlan(); drawVenue(true); }
      if (inited.gallery && S.videos !== undefined) drawGallery();
    });


    show(current(), false);

    /* ---------- Expand all / Collapse all for the open tab ---------- */
    M.toggleAll($('.panes'), 'beforebegin', function () { return $('.pane:not([hidden])'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
