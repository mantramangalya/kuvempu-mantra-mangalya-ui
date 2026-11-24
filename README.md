# ಮಂತ್ರ ಮಾಂಗಲ್ಯ · Kuvempu Mantra Mangalya

Bilingual (Kannada default / English) static website for GitHub Pages, with a Google Apps Script backend.

```
kuvempu-mantra-mangalya/
├─ frontend/            <- the website (published to GitHub Pages)
│  ├─ index.html                      -> /
│  ├─ about/ guidance/ downloads/ community/ contact/   (each has index.html -> clean URLs like /about/)
│  ├─ css/style.css
│  ├─ js/ (config.js, i18n.js, about-content.js, guide-content.js, docgen.js, app.js, browse.js, guidance.js, downloads.js)
│  ├─ data/             <- videos.json, downloads.config.json (edit these); manifest.js is auto-generated
│  ├─ downloads/mm-marriage-code-formats/   <- mm-marriage-code-format-1.pdf, -2.docx ...
│  └─ images/           <- page images (any format) + folders below
│     ├─ mm-logo/                 mm-logo-1.png, mm-logo-2.svg ...        (Downloads > Logo)
│     ├─ person-photos/               any file name, any format              (Downloads > Person Photos)
│     ├─ sample-mm-invitations/   sample-mm-invitation-1.jpg ...          (Downloads > Sample Invitations)
│     └─ mm-marriage-photos/      any file name, any format              (Guidance > Photo Gallery > Photos)
├─ backend/             <- paste into Google Apps Script (not published)
├─ scripts/build-manifest.py   <- run by the workflow: lists the folders above (GitHub Pages cannot list folders)
└─ .github/workflows/pages.yml
```

## 1. Images (any format: png, jpg, jpeg, webp, avif, gif, svg)
- `frontend/images/home-page-images/` - Home personality cards: `kuvempu`, `tejaswi`, `basavanna`, `buddha`, `ambedkar` (add more in `PERSONALITIES` in `js/config.js`, file name without extension).
- `frontend/images/about-page-images/` - About page: `kuvempu`, `tejaswi-rajeshwari-maduve`, `tejaswi-rajeshwari-maduve-invitation`, `mantra-mangalya-book`.
- Folder galleries (any file name unless a pattern is shown): `mm-logo/` (mm-logo-1 ...), `person-photos/`, `sample-mm-invitations/` (sample-mm-invitation-1 ...), `mm-marriage-photos/`, `mm-community-couples/`.
- Book: put `kuvempu-mantra-mangalya-book.pdf` in `frontend/downloads/` (last section of the Downloads page).
Missing images just show a blank frame. Push the files and the workflow regenerates `data/manifest.js` automatically.
**Logo / favicon:** replace `frontend/favicon.svg` with your logo (or set `LOGO: "favicon.png"` in `js/config.js`).

## 2. Backend (Google Apps Script)
1. Sign in as **mantramangalya1966@gmail.com** (mail is sent from the deploying account).
2. Open the Google Sheet `1snf2UGSODNWa6AAQ91SaHGxI0WAWpv2Ts7NTqTVaNuE`. Make sure the tab **Queries** exists with a header row, e.g.
   `Timestamp | Name | Contact Number | Email | Place | Topic | Message | Language | Status`
   (Mapping is by column *name*; unknown form fields are ignored, missing columns stay empty. The tab is auto-created if absent.)
3. Go to script.google.com → New project → paste `backend/Code.gs` (and enable *Show appsscript.json* in Project Settings and paste `backend/appsscript.json`).
4. Create two Drive folders (downloads, photos), set sharing to *Anyone with the link – Viewer*, and paste their IDs into `MM_DOWNLOADS_FOLDER_ID` / `MM_PHOTOS_FOLDER_ID`.
5. Deploy → New deployment → **Web app** → Execute as *Me*, Who has access *Anyone* → authorise → copy the `/exec` URL.
6. Paste that URL into `frontend/js/config.js` → `API_URL`.

7. Marriage venues: add a sheet tab named **MarriageVenue** (`MM_MARRIAGE_VENUE_SHEET_NAME`) in the same Google Sheet with the header row `District | Venue | Address | Contact Details` and one venue per row.

Re-deploy (Manage deployments → Edit → New version) after any change to `Code.gs`.

## 3. GitHub Pages
1. Create the repo `kuvempu-mantra-mangalya`, push this folder to `main`.
2. Repo → Settings → Pages → **Source: GitHub Actions**. The included workflow publishes the `frontend/` folder.
3. Site URL: `https://<your-user>.github.io/kuvempu-mantra-mangalya/`

