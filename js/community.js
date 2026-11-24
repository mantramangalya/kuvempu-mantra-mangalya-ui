/* Community page: couples photos, "Community says" (data/community-says.json) and the Join Community modal. */
(function () {
  'use strict';
  var kn = {
    "com.says": "ಸಮುದಾಯ ಹೇಳುತ್ತದೆ", "com.intro": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ರೀತಿಯಲ್ಲಿ ವಿವಾಹವಾದ ದಂಪತಿಗಳ ಪುಟ ಇದು.",
    "com.join.title": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ", "com.join.text": "ನೀವು ಮಂತ್ರ ಮಾಂಗಲ್ಯ ರೀತಿಯಲ್ಲಿ ವಿವಾಹವಾಗಿದ್ದೀರಾ? ನಮ್ಮ ಕುಟುಂಬದ ಭಾಗವಾಗಿ.", "com.join.btn": "ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ",
    "com.couples.none": "ದಂಪತಿಗಳ ಚಿತ್ರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "com.says.by": "ಮತ್ತು",
    "j.title": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿ", "j.s1": "ವೈಯಕ್ತಿಕ ಮಾಹಿತಿ", "j.s2": "ಸಂಪರ್ಕ ಮತ್ತು ವಿಳಾಸ", "j.s3": "ಮದುವೆಯ ಮಾಹಿತಿ",
    "j.name": "ಹೆಸರು", "j.spouse": "ಸಂಗಾತಿಯ ಹೆಸರು", "j.spouse.skip": "ಸಂಗಾತಿ ಈಗ ಇಲ್ಲ (ಬಿಟ್ಟುಬಿಡಿ)",
    "j.phone": "ಸಂಪರ್ಕ ಸಂಖ್ಯೆ", "j.email": "ಇಮೇಲ್", "j.email.skip": "ನನ್ನ ಬಳಿ ಇಮೇಲ್ ಇಲ್ಲ", "j.district": "ಜಿಲ್ಲೆ", "j.district.sel": "ಜಿಲ್ಲೆ ಆರಿಸಿ",
    "j.consent": "ನಿಮ್ಮ ಸಂಪರ್ಕ ಮಾಹಿತಿಯನ್ನು ಸಂವಹನದ ಉದ್ದೇಶಕ್ಕೆ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ. ಅದನ್ನು ಬೇರೆ ಯಾರೊಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳುವುದಿಲ್ಲ ಮತ್ತು ಅದು ಈ ಸೈಟ್‌ನ ಮಾಲೀಕರ ಬಳಿ ಇರುತ್ತದೆ.",
    "j.date": "ಮದುವೆಯ ದಿನಾಂಕ", "j.date.ph": "ದಿ/ತಿ/ವರ್ಷ (DD/MM/YYYY)", "j.place": "ಮದುವೆಯ ಸ್ಥಳ", "j.place.ph": "ಊರು / ಪ್ರದೇಶ / ಪೂರ್ಣ ವಿಳಾಸ",
    "j.exp": "ಸಮುದಾಯಕ್ಕೆ ಅನುಭವ / ಮಾತುಗಳು (ಐಚ್ಛಿಕ)", "j.help": "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ರೀತಿಯಲ್ಲಿ ಮದುವೆಯಾಗಲು ಬಯಸುವವರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿ ಮದುವೆ ನಡೆಸಿಕೊಡಲು ನೀವು ಆಸಕ್ತರೇ?",
    "j.yes": "ಹೌದು", "j.no": "ಇಲ್ಲ", "j.submit": "ಸೇರಿ", "j.sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ…", "j.close": "ಮುಚ್ಚಿ",
    "j.ok": "ಧನ್ಯವಾದಗಳು! ನೀವು ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಸಮುದಾಯಕ್ಕೆ ಸೇರಿದ್ದೀರಿ.", "j.ok.mail": "ದೃಢೀಕರಣ ಮೇಲ್ ಅನ್ನು ನಿಮ್ಮ ಇಮೇಲ್‌ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.",
    "j.dup": "ಈ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯ ವಿವರಗಳು ಈಗಾಗಲೇ ಇವೆ. ವಿವರಗಳನ್ನು ಬದಲಿಸಲು ಬಯಸಿದರೆ ಸಂಪರ್ಕ ಫಾರ್ಮ್ ಮೂಲಕ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.", "j.dup.link": "ಸಂಪರ್ಕ ಫಾರ್ಮ್‌ಗೆ ಹೋಗಿ",
    "j.fail": "ಕ್ಷಮಿಸಿ, ವಿವರಗಳನ್ನು ಕಳುಹಿಸಲಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.", "j.notconf": "ಸರ್ವರ್ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ.",
    "j.e.name": "ಹೆಸರು 3 ರಿಂದ 30 ಅಕ್ಷರಗಳಿರಬೇಕು.", "j.e.chars": "ಅಕ್ಷರಗಳು ಮತ್ತು ಖಾಲಿ ಜಾಗ ಮಾತ್ರ ಅನುಮತಿ; ವಿಶೇಷ ಚಿಹ್ನೆಗಳು ಬೇಡ.", "j.e.req": "ಇದು ಕಡ್ಡಾಯ.",
    "j.e.phone": "10 ಅಂಕಿಯ ಭಾರತೀಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ನೀಡಿ.", "j.e.email": "ಸರಿಯಾದ ಇಮೇಲ್ ವಿಳಾಸ ನೀಡಿ.", "j.e.date": "ಸರಿಯಾದ ದಿನಾಂಕವನ್ನು DD/MM/YYYY ರೂಪದಲ್ಲಿ ನೀಡಿ.", "j.e.future": "ಭವಿಷ್ಯದ ದಿನಾಂಕ ಬೇಡ.",
    "j.e.place": "ಸ್ಥಳ 3 ರಿಂದ 50 ಅಕ್ಷರಗಳಿರಬೇಕು.", "j.e.exp": "ಅನುಭವ 3 ರಿಂದ 200 ಅಕ್ಷರಗಳಿರಬೇಕು."
  };
  var en = {
    "com.says": "Community says", "com.intro": "This page is for couples who married the Mantra Mangalya way.",
    "com.join.title": "Join the Mantra Mangalya Community", "com.join.text": "Did you marry the Mantra Mangalya way? Be a part of our family.", "com.join.btn": "Join the Community",
    "com.couples.none": "Photos of couples will be added soon.", "com.says.by": "&",
    "j.title": "Join the Mantra Mangalya Community", "j.s1": "Personal Info", "j.s2": "Contact and Address Info", "j.s3": "Marriage Info",
    "j.name": "Name", "j.spouse": "Spouse Name", "j.spouse.skip": "Spouse is no more (skip)",
    "j.phone": "Contact Number", "j.email": "Email", "j.email.skip": "I don't have an email", "j.district": "District", "j.district.sel": "Select district",
    "j.consent": "Your contact information is used only for communication purposes. It will not be shared with anyone else and it lies with the owner of this site.",
    "j.date": "Date of Marriage", "j.date.ph": "DD/MM/YYYY", "j.place": "Place of Marriage", "j.place.ph": "Town / area / full address",
    "j.exp": "Experience / words to the community (optional)", "j.help": "Are you interested to guide and conduct weddings for people who want to marry the Mantra Mangalya way?",
    "j.yes": "Yes", "j.no": "No", "j.submit": "Join", "j.sending": "Sending…", "j.close": "Close",
    "j.ok": "Thank you! You have joined the Mantra Mangalya community.", "j.ok.mail": "A confirmation email has been sent to your email address.",
    "j.dup": "Details for this mobile number already exist. If you want to update any details, please connect with us using the Contact form.", "j.dup.link": "Go to the Contact form",
    "j.fail": "Sorry, we could not submit your details. Please try again after some time.", "j.notconf": "Backend is not connected yet.",
    "j.e.name": "Name must be 3 to 30 characters.", "j.e.chars": "Only letters and spaces are allowed; no special characters.", "j.e.req": "This field is required.",
    "j.e.phone": "Enter a 10-digit Indian mobile number.", "j.e.email": "Enter a valid email address.", "j.e.date": "Enter a valid date as DD/MM/YYYY.", "j.e.future": "Future dates are not allowed.",
    "j.e.place": "Place must be 3 to 50 characters.", "j.e.exp": "Experience must be 3 to 200 characters."
  };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });

  function start() {
    var M = window.MM, B = window.MM_BROWSE, C = window.MM_CONFIG;
    if (!M) return;
    if (!B) B = { pick: function (o) { if (o == null) return ''; if (typeof o === 'string') return o; return o[M.lang()] || o.kn || o.en || ''; } };
    var t = M.t, esc = M.esc, $ = M.$, $$ = M.$$;
    function L() { return M.lang(); }
    function pick(o) { return B.pick(o); }
    function getJson(path) { return fetch(M.ROOT + path).then(function (r) { if (!r.ok) throw 0; return r.json(); }).catch(function () { return null; }); }

    /* ---------- couples photos: every image in images/mm-community-couples (any name, any format) ---------- */
    var COUPLES = { dir: 'images/mm-community-couples', kind: 'images', caption: false };
    var couples = null, order = null;
    function drawCouples() {
      var g = $('#coupleGrid'); if (couples === null) return;
      if (!couples.length) { g.innerHTML = '<div class="placeholder-box"><i class="bi bi-images"></i>' + esc(t('com.couples.none')) + '</div>'; return; }
      if (!order || order.length !== couples.length) order = couples.slice().sort(function () { return Math.random() - .5; });   // new random order on every visit
      g.innerHTML = '<div class="pers-wrap couple-wrap"><button type="button" class="pers-nav pers-prev" aria-label="' + esc(t('v.prev')) + '" hidden><i class="bi bi-chevron-left"></i></button>' +
        '<div class="pers couple-pers" role="list">' + order.map(function (it) {
          var src = M.ROOT + COUPLES.dir + '/' + encodeURIComponent(it.file);
          return '<figure class="pers-card" role="listitem" data-full="' + esc(src) + '" data-name="' + esc(it.file) + '" data-dl="' + esc(src) + '" data-local="1"><div class="pers-img"><img src="' + esc(src) + '" alt="" loading="lazy" decoding="async"></div></figure>';
        }).join('') + '</div><button type="button" class="pers-nav pers-next" aria-label="' + esc(t('v.next')) + '" hidden><i class="bi bi-chevron-right"></i></button></div>';
      var box = $('.couple-pers', g), pv = $('.pers-prev', g), nx = $('.pers-next', g);
      function nav() { var more = box.scrollWidth > box.clientWidth + 4; pv.hidden = !more || box.scrollLeft < 4; nx.hidden = !more || box.scrollLeft + box.clientWidth >= box.scrollWidth - 4; }
      function slide(d) { box.scrollBy({ left: d * Math.max(120, box.clientWidth * 0.75), behavior: 'smooth' }); }
      pv.addEventListener('click', function () { slide(-1); }); nx.addEventListener('click', function () { slide(1); });
      box.addEventListener('scroll', nav, { passive: true }); window.addEventListener('resize', nav);
      $$('img', box).forEach(function (im) { im.addEventListener('load', nav); });
      setTimeout(nav, 60); setTimeout(nav, 500);
    }

    /* ---------- Community says ---------- */
    var says = null;
    function drawSays() {
      var box = $('#saysBox'); if (says === null) return;
      if (!says.length) { box.innerHTML = '<div class="placeholder-box"><i class="bi bi-hourglass-split"></i><b>' + esc(t('soon')) + '</b><br>' + esc(t('soon.detail')) + '</div>'; return; }
      B.paged(box, says, 6, function (s) {
        return '<article class="card says"><i class="bi bi-quote says-q"></i><p class="says-msg">' + esc(pick(s.message)) + '</p><div class="says-by"><b>' + esc(pick(s.husband)) + ' ' + esc(t('com.says.by')) + ' ' + esc(pick(s.wife)) + '</b>' +
          (s.profession ? '<span><i class="bi bi-briefcase-fill"></i>' + esc(pick(s.profession)) + '</span>' : '') +
          (s.place ? '<span><i class="bi bi-geo-alt-fill"></i>' + esc(pick(s.place)) + '</span>' : '') + '</div></article>';
      }, 'cards');
    }

    if ($('#coupleGrid')) {                                   // gallery + 'Community says' exist on the Community page only
      Promise.all([B.listDir(COUPLES), getJson('data/community-says.json')]).then(function (r) {
        couples = r[0]; says = (r[1] && r[1].items || []).filter(function (x) { return x && x.message; });
        drawCouples(); drawSays();
      });
      document.addEventListener('mm:lang', function () { drawCouples(); drawSays(); });
    }

    /* ---------- Join modal ---------- */
    var districts = [], modal = null, opener = null;
    getJson('data/districts.json').then(function (j) { districts = (j && j.districts) || []; });

    function build() {
      modal = document.createElement('div'); modal.className = 'modal'; modal.id = 'joinModal'; modal.hidden = true;
      modal.setAttribute('role', 'dialog'); modal.setAttribute('aria-modal', 'true'); modal.setAttribute('aria-labelledby', 'jTitle');
      function fld(id, label, input, extra) { return '<div class="field" data-k="' + id + '"><label for="j-' + id + '"><span data-i18n="' + label + '"></span> <span class="req">*</span></label>' + input + (extra || '') + '<div class="err" role="alert"></div></div>'; }
      function skip(id, key) { return '<label class="skip"><input type="checkbox" id="j-' + id + 'Skip"><span data-i18n="' + key + '"></span></label>'; }
      modal.innerHTML = '<div class="modal-box"><button type="button" class="modal-x" id="jX" data-i18n-aria="j.close" aria-label="Close"><i class="bi bi-x-lg"></i></button>' +
        '<h2 id="jTitle" data-i18n="j.title"></h2>' +
        '<div class="alert ok" id="jOk" role="status"><i class="bi bi-check-circle-fill"></i><span></span></div>' +
        '<div class="alert bad" id="jBad" role="alert"><i class="bi bi-exclamation-triangle-fill"></i><span></span></div>' +
        '<form id="joinForm" novalidate>' +
        '<h3 class="j-sec" data-i18n="j.s1"></h3>' +
        fld('name', 'j.name', '<input id="j-name" type="text" maxlength="30" autocomplete="name">') +
        fld('spouse', 'j.spouse', '<input id="j-spouse" type="text" maxlength="30">', skip('spouse', 'j.spouse.skip')) +
        '<h3 class="j-sec" data-i18n="j.s2"></h3>' +
        fld('phone', 'j.phone', '<input id="j-phone" type="tel" inputmode="numeric" maxlength="10" autocomplete="tel-national">') +
        fld('email', 'j.email', '<input id="j-email" type="email" autocomplete="email">', skip('email', 'j.email.skip')) +
        fld('district', 'j.district', '<select id="j-district"></select>') +
        '<div class="consent"><i class="bi bi-shield-lock-fill"></i><p data-i18n="j.consent"></p></div>' +
        '<h3 class="j-sec" data-i18n="j.s3"></h3>' +
        fld('date', 'j.date', '<input id="j-date" type="text" inputmode="numeric" maxlength="10" autocomplete="off" data-i18n-placeholder="j.date.ph">') +
        fld('place', 'j.place', '<input id="j-place" type="text" maxlength="50" data-i18n-placeholder="j.place.ph">') +
        '<div class="field" data-k="exp"><label for="j-exp" data-i18n="j.exp"></label><textarea id="j-exp" maxlength="200" rows="3"></textarea><div class="hint" id="j-cnt">0/200</div><div class="err" role="alert"></div></div>' +
        '<div class="field" data-k="help"><label><span data-i18n="j.help"></span> <span class="req">*</span></label><div class="radios"><label><input type="radio" name="jhelp" value="Y"> <span data-i18n="j.yes"></span></label><label><input type="radio" name="jhelp" value="N" checked> <span data-i18n="j.no"></span></label></div></div>' +
        '<button class="btn btn-primary btn-block" type="submit" id="jSubmit"><i class="bi bi-send-fill"></i><span data-i18n="j.submit"></span></button>' +
        '</form></div>';
      document.body.appendChild(modal);
      fillDistricts(); M.applyI18n(modal); wire();
    }
    function fillDistricts() {
      var sel = $('#j-district', modal), cur = sel.value, l = L();
      var list = districts.slice().sort(function (a, b) { return String(a[l] || a.en).localeCompare(String(b[l] || b.en), l === 'kn' ? 'kn' : 'en'); });
      sel.innerHTML = '<option value="">' + esc(t('j.district.sel')) + '</option>' + list.map(function (d) { return '<option value="' + esc(d.en) + '">' + esc(d[l] || d.en) + '</option>'; }).join('');
      sel.value = cur;
    }
    var NAME_RE = /^[\p{L}\p{M} ]+$/u;
    function nameErr(v) { v = v.trim(); if (!v) return 'j.e.req'; if (v.length < 3 || v.length > 30) return 'j.e.name'; return NAME_RE.test(v) ? '' : 'j.e.chars'; }
    function dateErr(v) {
      var m = v.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if (!m) return v.trim() ? 'j.e.date' : 'j.e.req';
      var d = new Date(+m[3], +m[2] - 1, +m[1]);
      if (d.getFullYear() !== +m[3] || d.getMonth() !== +m[2] - 1 || d.getDate() !== +m[1] || +m[3] < 1900) return 'j.e.date';
      var n = new Date(); n.setHours(0, 0, 0, 0);
      return d > n ? 'j.e.future' : '';
    }
    var V = {
      name: function () { return nameErr($('#j-name', modal).value); },
      spouse: function () { return $('#j-spouseSkip', modal).checked ? '' : nameErr($('#j-spouse', modal).value); },
      phone: function () { var v = $('#j-phone', modal).value.trim(); return !v ? 'j.e.req' : !/^[6-9]\d{9}$/.test(v) ? 'j.e.phone' : ''; },
      email: function () { if ($('#j-emailSkip', modal).checked) return ''; var v = $('#j-email', modal).value.trim(); return !v ? 'j.e.req' : !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? 'j.e.email' : ''; },
      district: function () { return $('#j-district', modal).value ? '' : 'j.e.req'; },
      date: function () { return dateErr($('#j-date', modal).value); },
      place: function () { var v = $('#j-place', modal).value.trim(); return !v ? 'j.e.req' : (v.length < 3 || v.length > 50) ? 'j.e.place' : ''; },
      exp: function () { var v = $('#j-exp', modal).value.trim(); return v && (v.length < 3 || v.length > 200) ? 'j.e.exp' : ''; }
    };
    function check(k) {
      var wrap = $('.field[data-k="' + k + '"]', modal), key = V[k](), msg = $('.err', wrap);
      wrap.classList.toggle('invalid', !!key); msg.dataset.key = key; msg.textContent = key ? t(key) : ''; return !key;
    }
    function wire() {
      Object.keys(V).forEach(function (k) {
        var el = $('#j-' + k, modal); if (!el) return;
        el.addEventListener('blur', function () { check(k); });
        el.addEventListener('input', function () { if (el.closest('.field').classList.contains('invalid')) check(k); });
      });
      $('#j-phone', modal).addEventListener('input', function (e) { e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10); });
      $('#j-date', modal).addEventListener('input', function (e) {           // auto-insert the slashes
        var d = e.target.value.replace(/\D/g, '').slice(0, 8), o = d.slice(0, 2);
        if (d.length > 2) o += '/' + d.slice(2, 4); if (d.length > 4) o += '/' + d.slice(4); e.target.value = o;
      });
      $('#j-exp', modal).addEventListener('input', function (e) { $('#j-cnt', modal).textContent = e.target.value.length + '/200'; });
      [['spouse', 'j-spouse'], ['email', 'j-email']].forEach(function (p) {
        $('#j-' + p[0] + 'Skip', modal).addEventListener('change', function (e) {
          var inp = $('#' + p[1], modal); inp.disabled = e.target.checked; if (e.target.checked) inp.value = '';
          check(p[0]);
        });
      });
      $('#jX', modal).addEventListener('click', close);
      modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
      $('#joinForm', modal).addEventListener('submit', submit);
    }
    var busy = false;
    function setBusy(b) { busy = b; var btn = $('#jSubmit', modal); btn.disabled = b; btn.innerHTML = b ? '<span class="spin"></span><span>' + esc(t('j.sending')) + '</span>' : '<i class="bi bi-send-fill"></i><span>' + esc(t('j.submit')) + '</span>'; }
    function submit(e) {
      e.preventDefault(); if (busy) return;
      var ok = $('#jOk', modal), bad = $('#jBad', modal); ok.classList.remove('show'); bad.classList.remove('show');
      var valid = Object.keys(V).map(check).every(Boolean);
      if (!valid) { var f = $('.field.invalid input,.field.invalid select,.field.invalid textarea', modal); if (f) f.focus(); return; }
      if (!M.apiReady()) { $('span', bad).textContent = t('j.notconf'); bad.classList.add('show'); return; }
      var dist = $('#j-district', modal).value, dd = districts.filter(function (d) { return d.en === dist; })[0] || { en: dist, kn: dist };
      var help = ($('input[name=jhelp]:checked', modal) || {}).value || 'N';
      var email = $('#j-emailSkip', modal).checked ? '' : $('#j-email', modal).value.trim();
      var payload = {
        type: 'community',
        'Name': $('#j-name', modal).value.trim(),
        'Spouse Name': $('#j-spouseSkip', modal).checked ? '' : $('#j-spouse', modal).value.trim(),
        'Contact Number': $('#j-phone', modal).value.trim(), 'Email': email,
        'District': dd.en, 'DistrictDisplay': dd[L()] || dd.en,
        'Marriage Date': $('#j-date', modal).value.trim(), 'Marriage Place': $('#j-place', modal).value.trim(),
        'Experiance': $('#j-exp', modal).value.trim(),
        'Community Help': help, 'Community HelpDisplay': t(help === 'Y' ? 'j.yes' : 'j.no'),
        'Language': L() === 'kn' ? 'Kannada' : 'English', 'lang': L()
      };
      setBusy(true);
      fetch(C.API_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload), redirect: 'follow' })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j && j.ok) {
            $('#joinForm', modal).reset(); $$('.field', modal).forEach(function (w) { w.classList.remove('invalid'); }); $$('input[disabled]', modal).forEach(function (i) { i.disabled = false; });
            $('#joinForm', modal).hidden = true;
            $('span', ok).textContent = t('j.ok') + (email ? ' ' + t('j.ok.mail') : ''); ok.classList.add('show'); return;
          }
          if (j && j.error === 'duplicate') {
            $('span', bad).innerHTML = esc(t('j.dup')) + ' <a href="' + esc(M.ROOT + 'contact/') + '">' + esc(t('j.dup.link')) + '</a>';
          } else $('span', bad).textContent = t('j.fail');
          bad.classList.add('show'); bad.scrollIntoView({ block: 'nearest' });
        })
        .catch(function () { $('span', bad).textContent = t('j.fail'); bad.classList.add('show'); })
        .then(function () { setBusy(false); });
    }
    function open() {
      if (!modal) build();
      opener = document.activeElement;
      $('#joinForm', modal).hidden = false; $('#jOk', modal).classList.remove('show'); $('#jBad', modal).classList.remove('show');
      modal.hidden = false; document.body.style.overflow = 'hidden'; $('.modal-box', modal).scrollTop = 0; $('#j-name', modal).focus();
    }
    function close() { if (!modal || modal.hidden) return; modal.hidden = true; document.body.style.overflow = ''; if (opener && opener.focus) opener.focus(); }
    var jb = $('#joinBtn'); if (jb) jb.addEventListener('click', open);
    document.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('#joinTop,#joinFab')) open(); });
    if (!$('#joinFab')) {                                      // quick "Join the Community" button on every page
      var fab = document.createElement('button'); fab.type = 'button'; fab.id = 'joinFab'; fab.className = 'join-fab';
      fab.innerHTML = '<i class="bi bi-people-fill"></i><span data-i18n="com.join.btn"></span>'; document.body.appendChild(fab); M.applyI18n(fab);
    }
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('mm:lang', function () {
      if (!modal) return;
      fillDistricts(); M.applyI18n(modal);
      $$('.err', modal).forEach(function (m) { if (m.dataset.key) m.textContent = t(m.dataset.key); });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
