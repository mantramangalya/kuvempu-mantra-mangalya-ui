/* Guidance page content (frontend only, Kannada + English).
   - UI strings are merged into MM_I18N so data-i18n works.
   - To add an FAQ later: append one object to MM_FAQ below. */
(function () {
  var kn = {
    "g.tab.guidance": "ಮಾರ್ಗದರ್ಶನ", "g.tab.code": "ವಿವಾಹ ಸಂಹಿತೆ", "g.tab.plan": "ಯೋಜನೆ", "p.venue": "ಮದುವೆ ಸ್ಥಳ", "p.guests": "ಅತಿಥಿಗಳ ಪಟ್ಟಿ", "p.expense": "ವೆಚ್ಚದ ಅಂದಾಜು", "g.tab.gallery": "ಫೋಟೋ ಗ್ಯಾಲರಿ", "g.tab.faq": "ಪ್ರಶ್ನೋತ್ತರ",
    "g.ask.title": "ಏನಾದರೂ ಸಹಾಯ ಬೇಕೇ?", "g.ask.text": "ನಿಮ್ಮ ಸಂದೇಹಗಳನ್ನು ನಮಗೆ ಕಳುಹಿಸಿ — ನಾವು ಸಹಾಯ ಮಾಡುತ್ತೇವೆ.",
    "code.bg": "ಹಿನ್ನೆಲೆ", "code.dl.title": "ವಿವಾಹ ಸಂಹಿತೆಯ ಸಂಪೂರ್ಣ ಪಠ್ಯ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ", "code.dl.word": "Word (.docx)", "code.dl.pdf": "PDF",
    "code.pdf.note": "PDF ಗಾಗಿ ತೆರೆಯುವ ಮುದ್ರಣ ವಿಂಡೋದಲ್ಲಿ “Save as PDF” ಆಯ್ಕೆಮಾಡಿ.", "code.read": "ಸಂಹಿತೆಯ ಪಠ್ಯ",
    "g.note.venue": "ಇನ್ನಷ್ಟು ಸ್ಥಳಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "g.note.guest1": "ಅತಿಥಿಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ವಿವರಗಳು ಬೇಕಿದ್ದರೆ ದಯವಿಟ್ಟು ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.", "g.note.guest2": "ಇನ್ನಷ್ಟು ಅತಿಥಿ ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.",
    "gl.all": "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು", "gl.filter": "ಜಿಲ್ಲೆ ಆಧರಿಸಿ ಫಿಲ್ಟರ್ ಮಾಡಿ", "gl.other": "ಇತರೆ", "gl.empty": "ಅತಿಥಿಗಳ ವಿವರಗಳನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "gl.guests": "ಅತಿಥಿಗಳು",
    "v.intro": "ಜನಪ್ರಿಯ ಮತ್ತು ಕಡಿಮೆ ಖರ್ಚಿನ ಮದುವೆ ಸ್ಥಳಗಳು. ನಿಮ್ಮ ಜಿಲ್ಲೆಯ ಮೂಲಕ ಹುಡುಕಿ, ಮನೆಗೆ ಹತ್ತಿರದ ಸ್ಥಳವನ್ನು ಆರಿಸಿ.",
    "v.district": "ಜಿಲ್ಲೆ", "v.venue": "ಸ್ಥಳ", "v.address": "ವಿಳಾಸ", "v.contact": "ಸಂಪರ್ಕ ವಿವರಗಳು", "v.all": "ಎಲ್ಲಾ ಜಿಲ್ಲೆಗಳು", "v.search": "ಹುಡುಕಿ…", "v.sort": "ವಿಂಗಡಣೆ", "v.rows": "ಪುಟಕ್ಕೆ", "v.showing": "ತೋರಿಸಲಾಗುತ್ತಿದೆ", "v.of": "/", "v.prev": "ಹಿಂದಿನ", "v.next": "ಮುಂದಿನ",
    "v.none": "ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದುವ ಸ್ಥಳಗಳಿಲ್ಲ.", "v.empty": "ಸ್ಥಳಗಳ ಪಟ್ಟಿಯನ್ನು ಶೀಘ್ರದಲ್ಲೇ ಸೇರಿಸಲಾಗುವುದು.", "v.error": "ಸ್ಥಳಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗಲಿಲ್ಲ. ಸೇವೆ ಈಗ ಲಭ್ಯವಿಲ್ಲ; ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕ ಪರಿಶೀಲಿಸಿ ಅಥವಾ ಸ್ವಲ್ಪ ಸಮಯದ ನಂತರ ಪ್ರಯತ್ನಿಸಿ.", "v.notconf": "ಬ್ಯಾಕ್‌ಎಂಡ್ ಸೇವೆ ಇನ್ನೂ ಸಂಪರ್ಕಗೊಂಡಿಲ್ಲ. ದಯವಿಟ್ಟು ಸೈಟ್ ನಿರ್ವಾಹಕರನ್ನು ಸಂಪರ್ಕಿಸಿ.",
    "s.videos": "ವೀಡಿಯೊಗಳು", "s.photos": "ಫೋಟೋಗಳು", "s.na": "ಲಭ್ಯವಿಲ್ಲ", "s.more": "ಇನ್ನಷ್ಟು ತೋರಿಸಿ", "s.watch": "ವೀಕ್ಷಿಸಿ", "s.video": "ವೀಡಿಯೊ", "s.loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ…",
    "g.faq.intro": "ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳುವ ಪ್ರಶ್ನೆಗಳು"
  };
  var en = {
    "g.tab.guidance": "Guidance", "g.tab.code": "Marriage Code", "g.tab.plan": "Plan", "p.venue": "Marriage Venue", "p.guests": "Guest List", "p.expense": "Expense Projection", "g.tab.gallery": "Photo Gallery", "g.tab.faq": "FAQ",
    "g.ask.title": "Need any help?", "g.ask.text": "Send us your questions — we are happy to help.",
    "code.bg": "Background", "code.dl.title": "Download the full Marriage Code", "code.dl.word": "Word (.docx)", "code.dl.pdf": "PDF",
    "code.pdf.note": "In the print window that opens, choose “Save as PDF”.", "code.read": "Text of the Code",
    "g.note.venue": "More venues will be added soon.", "g.note.guest1": "Please contact us if you need more details on guests.", "g.note.guest2": "More guest details will be added soon.",
    "gl.all": "All districts", "gl.filter": "Filter by district", "gl.other": "Others", "gl.empty": "Guest details will be added soon.", "gl.guests": "guests",
    "v.intro": "Popular, low-cost wedding venues. Filter by your district and pick one close to home.",
    "v.district": "District", "v.venue": "Venue", "v.address": "Address", "v.contact": "Contact Details", "v.all": "All districts", "v.search": "Search…", "v.sort": "Sort by", "v.rows": "Per page", "v.showing": "Showing", "v.of": "of", "v.prev": "Previous", "v.next": "Next",
    "v.none": "No venues match your search.", "v.empty": "The list of venues will be added soon.", "v.error": "Could not load venues. The service is not available right now; please check your internet connection or try again after some time.", "v.notconf": "The backend service is not connected yet. Please contact the site admin.",
    "s.videos": "Videos", "s.photos": "Photos", "s.na": "Not available", "s.more": "Show more", "s.watch": "Watch", "s.video": "Video", "s.loading": "Loading…",
    "g.faq.intro": "Frequently asked questions"
  };
  Object.keys(kn).forEach(function (k) { window.MM_I18N.kn[k] = kn[k]; });
  Object.keys(en).forEach(function (k) { window.MM_I18N.en[k] = en[k]; });
})();

/* ---------------- Guidance tab ----------------
   link: {tab:'venue'} -> opens another tab, {page:'community'} -> opens a page */
