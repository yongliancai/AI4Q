# 🌻 向日葵 AI4Q 營｜AI 自畫像教材

此儲存庫放置國小一至六年級「AI 自畫像：現在的我，未來的我」40 分鐘課程教材。

## 檔案與用途

| 檔案 | 用途 |
|---|---|
| `index.html` | 10 頁教師用互動網頁簡報（含插畫、提示詞揭曉、8 分鐘計時器） |
| `vocabulary.html` | 學生用 16 個特質詞庫、生活情境、可複製提示詞 |
| `create_google_form.gs` | 在 Google Apps Script 建立整合式電子學習單 Google 表單及 Google Sheets 回覆表 |

## 部署 GitHub Pages

1. 開啟 [Repository Settings → Pages](https://github.com/yongliancai/AI4Q/settings/pages)。
2. **Build and deployment** 選 **Deploy from a branch**。
3. Branch 選 `main`，Folder 選 `/(root)`，按 **Save**。
4. 等待 GitHub 完成發布後，到 Pages 設定頁核對發布狀態。

**預期網址（必須在 Pages 啟用、發布成功後才可使用）**

- 教師簡報：`https://yongliancai.github.io/AI4Q/`
- 學生詞庫：`https://yongliancai.github.io/AI4Q/vocabulary.html`

不要在頁面真正發布之前，把預期網址當成已完成的對外連結。

## 建立整合式 Google 表單

1. 開啟 [Google Apps Script](https://script.google.com/) 並新增專案。
2. 把 `create_google_form.gs` 貼進 `Code.gs`，儲存。
3. 執行 `createAI4QForm()` 並完成 Google 的存取授權。
4. 執行後，開啟執行記錄中的**表單編輯網址**，或在新建立的 Google Sheets「管理資訊」分頁查看連結。
5. 最後一區手動新增題目 **「上傳我的 AI 自畫像圖片」**，題型選 **檔案上傳**、只允許圖片、最多一個檔案，並設必填。
6. 用測試帳號完成一份表單，確認圖片存入 Google Drive、文字紀錄存入 Google Sheets，測試後刪除測試回覆。

**重要限制**：Google 表單「檔案上傳」需要填答學生登入 Google 帳號；目前的 Apps Script 表單建立 API 不能直接新增上傳題目，必須到 Google 表單介面操作。

## 教學／隱私注意

- 學習目標：三個自我面向 → 選一個特質 → 生活行動 → AI 自畫像 → 觀察及修正提示詞。
- 學生可用 **小隊＋作品代碼**，不必在公開網頁填姓名或上傳真實照片。
- 正式 AI 生圖由符合服務使用規範的成人協助；不要求兒童自行登入成人帳號。
- GitHub 儲存庫是**公開**的，切勿提交學生回覆、照片、圖片上傳檔案或含個資的表格。
- 回覆 Sheets、作品 Drive 應維持私人存取；活動完成後依需要刪除學生資料。
- **GitHub Pages** 僅負責展示靜態教材，**Google 表單／Sheets／Drive** 負責繳交與儲存。
- 課前先測試現場網路、成人 AI 生成帳號額度，以及 Google 上傳登入情況。

## 審查

- 教育：國小混齡共用流程；16 個特質為參考而非固定答案；圖像不代表完整人格。
- 美術：大字體、明亮色彩、主次分明；故事書風格插畫統一。
- 網頁：簡報 10 頁；手機／平板／桌面自適應；詞庫可搜尋、切換、產生及複製提示詞。
