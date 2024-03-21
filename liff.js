$(document).ready(function () {
    var liffId = "2004151744-r2Y5gN3Y";
    initializeLiff(liffId);
});

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
        })
        .catch((err) => {
            console.log('LIFF Initialization failed ', err);
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
