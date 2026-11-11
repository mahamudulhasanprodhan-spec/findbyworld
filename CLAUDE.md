# CLAUDE.md — FindByWorld project rules

Read this file fully at the start of every session. These rules override your defaults.

## What this project is

FindByWorld is a university class project: a directory of diverse textile and leather
suppliers (Kenya, Egypt, India, Vietnam, Portugal) for startups that need small-batch
manufacturing. It has three views: Directory, RFQ board, Plans.

- Starting point: `index.html`, a single working file that contains all HTML, CSS and JS.
- Hosting: GitHub Pages (free, static files only).
- The full plan is in `docs/PLAN.md`. Work through it one milestone at a time.

## Tech rules (do not break these)

1. Plain HTML, CSS and JavaScript only. No React, no Vue, no Tailwind, no TypeScript,
   no bundler, no npm packages, no build step. The site must work by opening it with
   VS Code Live Server and on GitHub Pages with zero setup.
2. No backend, no database, no API keys. Saved user data uses `localStorage`, always
   wrapped in `try/catch`.
3. Only external resource allowed: Google Fonts. Nothing else from a CDN.
4. Keep the existing look (colors, fonts, layout) unless a milestone says to change it.
5. All supplier data is fictional sample data. Never add real company names, real phone
   numbers or real emails. Use `.example` email domains and obviously fake numbers.
6. Every page must work at phone width (400px) and in dark mode.
7. Use relative paths (`css/styles.css`, not `/css/styles.css`), because GitHub Pages
   serves the site from a subfolder.

## File structure (target, after M1–M2)

```
index.html
css/styles.css
js/data.js        loads and validates supplier data
js/directory.js   search, filters, cards, supplier dialog
js/rfq.js         RFQ board
js/app.js         startup and tab routing
data/suppliers.json
docs/PLAN.md  docs/DATA.md  docs/CHANGELOG.md
README.md
```

Keep each JS file under about 300 lines. Use plain `<script>` tags in order, or
`type="module"`; pick one in M1 and keep it.

## How to work (step by step, every milestone)

1. **Read** `CLAUDE.md`, `docs/PLAN.md` and the files you will touch.
2. **Plan first.** Before editing anything, reply with:
   the milestone number, the files you will create or change, and a short step list.
   Then STOP and wait for me to say "go".
3. **Branch.** `git checkout main && git pull` (skip pull if there is no remote yet),
   then `git checkout -b m<N>-<short-name>`, for example `m2-data-file`.
4. **Build in small steps.** One logical change per commit. Commit message format:
   `M<N>: <what changed>`, for example `M2: move suppliers into data/suppliers.json`.
5. **Stay in scope.** Only do what the current milestone lists. If you notice something
   else that should change, write it under "Follow-ups" in your summary. Do not fix it.
6. **Self-check** using the milestone's "Done when" list and the Test checklist below.
   Tell me exactly what I should click in Live Server to confirm it works.
7. **Update docs**: add an entry to `docs/CHANGELOG.md`; update `README.md` or
   `docs/DATA.md` if the milestone changed how something works.
8. **Pull request.** Push the branch and open a PR (see "PR steps" below).
9. **STOP.** Do not start the next milestone until I say "merged" or "next".

## PR steps

1. `git push -u origin m<N>-<short-name>`
2. If the GitHub CLI is installed and logged in (`gh auth status` succeeds), run:
   `gh pr create --base main --title "M<N>: <title>" --body-file <temp file>`
   using the template in `.github/pull_request_template.md`.
3. If `gh` is not available, do not try to install it. Give me the PR title and body
   as text and tell me to open the PR on github.com.
4. After I merge: `git checkout main && git pull && git branch -d m<N>-<short-name>`.

## Never do these

- Never run `git push --force`, `git reset --hard`, or delete branches I did not ask
  you to delete.
- Never commit directly to `main`.
- Never delete or rewrite `data/suppliers.json` entries unless the milestone says so.
- Never add a dependency, framework or build tool, even if it "would be easier".
- Never mark a milestone done if a check fails. Tell me what failed instead.
- Never guess. If something in the plan is unclear, ask one question and wait.

## Test checklist (run before every PR)

- [ ] Page loads in Live Server with no errors in the browser console (F12 → Console).
- [ ] Directory: search, region, country, category, MOQ slider, badges, verified-only
      and "Clear all filters" all work.
- [ ] Clicking a supplier card opens the profile; Close and Esc close it.
- [ ] RFQ board: posting a request adds it to the top and survives a page refresh.
- [ ] Tabs (Directory / RFQ board / Plans) switch, and the browser Back button works.
- [ ] Phone width (DevTools device toolbar, 400px): no sideways scrolling.
- [ ] Dark mode (DevTools → Rendering → prefers-color-scheme: dark): all text readable.
- [ ] Keyboard only: Tab reaches every control and focus is visible.
