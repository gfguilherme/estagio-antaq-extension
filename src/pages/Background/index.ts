chrome.runtime.onMessage.addListener((message) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
    chrome.tabs.sendMessage(activeTabs[0].id, message);
  });
});
