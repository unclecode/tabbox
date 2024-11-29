// content.js
document.addEventListener('keydown', function(event) {
    if ((event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'y') {
        chrome.runtime.sendMessage({ action: 'saveTabsAndCopy' });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'copyToClipboard') {
        navigator.clipboard.writeText(message.text);
    }
});