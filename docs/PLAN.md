# FindByWorld build plan

One milestone = one branch = one pull request. Do them in order.
A milestone is not done until every "Done when" check passes and the PR is open.

M0 (project setup) is complete.

---

## M1 — Switch to the FindByWorld design

**Goal:** `main` gets the new search page together with rules and docs that match it.

Branch: `m1-new-design`

Work:
1. The new `index.html` is already in the working folder (uncommitted). Do not edit it.
2. Replace `CLAUDE.md`, `docs/PLAN.md` and `README.md` with the new versions provided.
3. Add an M1 entry to `docs/CHANGELOG.md`: "Replaced the supplier directory prototype
   with the FindByWorld country-by-country search page; rewrote project rules,
   plan and README."
4. Commit in two steps:
   `M1: new FindByWorld search page` (index.html only), then
   `M1: rewrite CLAUDE.md, PLAN.md and README for the new design`.

Done when:
- [ ] `git diff main --stat` shows only those five files changed (index.html, CLAUDE.md,
      docs/PLAN.md, README.md, docs/CHANGELOG.md).
- [ ] Test checklist in `CLAUDE.md` passes.

---

## M2 — Split the single file

**Goal:** same page, same behavior, organized into separate files.

Work:
1. Move the `<style>` contents into `css/styles.css` and link it.
2. Move the script into `js/links.js` (every URL builder), `js/search.js` (render,
   filter, copy) and `js/app.js` (startup, form handlers, home ↔ results).
   Keep the `PLATFORMS` and `COUNTRIES` data inside `app.js` for now; it moves in M3.
3. Make `index.html` a clean document with no inline `<style>` or `<script>` blocks.
4. Change nothing visible.

Done when:
- [ ] Old and new versions look and behave identically side by side.
- [ ] Test checklist passes.

---

## M3 — Move the data into JSON

**Goal:** add or fix countries and platforms without touching code.

Work:
1. `data/countries.json`: `[{ "name": "Kenya", "iso": "KE", "region": "Africa" }, …]`
   for all 196 countries. Regions: Africa, Asia, Europe, Middle East, North America,
   Latin America & Caribbean, Oceania.
2. `data/platforms.json`: one entry per platform, not per country:
   ```json
   { "name": "Thomasnet", "domain": "thomasnet.com",
     "focus": "Industrial manufacturing and components",
     "scope": "international",
     "countries": ["US", "CA"],
     "searchUrl": null }
   ```
   `scope` is `"national"` (only lists suppliers from one country, e.g. IndiaMART for
   India) or `"international"` (lists suppliers from many countries, e.g. Thomasnet,
   Europages, Alibaba, TradeKey, Kompass). `searchUrl` stays `null` until M4.
3. `js/app.js` loads both files with `fetch`, checks required fields, skips bad
   records with `console.warn`.
4. If loading fails (e.g. the file was double-clicked instead of opened with
   Live Server), show a clear on-page message telling the user to use Live Server.
5. Write `docs/DATA.md`: every field, allowed values, how to add a country or platform,
   and that the source is the reviewed "Global B2B Directories" research file.

Done when:
- [ ] Results still show 30 dedicated countries and 166 others for every search.
- [ ] Every platform from the old data appears under the same countries as before.
- [ ] Breaking one record on purpose skips only that record with a console warning.
      Revert the test change before committing.
- [ ] Test checklist passes.

---

## M4 — Country-aware and direct search links

**Goal:** fix the two known link problems.

Problem 1: international platforms ignore the country. Canada → Thomasnet returns the
same results as United States → Thomasnet, and France → Europages searches all of
Europe.

Problem 2: every link is a Google `site:` search, and the MOQ only affects the
"Web search" link and the message.

Work:
1. In `js/links.js`, when a platform's `scope` is `"international"`, add the country
   name to its search (e.g. `site:thomasnet.com bicycle Canada`).
   National platforms keep the plain product search.
2. Kompass: use the country's own Kompass site where the data lists one
   (e.g. `gb.kompass.com`, `za.kompass.com`); otherwise `kompass.com` plus the country.
