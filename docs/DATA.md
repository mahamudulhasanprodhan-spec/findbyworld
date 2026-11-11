# FindByWorld data

All the countries and directories FindByWorld shows come from two files:

- `data/countries.json`: the 196 countries
- `data/platforms.json`: the 41 B2B directories ("platforms")

You can add or fix a country or platform by editing these files. No code changes are
needed. The list comes from the reviewed research file *Comprehensive Global B2B
Directories – All Countries*.

`js/app.js` loads both files when the page opens. The files only load through a web
server, so open the site with VS Code Live Server, not by double-clicking `index.html`.

## countries.json

A list of records, one per country, in the order they appear on the page.

```json
{ "name": "Kenya", "iso": "KE", "region": "Africa" }
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | text | yes | The country name shown on the page. |
| `iso` | text | yes | Two capital letters (ISO 3166-1 alpha-2), for example `KE`. Each code may appear only once. |
| `region` | text | yes | One of the seven regions below, spelled exactly. |

Allowed regions:

- `Africa` (includes North Africa, for example Egypt and Morocco)
- `Asia` (includes Central Asia and the Caucasus)
- `Europe` (includes Russia and Cyprus)
- `Middle East` (Gulf states, the Levant, Iran, Iraq, Israel, Yemen and Turkey)
- `North America` (the United States and Canada only)
- `Latin America & Caribbean` (includes Mexico and Central America)
- `Oceania`

The page does not use `region` yet. Milestone M5 groups results by region.

## platforms.json

A list of records, one per platform (not one per country). A platform that serves
several countries lists all of them in `countries`.

```json
{ "name": "Thomasnet", "domain": "thomasnet.com",
  "focus": "Industrial manufacturing and components",
  "scope": "international",
  "countries": ["CA", "US"],
  "focusByCountry": { "US": "Industrial, custom manufacturing" },
  "searchUrl": null }
```

| Field | Type | Required | Rules |
|---|---|---|---|
| `name` | text | yes | The platform name shown in the result link. |
| `domain` | text | yes | The site's domain without `https://`, for example `indiamart.com`. Used for the search link. |
| `focus` | text | yes | A short description of what the platform covers. Shown under the link. |
| `scope` | text | yes | `national` or `international` (see below). |
| `countries` | list of text | yes | ISO codes from `countries.json`. At least one. |
| `focusByCountry` | object | no | A different description for one country: `{ "US": "…" }`. Countries not listed here use `focus`. |
| `searchUrl` | text or `null` | no | The platform's own search address. Keep it `null`; it is filled in during milestone M4, and only with addresses that were tested in a browser. |

`scope` values:

- `national`: the platform lists suppliers from one country, for example IndiaMART for
  India or `ar.kompass.com` for Argentina.
- `international`: the platform lists suppliers from many countries, for example
  Alibaba, Thomasnet, Europages or TradeKey.

The page does not use `scope` yet. Milestone M4 uses it to add the country name to
searches on international platforms.

Within one country, platforms appear in the same order as in the file.

## How to add a country

1. Add a record to `data/countries.json` in alphabetical position.
2. Use a two-letter ISO code that no other record uses, and one of the seven regions.

A country with no platform appears under "All other countries" with Kompass and web
search links.

## How to add a platform

1. Add a record to `data/platforms.json` with `name`, `domain`, `focus`, `scope`,
   `countries` and `"searchUrl": null`.
2. In `countries`, use ISO codes that exist in `countries.json`.

The countries listed then appear under "Countries with dedicated directories".

Only public B2B directories and marketplaces belong here. Never add an individual
supplier's name, phone number, email or address (see `CLAUDE.md`).

## What happens with a mistake

Open the browser console (Ctrl + Shift + J) to see these messages.

- **A record with a missing or wrong field** is skipped, and the console shows a warning
  such as `platforms.json: skipped record 14 (missing name)`. All other records still load.
- **An ISO code in `countries` that is not in `countries.json`** is ignored, with a warning.
- **A file that cannot be read** (a missing comma or bracket, or the page was opened by
  double-click) turns search off and shows a message on the page.

JSON is strict: use double quotes, put a comma between records, and no comma after the
last one.
