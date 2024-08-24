const currentVersion = '1.0'; // The current version of your extension

function checkForUpdate() {
  fetch('https://github.com/ApeDevOne/test-repo/raw/main/update.json')
    .then(response => response.json())
    .then(data => {
      if (data.version !== currentVersion) {
        chrome.notifications.create({
          type: 'basic',
          iconUrl: 'icon.png',
          title: 'Update Available',
          message: `A new version (${data.version}) is available. Click to update.`,
          buttons: [{ title: 'Update Now' }],
        }, function(notificationId) {
          chrome.notifications.onButtonClicked.addListener(function(buttonIndex) {
            if (buttonIndex === 0) {
              chrome.tabs.create({ url: data.url });
            }
          });
        });
      }
    })
    .catch(error => console.error('Error checking for updates:', error));
}

// Call this function periodically, e.g., every hour
setInterval(checkForUpdate, 3600000); // 1 hour in milliseconds

// Also call immediately when the extension starts
checkForUpdate();
