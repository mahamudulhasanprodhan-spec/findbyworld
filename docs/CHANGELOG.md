# Changelog

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
