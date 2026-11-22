/* Comments + "Leave a Reply" (Guidance and Community pages).
   Reads ONLY approved comments (GET ?action=comments) and posts new ones with {type:'comment'} -> backend sheet "Comments". */
(function () {
  'use strict';
  var kn = {
    "cm.title": "ಓದುಗರ ಅಭಿಪ್ರಾಯಗಳು", "cm.reply": "ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ", "cm.name": "ಹೆಸರು", "cm.comment": "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ", "cm.like": "ಇಷ್ಟ", "cm.ph": "ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ, ಯೋಚನೆ ಅಥವಾ ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಬರೆಯಿರಿ…", "cm.submit": "ಕಳುಹಿಸಿ", "cm.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…",
    "cm.none": "ಇನ್ನೂ ಯಾವುದೇ ಅಭಿಪ್ರಾಯಗಳಿಲ್ಲ. ಮೊದಲಿಗರಾಗಿ ಬರೆಯಿರಿ!", "cm.ok": "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಅಭಿಪ್ರಾಯ ಸ್ವೀಕರಿಸಲಾಗಿದೆ; ಅನುಮೋದನೆಯ ನಂತರ ಇಲ್ಲಿ ಕಾಣಿಸುತ್ತದೆ.", "cm.fail": "ಕ್ಷಮಿಸಿ, ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.", "cm.notconf": "ಸರ್ವರ್ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.",
    "cm.e.req": "ಇದು ಕಡ್ಡಾಯ.", "cm.e.name": "ಹೆಸರು 3 ರಿಂದ 30 ಅಕ್ಷರಗಳಿರಬೇಕು.", "cm.e.chars": "ಅಕ್ಷರಗಳು ಮತ್ತು ಖಾಲಿ ಜಾಗ ಮಾತ್ರ ಅನುಮತಿ; ವಿಶೇಷ ಚಿಹ್ನೆಗಳು ಬೇಡ.", "cm.e.text": "ಅಭಿಪ್ರಾಯ 3 ರಿಂದ 500 ಅಕ್ಷರಗಳಿರಬೇಕು."
  };
  var en = {
    "cm.title": "Reader comments", "cm.reply": "Leave a Reply", "cm.name": "Name", "cm.comment": "Your comment", "cm.like": "Like", "cm.ph": "Write your comment, thoughts or question here…", "cm.submit": "Submit", "cm.sending": "Sending…",
    "cm.none": "No comments yet. Be the first to write one!", "cm.ok": "Thank you! Your comment has been received and will appear here after approval.", "cm.fail": "Sorry, we could not submit it. Please try again later.", "cm.notconf": "Backend is not connected yet.",
    "cm.e.req": "This field is required.", "cm.e.name": "Name must be 3 to 30 characters.", "cm.e.chars": "Only letters and spaces are allowed; no special characters.", "cm.e.text": "Comment must be 3 to 500 characters."
  };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });

  function start() {
    var M = window.MM, B = window.MM_BROWSE, C = window.MM_CONFIG;
    if (!M || !B || !document.getElementById('cmForm')) return;
    var t = M.t, esc = M.esc, $ = M.$, $$ = M.$$;
    function L() { return M.lang(); }
    var list = null, state = 'loading', busy = false;
    function likedSet() { try { return JSON.parse(localStorage.getItem('mm_liked') || '[]'); } catch (e) { return []; } }
    function isLiked(id) { return !!id && likedSet().indexOf(id) > -1; }
    function markLiked(id, on) { try { var a = likedSet().filter(function (x) { return x !== id; }); if (on) a.push(id); localStorage.setItem('mm_liked', JSON.stringify(a)); } catch (e) {} }
    function drawList() {
      var box = $('#cmList'); if (!box) return;
      if (state === 'loading') { box.innerHTML = '<div class="skeleton" style="min-height:90px"></div>'; return; }
      if (!list || !list.length) { box.innerHTML = '<div class="placeholder-box"><i class="bi bi-chat-square-heart"></i>' + esc(t('cm.none')) + '</div>'; return; }
      B.paged(box, list, 5, function (c) {
        var liked = isLiked(c.id), n = +c.likes || 0;
        return '<article class="cm"><span class="cm-av"><i class="bi bi-person-circle"></i></span><div class="cm-b"><div class="cm-h"><strong>' + esc(c.name) + '</strong>' + (c.date ? '<small><i class="bi bi-clock"></i> ' + esc(c.date) + '</small>' : '') + '</div><p><i class="bi bi-chat-quote-fill"></i>' + esc(c.comment).replace(/\n/g, '<br>') + '</p>' +
          (c.id ? '<button type="button" class="cm-like' + (liked ? ' liked' : '') + '" data-id="' + esc(c.id) + '"' + (liked ? ' disabled' : '') + ' aria-label="' + esc(t('cm.like')) + '"><i class="bi ' + (liked ? 'bi-heart-fill' : 'bi-heart') + '"></i><span>' + n + '</span></button>' : '') + '</div></article>';
      }, 'list');
    }
    var listBox = $('#cmList');
    listBox.addEventListener('click', function (e) {                       // one like per browser per comment
      var b = e.target.closest('.cm-like'); if (!b || b.disabled) return;
      var id = b.dataset.id, item = (list || []).filter(function (c) { return c.id === id; })[0];
      if (!item || isLiked(id) || !M.apiReady()) return;
      function paint(on) { b.classList.toggle('liked', on); b.disabled = on; $('i', b).className = 'bi ' + (on ? 'bi-heart-fill' : 'bi-heart'); $('span', b).textContent = +item.likes || 0; }   // in place: keeps the current page
      item.likes = (+item.likes || 0) + 1; markLiked(id, true); paint(true);
      fetch(C.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, redirect: 'follow', body: JSON.stringify({ type: 'like', 'Comment Id': id }) })
        .then(function (r) { return r.json(); })
        .then(function (j) { if (!j || !j.ok) throw new Error('api'); if (typeof j.likes === 'number') { item.likes = j.likes; paint(true); } })
        .catch(function () { item.likes = Math.max(0, (+item.likes || 1) - 1); markLiked(id, false); paint(false); });
    });
    function load(j) { list = (j.comments || []).filter(function (c) { return c && c.comment; }); state = 'ok'; drawList(); }
    var c0 = M.cached('comments'); if (c0) load(c0); else drawList();
    M.apiGet('comments').then(load).catch(function () { if (state === 'loading') { state = 'err'; drawList(); } });
    document.addEventListener('mm:lang', function () { drawList(); $$('#cmForm .err').forEach(function (m) { if (m.dataset.key) m.textContent = t(m.dataset.key); }); });

    var f = $('#cmForm'); if (!f) return;
    var NAME_RE = /^[\p{L}\p{M} ]+$/u;
    var V = {
      name: function () { var v = $('#cm-name').value.trim(); return !v ? 'cm.e.req' : (v.length < 3 || v.length > 30) ? 'cm.e.name' : NAME_RE.test(v) ? '' : 'cm.e.chars'; },
      text: function () { var v = $('#cm-text').value.trim(); return !v ? 'cm.e.req' : (v.length < 3 || v.length > 500) ? 'cm.e.text' : ''; }
    };
    function check(k) { var w = $('.field[data-k="' + k + '"]', f), key = V[k](), m = $('.err', w); w.classList.toggle('invalid', !!key); m.dataset.key = key; m.textContent = key ? t(key) : ''; return !key; }
    [['name', '#cm-name'], ['text', '#cm-text']].forEach(function (p) {
      var el = $(p[1]); el.addEventListener('blur', function () { check(p[0]); });
      el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) check(p[0]); if (p[0] === 'text') $('#cm-cnt').textContent = el.value.length + '/500'; });
    });
    var ok = $('#cmOk'), bad = $('#cmBad'), btn = $('#cmSubmit');
    function setBusy(b) { busy = b; btn.disabled = b; btn.innerHTML = b ? '<span class="spin"></span><span>' + esc(t('cm.sending')) + '</span>' : '<i class="bi bi-send-fill"></i><span>' + esc(t('cm.submit')) + '</span>'; }
    f.addEventListener('submit', function (e) {
      e.preventDefault(); if (busy) return; ok.classList.remove('show'); bad.classList.remove('show');
      if (!Object.keys(V).map(check).every(Boolean)) { var first = $('.field.invalid input,.field.invalid textarea', f); if (first) first.focus(); return; }
      if ($('#cm-website').value) return;                               // honeypot
      if (!M.apiReady()) { $('span', bad).textContent = t('cm.notconf'); bad.classList.add('show'); return; }
      setBusy(true);
      fetch(C.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, redirect: 'follow',
        body: JSON.stringify({ type: 'comment', 'Name': $('#cm-name').value.trim(), 'User Comment': $('#cm-text').value.trim(), lang: L() }) })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.ok) throw new Error('api');
          f.reset(); $('#cm-cnt').textContent = '0/500'; $$('.field', f).forEach(function (w) { w.classList.remove('invalid'); });
          $('span', ok).textContent = t('cm.ok'); ok.classList.add('show'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
        })
        .catch(function () { $('span', bad).textContent = t('cm.fail'); bad.classList.add('show'); })
        .then(function () { setBusy(false); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