All links are relative, so it works under the repo sub-path.

## Notes
- No secrets in the frontend: the Sheet ID, mail settings and Drive folder IDs live only in `Code.gs`. The Web App URL is public by design.
- Edit About content in `frontend/js/about-content.js`; UI text in `frontend/js/i18n.js`.
- Language choice is remembered in `localStorage` (`mm_lang`); default is Kannada.
- Apps Script MailApp daily quota applies (about 100 recipients/day for free Gmail accounts).

- Clean URLs: each page lives in its own folder (`about/index.html` is served at `/about/`), so `.html` never shows in the address bar. All links are relative, so it works both on `https://<user>.github.io/kuvempu-mantra-mangalya/` and on a custom domain.
- Images: hover on any image to get Full view / Download; the viewer closes with the Close button, Esc or a click outside.

## Guidance page
Tabs (in order): Guidance · Photo Gallery (Videos + Photos) · Plan (Marriage Venue, plus Guest List and Expense Projection placeholders) · Marriage Code (Word/PDF, same file-name pattern `kuvempu-mantra-mangalya-vivaha-samhite-<kn|en>`) · FAQ. Deep links: `/guidance/#gallery`, `#plan`, `#code`, `#faq`.
- **Edit guidance steps / Marriage Code text / FAQs:** `frontend/js/guide-content.js`. A FAQ may carry `links:[{to:'downloads/#invitations', kn:'..', en:'..'}]` (path from the site root).
- **Videos:** add entries to `frontend/data/videos.json` (YouTube / Instagram / Facebook / any link). Photos: drop images into `frontend/images/mm-marriage-photos/`.
- Every section on Guidance / Photo Gallery / Downloads can be expanded or collapsed; long lists are paginated.

## Downloads page
Sections (in order): Logo, Person Photos, Sample Invitations, Marriage Code Templates - defined in `frontend/data/downloads.config.json`. Add a section by adding one object there and creating its folder. Deep links: `/downloads/#logo`, `#photos`, `#invitations`, `#code-formats`.
- **PDF download** of the Marriage Code opens the browser print dialog; choose "Save as PDF" (keeps Kannada text perfectly shaped).

## Community page
- **Couples photos:** drop images (any name, any format) into `frontend/images/mm-community-couples/` and push.
- **Community says:** edit `frontend/data/community-says.json` (message, husband, wife, place; plain text or `{kn,en}`).
- **Join the Community form:** districts come from `frontend/data/districts.json`. Submissions go to the `CommunityPeopleInfo` sheet tab (`MM_COMMUNITY_SHEET_NAME` in `Code.gs`; auto-created with headers `Created Timestamp | Name | Spouse Name | Contact Number | Email | District | Marriage Date | Marriage Place | Experiance | Community Help | Language`). A repeated mobile number is rejected with a "use the Contact form" message.
- **Created Timestamp** (IST, `DD-MM-YYYY HH:MM:SS AM/PM`) is written for both the Queries and CommunityPeopleInfo sheets. In the **Queries** tab rename the first header `Timestamp` to `Created Timestamp` (columns are matched by name).
- **Email wording** for both acknowledgement mails lives in `frontend/data/email-templates.json`. The backend fetches it from the published site (`MM_SITE_URL` in `Code.gs`, cached 5 min), so edit it in git and push - no redeploy. After pasting the new `Code.gs` and `appsscript.json`, redeploy and authorise the new "connect to an external service" permission once.

## Comments, analytics, expand/collapse
- **Leave a Reply** (bottom of the Guidance page) writes to the `Comments` sheet tab (`MM_USER_COMMENTS_SHEET_NAME`; auto-created: `Created Timestamp | Name | User Comment | Status`). New rows get Status `Pending for Approval`; change a row's Status to `Approved` and it appears on the page (newest first, 5 per page). Redeploy `Code.gs` after updating.
- **Google tag** (GTM-W94Q4SH7) sits right after `<head>` in every page - keep exactly one per page.
- Every page except About has an Expand all / Collapse all button (Guidance: applies to the open tab).

## Form routing (important when deploying `Code.gs`)
Each form posts an explicit `type`: contact form = `query` -> `Queries` sheet + "Query Submitted" mail; Leave a Reply = `comment` -> `Comments` sheet (no mail); Join Community = `community` -> `CommunityPeopleInfo` sheet + "Community" mail. Unknown types are rejected, nothing falls back to another sheet. Only rows with Status `Approved` are returned for display (Guidance and Community pages share the same comments).
After pasting `Code.gs` you MUST publish a new version: Deploy > Manage deployments > Edit (pencil) > Version: **New version** > Deploy. Open `<your /exec URL>?action=ping` - it must show `"version":"v6-separate-forms"`; if not, the old script is still live (that is what sends everything to `Queries`).

