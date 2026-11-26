/* Share bar at the end of every page: WhatsApp, Facebook, Instagram, X, Threads */
(function () {
  var kn = { "share.title": "ಈ ಪುಟವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ", "share.copied": "ಲಿಂಕ್ ನಕಲಾಗಿದೆ. ಇನ್‌ಸ್ಟಾಗ್ರಾಮ್‌ನಲ್ಲಿ ಅಂಟಿಸಿ ಹಂಚಿಕೊಳ್ಳಿ." },
      en = { "share.title": "Share this page", "share.copied": "Link copied. Paste it in Instagram to share." };
  window.MM_I18N = window.MM_I18N || { kn: {}, en: {} };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; window.MM_I18N.en[k] = en[k]; });

  function init() {
    var M = window.MM; if (!M || document.getElementById('shareBar')) return;
    var main = document.querySelector('main'); if (!main) return;
    var sec = document.createElement('section'); sec.id = 'shareBar'; sec.className = 'share-bar';
    sec.innerHTML = '<p class="share-t" data-i18n="share.title"></p><div class="share-row">' +
      '<a class="sh-btn sh-wa" data-net="wa" href="#" target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp"><i class="bi bi-whatsapp"></i></a>' +
      '<a class="sh-btn sh-fb" data-net="fb" href="#" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook"><i class="bi bi-facebook"></i></a>' +
      '<button type="button" class="sh-btn sh-ig" data-net="ig" aria-label="Instagram" title="Instagram"><i class="bi bi-instagram"></i></button>' +
      '<a class="sh-btn sh-x" data-net="x" href="#" target="_blank" rel="noopener" aria-label="X" title="X"><i class="bi bi-twitter-x"></i></a>' +
      '<a class="sh-btn sh-th" data-net="th" href="#" target="_blank" rel="noopener" aria-label="Threads" title="Threads"><i class="bi bi-threads"></i></a></div>';
    main.parentNode.insertBefore(sec, main.nextSibling);
    if (M.applyI18n) M.applyI18n(sec);

    function url() { return location.origin + location.pathname + location.search; }
    function title() { return document.title || ''; }
    function links() {
      var u = encodeURIComponent(url()), tt = encodeURIComponent(title());
      return {
        wa: 'https://wa.me/?text=' + encodeURIComponent(title() + ' ' + url()),
        fb: 'https://www.facebook.com/sharer/sharer.php?u=' + u,
        x: 'https://twitter.com/intent/tweet?text=' + tt + '&url=' + u,
        th: 'https://www.threads.net/intent/post?text=' + encodeURIComponent(title() + ' ' + url())
      };
    }
    function setHrefs() { var l = links(); ['wa', 'fb', 'x', 'th'].forEach(function (k) { var a = sec.querySelector('[data-net=' + k + ']'); if (a) a.href = l[k]; }); }
    setHrefs();
    sec.addEventListener('click', function (e) { var a = e.target.closest('a[data-net]'); if (a) setHrefs(); });   // always the page being viewed now

    function copy(txt) {
      if (navigator.clipboard && navigator.clipboard.writeText) return navigator.clipboard.writeText(txt);
      return new Promise(function (res, rej) {
        try { var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); res(); } catch (x) { rej(x); }
      });
    }
    sec.querySelector('[data-net=ig]').addEventListener('click', function () {
      // Instagram has no web share link: use the phone's share sheet when present, else copy the link and open Instagram
      if (navigator.share) { navigator.share({ title: title(), url: url() }).catch(function () {}); return; }
      copy(url()).then(function () { M.toast(M.t('share.copied')); }, function () {});
      setTimeout(function () { window.open('https://www.instagram.com/', '_blank', 'noopener'); }, 700);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
