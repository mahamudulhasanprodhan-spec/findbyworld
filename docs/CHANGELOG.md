# Changelog

## M5: Regions and recent searches (2026-11-11)

- Results are grouped by region (Asia, Africa, Europe, Middle East, North America,
  Latin America & Caribbean, Oceania). In each region, countries with their own
  directories come first.
- Added region chips ("All" plus the seven regions) that filter the results and work
  together with "Jump to a country".
- The last 5 searches (product and MOQ) are saved in `localStorage` and shown as chips
  under the home search bar, with a "Clear" button.
- Updated `docs/DATA.md` and `README.md`.

## M4: Country-aware and direct search links (2026-11-10)

- Searches on international platforms now include the country, so Canada → Thomasnet
  and United States → Thomasnet are different searches, and France → Europages
  includes "France".
- The small "Kompass" link is hidden in the six countries whose main result is already
  their own Kompass site.
- Added direct search links, tested in a browser with two products each, for Alibaba,
  TradeIndia, Made-in-China, Global Sources and EC21. Each keeps a "via Google" link.
- Added the `{q-}` placeholder for sites that write the search with hyphens in the path.
- IndiaMART, Thomasnet and Europages keep their Google links.
- The product and MOQ boxes now show a clear focus ring in the accent color. Before,
  the MOQ box showed no focus and the product box only a faint shadow.
- `docs/DATA.md` explains scope, direct search links, Kompass and why the MOQ is not
  sent to the directories.

## M3: Move the data into JSON (2026-11-10)

- Moved the 196 countries into `data/countries.json` (with a region for each) and the
  41 platforms into `data/platforms.json` (one record per platform, with `scope`,
  `countries` and `searchUrl: null`).
- Added the optional `focusByCountry` field so Thomasnet and TradeKey keep their
  different descriptions per country.
- `js/app.js` now loads both files with `fetch`, skips bad records with a console
  warning, and shows a message on the page if the files cannot be loaded.
- Added `docs/DATA.md` and updated `README.md`. Results are unchanged.

## M2: Split the single file (2026-11-10)

- Moved all styles from `index.html` into `css/styles.css`, unchanged.
- Moved the script into `js/links.js` (search URL builders), `js/search.js` (results,
  country filter, copy message) and `js/app.js` (data, form handlers, home ↔ results
  switching), unchanged. They load as plain `<script>` tags in that order.
- `index.html` no longer has inline `<style>` or `<script>` blocks. Nothing visible changed.
- Updated the file descriptions in `CLAUDE.md` and the project structure in `README.md`.

## M1: Switch to the FindByWorld design (2026-11-10)

- Replaced the supplier directory prototype with the FindByWorld country-by-country
  search page; rewrote project rules, plan and README.
- Corrected the M1 "Done when" check in `docs/PLAN.md` to list five changed files.

## M0: Project setup (2026-11-10)

- Started the Git repository on `main`.
- Renamed the project to "FindByWorld" in `index.html`, `CLAUDE.md` and `docs/PLAN.md`.
- Renamed the saved RFQ storage key to `findbyworld-rfqs`.
- Added `.gitignore`, `README.md` and this changelog.
