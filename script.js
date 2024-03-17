// liffの初期化とDOMContentLoadedイベントのリスナー
document.addEventListener("DOMContentLoaded", async () => {
    try {
      await liff.init({ liffId: '<LIFF_ID>' });
  
      // 「sendBtn」ボタンのクリックイベントリスナーを設定
      document.getElementById('sendBtn').addEventListener('click', async () => {
        try {
          const profile = await liff.getProfile();
          const displayName = profile.displayName;
          const userId = profile.userId;
  
          // プロフィール情報とLIFF情報を取得してメッセージとして送信
          const message = `
  ○言語設定
  liff.getLanguage()=${liff.getLanguage()}
  
  ○LIFF SDKのバージョン
  liff.getVersion()=${liff.getVersion()}
  
  ○LINE内ブラウザで動作させているかどうか
  liff.isInClient()=${liff.isInClient()}
  
  ○ログインしているかどうか
  liff.isLoggedIn()=${liff.isLoggedIn()}
  
  ○OS
  liff.getOS()=${liff.getOS()}
  
  ○アクセストークン
  liff.getAccessToken()=${liff.getAccessToken()}
  
  ○画面（1対1のチャット、グループ、またはトークルーム）を一意に識別する値
  liff.getContext()=${JSON.stringify(liff.getContext())}
  
  ○ユーザー名等
  ユーザー名:${displayName}
  ユーザーID:${userId}`;
  
          // 取得した情報をメッセージとして送信
          sendLiff(message);
        } catch (err) {
          document.getElementById('log').innerText = 'getProfile ng\n' + err;
        }
      });
    } catch (err) {
      document.getElementById('log').innerText = 'init ng\n' + err;
    }
  });
  
  // メッセージを送信する関数
  function sendLiff(text) {
    liff.sendMessages([{
      type: 'text',
      text: text,
      sentBy: {
        label: "ねずみ",
        iconUrl: "https://raw.githubusercontent.com/nezumi0627/nezuminium.github.io/main/giphy.gif",
        linkUrl: "https://github.com/nezumi0627"
      }
    }]).then(function () {
      liff.closeWindow();
    });
  }
  