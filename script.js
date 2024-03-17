document.addEventListener('DOMContentLoaded', async () => {
  try {
    await liff.init({ liffId: '2004151744-pBd3JMLd' });

    const sendBtn = document.getElementById('sendBtn');
    sendBtn.addEventListener('click', handleSendClick);
  } catch (err) {
    console.error('Error:', err);
  }
});

async function handleSendClick() {
  try {
    const profile = await liff.getProfile();
    const { displayName, userId } = profile;
    const text = createText(profile);
    const icon = document.getElementById('user-icon');
    icon.src = profile.pictureUrl;
    icon.alt = profile.displayName;
    const name = document.querySelector('.user-name');
    name.textContent = displayName;
    sendLiff(text);
  } catch (err) {
    console.error('Error:', err);
  }
}

function createText(profile) {
  const { liffLanguage, liffIsInClient, liffIsLoggedIn, liffOs, liffAccessToken, liffContext } = liff;
  return `${liffLanguage}\n${liffIsInClient}\n${liffIsLoggedIn}\n${liffOs}\n${liffAccessToken}\n${JSON.stringify(liffContext)}\nユーザー名：${profile.displayName}、ユーザーID：${profile.userId}`;
}

function sendLiff(text) {
  liff.sendMessages([{
    type: 'text',
    text,
    sentBy: {
      label: "Nezumi-Project",
      iconUrl: "https://raw.githubusercontent.com/nezumi0627/nezuminium.github.io/main/giphy.gif",
      linkUrl: "https://github.com/nezumi0627"
    }
  }]).then(() => liff.closeWindow());
}

