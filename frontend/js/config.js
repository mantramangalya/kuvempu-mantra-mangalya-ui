/* Public site configuration. No secrets here: the Apps Script web-app URL is public by design.
   Sheet IDs, mail settings and folder IDs live ONLY in backend/Code.gs. */
window.MM_CONFIG = {
  // Paste your deployed Google Apps Script Web App URL (ends with /exec)
  API_URL: "https://script.google.com/macros/s/AKfycbxYRef7jBJbZ6Tthd9lxmDClC5f1lCRucTUwpm1_U-n9ZtkcCW6L-g_KCn85I8OSlvQ/exec",
  EMAIL: "mantramangalya1966@gmail.com",
  INSTAGRAM_HANDLE: "mantramangalya.maduve",
  INSTAGRAM_URL: "https://www.instagram.com/mantramangalya.maduve",
  FACEBOOK_HANDLE: "mantramangalya.maduve",
  FACEBOOK_URL: "https://www.facebook.com/mantramangalya.maduve",
  // Logo shown beside the site name AND used as the favicon (file inside /frontend). Replace the file or change the name here.
  LOGO: "favicon.svg",
  // Great personalities shown as cards on the Home page. To add more, add one line (image goes in /frontend/images/home-page-images; give the file name without extension - png, jpg, webp ... all work).
  PERSONALITIES: [
    { img: "kuvempu", kn: "ಕುವೆಂಪು", en: "Kuvempu" },
    { img: "tejaswi", kn: "ಕೆ.ಪಿ.ಪೂರ್ಣಚಂದ್ರ ತೇಜಸ್ವಿ", en: "K.P.Poornachandra Tejaswi" },
    { img: "basavanna", kn: "ಬಸವಣ್ಣ", en: "Basavanna" },
    { img: "buddha", kn: "ಬುದ್ಧ", en: "Buddha" },
    { img: "ambedkar", kn: "ಡಾ. ಬಿ. ಆರ್. ಅಂಬೇಡ್ಕರ್", en: "Dr. B. R. Ambedkar" }
  ],
  KUVEMPU_BLOG_URL: "https://nammakuvempu.wordpress.com/",
  TEJASWI_BLOG_URL: "https://nammatejaswi.wordpress.com/",
  // Folders (inside /frontend) that hold the Home-page personality cards and the About-page images
  HOME_IMAGES_DIR: "images/home-page-images",
  ABOUT_IMAGES_DIR: "images/about-page-images",
  BLOG_URL: "https://nammakuvempu.wordpress.com/2021/05/08/kuvempu-mantra-mangalya-wedding/"
};
