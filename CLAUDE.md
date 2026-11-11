# CLAUDE.md — FindByWorld project rules

Read this file fully at the start of every session. These rules override your defaults.

## What this project is

FindByWorld is a university class project: a simple, Google-style supplier search.
A user types a product (for example "bicycle") and an optional MOQ (minimum order
quantity), presses Search, and gets results grouped country by country:

- 196 countries in total.
- 30 countries have their own B2B directories (for example China → Alibaba,
  India → IndiaMART, Germany → WLW). Each gets a search link per platform.
- The other 166 countries get Kompass and web-search links (the "global directory
  fallback").
- A ready-to-copy message to send suppliers, which includes the MOQ.

FindByWorld is a meta-search page. It does not store supplier listings. It builds
search links into other sites' directories. The country and platform list comes from
the reviewed research file "Comprehensive Global B2B Directories – All Countries".

- Hosting: GitHub Pages (free, static files only).
- The full plan is in `docs/PLAN.md`. Work through it one milestone at a time.

## Tech rules (do not break these)

1. Plain HTML, CSS and JavaScript only. No React, no Vue, no Tailwind, no TypeScript,
   no bundler, no npm packages, no build step. The site must work in VS Code
   Live Server and on GitHub Pages with zero setup.
2. No backend, no database, no API keys. Saved preferences use `localStorage`,
   always wrapped in `try/catch`.
3. Only external resource the page loads: Google Fonts. The page must never fetch,
   scrape or embed other websites. Outbound links are fine.
4. Keep the existing look (colors, fonts, layout) unless a milestone says to change it.
5. What content is allowed:
   - Real public B2B directories and marketplaces (Alibaba, IndiaMART, Kompass,
     Thomasnet, Europages and the others in the data) are allowed, as links.
   - Individual suppliers' names, phone numbers, emails or addresses are NOT allowed
     anywhere in the code or data.
   - Never claim a supplier or platform is "verified" or "recommended". Keep the
     disclaimer that users must verify suppliers themselves.
6. Every outbound link uses `target="_blank" rel="noopener"`, and every user-typed value
   that goes into a URL passes through `encodeURIComponent`.
7. Every page must work at phone width (400px) and in dark mode.
8. Use relative paths (`css/styles.css`, not `/css/styles.css`), because GitHub Pages
   serves the site from a subfolder.

## File structure (target, after M2–M3)

```
index.html
css/styles.css
js/links.js       builds every search URL (one place for all URL logic)
js/search.js      renders results, country filter, copy message
js/app.js         startup, loads data, form handlers, home ↔ results switching
data/countries.json   196 countries: name, ISO code, region
data/platforms.json   directories: name, domain, focus, scope, countries
docs/PLAN.md  docs/DATA.md  docs/CHANGELOG.md
README.md
```

Keep each JS file under about 300 lines. Use plain `<script>` tags in a fixed order;
do not switch to modules unless a milestone says so.

## How to work (step by step, every milestone)

1. **Read** `CLAUDE.md`, `docs/PLAN.md` and the files you will touch.
2. **Plan first.** Before editing anything, reply with: the milestone number, the files
   you will create or change, and a short step list. Then STOP and wait for "go".
3. **Branch.** `git checkout main && git pull`, then
   `git checkout -b m<N>-<short-name>`, for example `m3-data-files`.
4. **Build in small steps.** One logical change per commit. Commit message format:
   `M<N>: <what changed>`.
5. **Stay in scope.** Only do what the current milestone lists. Anything else goes under
   "Follow-ups" in your summary. Do not fix it.
6. **Self-check** with the milestone's "Done when" list and the Test checklist below.
   Tell me exactly what to click in Live Server to confirm it works.
7. **Update docs**: add an entry to `docs/CHANGELOG.md`; update `README.md` or
   `docs/DATA.md` if the milestone changed how something works.
8. **Pull request.** Push the branch and open a PR (see "PR steps").
9. **STOP.** Do not start the next milestone until I say "merged" or "next".

## PR steps

1. `git push -u origin m<N>-<short-name>`
2. If `gh auth status` succeeds, run
   `gh pr create --base main --title "M<N>: <title>" --body-file <temp file>`
   using `.github/pull_request_template.md`.
3. If `gh` is not available, do not install it. Give me the PR title and body as text.
4. After I merge: `git checkout main && git pull && git branch -d m<N>-<short-name>`.

## Never do these

- Never run `git push --force` or `git reset --hard`, and never delete branches I did
  not ask you to delete.
- Never commit directly to `main`.
- Never remove a country or platform from the data unless the milestone says so.
- Never invent a platform's direct search URL. A direct URL is added only after it
  has been opened in a browser and shown to return results (see M4).
- Never add a dependency, framework or build tool.
- Never mark a milestone done if a check fails. Tell me what failed instead.
- If something in the plan is unclear, ask one question and wait.

## Test checklist (run before every PR)

Home page
- [ ] Loads in Live Server with no errors in the browser console (F12 → Console).
- [ ] Search with an empty product box does not run.
- [ ] "bicycle" + MOQ 100 → results page. "bicycle" with MOQ empty also works.
- [ ] Each "Try" button runs its search.

Results page
- [ ] Summary shows 30 dedicated countries and 166 others (196 total) when no country
      filter is typed.
- [ ] Spot-check three links open in a new tab and include the product:
      China → Alibaba, India → IndiaMART, Kenya → Kompass.
- [ ] MOQ appears in the supplier message (and wherever the current milestone says).
- [ ] "Jump to a country" narrows the list and keeps typing smooth (no lost focus).
- [ ] "Copy" copies the message (or selects it if the clipboard is blocked).
- [ ] A new search from the top bar updates the results.
- [ ] Clicking the logo, or the browser Back button, returns to the home page.

Everywhere
- [ ] Phone width (DevTools device toolbar, 400px): no sideways scrolling.
- [ ] Dark mode (DevTools → Rendering → prefers-color-scheme: dark): all text readable.
- [ ] Keyboard only: Tab reaches every control and focus is visible.
