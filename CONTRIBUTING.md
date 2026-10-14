# Contributing

Thank you for helping people find free support. Please read the rules first; they exist because a wrong number can hurt someone.

## Rules for every entry

- **Official sources only.** A government or health-authority page, or the service's own website. Not news articles, forums, search results or AI answers.
- **Free or public services only.** No paid products, private clinics or advertising.
- **No personal information.** No personal phone numbers or names, and do not post your own private details. Issues and pull requests are public.
- **Only what the source says.** If the page does not state the hours, cost or languages, leave that field `null`. Do not guess.

## Easiest way: fill in a form

- [Add a help line](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=1-new-resource.yml)
- [Report wrong or outdated information](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=2-correction.yml)

You can write in any language. A maintainer will turn it into an entry.

## Editing the files directly

Each region has one file, `data/regions/<CODE>.json`, named with its two-letter code (ISO 3166-1 alpha-2, e.g. `JP.json`).

```json
{
  "code": "TW",
  "name": "台灣",
  "resources": [
    {
      "id": "tw-quit",
      "kind": "cessation",
      "name": "戒菸專線",
      "organization": "衛生福利部國民健康署",
      "number": "0800-636-363",
      "destination": "tel:0800636363",
      "scope": "台灣",
      "hours": "週一至週六 09:00–21:00；春節期間除外",
      "timeZone": "Asia/Taipei",
      "cost": "免付費諮詢",
      "languages": null,
      "crossBorder": null,
      "status": "verified",
      "checkedAt": "2026-09-10",
      "reviewBy": "2026-12-10",
      "sources": [
        { "url": "https://www.mohw.gov.tw/cp-16-80233-1.html", "fields": ["number", "scope", "hours", "cost"], "sourceUpdatedAt": null }
      ]
    }
  ]
}
```

| Field | Meaning |
|---|---|
| `id` | Lower-case region code, a dash, then a short name: `jp-quit`. Unique. |
| `kind` | `cessation` (help to quit), `emotional` (emotional or crisis support) or `emergency`. |
| `name`, `organization` | Service name and who runs it. |
| `number` | Phone number as people would dial it locally. Leave it out for web or app services. |
| `destination` | `tel:` plus the digits of `number` (no spaces or dashes), or an `https://` link when there is no number. |
| `scope` | Who and where it serves. |
| `hours`, `timeZone`, `cost`, `languages`, `crossBorder` | Text, or `null` when the source does not say. `timeZone` uses names like `Asia/Taipei`. |
| `note` | Optional short caveat. |
| `status` | `verified`, `unverified` or `withdrawn`. **New submissions use `unverified`.** Only a maintainer sets `verified`. |
| `checkedAt` | Date the entry was checked against its sources. |
| `reviewBy` | Date by which it should be checked again. |
| `sources` | Official pages. `fields` lists which fields each page confirms. `sourceUpdatedAt` is the page's own update date, or `null`. When there is more than one source, give each a distinct `label`. |

Check your change before opening a pull request:

```bash
node scripts/validate.mjs
```

The same check runs automatically on every pull request.

## What maintainers do

1. Open every source link and compare each field.
2. Correct or ask questions in the issue or pull request.
3. Merge, set `status` to `verified` and update `checkedAt` and `reviewBy`.

An entry that cannot be confirmed stays out, or stays `unverified`.
