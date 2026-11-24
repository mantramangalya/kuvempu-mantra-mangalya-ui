/* Shared helpers for folder-based, collapsible, paginated sections
   (Downloads page + Guidance > Photo Gallery). Loaded after app.js. */
(function () {
  'use strict';
  var M = window.MM; if (!M) return;
  var t = M.t, esc = M.esc, $ = M.$, $$ = M.$$;
  var IMG = M.EXT_RE, PDF = /\.pdf$/i, DOC = /\.(docx?|pptx?|xlsx?)$/i;

  function pick(o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[M.lang()] || o.kn || o.en || ''; }
  function fmtSize(b) { if (!b) return ''; return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB'; }
  function label(file, cfg) {
    if (cfg.label) return pick(cfg.label);
    var base = file.replace(/\.[^.]+$/, ''), m = base.match(/(\d+)$/), lbl = cfg.itemLabel ? pick(cfg.itemLabel) : '';
    if (lbl && m) return lbl + ' ' + m[1];
    return base.replace(/[-_]+/g, ' ');
  }

  /* ---- listing: manifest first (any file name / format), numbered-name probing as a local-dev fallback ---- */
  var PROBE_EXT = ['webp', 'jpg', 'jpeg', 'png', 'svg', 'avif', 'gif', 'pdf', 'docx', 'doc'];
  function exists(url) { return fetch(url, { method: 'HEAD' }).then(function (r) { return r.ok; }).catch(function () { return false; }); }
  function probe(cfg) {
    var items = [], misses = 0;
    function step(i) {
      if (misses >= 2 || i > 60) return Promise.resolve(items);
      return Promise.all(PROBE_EXT.map(function (e) { var f = cfg.prefix + i + '.' + e; return exists(M.ROOT + cfg.dir + '/' + f).then(function (ok) { return ok ? f : null; }); })).then(function (res) {
        var hit = res.filter(Boolean)[0];
        if (hit) { items.push({ file: hit }); misses = 0; } else misses++;
        return step(i + 1);
      });
    }
    return step(1);
  }
  function listDir(cfg) {
    var d = window.MM_MANIFEST && window.MM_MANIFEST.dirs && window.MM_MANIFEST.dirs[cfg.dir];
    if (Array.isArray(d)) return Promise.resolve(d);
    if (cfg.file) return exists(M.ROOT + cfg.dir + '/' + cfg.file).then(function (ok) { return ok ? [{ file: cfg.file }] : []; });
    return cfg.prefix ? probe(cfg) : Promise.resolve([]);
  }

  /* ---- item cards ---- */
  function itemCard(it, cfg) {
    var src = M.ROOT + cfg.dir + '/' + encodeURIComponent(it.file), lb = label(it.file, cfg);
    if (IMG.test(it.file)) {
      return '<div class="gal-item" data-full="' + esc(src) + '" data-name="' + esc(it.file) + '" data-dl="' + esc(src) + '" data-local="1"><img src="' + esc(src) + '" alt="' + esc(lb) + '" loading="lazy" decoding="async">' +
        (cfg.caption === false ? '' : '<span class="gal-cap">' + esc(lb) + '</span>') + M.actions(src, it.file, true) + '</div>';
    }
    var icon = PDF.test(it.file) ? 'bi-file-earmark-pdf' : /\.docx?$/i.test(it.file) ? 'bi-file-earmark-word' : 'bi-file-earmark-text';
    return '<article class="card file hover"><div class="thumb"><i class="bi ' + icon + '"></i></div><h3>' + esc(lb) + '</h3><div class="meta">' + esc(it.file.split('.').pop().toUpperCase()) + (it.size ? ' · ' + esc(fmtSize(it.size)) : '') + '</div><div class="row">' +
      (PDF.test(it.file) ? '<a class="btn btn-light" href="' + esc(src) + '" target="_blank" rel="noopener"><i class="bi bi-eye"></i>' + esc(t('dl.view')) + '</a>' : DOC.test(it.file) ? '<a class="btn btn-light" href="https://view.officeapps.live.com/op/view.aspx?src=' + encodeURIComponent(new URL(src, location.href).href) + '" target="_blank" rel="noopener"><i class="bi bi-eye"></i>' + esc(t('dl.view')) + '</a>' : '') +
      '<a class="btn btn-primary" href="' + esc(src) + '" download="' + esc(it.file) + '"><i class="bi bi-download"></i>' + esc(t('dl.download')) + '</a></div></article>';
  }

  /* ---- collapsible section shell ---- */
  function shell(id, icon, title, count, inner, note) {
    return '<section class="c-sec reveal in" id="' + esc(id) + '"><div class="c-head" role="button" tabindex="0" aria-expanded="true"><span class="acc-ic"><i class="bi ' + esc(icon) + '"></i></span><h3>' + esc(title) + '</h3>' +
      (count == null ? '' : '<span class="count">' + count + '</span>') + '<i class="bi bi-chevron-down chev"></i></div><div class="c-body">' + (note || '') + inner + '</div></section>';
  }
  function na() { return '<div class="na"><i class="bi bi-inbox"></i><p>' + esc(t('s.na')) + '</p></div>'; }

  /* ---- pagination ---- */
  function pageList(cur, total) {
    var out = [], i; for (i = 1; i <= total; i++) { if (i === 1 || i === total || Math.abs(i - cur) <= 1) out.push(i); else if (out[out.length - 1] !== '…') out.push('…'); }
    return out;
  }
  /* box: element that will hold the grid + pager. kind: 'masonry' | 'cards' */
  function paged(box, items, size, render, kind) {
    var page = 1, pages = Math.max(1, Math.ceil(items.length / size));
    box.innerHTML = '<div class="' + (kind === 'masonry' ? 'masonry' : kind === 'list' ? 'cm-list' : 'cards c3') + ' pg-grid"></div><div class="pager pg-nav"></div>';
    var grid = $('.pg-grid', box), nav = $('.pg-nav', box);
    function draw(scroll) {
      var from = (page - 1) * size, chunk = items.slice(from, from + size);
      grid.innerHTML = chunk.map(render).join('');
      if (pages < 2) { nav.innerHTML = ''; nav.hidden = true; return; }
      nav.hidden = false;
      nav.innerHTML = '<span class="pg-info">' + esc(t('v.showing')) + ' ' + (from + 1) + '–' + (from + chunk.length) + ' ' + esc(t('v.of')) + ' ' + items.length + '</span>' +
        '<div class="pg-btns"><button type="button" data-p="' + (page - 1) + '"' + (page === 1 ? ' disabled' : '') + ' aria-label="' + esc(t('v.prev')) + '"><i class="bi bi-chevron-left"></i></button>' +
        pageList(page, pages).map(function (p) { return p === '…' ? '<span class="pg-dots">…</span>' : '<button type="button" data-p="' + p + '"' + (p === page ? ' class="on" aria-current="page"' : '') + '>' + p + '</button>'; }).join('') +
        '<button type="button" data-p="' + (page + 1) + '"' + (page === pages ? ' disabled' : '') + ' aria-label="' + esc(t('v.next')) + '"><i class="bi bi-chevron-right"></i></button></div>';
      $$('button[data-p]', nav).forEach(function (b) { b.addEventListener('click', function () { page = +b.dataset.p; draw(true); }); });
      if (scroll) { var sec = box.closest('.c-sec') || box; sec.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    }
    draw(false);
  }

  /* ---- a folder section (images -> masonry, other files -> cards) ---- */
  function folderSection(cfg, items) {
    var imgs = cfg.kind === 'images' || (items.length && items.every(function (x) { return IMG.test(x.file); }));
    var note = '';
    if (cfg.note) {
      var l = cfg.noteLink;
      note = '<p class="sec-note"><i class="bi bi-info-circle"></i><span>' + esc(pick(cfg.note)) + (l ? ' <a href="' + esc(M.ROOT + l.to) + '">' + esc(pick(l)) + ' <i class="bi bi-arrow-right"></i></a>' : '') + '</span></p>';
    }
    return { html: shell(cfg.id, cfg.icon || 'bi-folder2-open', pick(cfg.title), items.length, items.length ? '<div class="pg-box" data-sec="' + esc(cfg.id) + '"></div>' : na(), note),
      fill: function (root) {
        var box = $('.pg-box[data-sec="' + cfg.id + '"]', root); if (!box) return;
        paged(box, items, imgs ? 12 : 6, function (it) { return itemCard(it, cfg); }, imgs ? 'masonry' : 'cards');
      } };
  }

  window.MM_BROWSE = { listDir: listDir, itemCard: itemCard, shell: shell, na: na, paged: paged, folderSection: folderSection, pick: pick };
})();