3. Direct search URLs (optional per platform, only with my help):
   - For each of these, ask me to open the platform's own search in a browser, search
     for "bicycle", and paste the resulting address bar URL to you:
     Alibaba, IndiaMART, TradeIndia, Made-in-China, Global Sources, Thomasnet,
     Europages, EC21.
   - Turn each pasted URL into a template with `{q}` in place of the product
     (and `{country}` if the site supports it), and store it in `searchUrl`.
   - If I don't provide a URL for a platform, keep its Google `site:` link.
   - Each result shows the direct link as the main link and the Google link as a small
     "via Google" fallback.
4. MOQ: add the MOQ to the Web search link (already done) and, when an MOQ is entered,
   add a small "low MOQ" note on platforms whose `focus` mentions small batches only if
   the data says so. Do not invent MOQ filters for sites; most do not support one in
   the URL. Explain this in `docs/DATA.md`.

Done when:
- [ ] Canada → Thomasnet and United States → Thomasnet produce different searches.
- [ ] France → Europages search includes "France".
- [ ] Every direct URL added was tested by me, and its "via Google" fallback works.
- [ ] Test checklist passes.

---

## M5 — Regions and recent searches

**Goal:** results that are easier to scan for 196 countries.

Work:
1. Group results by region (from `countries.json`), in this order: Asia, Africa,
   Europe, Middle East, North America, Latin America & Caribbean, Oceania.
   Within each region, countries with dedicated directories come first.
2. Add region chips above the results ("All", "Asia", "Africa", …) that filter the list.
   They work together with "Jump to a country".
3. Remember the last 5 searches (product + MOQ) in `localStorage` and show them as
   chips under the home search bar, with a "Clear" option.

Done when:
- [ ] Choosing "Africa" shows only African countries; "All" restores everything.
- [ ] Recent searches survive a refresh and "Clear" removes them.
- [ ] Test checklist passes.

---

## M6 — Polish, accessibility and SEO

**Goal:** presentation-ready quality.

Work:
1. Accessibility: labels on all inputs, results summary in an `aria-live` region,
   color contrast at least 4.5:1, visible focus, skip link to results.
2. SEO and sharing: title, description meta, Open Graph tags, `favicon.svg`.
3. Add a short "How FindByWorld works" section on the home page (three sentences:
   what it searches, where the directory list comes from, why users must verify
   suppliers).
4. Check layouts at 400px, 768px and 1280px.

Done when:
- [ ] Lighthouse (Chrome DevTools) Accessibility ≥ 95 and Best Practices ≥ 90.
      Put the scores in the PR.
- [ ] Test checklist passes.

---

## M7 — Documentation

**Goal:** a repository a teacher can understand in five minutes.

Work:
1. `README.md`: final version with live link, screenshots placeholder, features,
   how to run, how to edit data, folder structure.
2. `docs/ARCHITECTURE.md`: what each file does; data flow
   (JSON → app.js → links.js → search.js); how home ↔ results switching works.
3. `docs/BUSINESS.md`: the problem (sourcing outside China and the US is fragmented
   across many national directories), who it helps (startups and small brands),
   how it could earn money later (featured directories, a paid sourcing concierge,
   saved searches for teams), and the roadmap.
4. Complete `docs/CHANGELOG.md` for M0–M7.

Done when:
- [ ] Every link in the docs works.
- [ ] Following the README on a fresh clone runs the site.

---

## M8 — Deploy to GitHub Pages

**Goal:** a live public link for the class.

Work:
1. Confirm `main` has all merged milestones.
2. Give me the exact steps: repo → Settings → Pages → Deploy from a branch →
   `main` / `(root)` → Save.
3. After I confirm it's live, check the live URL loads CSS, JS, fonts and both JSON
   files with no 404s in the console.
4. Add the live link to `README.md`. Tag `v1.0` only after I say so.

Done when:
- [ ] The live site passes the Test checklist.
- [ ] README shows the live link.

---

## Optional extras (only if I ask)

- M9: Language toggle (English / Spanish / French / Bengali) for the interface.
- M10: "Open top 5 countries" button that lists the five best directories for the
  search on one card.
- M11: Product suggestions in the search box (a local list of common product names).
