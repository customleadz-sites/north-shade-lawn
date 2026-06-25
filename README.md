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

## Make the contact form send real emails (5-minute setup)
Right now the quote form shows a friendly "Thanks — we got it!" message but does **not** email anyone yet. To turn on real emails for free:

1. Go to **https://formspree.io**, sign up, and create a new form using the email `northshadelawn23@gmail.com`.
2. Formspree gives you a URL like `https://formspree.io/f/abcdwxyz`.
3. Open `contact.html`, find this line near the form:
   ```html
   <form class="form" data-quote-form action="" method="POST">
   ```
   and change it to:
   ```html
   <form class="form" data-quote-form action="https://formspree.io/f/abcdwxyz" method="POST">
   ```
4. Done — form submissions now land in the Gmail inbox. (The form already collects name, email, phone, address, and a project summary, and has built-in spam protection.)

## Photos
- Original photos live in `../assets/North Shade Photos/` (sorted by service).
- Web-ready versions are in `images/work/` (converted from iPhone HEIC to JPG, resized for fast loading).
- Logo: `images/logo.png`.

## Notes
- Phone click-to-call (`(989) 763-3899`) is the primary call-to-action on every page.
- To add a new Journal post: copy one of the `journal-*.html` files, swap the content, and add a card to `blog.html`.