## Request call back, quotes, likes (v7)
- **Request call back**: floating button on every page (`js/callback.js`). Saved to the `Queries` sheet with Topic "Call back request" and the help text in `Message`. No email is sent (no Email is collected).
- **Quotes**: edit `frontend/data/quotes.json` (`text`/`author` in `kn` and `en`) to add more. Shown on About and in the Home About accordion.
- **Comments sheet** columns: `Created Timestamp, Name, User Comment, Status, Comment Id, Like Count`. Missing columns are added automatically; older approved comments get an id when first listed. Likes are one per browser (localStorage `mm_liked`).
- Leave a reply is on Home, Guidance and Community. Home shows Contact and Join Community side by side.
- After pasting `backend/Code.gs`, publish a **New version** of the deployment. `?action=ping` should report `v8-mail-signature`.

## Home: Celebrities and Main-stream sections
- `frontend/data/celebrities.json` → "Celebrities married in the Mantra Mangalya way"; photos in `frontend/images/celebrities-photo/`.
- `frontend/data/mainstream.json` → "Mantra Mangalya in main streams"; photos in `frontend/images/mm-main-stream-photo/`.
- Each entry in `items`: `title {kn,en}` (shown bold), `text {kn,en}`, optional `image` (exact file name in that folder), optional `video` (https link). See `_example` in each file. Six cards per page with pager.
- More quotes: add to `frontend/data/quotes.json`.

## Batch 6 notes
- Folders renamed: `images/hd-photos` -> `images/person-photos`, `images/celebraties-photo` -> `images/celebrities-photo` (use `git mv` so your photos move with the folder).
- Home page now shows: Core Ideals (headings), short "About Mantra Mangalya Wedding", Celebrities, Main streams, two random quotes. Celebrity/main-stream entries show 3 per page with a "More" popup and a "Watch video" link.
- About > Quotes: vertical list, 10 per page.
- Mail signature: "Admin Team" + website `mantramangalya.in` (edit in `data/email-templates.json`; republish Code.gs as a New version).

## Batch 7 notes
- Home photos for Celebrities / Main streams: `image` may be just a file name (case and extension are matched using the generated manifest), a path under the site, or a full https link.
- Great-personalities strip has left/right arrows when the photos overflow; About page has expand/collapse-all plus per-section toggles; Community has a "Join the Community" button next to expand/collapse-all.

## Batch 8 notes
- Contact page: no collapse toggles; banner text is "Contact us through any of the channels below"; the form uses two columns (Name/Phone, Email/Place).
- Community page: banner reads "The Mantra Mangalya family - space for couples who married the Mantra Mangalya way."; couple photos are a swipe/arrow slider in random order on every visit (all images in `images/mm-community-couples`); "Join the Community" is also next to expand/collapse-all at the top right.
- Home: the first banner slide has no buttons (other slides keep "Learn more").
- Home main-stream / celebrity entries accept `image` (file name, any case/extension), `photo`, `img` as alternatives; a missing photo is reported in the browser console ("photo not found") to help locate the wrong file name or folder.
- Kannada label for the call-back button: "ಕರೆ ಮಾಡಲು ಕೋರಿ".

## Batch 9 notes
- "Join the Community" quick button (bottom right) and Instagram / Facebook icons in the header on every page; `js/community.js` is loaded on all pages for the join form.
- Downloads: Word/PowerPoint/Excel files get a **View** button (opens in the Office online viewer; the site must be public), PDFs open directly.
- `data/community-says.json`: new optional `profession` per couple (string or `{kn,en}`), shown with the place.
- Quotes: edit `data/quotes.json`; Home shows two random ones after "About Mantra Mangalya Wedding".

## Batch 10 notes
- Request call back is now a small round icon (tooltip/aria-label carry the text) with a small x to hide it; the choice lasts for the browser session.
- Back-to-top button is smaller and sits above the Join button.
- `data/community-says.json`: use a single `name` (string or `{kn,en}`) per entry. Old entries with `husband` + `wife` still display.
- Guidance: "Need any help?" card is now the last block of the page instead of a sticky side panel.

## Batch 11 notes
- "Join the Community" is a button directly below the page banner on every page except Contact (added by `js/community.js`); the floating button is removed.
- Backend errors: forms, comment list, likes, downloads and venues now say whether the backend is not connected, the user is offline, the service is down/unreachable, or the server rejected the request (texts `err.*` in `js/i18n.js`).
- Header: app name is bold; Instagram/Facebook icons are centred in their circles.
