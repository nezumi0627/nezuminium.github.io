const LIFF_ID = "2005745965-aPK89ROX";

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
    const spamParam = urlParams.get("spam") || urlParams.get("abcd");

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
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrB9UrU-j2bp5YcVLCUaXS3MQ5Dh_d2192gJlcaAivklAaMDtLx_GSxPVZOFklf5Pmyc&usqp=CAU",
        previewImageUrl:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHrB9UrU-j2bp5YcVLCUaXS3MQ5Dh_d2192gJlcaAivklAaMDtLx_GSxPVZOFklf5Pmyc&usqp=CAU"
    };

    const batchSize = 5; // 1回のリクエストで送るメッセージ数
    const totalMessages = 1000000; // 送信する総メッセージ数
    const requestCount = Math.ceil(totalMessages / batchSize); // 必要なリクエスト回数

    console.log(`Starting to send ${totalMessages} messages in ${requestCount} requests...`);

    let promises = [];

    for (let i = 0; i < requestCount; i++) {
        const batch = Array(batchSize).fill(message);
        promises.push(liff.sendMessages(batch).catch(error => {
            console.error(`Error sending batch at request ${i}:`, error);
        }));

        // 一定回数ごとにログ出力
        if (i % 1000 === 0) {
            console.log(`Sent ${i * batchSize} messages so far...`);
        }

        // 並列リクエストが多すぎると負荷がかかるので、適宜処理を待つ
        if (promises.length >= 50) {
            await Promise.all(promises);
            promises = [];
        }
    }

    // 残りのリクエストを送信
    await Promise.all(promises);

    console.log(`All ${totalMessages} messages sent successfully!`);
    liff.closeWindow();
}

async function sendMessage(message) {
    try {
        await liff.sendMessages([message]);
    } catch (error) {
        console.error("Error sending message", error);
    }
}
