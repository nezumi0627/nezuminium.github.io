const LIFF_ID = "2005745965-Vvy4WKpZ";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        await liff.init({ liffId: LIFF_ID });
        if (liff.isInClient()) {
            await initializeLiff();
        }
    } catch (error) {
        console.error('LIFF Initialization failed', error);
    }
});

async function initializeLiff() {
    try {
        if (!liff.isLoggedIn()) {
            window.alert("LINEアカウントにログインしてください。");
            liff.login();
        } else {
            await urlParamsCheck();
        }
    } catch (error) {
        console.error('Error initializing LIFF', error);
    }
}

async function urlParamsCheck() {
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get('text');
    const spamParam = urlParams.get('spam');

    if (textParam !== null) {
        await sendMessage({
            type: 'text',
            text: textParam,
            sentBy: {
                label: "ねずみぷろじぇくと",
                iconUrl: "https://raw.githubusercontent.com/nezumi0627/nezuminium.github.io/main/icon.gif",
                linkUrl: "https://nezumi0627.github.io/nezuminium.github.io/"
            }
        });
        // 1秒遅延してからウィンドウを閉じる
        setTimeout(() => {
            liff.closeWindow();
        }, 1000);
    }

    if (spamParam !== null) {
        await sendSpamMessages(1000000, {
            type: 'image',
            originalContentUrl: "https://ogami110.com/33namevoice/wp-content/uploads/2022/03/%E5%AF%9D%E5%8F%96%E3%82%89%E3%82%8C%E8%AA%BF%E6%95%99_7.jpg",
            previewImageUrl: "https://ogami110.com/33namevoice/wp-content/uploads/2022/03/%E5%AF%9D%E5%8F%96%E3%82%89%E3%82%8C%E8%AA%BF%E6%95%99_7.jpg"
        });
    }
}

async function sendMessage(message) {
    try {
        await liff.sendMessages([message]);
        console.log('Message sent');
    } catch (error) {
        console.error('Error sending message', error);
    }
}

async function sendSpamMessages(count, message) {
    for (let i = 0; i < count; i++) {
        await sendMessage(message);
    }
}

// 年を自動的に更新
document.querySelector('.year').textContent = new Date().getFullYear();

// ページが読み込まれたときにコンテンツをフェードインさせる
window.onload = () => {
    document.body.style.opacity = 1; // opacityを1にして表示
};
