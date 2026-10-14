# Quit-smoking helplines by region

**English** · [繁體中文](#繁體中文)

A small, open list of free help for people who want to stop smoking: quitlines, emotional and crisis support lines, and emergency numbers, grouped by country or region. Every entry links to the official page it was checked against.

This repository holds **only this list**. It is used by a quit-smoking app, and anyone may reuse it.

> **Not medical advice.** If someone is in immediate danger, call the local emergency number. Services change. Always confirm on the official source linked in each entry.

## What is here

| Region | File | Entries |
|---|---|---|
| Taiwan 台灣 | [`data/regions/TW.json`](data/regions/TW.json) | 5 |
| Hong Kong 香港 | [`data/regions/HK.json`](data/regions/HK.json) | 3 |
| Singapore 新加坡 | [`data/regions/SG.json`](data/regions/SG.json) | 3 |
| United States 美國 | [`data/regions/US.json`](data/regions/US.json) | 4 |
| Canada 加拿大 | [`data/regions/CA.json`](data/regions/CA.json) | 3 |
| Australia 澳洲 | [`data/regions/AU.json`](data/regions/AU.json) | 3 |

Each entry is one of three kinds: `cessation` (help to quit), `emotional` (emotional or crisis support) or `emergency`.

## Help keep it right

Your region missing, or a number out of date? You do not need to write code.

1. **[Add a help line for your region](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=1-new-resource.yml)**
2. **[Report wrong or outdated information](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=2-correction.yml)**

Both are short forms (a free GitHub account is needed). Please always include the **official page** where the information appears: a government or health-authority site, or the service's own site.

Comfortable with GitHub? You can also edit a file under `data/regions/` and open a pull request. See [CONTRIBUTING.md](CONTRIBUTING.md).

## How a change goes live

1. You submit a form or pull request.
2. A maintainer opens the official source and checks every field against it.
3. Only then is the change merged, with a new `checkedAt` date.
4. The app picks up merged changes in its next release.

Nothing reaches the app without this check. Wrong numbers can send people in distress to the wrong place, so we would rather be slow than wrong.

## License

The data is released under [CC0 1.0](LICENSE) (public domain). Reuse it freely.

---

## 繁體中文

這裡是一份公開的各地免費求助資料：戒菸專線、情緒／危機支持專線和緊急電話，依國家或地區分類。每一筆都附上當初核對用的官方網頁。

這個 repo **只放這份資料**，不含 App 程式。資料目前用在一個戒菸 App，任何人都可以拿去用。

> **這不是醫療建議。** 有立即危險請打當地緊急電話。服務內容會變動，請以每筆資料附的官方來源為準。

### 想幫忙更新？

不用會寫程式，填表就可以：

1. **[新增你所在地區的求助專線](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=1-new-resource.yml)**
2. **[回報資料錯誤或過期](https://github.com/sparkfang-hub/quit-smoking-helplines/issues/new?template=2-correction.yml)**

需要免費的 GitHub 帳號。請一定附上**官方網頁**：政府、衛生主管機關，或該服務自己的網站。

### 怎麼生效

你提出 → 維護者打開官方來源逐欄核對 → 確認無誤才合併，並寫上新的核對日期 → App 下次發版時帶進去。

沒經過核對的內容不會進到 App。號碼錯了，可能讓正在難受的人打錯地方，所以寧可慢，不能錯。

### 授權

資料以 [CC0 1.0](LICENSE)（公眾領域）釋出，歡迎自由使用。
