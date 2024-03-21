$(document).ready(function () {
    var liffId = "2004151744-r2Y5gN3Y";
    initializeLiff(liffId);
})

function initializeLiff(liffId) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            if (!liff.isInClient() && !liff.isLoggedIn()) {
                window.alert("LINEアカウントにログインしてください。");
                liff.login();
            }
            displayProfile(); // LIFF初期化後にプロフィールを表示する
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
        });
}

function displayProfile() {
    liff.getProfile().then((profile) => {
        const profileImage = document.querySelector(".profile-image");
        profileImage.src = profile.pictureUrl;
        const displayName = document.querySelector(".display-name");
        displayName.textContent = profile.displayName;

        const urlParams = new URLSearchParams(window.location.search);
        const textParam = urlParams.get('text');
        if (textParam !== null) {
            liff.sendMessages([
                {
                    type: 'text',
                    text: textParam,
                    sentBy: {
                        label: "ねずみぷろじぇくと",
                        iconUrl: "https://raw.githubusercontent.com/nezumi0627/flex-images/main/nR4L10XlJcSeQ.gif",
                        linkUrl: "https://github.com/nezumi0627"
                    }
                }
            ]).then(() => {
                console.log('Message sent');
                liff.closeWindow();
            }).catch((error) => {
                console.error(`Error sending message: ${error}`);
            });
        }
    }).catch((error) => {
        console.error(error);
    });
}

function sendMessage(text) {
    if (liff.isInClient()) {
        sendMessages(text);
    } else {
        shareTargetPicker(text);
    }
}

function sendMessages(textParm) {
    liff.sendMessages([
        {
            type: 'text',
            text: textParm,
            sentBy: {
                label: "ねずみぷろじぇくと",
                iconUrl: "https://raw.githubusercontent.com/nezumi0627/flex-images/main/nR4L10XlJcSeQ.gif",
                linkUrl: "https://github.com/nezumi0627"
            }
        }
    ]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

function sendFlex(flexMessage) {
    liff.sendMessages([
        {
            type: 'flex',
            altText: 'This is a Flex Message',
            contents: flexMessage
        }
    ]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

function shareTargetPickerFlex(flexMessage) {
    liff.shareTargetPicker([{
        'type': 'flex',
        'altText': 'This is a Flex Message',
        'contents': flexMessage
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

function shareTargetPicker(textParm) {
    liff.shareTargetPicker([{
        type: 'text',
        text: textParm,
        sentBy: {
            label: "ねずみぷろじぇくと",
            iconUrl: "https://raw.githubusercontent.com/nezumi0627/flex-images/main/nR4L10XlJcSeQ.gif",
            linkUrl: "https://github.com/nezumi0627"
        }
    }]).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}
