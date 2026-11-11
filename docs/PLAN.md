# FindByWorld build plan

One milestone = one branch = one pull request. Do them in order.
Each milestone lists its goal, the work, and "Done when" checks. A milestone is not
done until every check passes and the PR is open.

---

## M0 — Project setup

**Goal:** a clean Git repository with the rules and plan in place.

Work:
1. Confirm the folder contains `index.html`, `CLAUDE.md`, `docs/PLAN.md`,
   `.github/pull_request_template.md`.
2. Run `git init -b main` if this is not yet a Git repository.
3. Add `.gitignore` with: `.DS_Store`, `Thumbs.db`, `.vscode/`, `node_modules/`.
4. Create `README.md` (short: what FindByWorld is, how to run it with Live Server) and
   `docs/CHANGELOG.md` (with an "M0" entry).
5. Make the first commit on `main`: `M0: project setup`.
6. Tell me how to create an empty GitHub repository and connect it
   (`git remote add origin ...` then `git push -u origin main`). Wait until I confirm.

M0 is the only milestone committed directly to `main`, because there is nothing to
open a PR against yet.

Done when:
- [ ] `git log` shows the M0 commit on `main`.
- [ ] `git remote -v` shows my GitHub repository and `main` is pushed.

---

## M1 — Split the single file

**Goal:** same site, same behavior, but organized into separate files.

Work:
1. Move the `<style>` contents into `css/styles.css` and link it.
2. Move the script into `js/` files: `data.js`, `directory.js`, `rfq.js`, `app.js`.
   Keep the supplier array inside `data.js` for now (it moves to JSON in M2).
3. Make `index.html` a complete document (`<!doctype html>`, `<html lang="en">`,
   `<head>` with charset, viewport, title, description meta, fonts, CSS link).
4. Change nothing visible. No new features, no restyling.

Done when:
- [ ] Side by side, the old and new versions look and behave identically.
- [ ] No inline `<style>` or `<script>` blocks remain in `index.html`.
- [ ] Full Test checklist in `CLAUDE.md` passes.

---

## M2 — Move supplier data to JSON

**Goal:** anyone can edit suppliers without touching code.

Work:
1. Create `data/suppliers.json`: an array of objects with named fields
   (`id`, `name`, `country`, `region`, `city`, `category`, `products`, `hsCode`,
   `moq`, `capacityPerMonth`, `leadTimeDays`, `port`, `badges`, `certifications`,
   `verified`, `whatsapp`, `email`, `founded`, `staff`). Use string ids like `"ke-001"`.
2. `js/data.js` loads it with `fetch("data/suppliers.json")`, checks each record has
   the required fields, skips and logs bad records with `console.warn`.
3. If the fetch fails (for example the file was opened with a double-click instead of
   Live Server), show a clear message on the page explaining to use Live Server.
4. Write `docs/DATA.md`: every field, its type, allowed values (categories, badges,
   regions), and one full example record.

Done when:
- [ ] All 27 sample suppliers still show, with identical details.
- [ ] Breaking one record on purpose (delete its `name`) skips only that record and
      shows a console warning. Revert the test change before committing.
- [ ] Test checklist passes.

---

## M3 — Directory improvements

**Goal:** better filtering and shareable searches.

Work:
1. Add a Certifications filter (chips built from the data, e.g. GOTS, OEKO-TEX 100,
   LWG, ISO 9001).
2. Add a "Max lead time" select (Any, ≤30, ≤45, ≤60 days).
3. Save the current filters in `localStorage` so they survive a refresh.
4. Show the active filters as removable chips above the results.
5. Debounce the search box (about 150 ms).

Done when:
- [ ] Each new filter narrows results correctly (test at least two combinations and
      write them in the PR).
- [ ] Refreshing keeps filters; "Clear all filters" clears saved filters too.
- [ ] Test checklist passes.

---

## M4 — Supplier profiles you can link to

**Goal:** each supplier has a shareable link.

