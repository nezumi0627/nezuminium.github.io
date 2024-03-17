document.addEventListener("DOMContentLoaded", async () => {
  try {
    await liff.init({ liffId: '<LIFF_ID>' });

    document.getElementById('sendBtn').addEventListener('click', async () => {
      try {
        const profile = await liff.getProfile();
        const displayName = profile.displayName;
        const userId = profile.userId;

        const message = `
言語設定：ja-JP
LIFF SDKのバージョン：${liff.getVersion()}
LINE内ブラウザで動作させているか：${liff.isInClient()}
ログインしているか：${liff.isLoggedIn()}
OS：${liff.getOS()}
アクセストークン：${liff.getAccessToken()}
画面（1対1のチャット、グループ、またはトークルーム）を一意に識別する値：${JSON.stringify(liff.getContext())}
ユーザー名等：
ユーザー名：${displayName}
ユーザーID：${userId}`;

        sendLiff(message);
      } catch (err) {
        console.error('Error:', err);
      }
    });
  } catch (err) {
    console.error('Error:', err);
  }
});

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
