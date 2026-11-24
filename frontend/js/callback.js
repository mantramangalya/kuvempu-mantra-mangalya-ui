/* "Request call back" widget: floating button on every page -> small modal -> saved in the Queries sheet
   (Topic = "Call back request", "What help you need?" -> Message column). Same rules as the Contact form. */
(function () {
  'use strict';
  var kn = {
    "cb.fab": "ಕರೆ ಮಾಡಲು ಕೋರಿ", "cb.hide": "ಮರೆಮಾಡಿ", "cb.title": "ಕರೆ ಮಾಡಲು ಕೋರಿ", "cb.name": "ಹೆಸರು", "cb.phone": "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ", "cb.place": "ಸ್ಥಳ (ಐಚ್ಛಿಕ)",
    "cb.help": "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?", "cb.submit": "ಕರೆ ಮಾಡಲು ಕೋರಿ", "cb.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…", "cb.close": "ಮುಚ್ಚಿ",
    "cb.ok": "ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ಕೋರಿಕೆ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮಗೆ ಕರೆ ಮಾಡುತ್ತೇವೆ.", "cb.fail": "ಕ್ಷಮಿಸಿ, ಕೋರಿಕೆಯನ್ನು ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ನಂತರ ಪ್ರಯತ್ನಿಸಿ.", "cb.notconf": "ಬ್ಯಾಕ್‌ಎಂಡ್ ಸೇವೆ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ. ದಯವಿಟ್ಟು ಸೈಟ್ ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    "cb.e.help": "ಇದು 3 ರಿಂದ 200 ಅಕ್ಷರಗಳಿರಬೇಕು.", "cb.e.helpreq": "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು ಎಂದು ತಿಳಿಸಿ."
  };
  var en = {
    "cb.fab": "Request call back", "cb.hide": "Hide", "cb.title": "Request a call back", "cb.name": "Name", "cb.phone": "Contact Number", "cb.place": "Place (optional)",
    "cb.help": "What help you need?", "cb.submit": "Request call back", "cb.sending": "Sending…", "cb.close": "Close",
    "cb.ok": "Thank you! Your request has been received. We will call you back soon.", "cb.fail": "Sorry, we could not send your request. Please try again later.", "cb.notconf": "The backend service is not connected yet. Please contact the site admin.",
    "cb.e.help": "This must be 3 to 200 characters.", "cb.e.helpreq": "Please tell us what help you need."
  };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });

  function start() {
    var M = window.MM, C = window.MM_CONFIG; if (!M) return;
    var t = M.t, esc = M.esc, $ = M.$, $$ = M.$$, modal = null, opener = null, busy = false;
    function L() { return M.lang(); }

    var gone = false; try { gone = sessionStorage.getItem('mm_cb_off') === '1'; } catch (e) {}
    var fab = document.createElement('button'); fab.type = 'button'; fab.className = 'cb-fab'; fab.id = 'cbFab';
    fab.innerHTML = '<i class="bi bi-telephone-inbound-fill"></i>';
    var wrap = document.createElement('div'); wrap.className = 'cb-wrap'; wrap.id = 'cbWrap'; wrap.hidden = gone;
    var off = document.createElement('button'); off.type = 'button'; off.className = 'cb-off'; off.innerHTML = '<i class="bi bi-x"></i>';
    wrap.appendChild(fab); wrap.appendChild(off); document.body.appendChild(wrap);
    function labels() { var l = t('cb.fab'); fab.setAttribute('aria-label', l); fab.title = l; off.setAttribute('aria-label', t('cb.hide')); off.title = t('cb.hide'); }
    labels(); document.addEventListener('mm:lang', labels);
    off.addEventListener('click', function () { wrap.hidden = true; try { sessionStorage.setItem('mm_cb_off', '1'); } catch (e) {} });

    var V = {
      name: function (v) { v = v.trim(); return !v ? 'err.name.req' : (v.length < 3 || v.length > 30) ? 'err.name.len' : ''; },
      phone: function (v) { v = v.trim(); return !v ? 'err.phone.req' : !/^[6-9]\d{9}$/.test(v) ? 'err.phone.fmt' : ''; },
      place: function (v) { return v.trim().length > 200 ? 'err.place.len' : ''; },
      help: function (v) { v = v.trim(); return !v ? 'cb.e.helpreq' : (v.length < 3 || v.length > 200) ? 'cb.e.help' : ''; }
    };
    function check(k) {
      var el = $('#cb-' + k, modal), wrap = el.closest('.field'), key = V[k](el.value), msg = $('.err', wrap);
      wrap.classList.toggle('invalid', !!key); msg.dataset.key = key; msg.textContent = key ? t(key) : ''; return !key;
    }
    function build() {
      modal = document.createElement('div'); modal.className = 'modal'; modal.id = 'cbModal'; modal.hidden = true;
      modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'cbTitle');
      function fld(k, label, input, req) { return '<div class="field" data-k="' + k + '"><label for="cb-' + k + '"><span data-i18n="' + label + '"></span>' + (req ? ' <span class="req">*</span>' : '') + '</label>' + input + '<div class="err" role="alert"></div></div>'; }
      modal.innerHTML = '<div class="modal-box sm"><button type="button" class="modal-x" id="cbX" data-i18n-aria="cb.close" aria-label="Close"><i class="bi bi-x-lg"></i></button>' +
        '<h2 id="cbTitle" data-i18n="cb.title"></h2>' +
        '<div class="alert ok" id="cbOk" role="status"><i class="bi bi-check-circle-fill"></i><span></span></div>' +
        '<div class="alert bad" id="cbBad" role="alert"><i class="bi bi-exclamation-triangle-fill"></i><span></span></div>' +
        '<form id="cbForm" novalidate>' +
        fld('name', 'cb.name', '<input id="cb-name" type="text" maxlength="30" autocomplete="name">', true) +
        fld('phone', 'cb.phone', '<input id="cb-phone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national">', true) +
        fld('place', 'cb.place', '<input id="cb-place" type="text" maxlength="200">', false) +
        fld('help', 'cb.help', '<textarea id="cb-help" rows="3" maxlength="200"></textarea><div class="hint" id="cb-cnt">0/200</div>', true) +
        '<input class="hp" id="cb-website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
        '<button class="btn btn-primary btn-block" type="submit" id="cbSubmit"><i class="bi bi-telephone-outbound-fill"></i><span data-i18n="cb.submit"></span></button></form></div>';
      document.body.appendChild(modal); M.applyI18n(modal);
      Object.keys(V).forEach(function (k) {
        var el = $('#cb-' + k, modal);
        el.addEventListener('blur', function () { check(k); });
        el.addEventListener('input', function () {
          if (k === 'phone') el.value = el.value.replace(/\D/g, '').slice(0, 10);
          if (k === 'help') $('#cb-cnt', modal).textContent = el.value.length + '/200';
          if (el.closest('.field').classList.contains('invalid')) check(k);
        });
      });
      $('#cbX', modal).addEventListener('click', close);
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      $('#cbForm', modal).addEventListener('submit', submit);
    }
    function setBusy(b) { busy = b; var btn = $('#cbSubmit', modal); btn.disabled = b; btn.innerHTML = b ? '<span class="spin"></span><span>' + esc(t('cb.sending')) + '</span>' : '<i class="bi bi-telephone-outbound-fill"></i><span>' + esc(t('cb.submit')) + '</span>'; }
    function submit(e) {
      e.preventDefault(); if (busy) return;
      var ok = $('#cbOk', modal), bad = $('#cbBad', modal); ok.classList.remove('show'); bad.classList.remove('show');
      if (!Object.keys(V).map(check).every(Boolean)) { var f = $('.field.invalid input,.field.invalid textarea', modal); if (f) f.focus(); return; }
      if ($('#cb-website', modal).value) return;                                   // honeypot
      if (!M.apiReady()) { $('span', bad).textContent = t('cb.notconf'); bad.classList.add('show'); return; }
      var payload = {
        type: 'query', 'Name': $('#cb-name', modal).value.trim(), 'Contact Number': $('#cb-phone', modal).value.trim(), 'Email': '',
        'Place': $('#cb-place', modal).value.trim(), 'Topic': 'Call back request', 'Message': $('#cb-help', modal).value.trim(),
        'Language': L() === 'kn' ? 'Kannada' : 'English', 'lang': L()
      };
      setBusy(true);
      fetch(C.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (!j || !j.ok) throw new Error('api');
          $('#cbForm', modal).reset(); $('#cb-cnt', modal).textContent = '0/200'; $$('.field', modal).forEach(function (w) { w.classList.remove('invalid'); });
          $('#cbForm', modal).hidden = true; $('span', ok).textContent = t('cb.ok'); ok.classList.add('show');
        })
        .catch(function (e) { $('span', bad).textContent = M.failMsg(e, 'cb.fail'); bad.classList.add('show'); })
        .then(function () { setBusy(false); });
    }
    function open() {
      if (!modal) build();
      opener = document.activeElement; $('#cbForm', modal).hidden = false; $('#cbOk', modal).classList.remove('show'); $('#cbBad', modal).classList.remove('show');
      modal.hidden = false; document.body.style.overflow = 'hidden'; $('#cb-name', modal).focus();
    }
    function close() { if (!modal || modal.hidden) return; modal.hidden = true; document.body.style.overflow = ''; if (opener && opener.focus) opener.focus(); }
    fab.addEventListener('click', open);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('mm:lang', function () {
      if (!modal) return; M.applyI18n(modal);
      $$('.err', modal).forEach(function (m) { if (m.dataset.key) m.textContent = t(m.dataset.key); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