Work:
1. Opening a supplier sets the URL hash to `#s-<id>` (e.g. `#s-ke-001`); loading that
   link opens the profile directly; closing it returns to `#directory`.
2. Add a "Copy link" button to the profile (with a fallback if the clipboard fails).
3. Add "Similar suppliers": up to 3 others in the same category, lowest MOQ first.
4. Keep the existing WhatsApp, email, map and "Request a quote" actions working.

Done when:
- [ ] Pasting a `#s-...` link in a new tab opens that supplier.
- [ ] Browser Back closes the profile.
- [ ] Unknown id (`#s-zz-999`) shows the directory with a short "Supplier not found" note.
- [ ] Test checklist passes.

---

## M5 — RFQ board upgrade

**Goal:** a more realistic request-for-quote flow.

Work:
1. Form validation with clear messages next to fields (title required, quantity ≥ 1).
2. Add fields: target price per unit (optional, USD) and needed-by date (optional).
3. Each RFQ shows its matching suppliers' names (up to 5) with links to their profiles.
4. Let users delete their own posted RFQs (with an on-page "Delete? Yes / Cancel"
   confirmation; do not use `confirm()`).
5. Filter the RFQ list by category.

Done when:
- [ ] Invalid submissions show messages and do not post.
- [ ] Posted RFQs persist after refresh; delete works and persists.
- [ ] Test checklist passes.

---

## M6 — Polish, accessibility and SEO

**Goal:** presentation-ready quality.

Work:
1. Accessibility pass: labels on every control, `aria-live` result count, dialog focus
   returns to the card that opened it, color contrast at least 4.5:1.
2. Add an "About" section on the Plans page: the problem (Alibaba and ThomasNet are
   concentrated in a few regions), who it serves, and the data sources a real version
   would use (export promotion agencies, trade-fair exhibitor lists, business registries).
3. SEO basics: page title and description, Open Graph tags, a simple `favicon.svg`.
4. Add a small "Sample data" banner that stays visible so viewers never mistake the
   listings for real companies.
5. Fix any layout issues at 400px, 768px and 1280px widths.

Done when:
- [ ] Lighthouse (Chrome DevTools) Accessibility score ≥ 95, Best Practices ≥ 90.
      Put the scores in the PR.
- [ ] Test checklist passes.

---

## M7 — Documentation

**Goal:** a repository a teacher can understand in five minutes.

Work:
1. `README.md`: project summary, screenshot placeholder, features list, how to run
   locally, how to edit suppliers (link to `docs/DATA.md`), live site link,
   folder structure, credits.
2. `docs/ARCHITECTURE.md`: what each file does, how data flows
   (JSON → data.js → directory.js / rfq.js), and how routing by hash works.
3. `docs/BUSINESS.md`: value proposition, target users, pricing (Free, Pro $19/month,
   Verified badge $50–$200/year, Concierge $300–$500), and the roadmap
   (real data, founder testing, accounts and payments, claim-your-listing).
4. Complete `docs/CHANGELOG.md` for M0–M7.

Done when:
- [ ] Every link in the docs works.
- [ ] Following the README on a fresh clone runs the site.

---

## M8 — Deploy to GitHub Pages

**Goal:** a live public link for the class.

Work:
1. Confirm `main` has all merged milestones.
2. Give me exact steps: GitHub repo → Settings → Pages → Deploy from a branch →
   `main` / `(root)` → Save.
3. After I confirm it's live, check the live URL loads CSS, JS, fonts and
   `data/suppliers.json` (no 404s in the console).
4. Add the live link to `README.md` and tag the release: `git tag v1.0 && git push --tags`
   (only after I say so).

Done when:
- [ ] The live site passes the Test checklist.
- [ ] README shows the live link.

---

## Optional extras (only if I ask)

- M9: Compare up to 3 suppliers side by side.
- M10: Export filtered results as CSV (generated in the browser).
- M11: Spanish / French language toggle.
