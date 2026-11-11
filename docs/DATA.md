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
| `searchUrl` | text or `null` | no | A template for the platform's own search page (see "Direct search links" below). `null` means the platform uses a Google search of its site. |

`scope` values:

- `national`: the platform lists suppliers from one country, for example IndiaMART for
  India or `ar.kompass.com` for Argentina.
- `international`: the platform lists suppliers from many countries, for example
  Alibaba, Thomasnet, Europages or TradeKey.

For an `international` platform, the Google search also includes the name of the
country the link is shown under, for example `site:thomasnet.com bicycle Canada`.
A `national` platform is searched for the product only.

## Direct search links

Every platform has a Google link: a Google search limited to the platform's `domain`.
A platform with a `searchUrl` also gets a direct link to its own search page. The direct
link becomes the main link, and the Google link is shown beside it as "via Google".

`searchUrl` is the address of the platform's search results, with a placeholder where
the product goes:

| Placeholder | Replaced by | Example for "leather bags" |
|---|---|---|
| `{q}` | the product, URL-encoded | `leather%20bags` |
| `{q-}` | the product in lowercase, with hyphens between words | `leather-bags` |
| `{country}` | the country name, URL-encoded | `France` |

```json
"searchUrl": "https://www.tradeindia.com/search.html?keyword={q}"
```

Rules:

- It must start with `https://` and contain `{q}` or `{q-}`.
- Never guess a search address. Search for a product on the platform, copy the address
  from the address bar, remove tracking parameters, and put the placeholder where the
  product was. Then open the result with two different products and check both return
  results before saving it.
- Do not add a `searchUrl` when the address contains something specific to one product,
  such as a category number. Leave it `null`.
- With `{q-}`, a product with no letters a–z or digits (for example one typed in
  another alphabet) has no direct link, and the Google link is used.

Platforms with a direct link today: Alibaba, TradeIndia, Made-in-China, Global Sources
and EC21.

## Kompass

Countries without their own platforms get a small "Kompass" link that searches
`kompass.com` for the product and the country name. A country whose platform list
already has its own Kompass site (a `domain` ending in `kompass.com`, such as
`gb.kompass.com`) does not get the small link, because it would repeat the main result.

## MOQ

The MOQ the user types appears in the message to send suppliers, in the "Ask for MOQ"
note under each platform, and in the "Web search" link. It is not sent to the
directories: most of them have no MOQ filter that can be set through the address, so
FindByWorld does not invent one.

Within one country, platforms appear in the same order as in the file.

## How to add a country

1. Add a record to `data/countries.json` in alphabetical position.
2. Use a two-letter ISO code that no other record uses, and one of the seven regions.

A country with no platform appears under "All other countries" with Kompass and web
search links.

## How to add a platform

1. Add a record to `data/platforms.json` with `name`, `domain`, `focus`, `scope`,
   `countries` and `"searchUrl": null` (or a tested template, see "Direct search links").
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
