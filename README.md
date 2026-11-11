# FindByWorld

A simple, Google-style supplier search for startups and small brands.

Type a product (for example **bicycle**), add an optional **MOQ** (minimum order
quantity, for example **100**), and press **Search**. FindByWorld shows results
country by country:

- **30 countries with their own B2B directories**, such as China (Alibaba,
  Global Sources, Made-in-China), India (IndiaMART, TradeIndia), Germany
  (IndustryStock, WLW) and the United States (Thomasnet, MFG.com). Each platform gets
  a search link for your product.
- **166 more countries** through global directories (Kompass) and web search.
- A **ready-to-copy message** to send suppliers, including your order quantity.

FindByWorld is a meta-search page: it does not store supplier listings. It sends your
search to the right directory in each country. The country and platform list comes
from the reviewed research file *Comprehensive Global B2B Directories – All Countries*.

> FindByWorld does not verify suppliers. Always check business licences, ask for
> samples and use secure payment terms before ordering.

## Run it locally

1. Install [VS Code](https://code.visualstudio.com/) and the **Live Server** extension.
2. Open this folder in VS Code.
3. Right-click `index.html` → **Open with Live Server**.

No installs, no build step, no API keys.

## Project structure

```
index.html                     the page structure (no inline CSS or JS)
css/styles.css                 all styles, including dark mode
js/links.js                    builds every search URL (loaded first)
js/search.js                   renders results, country filter, copy message
js/app.js                      data, form handlers, home ↔ results switching (loaded last)
CLAUDE.md                      rules for the AI coding assistant
docs/PLAN.md                   milestones M1–M8
docs/CHANGELOG.md              what changed in each milestone
.github/pull_request_template.md
```

## Built with

Plain HTML, CSS and JavaScript, hosted free on GitHub Pages.
Built step by step with an AI coding assistant as a university class project.

## Live site

Coming in milestone M8.
