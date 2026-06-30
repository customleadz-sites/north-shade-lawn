# North Shade Lawn — Website

A fast, static marketing site (plain HTML/CSS/JS — no build step). Premium "editorial nature-luxury" design in the brand's forest-green palette, built around the company's real job photos.

## Pages
- `index.html` — Home
- `services.html` — All six services (Landscaping, Hardscaping, Lawn Care, Mulching, Seasonal Cleanups, Snow Removal)
- `portfolio.html` — Filterable gallery of every project photo
- `about.html` — Story, owners (Dayne & William), values, guarantees
- `blog.html` — "Journal" index, plus 3 starter posts (`journal-*.html`)
- `contact.html` — Quote-request form + contact details + map

## Preview it locally
Just double-click `index.html` to open it in your browser. Everything works offline except the Google Map embeds (which need internet).

## Deploy to Vercel
This site is zero-config. From the `site/` folder:
1. Push the folder to a GitHub repo (under the **customleadz-sites** org).
2. Import it in Vercel — no framework, no build command needed.
3. Add the domain **northshadelawnllc.com** in Vercel → Settings → Domains.

## Contact form (live — sends real emails via Web3Forms)
The quote form on `contact.html` is **live**. When someone submits it, the
details email straight to **northshadelawn23@gmail.com**, and the visitor sees
an on-page "Thanks — we got it!" message (no redirect).

- **How it sends:** It posts in the background to **Web3Forms** using the
  account's **Access Key**, stored in `contact.html` as a hidden field:
  ```html
  <input type="hidden" name="access_key" value="166cc735-3d4c-4542-aa0d-ac42a1e485db" />
  ```
- **Change the recipient email:** Log into https://web3forms.com with the
  account tied to that key and update the email there — no code change needed.
- **Spam protection (three layers, no monthly cost):**
  1. **Honeypot** — a hidden `botcheck` field that real people never see; bots
     fill it and get rejected automatically.
  2. **US phone validation** — the phone field only accepts a valid 10-digit US
     number, which blocks most overseas junk before it can submit.
  3. **Web3Forms' built-in spam filtering** on their servers.
- If spam ever slips through, the next step is adding a free **hCaptcha**
  ("click to confirm you're human") box — ask and we'll switch it on.

## Photos
- Original photos live in `../assets/North Shade Photos/` (sorted by service).
- Web-ready versions are in `images/work/` (converted from iPhone HEIC to JPG, resized for fast loading).
- Logo: `images/logo.png`.

## Notes
- Phone click-to-call (`(989) 763-3899`) is the primary call-to-action on every page.
- To add a new Journal post: copy one of the `journal-*.html` files, swap the content, and add a card to `blog.html`.