window.MM_GUIDE = {
  phases: [
    {
      id: "before", icon: "bi-clipboard2-heart", style: "cards",
      kn: { title: "ಮದುವೆಗೆ ಮೊದಲು", sub: "ಸರಳ ಮದುವೆಗೆ ಸಿದ್ಧತೆ — ಈ ಹಂತಗಳನ್ನು ಗಮನಿಸಿ" },
      en: { title: "Before the Marriage", sub: "Getting ready for a simple wedding — things to consider" },
      items: [
        { icon: "bi-chat-heart",
          kn: { t: "ಕುಟುಂಬದೊಂದಿಗೆ ಚರ್ಚೆ", d: "ಎರಡೂ ಕುಟುಂಬಗಳ ಹಿರಿಯರೊಂದಿಗೆ ಮಂತ್ರ ಮಾಂಗಲ್ಯದ ಆಶಯಗಳನ್ನು ಹಂಚಿಕೊಂಡು, ಎಲ್ಲರ ಒಪ್ಪಿಗೆ ಮತ್ತು ಸಹಕಾರ ಪಡೆಯಿರಿ." },
          en: { t: "Talk with your families", d: "Share the ideals of Mantra Mangalya with the elders of both families and take everyone along with their consent and support." } },
        { icon: "bi-calendar2-heart",
          kn: { t: "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ನಿರ್ಧಾರ", d: "ಜ್ಯೋತಿಷ್ಯ ನೋಡುವ ಅಗತ್ಯವಿಲ್ಲ. ಕುವೆಂಪು ಹೇಳಿದಂತೆ ಎಲ್ಲಾ ಕಾಲವೂ ಒಳ್ಳೆಯ ಕಾಲ. ನಿಮಗೆ ಮತ್ತು ಅತಿಥಿಗಳಿಗೆ ಅನುಕೂಲವಾದ ದಿನ ಹಾಗೂ ಸಮಯವನ್ನು ನಿರ್ಧರಿಸಿ.", tag: "ಜ್ಯೋತಿಷ್ಯ ಬೇಡ" },
          en: { t: "Decide the date and time", d: "No need to consult astrology. As Kuvempu said, all time is good time. Choose a day and time that suits you and your guests.", tag: "No astrology" } },
        { icon: "bi-geo-alt-fill",
          kn: { t: "ಸರಳ ಸ್ಥಳದ ಆಯ್ಕೆ", d: "ಕನಿಷ್ಠ ಬಾಡಿಗೆಯ ಯಾವುದೇ ಸ್ಥಳ ಸಾಕು — ಮರದ ಕೆಳಗೆ, ಕುಪ್ಪಳ್ಳಿ ಕವಿಮನೆ, ಸಣ್ಣ ಸಭಾಭವನ, ಮನೆ ಇತ್ಯಾದಿ. ನಿಮ್ಮ ಮನೆಗೆ ಹತ್ತಿರದ ಸ್ಥಳವನ್ನು ಆರಿಸಿದರೆ ಉತ್ತಮ.", tag: "ಕಡಿಮೆ ಬಾಡಿಗೆ" },
          en: { t: "Pick a simple venue", d: "Any venue with minimal rent will do — under a tree, Kuppali Kavimane, a small convention hall, your home and so on. It is best to keep the venue near your home.", tag: "Minimal rent" },
          link: { tab: "venue", kn: "ಮದುವೆ ಸ್ಥಳಗಳನ್ನು ನೋಡಿ", en: "Browse marriage venues" } },
        { icon: "bi-megaphone",
          kn: { t: "ವಿವಾಹ ಸಂಹಿತೆ ಓದುವವರನ್ನು ಗುರುತಿಸಿ", d: "ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಓದಿ ವಿವರಿಸಬಲ್ಲ ಅತಿಥಿಯನ್ನು ಗುರುತಿಸಿ. ಅಂತಹವರು ಲಭ್ಯರಿಲ್ಲದಿದ್ದರೆ ಮನೆಯ ಹಿರಿಯರು — ಅಜ್ಜ, ಅಜ್ಜಿ, ತಂದೆ, ತಾಯಿ ಅಥವಾ ಯಾವುದೇ ಹಿರಿಯರು — ಮದುವೆ ನಡೆಸಬಹುದು.", tag: "ಪುರೋಹಿತರು ಬೇಡ" },
          en: { t: "Find someone to read the Marriage Code", d: "Identify a guest who can read and explain the Marriage Code. If no such guest is available, elders at home — grandfather, grandmother, father, mother or any elderly person — can conduct the wedding.", tag: "No priests" },
          link: { tab: "code", kn: "ವಿವಾಹ ಸಂಹಿತೆ ಓದಿ", en: "Read the Marriage Code" } },
        { icon: "bi-person-lines-fill",
          kn: { t: "ಅತಿಥಿಗಳ ಪಟ್ಟಿ", d: "ಆಹ್ವಾನಿಸಬೇಕಾದ ಅತಿಥಿಗಳ ಸಂಖ್ಯೆಯನ್ನು ಪಟ್ಟಿಮಾಡಿ ಮತ್ತು ಹೆಚ್ಚಿನ ಅತಿಥಿಗಳನ್ನು ಕರೆಯಬೇಕೇ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ. ಆದರ್ಶವಾಗಿ ಆಹ್ವಾನಿತರು 200 ಜನರ ಮಿತಿಯೊಳಗಿರಲಿ. ಹೆಚ್ಚು ಜನ ಬಂದರೂ ತೊಂದರೆಯಿಲ್ಲ, ಆದರೆ ಅಲಂಕಾರ ಮತ್ತು ಇತರ ಖರ್ಚುಗಳನ್ನು ಕನಿಷ್ಠವಾಗಿಡಿ.", tag: "ಸುಮಾರು 200" },
          en: { t: "Plan your guest list", d: "List down the number of guests to invite and check whether you need to invite more. Ideally keep invitees within 200 people. It is fine if there are more, as long as decoration and other expenses are kept minimal.", tag: "About 200" } },
        { icon: "bi-gift",
          kn: { t: "ವರದಕ್ಷಿಣೆ ಇಲ್ಲ, ಪುರೋಹಿತರಿಲ್ಲ", d: "ವರದಕ್ಷಿಣೆ ಅಥವಾ ವಧುದಕ್ಷಿಣೆಯ ಮಾತೇ ಬೇಡ. ಮದುವೆಗೆ ಪುರೋಹಿತರ ಅಗತ್ಯವಿಲ್ಲ.", tag: "ಸ್ಪಷ್ಟ ನಿಯಮ" },
          en: { t: "No dowry, no priests", d: "No dowry or bride-price talk at all. A priest is not needed for the wedding.", tag: "Firm rule" } }
      ]
    },
    {
      id: "during", icon: "bi-balloon-heart", style: "flow",
      kn: { title: "ಮದುವೆಯ ದಿನ", sub: "ಅಂದಿನ ಕಾರ್ಯಕ್ರಮದ ಸರಳ ಹರಿವು" },
      en: { title: "On the Marriage Day", sub: "A simple flow for the day" },
      items: [
        { icon: "bi-easel", kn: { t: "ವೇದಿಕೆ ವ್ಯವಸ್ಥೆ", d: "ಸರಳ ವೇದಿಕೆಯನ್ನು ಸಿದ್ಧಪಡಿಸಿ." }, en: { t: "Stage arrangement", d: "Set up a simple stage." } },
        { icon: "bi-flower2", kn: { t: "ಸರಳ ಅಲಂಕಾರ", d: "ಮಾವಿನ ತೋರಣ, ಹೂವುಗಳಂತಹ ಸರಳ ಅಲಂಕಾರ ಸಾಕು." }, en: { t: "Simple decoration", d: "Simple decoration such as mango-leaf toranas and flowers is enough." } },
        { icon: "bi-person-badge", kn: { t: "ಮಹನೀಯರ ಭಾವಚಿತ್ರಗಳು", d: "ಕುವೆಂಪು, ಬಸವಣ್ಣ, ಕೆ.ಪಿ.ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ, ಅಂಬೇಡ್ಕರ್, ಬುದ್ಧ ಮೊದಲಾದ ಮಹನೀಯರ ಭಾವಚಿತ್ರಗಳನ್ನು ವೇದಿಕೆಯಲ್ಲಿ ಇಡಿ." }, en: { t: "Portraits of great personalities", d: "Keep photos of great personalities — Kuvempu, Basavanna, K.P.Poornachandra Tejaswi, Ambedkar, Buddha and others — on the stage." } },
        { icon: "bi-book", kn: { t: "ವಿವಾಹ ಸಂಹಿತೆ ವಾಚನ", d: "ಆಹ್ವಾನಿತ ಅತಿಥಿ (ಅಥವಾ ಮನೆಯ ಹಿರಿಯರು) ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಓದಿ ಅದರ ಅರ್ಥವನ್ನು ವಿವರಿಸುತ್ತಾರೆ." }, en: { t: "Reading the Marriage Code", d: "The invited guest (or an elder of the family) reads the Marriage Code and explains its meaning." }, link: { tab: "code", kn: "ವಿವಾಹ ಸಂಹಿತೆ ಓದಿ", en: "Read the Marriage Code" } },
        { icon: "bi-hand-thumbs-up", kn: { t: "ಪ್ರತಿಜ್ಞೆ ಸ್ವೀಕಾರ", d: "ವಧು-ವರರು ಪ್ರತಿಜ್ಞೆ ಸ್ವೀಕರಿಸುತ್ತಾರೆ." }, en: { t: "Taking the oath", d: "The bride and groom take the oath." } },
        { icon: "bi-flower1", kn: { t: "ಹಾರ ಬದಲಾವಣೆ", d: "ವಧು-ವರರು ಪರಸ್ಪರ ಹಾರ ಬದಲಾಯಿಸಿಕೊಳ್ಳುತ್ತಾರೆ." }, en: { t: "Exchange of garlands", d: "The couple exchange garlands." } },
        { icon: "bi-suit-heart", kn: { t: "ಮಾಂಗಲ್ಯ ಧಾರಣೆ", d: "ವರನು ವಧುವಿಗೆ ಮಾಂಗಲ್ಯ ಕಟ್ಟುತ್ತಾನೆ." }, en: { t: "Tying the mangalya", d: "The groom ties the mangalya." } },
        { icon: "bi-cup-hot", kn: { t: "ರುಚಿಯಾದ ಊಟ", d: "ಬಂದ ಎಲ್ಲರಿಗೂ ರುಚಿಯಾದ, ಸರಳ ಭೋಜನ." }, en: { t: "Good food", d: "Serve nice, simple food for everyone who came." } },
        { icon: "bi-camera", kn: { t: "ಫೋಟೋ ಸೆಷನ್", d: "ಕುಟುಂಬ ಮತ್ತು ಸ್ನೇಹಿತರೊಂದಿಗೆ ನೆನಪಿನ ಚಿತ್ರಗಳು." }, en: { t: "Photo session", d: "Take memorable pictures with family and friends." } },
        { icon: "bi-check2-circle", kn: { t: "ಸಮಾರೋಪ", d: "ಅತಿಥಿಗಳಿಗೆ ಧನ್ಯವಾದ ಹೇಳಿ ಕಾರ್ಯಕ್ರಮ ಮುಗಿಸಿ." }, en: { t: "Wrap up", d: "Thank the guests and close the programme." } }
      ],
      callout: { icon: "bi-info-circle-fill", kn: "ವೇದಿಕೆಯಲ್ಲಿ ಉಡುಗೊರೆ ಕೊಡುವುದಿಲ್ಲ • ಪುರೋಹಿತರ ಪಾತ್ರವಿಲ್ಲ", en: "No gift giving on the stage • No priest is involved" }
    },
    {
      id: "after", icon: "bi-stars", style: "cards",
      kn: { title: "ಮದುವೆಯ ನಂತರ", sub: "ನಿಮ್ಮ ಸರಳ ಮದುವೆ ಇತರರಿಗೆ ದಾರಿದೀಪವಾಗಲಿ" },
      en: { title: "After the Marriage", sub: "Let your simple wedding inspire others" },
      items: [
        { icon: "bi-share",
          kn: { t: "ಸಾಮಾಜಿಕ ಜಾಲತಾಣದಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ", d: "ಸರಳ ಮದುವೆಯ ಬಗ್ಗೆ ಅರಿವು ಮೂಡಿಸಲು ನಿಮ್ಮ ಮದುವೆಯ ವಿವರಗಳನ್ನು ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳಲ್ಲಿ ಪ್ರಕಟಿಸಿ." },
          en: { t: "Share on social media", d: "Publish your marriage details on social media to create awareness about simple weddings." } },
        { icon: "bi-people-fill",
          kn: { t: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಬಳಗ ಸೇರಿ", d: "mantramangalya.in ನಲ್ಲಿರುವ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಸಮುದಾಯ ಬಳಗಕ್ಕೆ ಸೇರಿಕೊಳ್ಳಿ." },
          en: { t: "Join the Mantra Mangalya family", d: "Join the Mantra Mangalya family community at mantramangalya.in." },
          link: { page: "community", kn: "ಸಮುದಾಯ ಪುಟಕ್ಕೆ ಹೋಗಿ", en: "Go to the Community page" } },
        { icon: "bi-patch-check",
          kn: { t: "ವಿವಾಹ ನೋಂದಣಿ", d: "ಹತ್ತಿರದ ಉಪನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ನಿಮ್ಮ ಮದುವೆಯನ್ನು ಅಧಿಕೃತವಾಗಿ ನೋಂದಾಯಿಸಿ.", tag: "ಕಾನೂನು" },
          en: { t: "Register your marriage", d: "Get the marriage officially registered at the nearest sub-registrar office.", tag: "Legal" } }
      ]
    }
  ]
};

/* ---------------- Marriage Code ---------------- */
window.MM_CODE = {
  kn: {
    title: "ವಿವಾಹ ಸಂಹಿತೆ",
    bgTitle: "ಹಿನ್ನೆಲೆ",
    background: [
      "ಕುವೆಂಪು ಅವರು ಮೊದಲು ರಚಿಸಿದ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಎಂಬ ಚಿಕ್ಕ ಪುಸ್ತಕದಲ್ಲಿ ಅವರು ದಿನವೂ ದೇವರ ಮನೆಯಲ್ಲಿ ಧ್ಯಾನಮಾಡುತ್ತಾ ಹೇಳುತ್ತಿದ್ದ ದೇವಿಸ್ತೋತ್ರಗಳನ್ನು ಮಾತ್ರ ಸೇರಿಸಿದ್ದರು. ನಂತರ ಈ ಮಂತ್ರಗಳನ್ನು ಸೇರಿಸಿರುವುದರಿಂದ ಸಾಂಪ್ರದಾಯಿಕ ಮದುವೆಯಂತಾಗಬಹುದು ಮತ್ತು ಸಾಮಾನ್ಯ ಜನರಿಗೆ ಇದು ಅರ್ಥವಾಗುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ಮನಗಂಡ ತೇಜಸ್ವಿಯವರು ಇದನ್ನು ಕುವೆಂಪುರವರ ಗಮನಕ್ಕೆ ತರುತ್ತಾರೆ. ಮದುವೆಗೆ ಒಂದು ಸಾಂಸ್ಕೃತಿಕ ಅರ್ಥ ಬರಲೆಂದು ಸೇರಿಸಿದ್ದ ಶ್ಲೋಕಗಳಲ್ಲಿ ಇಡೀ ಮನುಕುಲದ ಶ್ರೇಯಸ್ಸನ್ನು ಕೋರುವ ಮಹೋನ್ನತ ಆಶಯಗಳಿರುವುದರಿಂದ ಶ್ಲೋಕಗಳ ಜೊತೆಗೆ ಅದರ ಸಾರಾಂಶವನ್ನು ಗದ್ಯ ರೂಪಕ್ಕೆ ಇಳಿಸಲು ತೇಜಸ್ವಿಯವರಿಗೆ ತಿಳಿಸುತ್ತಾರೆ.",
      "ತೇಜಸ್ವಿಯವರು ರೈತಸಂಘದ ಮುಖಂಡ ಹಾಗೂ ಸ್ನೇಹಿತರಾದ ಎಂ.ಡಿ.ನಂಜುಂಡಸ್ವಾಮಿ ಅವರ ಜೊತೆ ಸೇರಿ ಗದ್ಯದ ರೂಪದಲ್ಲಿ ವಿವಾಹ ಸಂಹಿತೆಯೊಂದನ್ನು ಬರೆದು ಕುವೆಂಪು ಅವರ ಒಪ್ಪಿಗೆಯ ಮೆರೆಗೆ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಪುಸ್ತಕಕ್ಕೆ ಸೇರಿಸುತ್ತಾರೆ. ಕನ್ನಡ ಗದ್ಯದಲ್ಲಿದ್ದ ಈ ಹೊಸ ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಓದಿ ಉಪದೇಶಿಸುವುದು ಸಂಸ್ಕೃತ ಶ್ಲೋಕಗಳನ್ನು ಹೇಳುವುದಕ್ಕಿಂತ ಸುಲಭವಾದ್ದರಿಂದ ಆಮೇಲಿನ ಮಂತ್ರಮಾಂಗಲ್ಯ ಮದುವೆಗಳೆಲ್ಲಾ ಗದ್ಯರೂಪದ ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಹೆಚ್ಚಾಗಿ ಉಪಯೋಗಿಸಿ ಆರಂಭಸಿದವು. ಈ ಸಣ್ಣ ಸುಧಾರಣೆಯಿಂದ ಶೂದ್ರ ಸಮುದಾಯದಲ್ಲಿ ಹೊಸ ಬದಲಾವಣೆಯೊಂದು ರೂಪುಗೊಂಡಿತು. ಇಂದು ಸಹ ಅನೇಕ ಕಡೆಗಳಲ್ಲಿ ಸಾಮಾನ್ಯ ಓದು ಬರಹ ಕಲಿತವರೇ ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಓದಿ ಮದುವೆ ಮಾಡಿಸುತ್ತಿದ್ದಾರೆ.",
      "ಈ ಕೆಳಗೆ ಕೊಟ್ಟಿರುವ ಗದ್ಯ ರೂಪದ ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಉದಯರವಿ ಪ್ರಕಾಶನದ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಎಂಬ ಸಣ್ಣ ಪುಸ್ತಕದಿಂದ ಆಯ್ದು ಹಾಕಲಾಗಿದೆ."
    ],
    addressee: ["ಶ್ರೀಯುತ ……… ಎಂಬ ವರನೆ", "ಶ್ರೀಮತಿ ……….. ಎಂಬ ವಧುವೆ"],
    intro: "ನಿಮ್ಮಿಬ್ಬರ ವಿವಾಹದ ಈ ಸಂದರ್ಭದಲ್ಲಿ ಈ ಕೆಲವು ಮೂಲಭೂತ ಸ್ವಾತಂತ್ರ್ಯದ ಸಂದೇಶಗಳನ್ನು ತಿಳಿಸಿದ್ದೇವೆ. ದಯವಿಟ್ಟು ನೀವಿಬ್ಬರೂ ಗಮನವಿಟ್ಟು ಕೇಳಿಕೊಳ್ಳಿರಿ.",
    statements: [
      "ಈ ದಿನ ಇಲ್ಲಿ ಈ ರೀತಿ ಮದುವೆಯಾಗುವುದರ ಮೂಲಕ ನೀವು ನಿಮ್ಮ ಎಲ್ಲಾ ಮಾನಸಿಕ ಮತ್ತು ಆಧ್ಯಾತ್ಮಿಕ ಸಂಕೋಲೆ ಮತ್ತು ದಾಸ್ಯಗಳಿಂದ ವಿಮುಕ್ತರಾಗಿ ಸ್ವತಂತ್ರರಾಗುತ್ತಿದ್ದೀರಿ.",
      "ನೀವು ಇನ್ನು ಈ ಭೂಮಂಡಲದ ಯಾವುದೇ ಜಾತಿ ಮತ್ತು ಜನಾಂಗಗಳಿಗಿಂತ ಮೇಲಾದವರಲ್ಲ.",
      "ಹಾಗೆಯೇ ಯಾವುದೇ ಜಾತಿ ಮತ್ತು ಜನಾಂಗಗಳಿಗಿಂತ ಕೀಳಾದವರೂ ಅಲ್ಲ.",
      "ನಿಮ್ಮನ್ನು ಇಂದು ಮನುಷ್ಯ ಸಮಾಜದ ಎಲ್ಲ ಕೃತಕ ಜಾತಿಗಳಿಂದ ಮುಕ್ತರನ್ನಾಗಿ ಮಾಡಿದ್ದೇವೆ.",
      "ನಿಮ್ಮನ್ನು ಇಂದು ಎಲ್ಲಾ ಸಂಕಚಿತ ಮತಧರ್ಮಗಳಿಂದ ಮುಕ್ತರನ್ನಾಗಿ ಮಾಡಿದ್ದೇವೆ",
      "ನಿಮ್ಮನ್ನು ಎಲ್ಲ ಆಚಾರ ಸಂಪ್ರದಾಯಗಳಿಂದ ಮುಕ್ತರನ್ನಾಗಿ ಮಾಡಿದ್ದೇವೆ.",
      "ನಿಮ್ಮನ್ನು ಎಲ್ಲಾ ಅಸತ್ಯ ಮತ್ತು ಮೂಢನಂಬಿಕೆಗಳಿಂದ ಮುಕ್ತರನ್ನಾಗಿ ಮಾಡಿದ್ದೇವೆ.",
      "ಮನುಷ್ಯನ ಜೀವಿತ ಕಾಲವೇ ಒಂದು ಸುಮುಹೂರ್ತ. ಇದರೊಳಗೆ ನೀನು ಬೇರೆ ಸುಮುಹೂರ್ತಗಳನ್ನೂ, ರಾಹುಕಾಲ, ಗುಳಿಕಕಾಲಗಳನ್ನೂ ನೋಡುವ ಅಗತ್ಯವಿಲ್ಲ. ಕಾಲವು ನಿರ್ಗುಣ.",
      "ಎಂದೂ ಸಂಪಾದಿಸಲು, ಸೃಷ್ಟಿಸಲು, ಕೂಡಿಡಲು ಸಾಧ್ಯವೇ ಇಲ್ಲದ, ಮನುಷ್ಯನ ಜೀವಿತಕಾಲದ ಪ್ರತಿ ಕ್ಷಣವೂ ಅತ್ಯಮೂಲ್ಯ. ಯಾರು ಈ ಸತ್ಯವನ್ನು ಅರಿಯುತ್ತಾರೋ ಅವರು ತಮ್ಮ ಕರ್ತವ್ಯ ಮತ್ತು ನಡವಳಿಕೆಗಳಿಂದ ಕಾಲವನ್ನು ಒಳ್ಳೆಯ ಅಥವಾ ಕೆಟ್ಟ ಕಾಲವನ್ನಾಗಿ ಪರಿವರ್ತಿಸಬಲ್ಲರು.",
      "ನೀವು ಯಾವುದೇ ಮನೆದೇವರು ಅಥವಾ ಕುಲದೇವರುಗಳ ಅಡಿಯಾಳಾಗಿ ಬದುಕಬೇಕಾಗಿಲ್ಲ. ಮನುಷ್ಯ ಸಮಾಜದ ಮಾನವೀಯ ಮೌಲ್ಯಗಳೇ ಮನುಷ್ಯನ ಮೊದಲನೆಯ ಹಾಗೂ ಕೊನೆಯ ದೇವರು.",
      "ಮಾನವರೆಲ್ಲರೂ ಸಮಾನರು. ಪುರುಷನು ಸ್ತ್ರೀಗಿಂತ ಮೇಲು ಎಂದು ಹೇಳುವ ಎಲ್ಲ ಧರ್ಮಗಳನ್ನೂ, ಎಲ್ಲ ಸಂಪ್ರದಾಯಗಳನ್ನೂ ನೀವು ಇಂದು ತಿರಸ್ಕರಿಸಿದ್ದೀರಿ.",
      "ಹೆಂಡತಿಯಾಗಲೀ, ಗಂಡನಾಗಲೀ ಪರಸ್ಪರ ಅಧೀನರೂ ಅಲ್ಲ, ಆಜ್ಞಾನುವರ್ತಿಯೂ ಅಲ್ಲ. ಹೆಂಡತಿಯೂ ಗಂಡನಷ್ಟೇ ಸ್ವತಂತ್ರಳೂ ಸಮಾನತೆಯುಳ್ಳವಳೂ ಆಗಿರುತ್ತಾಳೆ.",
      "ಗಂಡ – ಹೆಂಡಿರನ್ನು ಒಟ್ಟಿಗೆ ಬದುಕುವಂತೆ ಮಾಡುವ ಸಾಧನ ಪ್ರೀತಿಯೊಂದೇ. ಒಬ್ಬರನ್ನೊಬ್ಬರು ಪ್ರೀತಿಸದವರು ತಾಳಿ ಕಟ್ಟಿಕೊಂಡರೂ ವ್ಯರ್ಥ, ಅಗ್ನಿಯನ್ನು ಸುತ್ತಿದರೂ ವ್ಯರ್ಥ, ಯಾವ ಯಾವ ಶಾಸ್ತ್ರಾಚಾರದ ಪ್ರಕಾರ ಮದುವೆಯಾದರೂ ವ್ಯರ್ಥ.",
      "ದೇವರ ಬಗ್ಗೆ ಎಂದೂ ಸುಳ್ಳು ಹೇಳಕೂಡದು. ನಿಮ್ಮ ಅನುಭವ, ನಿಮಗೆ ದೇವರು ಇಲ್ಲವೆಂದು ತಿಳಿಸಿದರೆ ದೇವರು ಇಲ್ಲವೆಂದು ಹೇಳಿ.",
      "ನಿಮ್ಮ ಅನುಭವ, ನಿಮಗೆ ದೇವರು ಇದ್ದಾನೆಂದು ತಿಳಿಸಿದರೆ ದೇವರು ಇದ್ದಾನೆಂದು ಹೇಳಿ.",
      "ನಿಮ್ಮ ಅನುಭವ, ದೇವರು ಇದ್ದಾನೆಯೋ ಇಲ್ಲವೋ ತಿಳಿಯದೆಂದು ತಿಳಿಸಿದರೆ, ದೇವರು ಇದ್ದಾನೆಯೋ ಇಲ್ಲವೋ ತಿಳಿಯದೆಂದು ಹೇಳಿ.",
      "ನಮ್ಮ ಅನುಭವವನ್ನು ಸುಳ್ಳು ಹೇಳದೆ ಒಪ್ಪಿಕೊಳ್ಳುವುದು, ನಿರ್ಭೀತಿಯಿಂದ ವಾಸ್ತವ ಸ್ಥಿತಿಯನ್ನು ನೋಡುವುದು ಸತ್ಯಾನ್ವೇಷಣೆಯ ಮೊದಲನೆಯ ಹಂತ. ಜ್ಞಾನ ಯೋಗದ ಮೊದಲ ಪಾಠ.",
      "ಪರವಂಚನೆ ಮತ್ತು ಆತ್ಮವಂಚನೆ ಮಾಡಿಕೊಳ್ಳುವವನಿಗೆ ತಮಸ್ಸಿನಿಂದಲೂ, ಅಜ್ಞಾನದಿಂದಲೂ ವಿಮುಕ್ತಿಯೇ ಇಲ್ಲ.",
      "ದೇವರ ಹೆಸರಿನಲ್ಲಿ ಸುಳ್ಳು ಹೇಳುವ ಮಠಾಧಿಪತಿಗಳನ್ನು ಆಚಾರರನ್ನೂ ಜಗದ್ಗುರುಗಳನ್ನೂ ತಿರಸ್ಕರಿಸಿರಿ.",
      "ದೇವರ ಹೆಸರಿನಲ್ಲಿ ಧನಾರ್ಜನೆ ಮಾಡುವ ತೀರ್ಥಕ್ಷೇತ್ರಗಳನ್ನೂ, ದೇವಸ್ಥಾನಗಳನ್ನೂ ತಿರಸ್ಕರಿಸಿರಿ, ದೇವರ ಹೆಸರಿನಲ್ಲಿ ದರೋಡೆ ಮಾಡುವ ಯಾತ್ರಾಸ್ಥಳಗಳನ್ನು ತಿರಸ್ಕರಿಸಿರಿ.",
      "ವರದಕ್ಷಿಣೆ ಅಥವಾ ವಧುದಕ್ಷಿಣೆ ವ್ಯವಹಾರಗಳಿಗೆ ಒಳಗಾಗದೆ, ನೀವು ನಿಮ್ಮ ಸ್ವಂತ ಪ್ರಯತ್ನದಿಂದ ನಿಮ್ಮ ತಂದೆ ತಾಯಿಗಳಿಗೆ ಯಾವ ರೀತಿಯ ಆರ್ಥಿಕ ಹೊರೆಯಾಗದಂತೆ ವಿವಾಹ ಮಾಡಿಕೊಳ್ಳುತ್ತಿದ್ದೀರಿ."
    ],
    closing: "ಎಲ್ಲ ಮತಧರ್ಮ, ಕಂದಾಚಾರ, ಅಜ್ಞಾನಗಳಿಂದ ವಿಮುಕ್ತರಾಗಿರುವ ವಧೂವರರೇ, ಮಾನವ ಕೋಟಿಯನ್ನು ನಿಮ್ಮಂತೆಯೇ ವಿಮುಕ್ತರನ್ನಾಗಿ ಮಾಡುವ ಪವಿತ್ರ ಕರ್ತವ್ಯವನ್ನು ನೀವು ಮಾಡಿರಿ. ಇನ್ನು ನೀವು ಯಾವುದೇ ಧರ್ಮಕ್ಕೂ ಸೇರುವ ಅಗತ್ಯವಿಲ್ಲ. ಯಾವುದೇ ಮತಕ್ಕೂ ಸೇರುವ ಅಗತ್ಯವಿಲ್ಲ. ಯಾವುದೇ ಶಾಸ್ತ್ರಾಚಾರವನ್ನೂ ಅನುಸರಿಸಬೇಕಾದ ಅಗತ್ಯವಿಲ್ಲ. ಮೇಲೆ ಬೋಧಿಸಿರುವ ಪ್ರತಿಜ್ಞಾವಿಧಿಗಳೇ ನಿಮ್ಮ ಜೀವನದ ದಾರಿದೀಪವಾಗಲಿ. ಮೌಢ್ಯ, ಅಜ್ಞಾನ, ಅಂಧಕಾರಗಳ ವಿರುದ್ಧ ಭಾರತೀಯರಾದ ನಾವೆಲ್ಲ ಹೂಡಿರುವ ಈ ಮಹಾ ಹೋರಾಟದಲ್ಲಿ ನೀವೂ ಭಾಗಿಗಳಾಗಬೇಕೆಂದು ನಾವು ವಿನಂತಿಸಿಕೊಳ್ಳುತ್ತೇವೆ. ನೀವು ಇಲ್ಲಿ ಈ ದಿನದಿಂದ ದಂಪತಿಗಳೆಂದು ನಾವು ಘೋಷಿಸುತ್ತೇವೆ.",
    sign: { groom: "ವರನ ಸಹಿ:", bride: "ವಧುವಿನ ಸಹಿ:", witnessTitle: "ಸಾಕ್ಷಿಗಳು:", witnesses: ["ವರನ ತಂದೆ – ತಾಯಿ ಸಹಿ:", "ವಧುವಿನ ತಂದೆ – ತಾಯಿ ಸಹಿ:", "ಬಂಧು, ಬಳಗ, ಸ್ನೇಹಿತರ ಸಹಿ:"] }
  },
  en: {
    title: "Marriage Code (Vivaha Samhite)",
    bgTitle: "Background",
    background: [
      "In the first small book 'Mantra Mangalya', Kuvempu had included only the devi stotras that he used to recite daily while meditating in his prayer room. Tejaswi realised that including such mantras could make the wedding feel like a traditional one, and that ordinary people would not understand them, and brought this to Kuvempu's notice. Since the shlokas, added to give the wedding a cultural meaning, carried noble aspirations seeking the welfare of all humankind, Kuvempu asked Tejaswi to render the essence of the shlokas in prose as well.",
      "Together with his friend and Raitha Sangha leader M. D. Nanjundaswamy, Tejaswi wrote a Marriage Code in prose and, with Kuvempu's approval, added it to the Mantra Mangalya book. Since reading out and advising from this new Kannada prose code was easier than reciting Sanskrit shlokas, later Mantra Mangalya weddings began to use the prose Marriage Code widely. This small reform brought about a new change in the Shudra community. Even today, in many places, people with ordinary literacy read the Marriage Code and conduct weddings.",
      "The prose Marriage Code given below has been selected from the small book 'Mantra Mangalya' published by Udayaravi Prakashana."
    ],
    addressee: ["O groom, Shri ………", "O bride, Smt. ………"],
    intro: "On this occasion of your wedding, we have conveyed these few messages of fundamental freedom. Please both listen carefully.",
    statements: [
      "By getting married in this way here today, you are being freed from all your mental and spiritual shackles and bondage, and becoming independent.",
      "You are no longer superior to any caste or community on this earth.",
      "Likewise, you are not inferior to any caste or community either.",
      "Today we have freed you from all the artificial castes of human society.",
      "Today we have freed you from all narrow religions and creeds.",
      "We have freed you from all customs and traditions.",
      "We have freed you from all untruth and superstitions.",
      "A human being's lifetime itself is one auspicious moment. Within it you need not look for other auspicious times, nor Rahukala or Gulikakala. Time is without attributes.",
      "Every moment of a human life, which can never be earned, created or stored, is supremely precious. Those who understand this truth can, through their duty and conduct, turn time into good time or bad time.",
      "You need not live as a servant of any household god or clan deity. The humane values of human society are a person's first and last god.",
      "All human beings are equal. Today you have rejected all religions and all traditions that say man is superior to woman.",
      "Neither wife nor husband is subordinate to the other, nor an obedient follower. The wife is as free and as equal as the husband.",
      "Love alone is the means that makes husband and wife live together. For those who do not love each other, tying the thali is in vain, circling the fire is in vain, and marrying according to any scriptural rites is in vain.",
      "Never lie about God. If your experience tells you there is no God, say there is no God.",
      "If your experience tells you there is a God, say there is a God.",
      "If your experience tells you that you do not know whether there is a God, say that you do not know whether there is a God.",
      "Accepting our experience without lying, and looking at reality fearlessly, is the first step in the search for truth — the first lesson of the yoga of knowledge.",
      "For one who deceives others and deceives himself, there is no liberation from darkness and ignorance.",
      "Reject the heads of monasteries, acharyas and jagadgurus who lie in the name of God.",
      "Reject the pilgrimage centres and temples that make money in the name of God; reject the pilgrim places that rob in the name of God.",
      "Without entering into dowry or bride-price dealings, through your own efforts and without placing any financial burden on your parents, you are getting married."
    ],
    closing: "O bride and groom, freed from all religions, blind customs and ignorance — carry out the sacred duty of freeing humankind just as you have been freed. From now on you need not join any religion. You need not join any creed. You need not follow any scriptural rite. Let the vows taught above be the guiding light of your life. We request that you too take part in this great struggle that all of us Indians have launched against superstition, ignorance and darkness. From this day, we declare you to be a married couple.",
    sign: { groom: "Groom's signature:", bride: "Bride's signature:", witnessTitle: "Witnesses:", witnesses: ["Groom's parents' signature:", "Bride's parents' signature:", "Signature of relatives, family and friends:"] }
  }
};

/* ---------------- FAQ (add more items at the end of this list) ---------------- */
window.MM_FAQ = [
  /* links: [{to: 'guidance/#code', kn, en}] - 'to' is a path from the site root (page or page#tab / #section) */
  { q: { kn: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಎಂದರೇನು?", en: "What is Mantra Mangalya?" },
    a: { kn: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಕುವೆಂಪು ಅವರ ಪರಿಕಲ್ಪನೆಯ ಸರಳ ವಿವಾಹ ಪದ್ಧತಿ. ಜಾತಿ, ಧರ್ಮ, ಭಾಷೆಗಳನ್ನು ಮೀರಿದ ಈ ಪದ್ಧತಿಯಲ್ಲಿ ವರದಕ್ಷಿಣೆ, ಗೊಡ್ಡು ಸಂಪ್ರದಾಯ ಮತ್ತು ಆಡಂಬರಗಳಿಲ್ಲ; ವಧೂವರರು ಕನ್ನಡದ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಸ್ವೀಕರಿಸಿ ಸರಳವಾಗಿ ವಿವಾಹವಾಗುತ್ತಾರೆ.", en: "Mantra Mangalya is the simple wedding tradition conceived by Kuvempu. It goes beyond caste, religion and language: there is no dowry, no hollow ritual and no show. The couple take a vow in Kannada and marry simply." },
    links: [{ to: "about/", kn: "ಕುರಿತು ಪುಟ ಓದಿ", en: "Read the About page" }] },
  { q: { kn: "ಯಾರು ಮಂತ್ರ ಮಾಂಗಲ್ಯ ವಿವಾಹವಾಗಬಹುದು?", en: "Who can have a Mantra Mangalya wedding?" },
    a: { kn: "ಇದು ಜಾತಿ, ಧರ್ಮ, ಭಾಷೆಗಳನ್ನು ಮೀರಿದ ವಿಶ್ವಮಾನವ ವಿವಾಹ ಪದ್ಧತಿ. ತೇಜಸ್ವಿಯವರ ಮಕ್ಕಳ ಅಂತರ್ಜಾತೀಯ ಮದುವೆಯೂ ಈ ರೀತಿಯಲ್ಲೇ ನಡೆದಿದೆ. ಸರಳ ಮದುವೆಯ ಆಶಯವನ್ನು ಒಪ್ಪುವ ಯಾರಾದರೂ ಇದನ್ನು ಆರಿಸಿಕೊಳ್ಳಬಹುದು.", en: "It is a universal wedding tradition beyond caste, religion and language. The inter-caste weddings of Tejaswi's children were held this way too. Anyone who shares the ideal of a simple wedding can choose it." } },
  { q: { kn: "ಮದುವೆಯ ಹಂತಗಳು (ವಿಧಾನ) ಏನು?", en: "What are the steps of the wedding?" },
    a: { kn: "ವೇದಿಕೆ ಮತ್ತು ಸರಳ ಅಲಂಕಾರ, ಮಹನೀಯರ ಭಾವಚಿತ್ರಗಳು, ವಿವಾಹ ಸಂಹಿತೆ ವಾಚನ, ಪ್ರತಿಜ್ಞೆ, ಹಾರ ಬದಲಾವಣೆ, ಮಾಂಗಲ್ಯ ಧಾರಣೆ, ಊಟ ಮತ್ತು ಛಾಯಾಚಿತ್ರ — ಇದು ಸರಳ ಕ್ರಮ. ಪೂರ್ಣ ವಿವರಗಳು ಮಾರ್ಗದರ್ಶನ ಟ್ಯಾಬ್‌ನಲ್ಲಿವೆ.", en: "Stage with simple decoration, portraits of great personalities, reading of the Marriage Code, the oath, exchange of garlands, tying the mangalya, food and photographs. The full flow is in the Guidance tab." },
    links: [{ to: "guidance/#guidance", kn: "ಮಾರ್ಗದರ್ಶನ ನೋಡಿ", en: "See the Guidance" }] },
  { q: { kn: "ಮದುವೆಯನ್ನು ಯಾರು ನಡೆಸಿಕೊಡಬೇಕು? ಪುರೋಹಿತರು ಬೇಕೇ?", en: "Who conducts the wedding? Is a priest needed?" },
    a: { kn: "ಪುರೋಹಿತರ ಅಗತ್ಯವಿಲ್ಲ. ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು ಓದಿ ಅರ್ಥ ವಿವರಿಸಬಲ್ಲ ಅತಿಥಿ ಅಥವಾ ಮನೆಯ ಹಿರಿಯರು (ಅಜ್ಜ, ಅಜ್ಜಿ, ತಂದೆ, ತಾಯಿ ಅಥವಾ ಯಾವುದೇ ಹಿರಿಯರು) ಮದುವೆ ನಡೆಸಿಕೊಡಬಹುದು. ಸೂಕ್ತ ವ್ಯಕ್ತಿ ಸಿಗದಿದ್ದರೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.", en: "No priest is needed. A guest who can read and explain the Marriage Code, or an elder of the family (grandparent, parent or any elder), can conduct the wedding. If you cannot find someone suitable, contact us." },
    links: [{ to: "contact/", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", en: "Contact us" }] },
  { q: { kn: "ವಿವಾಹ ಸಂಹಿತೆಯ ಪಠ್ಯ ಎಲ್ಲಿ ಸಿಗುತ್ತದೆ?", en: "Where can I find the text of the Marriage Code?" },
    a: { kn: "ಮಾರ್ಗದರ್ಶನ ಪುಟದ “ವಿವಾಹ ಸಂಹಿತೆ” ಟ್ಯಾಬ್‌ನಲ್ಲಿ ಕನ್ನಡ ಮತ್ತು ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಪೂರ್ಣ ಪಠ್ಯವಿದೆ.", en: "The full text, in Kannada and English, is in the “Marriage Code” tab of the Guidance page." },
    links: [{ to: "guidance/#code", kn: "ವಿವಾಹ ಸಂಹಿತೆ ತೆರೆಯಿರಿ", en: "Open the Marriage Code" }] },
  { q: { kn: "ವಿವಾಹ ಸಂಹಿತೆಯನ್ನು Word ಅಥವಾ PDF ಆಗಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದೇ?", en: "Can I download the Marriage Code as Word or PDF?" },
    a: { kn: "ಹೌದು. “ವಿವಾಹ ಸಂಹಿತೆ” ಟ್ಯಾಬ್‌ನಲ್ಲಿ Word ಮತ್ತು PDF ಗುಂಡಿಗಳಿವೆ. PDF ಗಾಗಿ ತೆರೆಯುವ ಮುದ್ರಣ ವಿಂಡೋದಲ್ಲಿ “Save as PDF” ಆಯ್ಕೆಮಾಡಿ. ಮುದ್ರಿಸಲು ಸಿದ್ಧವಾದ ಮಾದರಿಗಳು ಡೌನ್‌ಲೋಡ್‌ಗಳ ಪುಟದಲ್ಲಿವೆ.", en: "Yes. The “Marriage Code” tab has Word and PDF buttons. For the PDF, choose “Save as PDF” in the print window that opens. Ready-to-print templates are on the Downloads page." },
    links: [{ to: "guidance/#code", kn: "ವಿವಾಹ ಸಂಹಿತೆ ಟ್ಯಾಬ್", en: "Marriage Code tab" }, { to: "downloads/#code-formats", kn: "ಸಂಹಿತೆ ಮಾದರಿಗಳು", en: "Marriage Code templates" }] },
  { q: { kn: "ವಿವಾಹ ಸಂಹಿತೆಗೆ ಯಾರು ಸಹಿ ಮಾಡುತ್ತಾರೆ?", en: "Who signs the Marriage Code?" },
    a: { kn: "ವಧು ಮತ್ತು ವರ ಸಹಿ ಮಾಡುತ್ತಾರೆ; ಜೊತೆಗೆ ಸಾಕ್ಷಿಗಳ ಸಹಿಗೆ ಸ್ಥಳವಿದೆ. ಸಹಿ ಮಾಡಿದ ಪ್ರತಿಯನ್ನು ನೆನಪಿಗಾಗಿ ಕಾಯ್ದಿಡಬಹುದು.", en: "The bride and groom sign it, and there is space for the witnesses to sign too. You can keep the signed copy as a memento." },
    links: [{ to: "guidance/#code", kn: "ಸಂಹಿತೆ ನೋಡಿ", en: "View the Code" }] },
  { q: { kn: "ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ಮಾದರಿಗಳು ಎಲ್ಲಿ ಸಿಗುತ್ತವೆ?", en: "Where can I find sample invitations?" },
    a: { kn: "ಡೌನ್‌ಲೋಡ್‌ಗಳ ಪುಟದ “ಮದುವೆ ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ಮಾದರಿಗಳು” ವಿಭಾಗದಲ್ಲಿ ನೋಡಬಹುದು ಮತ್ತು ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು. ಮೊದಲ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ವಿವಾಹದ ಕುವೆಂಪು ಅವರ ಕೈಬರಹದ ಲಗ್ನ ಪತ್ರಿಕೆಯನ್ನು ಕುರಿತು ಪುಟದಲ್ಲಿ ನೋಡಿ.", en: "View and download them in the “Sample Invitations” section of the Downloads page. The handwritten invitation of the very first Mantra Mangalya wedding is on the About page." },
    links: [{ to: "downloads/#invitations", kn: "ಆಮಂತ್ರಣ ಮಾದರಿಗಳು", en: "Sample invitations" }, { to: "about/#first", kn: "ಮೊದಲ ಮದುವೆಯ ಲಗ್ನ ಪತ್ರಿಕೆ", en: "The first wedding's invitation" }] },
  { q: { kn: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಲೋಗೋ ಬಳಸಬಹುದೇ?", en: "Can I use the Mantra Mangalya logo?" },
    a: { kn: "ಲೋಗೋ ಚಿತ್ರಗಳು ಡೌನ್‌ಲೋಡ್‌ಗಳ ಪುಟದ “ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಲೋಗೋ” ವಿಭಾಗದಲ್ಲಿ ಲಭ್ಯ. ಆಮಂತ್ರಣ ಪತ್ರಿಕೆ ಅಥವಾ ವೇದಿಕೆಯ ಬ್ಯಾನರ್‌ಗೆ ಅದನ್ನು ಬಳಸಬಹುದು.", en: "Logo images are in the “Mantra Mangalya Logo” section of the Downloads page. You can use it on your invitation or stage banner." },
    links: [{ to: "downloads/#logo", kn: "ಲೋಗೋ ಡೌನ್‌ಲೋಡ್", en: "Download the logo" }] },
  { q: { kn: "ಬ್ಯಾನರ್ ಅಥವಾ ಫೋಟೋ ಫ್ರೇಮ್‌ಗೆ ಕುವೆಂಪು, ತೇಜಸ್ವಿ ಮೊದಲಾದವರ HD ಚಿತ್ರಗಳು ಎಲ್ಲಿ ಸಿಗುತ್ತವೆ?", en: "Where can I get HD photos of Kuvempu, Tejaswi and others for banners or photo frames?" },
    a: { kn: "ಡೌನ್‌ಲೋಡ್‌ಗಳ ಪುಟದ “ವ್ಯಕ್ತಿ ಚಿತ್ರಗಳು” ವಿಭಾಗದಲ್ಲಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬಹುದು. ಇನ್ನೂ ಉತ್ತಮ ಗುಣಮಟ್ಟದ ಚಿತ್ರಗಳು ಬೇಕಿದ್ದರೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ.", en: "Download them from the “Person Photos” section of the Downloads page. If you need even higher-quality photos, please contact us." },
    links: [{ to: "downloads/#photos", kn: "ವ್ಯಕ್ತಿ ಚಿತ್ರಗಳು", en: "Person photos" }, { to: "contact/", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", en: "Contact us" }] },
  { q: { kn: "ಮದುವೆಗೆ ಯಾವ ಸ್ಥಳ ಆರಿಸಬಹುದು?", en: "What venue can I choose?" },
    a: { kn: "ಕಡಿಮೆ ಬಾಡಿಗೆಯ ಯಾವುದೇ ಸ್ಥಳ ಸಾಕು — ಮರದ ಕೆಳಗೆ, ಕುಪ್ಪಳ್ಳಿ ಕವಿಮನೆ, ಸಣ್ಣ ಸಭಾಂಗಣ ಅಥವಾ ನಿಮ್ಮ ಮನೆ. ಜಿಲ್ಲೆವಾರು ಕಡಿಮೆ ಖರ್ಚಿನ ಸ್ಥಳಗಳ ಪಟ್ಟಿ “ಯೋಜನೆ” ಟ್ಯಾಬ್‌ನ “ಮದುವೆ ಸ್ಥಳ” ವಿಭಾಗದಲ್ಲಿದೆ.", en: "Any low-rent place will do — under a tree, Kuppali Kavimane, a small hall or your home. A district-wise list of low-cost venues is in the “Marriage Venue” section of the “Plan” tab." },
    links: [{ to: "guidance/#plan", kn: "ಮದುವೆ ಸ್ಥಳಗಳ ಪಟ್ಟಿ", en: "Marriage venue list" }] },
  { q: { kn: "ಎಷ್ಟು ಅತಿಥಿಗಳನ್ನು ಆಹ್ವಾನಿಸಬಹುದು?", en: "How many guests can we invite?" },
    a: { kn: "ಸುಮಾರು 200 ಒಳಗೆ ಇದ್ದರೆ ಉತ್ತಮ. ಹೆಚ್ಚಿದ್ದರೂ ಅಡ್ಡಿಯಿಲ್ಲ, ಆದರೆ ಅಲಂಕಾರ ಮತ್ತು ಇತರ ಖರ್ಚುಗಳನ್ನು ಕನಿಷ್ಠವಾಗಿಡಿ. ಮೊದಲ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆಯಲ್ಲಿ ಕೇವಲ 30–40 ಮಂದಿ ಇದ್ದರು.", en: "Ideally within about 200. More is fine as long as decoration and other expenses stay minimal. The first Mantra Mangalya wedding had only 30–40 guests." },
    links: [{ to: "guidance/#guidance", kn: "ಸಿದ್ಧತೆಯ ಹಂತಗಳು", en: "Preparation steps" }] },
  { q: { kn: "ಮುಹೂರ್ತ, ರಾಹುಕಾಲ ನೋಡಬೇಕೇ?", en: "Do we need to check muhurta or rahukala?" },
    a: { kn: "ಇಲ್ಲ. ಜ್ಯೋತಿಷ್ಯ, ಮುಹೂರ್ತ, ರಾಹುಕಾಲದಂತಹ ಮೂಢನಂಬಿಕೆಗಳನ್ನು ಬದಿಗೊತ್ತಿ ವಿವೇಚನೆಯಿಂದ ಬದುಕುವುದು ಇದರ ಆಶಯ. ನಿಮಗೂ ಅತಿಥಿಗಳಿಗೂ ಅನುಕೂಲವಾದ ದಿನ, ಸಮಯ ಆರಿಸಿ.", en: "No. The ideal is to set aside superstitions such as astrology, muhurta and rahukala and live with reason. Pick a day and time convenient for you and your guests." } },
  { q: { kn: "ವರದಕ್ಷಿಣೆ ಇರುತ್ತದೆಯೇ?", en: "Is there any dowry?" },
    a: { kn: "ಇಲ್ಲ. ವರದಕ್ಷಿಣೆ ಮತ್ತು ವಧುದಕ್ಷಿಣೆಯಂತಹ ಪಿಡುಗುಗಳನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.", en: "No. Evils such as dowry and bride-price are completely rejected." } },
  { q: { kn: "ಮಂತ್ರಗಳು ಯಾವ ಭಾಷೆಯಲ್ಲಿರುತ್ತವೆ?", en: "In which language are the mantras?" },
    a: { kn: "ಕನ್ನಡದಲ್ಲಿ, ಎಲ್ಲರಿಗೂ ಅರ್ಥವಾಗುವ ಪ್ರತಿಜ್ಞೆ ಮತ್ತು ಮಂತ್ರಗಳು. ಕನ್ನಡ ಬಾರದವರಿಗಾಗಿ ಇಂಗ್ಲಿಷ್ ಪಠ್ಯವೂ ಲಭ್ಯವಿದೆ.", en: "The vows and mantras are in Kannada, understandable to everyone. An English text is also available for those who do not know Kannada." },
    links: [{ to: "guidance/#code", kn: "ವಿವಾಹ ಸಂಹಿತೆ", en: "Marriage Code" }] },
  { q: { kn: "ಊಟದ ವ್ಯವಸ್ಥೆ ಹೇಗಿರಬೇಕು?", en: "How should the food be arranged?" },
    a: { kn: "ಬಂದವರಿಗೆಲ್ಲ ಒಳ್ಳೆಯ, ಸರಳ ಊಟ ನೀಡಿ. ಮೆನು ನಿಮ್ಮ ಆಯ್ಕೆ; ಆಶಯ ಸರಳತೆ. ಮೊದಲ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆಯಲ್ಲಿ ಮಾಂಸಾಹಾರ ಊಟ ನೀಡಲಾಗಿತ್ತು.", en: "Serve nice, simple food to everyone who came. The menu is your choice; the ideal is simplicity. A non-vegetarian meal was served at the first Mantra Mangalya wedding." } },
  { q: { kn: "ವೇದಿಕೆಯಲ್ಲಿ ಯಾವ ಭಾವಚಿತ್ರಗಳನ್ನು ಇಡಬಹುದು?", en: "Which portraits can be kept on the stage?" },
    a: { kn: "ಕುವೆಂಪು, ಬಸವಣ್ಣ, ಕೆ.ಪಿ.ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ, ಅಂಬೇಡ್ಕರ್, ಬುದ್ಧ ಮೊದಲಾದ ಮಹನೀಯರ ಭಾವಚಿತ್ರಗಳನ್ನು ಇಡಬಹುದು. HD ಚಿತ್ರಗಳು ಡೌನ್‌ಲೋಡ್‌ಗಳ ಪುಟದಲ್ಲಿವೆ.", en: "Portraits of great personalities such as Kuvempu, Basavanna, K.P.Poornachandra Tejaswi, Ambedkar and Buddha. HD photos are on the Downloads page." },
    links: [{ to: "downloads/#photos", kn: "ವ್ಯಕ್ತಿ ಚಿತ್ರಗಳು", en: "Person photos" }] },
  { q: { kn: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಮದುವೆಯ ವೀಡಿಯೊ, ಫೋಟೋಗಳನ್ನು ಎಲ್ಲಿ ನೋಡಬಹುದು?", en: "Where can I see videos and photos of Mantra Mangalya weddings?" },
    a: { kn: "“ಫೋಟೋ ಗ್ಯಾಲರಿ” ಟ್ಯಾಬ್‌ನಲ್ಲಿ ವೀಡಿಯೊಗಳು ಮತ್ತು ಮದುವೆಯ ಫೋಟೋಗಳಿವೆ.", en: "The “Photo Gallery” tab has videos and wedding photos." },
    links: [{ to: "guidance/#gallery", kn: "ಫೋಟೋ ಗ್ಯಾಲರಿ", en: "Photo Gallery" }] },
  { q: { kn: "ನನ್ನ ಮದುವೆಯ ಫೋಟೋ ಅಥವಾ ಅನುಭವ ಹಂಚಿಕೊಳ್ಳುವುದು ಹೇಗೆ?", en: "How do I share my wedding photos or experience?" },
    a: { kn: "ಮದುವೆಯ ನಂತರ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಸಾಮಾಜಿಕ ಜಾಲತಾಣಗಳಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ ಮತ್ತು ನಮಗೆ ಸಂದೇಶ ಕಳುಹಿಸಿ. ಸರಳ ಮದುವೆಯ ಅರಿವು ಮೂಡಿಸಲು ಇದು ಸಹಾಯ ಮಾಡುತ್ತದೆ.", en: "After the wedding, share your details on social media and send us a message. It helps spread awareness about simple weddings." },
    links: [{ to: "contact/", kn: "ನಮಗೆ ಬರೆಯಿರಿ", en: "Write to us" }, { to: "community/", kn: "ಸಮುದಾಯ ಪುಟ", en: "Community page" }] },
  { q: { kn: "ಮಂತ್ರ ಮಾಂಗಲ್ಯ ಕುಟುಂಬ ಸಮುದಾಯಕ್ಕೆ ಸೇರುವುದು ಹೇಗೆ?", en: "How do I join the Mantra Mangalya community?" },
    a: { kn: "ಸಮುದಾಯ ಪುಟದಲ್ಲಿ ಮಂತ್ರ ಮಾಂಗಲ್ಯ ದಂಪತಿಗಳ ಚಿತ್ರ, ಅನುಭವಗಳನ್ನು ನೋಡಬಹುದು. ಸೇರಲು ಸಂಪರ್ಕ ಪುಟದ ಮೂಲಕ ನಮಗೆ ಬರೆಯಿರಿ.", en: "The Community page shows photos and experiences of Mantra Mangalya couples. To join, write to us through the Contact page." },
    links: [{ to: "community/", kn: "ಸಮುದಾಯ ಪುಟ", en: "Community page" }, { to: "contact/", kn: "ಸಂಪರ್ಕಿಸಿ", en: "Contact" }] },
  { q: { kn: "ಮದುವೆಯ ನಂತರ ಏನು ಮಾಡಬೇಕು? ನೋಂದಣಿ ಬೇಕೇ?", en: "What to do after the wedding? Is registration needed?" },
    a: { kn: "ಮದುವೆಯನ್ನು ಹತ್ತಿರದ ಉಪನೋಂದಣಾಧಿಕಾರಿ ಕಚೇರಿಯಲ್ಲಿ ಅಧಿಕೃತವಾಗಿ ನೋಂದಣಿ ಮಾಡಿಸಿಕೊಳ್ಳಿ. ಬೇಕಾದ ದಾಖಲೆಗಳ ಪಟ್ಟಿಗಾಗಿ ಆ ಕಚೇರಿಯಲ್ಲಿ ವಿಚಾರಿಸಿ. ಕಾನೂನು ಮಾಹಿತಿಗೆ ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಬಹುದು.", en: "Get the marriage officially registered at the nearest sub-registrar office, and check with that office for the list of documents required. You can contact us for legal information." },
    links: [{ to: "guidance/#guidance", kn: "ಮದುವೆಯ ನಂತರದ ಹಂತಗಳು", en: "Steps after the marriage" }, { to: "contact/", kn: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", en: "Contact us" }] },
  { q: { kn: "ನನ್ನ ಪ್ರಶ್ನೆಗೆ ಇಲ್ಲಿ ಉತ್ತರ ಸಿಗಲಿಲ್ಲ, ಏನು ಮಾಡಲಿ?", en: "My question is not answered here. What should I do?" },
    a: { kn: "ಸಂಪರ್ಕ ಪುಟದಲ್ಲಿ ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಕಳುಹಿಸಿ; ನಾವು ಉತ್ತರಿಸುತ್ತೇವೆ. ಇನ್‌ಸ್ಟಾಗ್ರಾಂ ಮತ್ತು ಫೇಸ್‌ಬುಕ್‌ನಲ್ಲೂ ನಮ್ಮನ್ನು ತಲುಪಬಹುದು.", en: "Send your question through the Contact page and we will reply. You can also reach us on Instagram and Facebook." },
    links: [{ to: "contact/", kn: "ಸಂಪರ್ಕ ಪುಟ", en: "Contact page" }] }
];
