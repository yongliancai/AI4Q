/**
 * 向日葵 AI 4Q 營隊｜AI 自畫像：整合式 Google 表單自動建立器
 * 在 https://script.google.com 建立新專案，貼上本檔並執行 createAI4QForm()。
 * 會建立 Google 表單和 Google 試算表，並連結回覆。
 * 注意：Google Forms API 和 FormsApp 無法程式建立「檔案上傳」題；
 * 執行後必須在表單編輯器手動新增一題「檔案上傳」。
 */

const AI4Q_TRAITS = [
  '活潑', '安靜', '幽默', '好奇', '有創意', '細心', '喜歡思考', '樂觀',
  '善良', '體貼', '勇敢', '誠實', '合作', '有耐心', '負責任', '堅持',
  '其他（在下一題填寫）'
];

function createAI4QForm() {
  const title = '向日葵 AI4Q 營｜AI 自畫像電子學習單與成果繳交';
  const form = FormApp.create(title);
  form.setDescription(
    '40 分鐘課程｜現在的我、與別人相處的我、未來的我。\n' +
    '請由學生決定答案，低年級可由隊輔協助輸入。\n' +
    '請使用小隊與作品代碼，不必填真實姓名。AI 繪圖由符合平台使用規範的成人協助。\n' +
    '請先完成自畫像，再上傳圖片後送出表單。'
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setConfirmationMessage('完成繳交！謝謝你分享今天的 AI 自畫像。老師會整理大家的作品。');
  form.setAcceptingResponses(true);

  const sheet = SpreadsheetApp.create('向日葵 AI4Q 營｜AI 自畫像學生回覆');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  form.addSectionHeaderItem()
      .setTitle('① 認識三個不同面向的自己')
      .setHelpText(
        '核心特質參考（你也可以自行補充）：\n' +
        '活潑—和朋友玩遊戲；安靜—坐在窗邊閱讀；幽默—分享有趣故事；好奇—觀察昆蟲；\n' +
        '有創意—用積木做特別城堡；細心—檢查作品；喜歡思考—試不同解法；樂觀—失利後繼續練習；\n' +
        '善良—扶起跌倒同學；體貼—陪伴難過朋友；勇敢—緊張仍上台；誠實—主動說明錯誤；\n' +
        '合作—分工完成海報；有耐心—慢慢完成拼圖；負責任—完成打掃；堅持—跌倒後繼續練習。'
      );
  form.addTextItem().setTitle('我的作品代碼').setHelpText('例：A01。請依隊輔指示填寫，避免填真實姓名。').setRequired(true);
  form.addListItem().setTitle('我是哪一組？').setChoiceValues(['1–2 年級組', '3 年級組', '4 年級組', '5–6 年級組']).setRequired(true);
  form.addTextItem().setTitle('我的小隊').setHelpText('填寫小隊名稱或代碼').setRequired(true);
  form.addListItem().setTitle('現在的我：我平常展現的特質').setChoiceValues(AI4Q_TRAITS).setRequired(true);
  form.addListItem().setTitle('與別人相處的我：我和別人相處時的特質').setChoiceValues(AI4Q_TRAITS).setRequired(true);
  form.addListItem().setTitle('未來的我：我希望培養的特質').setChoiceValues(AI4Q_TRAITS).setRequired(true);
  form.addTextItem().setTitle('若選「其他」，請補充我自己想的特質').setHelpText('沒有選其他就可以跳過；有多個可用逗號隔開。').setRequired(false);

  form.addPageBreakItem()
      .setTitle('② 把一個特質變成畫面')
      .setHelpText('從剛才三個面向中，自由挑選最想表達的一個特質。先想行動，再想在哪裡發生。');
  form.addListItem().setTitle('這張自畫像，我最想表現哪一個特質？').setChoiceValues(AI4Q_TRAITS).setRequired(true);
  form.addTextItem().setTitle('若上一題選「其他」，在這裡填寫特質').setRequired(false);
  form.addParagraphTextItem()
      .setTitle('這個特質對我來說，代表什麼具體行動？')
      .setHelpText('例：勇敢＝雖然有點緊張，仍願意上台嘗試；可以使用自己的生活經驗。')
      .setRequired(true);
  form.addParagraphTextItem()
      .setTitle('我想讓 AI 畫出什麼情境？')
      .setHelpText('例：第一次站在舞台上，拿著麥克風表演。')
      .setRequired(true);

  form.addPageBreakItem()
      .setTitle('③ 我的 AI 提示詞與修正')
      .setHelpText(
        '給 AI 的提示詞範例：\n' +
        '「請畫出一位虛構的小學生，在【場景】中【具體行動】，呈現【特質】。' +
        '使用溫暖、適合兒童的插畫風格，不要加入文字。」\n' +
        '先使用第一版描述產生圖片，再觀察是否符合自己的想法。'
      );
  form.addParagraphTextItem().setTitle('第一版 AI 提示詞').setHelpText('可以貼上自己使用的提示詞；低年級可由隊輔協助。').setRequired(true);
  form.addMultipleChoiceItem()
      .setTitle('AI 畫出我原本想表現的行動了嗎？')
      .setChoiceValues(['有，符合我的想法', '有一部分符合', '還沒有表現清楚'])
      .setRequired(true);
  form.addParagraphTextItem()
      .setTitle('修改後的提示詞（第二版）')
      .setHelpText('補充一個動作、場景或情境細節；第二次生成不是必做。')
      .setRequired(true);

  form.addPageBreakItem()
      .setTitle('④ 上傳自畫像與完成分享')
      .setHelpText(
        '重要：表單建立後，老師需要在這一段手動新增「檔案上傳」題。\n' +
        '建議題目：「上傳我的 AI 自畫像圖片」（必填；圖片格式；最多 1 個檔案）。\n' +
        '使用檔案上傳題時，學生必須登入 Google 帳號。請先確定孩子能登入、知道圖片儲存位置。'
      );
  form.addParagraphTextItem()
      .setTitle('完成這張自畫像，我更認識自己的哪一點？')
      .setHelpText('例如：我發現自己的勇敢不一定是不害怕，而是願意試試看。')
      .setRequired(false);

  // 將可直接開啟的網址寫入私人試算表第一個新分頁，方便教師保存。
  const meta = sheet.insertSheet('管理資訊');
  const info = [
    ['項目', '網址或說明'],
    ['表單編輯網址', form.getEditUrl()],
    ['學生填答網址', form.getPublishedUrl()],
    ['回覆試算表', sheet.getUrl()],
    ['必做：新增上傳題', 'Google 表單編輯 → 最後一區 → + 新增問題 → 檔案上傳 → 圖片 → 1 個 → 必填'],
    ['必做：測試', '使用一個測試學生帳號，確認圖片與回覆都能成功繳交；刪除測試資料後再正式使用'],
    ['資料安全', '不要將學生照片、Email 或完整回覆公開；活動後依需要清理資料']
  ];
  meta.getRange(1, 1, info.length, 2).setValues(info);
  meta.setFrozenRows(1);
  meta.autoResizeColumns(1, 2);

  Logger.log('表單編輯：' + form.getEditUrl());
  Logger.log('學生填答：' + form.getPublishedUrl());
  Logger.log('回覆試算表：' + sheet.getUrl());
  return { formEditUrl: form.getEditUrl(), formPublicUrl: form.getPublishedUrl(), responsesSheetUrl: sheet.getUrl() };
}