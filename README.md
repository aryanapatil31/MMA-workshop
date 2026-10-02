# Iron Cage MMA — Workshop Website

A fast, dependency-free marketing site for an MMA gym that runs beginner workshops
(Jiu-Jitsu, Boxing, Muay Thai, Wrestling, Kids).

**Why it's fast:** plain HTML, one CSS file, one ~3 KB JS file. No frameworks,
no build step, no CDN requests, no web fonts, no external images.

## Structure

```
project/
├── index.html        # Home: hero, programs, coaches, pricing, testimonials
├── schedule.html     # Weekly timetable + FAQ
├── contact.html      # Trial-booking form + gym details
├── css/styles.css    # All styling (dark combat-sport theme)
├── js/main.js        # Nav, reveal animations, FAQ accordion, form validation
└── README.md
```

## Run it

Option 1 — just open the file:

```
start index.html
```

Option 2 — serve locally (recommended, so relative paths behave exactly like production):

```powershell
cd project
& ..\.venv\Scripts\python.exe -m http.server 5500
# then open http://localhost:5500
```

Any static host works as-is: GitHub Pages, Netlify, Vercel, S3 — just upload the
`project` folder contents.

## Publish on GitHub Pages

The site has no build step, so GitHub can serve these files directly.

1. Create an **empty** repository on GitHub (no README, no .gitignore).
2. From this folder, run:

```powershell
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

3. On GitHub go to **Settings → Pages**, set **Source** to `Deploy from a branch`,
   pick branch **main** and folder **/ (root)**, then **Save**.
4. Wait about a minute. The site appears at:

```
https://<your-username>.github.io/<repo-name>/
```

All asset paths in the HTML are **relative** (`css/styles.css`, `js/main.js`), so the
site works correctly from a project sub-path without any changes.

> Tip: if you name the repository `<your-username>.github.io`, the site is served at
> `https://<your-username>.github.io/` with no sub-path.

### Updating the live site

```powershell
git add -A
git commit -m "Update content"
git push
```

GitHub Pages redeploys automatically within a minute of each push.

## Customising

| What | Where |
| --- | --- |
| Brand colours | `:root` variables at the top of `css/styles.css` (`--accent`, `--gold`) |
| Gym name / phone / address / email | `contact.html`, footer of each page, `.brand` in the header |
| Programs & pricing | `index.html` sections `#programs` and `#pricing` |
| Timetable rows | `schedule.html` `table.schedule` |
| Workshops dropdown | `<select name="program">` in `contact.html` |

## Notes / limitations

- The booking form is **front-end only** — it validates and shows a confirmation but
  does not send email. To make it live, either point the `<form>` at a service like
  Formspree/Netlify Forms (`action="..." method="post"`), or add a small backend.
- Social links and the `.map` block on the contact page are placeholders — swap the
  `href`s and drop in a real map embed when you have them.