document.addEventListener('DOMContentLoaded', async () => {
  try {
    await liff.init({ liffId: '2004151744-r2Y5gN3Y' });

    const sendBtn = document.getElementById('sendBtn');
    sendBtn.addEventListener('click', handleSendClick);
  } catch (err) {
    console.error('Error:', err);
  }
});

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

