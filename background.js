// background.js
chrome.runtime.onMessage.addListener(async (message) => {
    if (message.action === 'saveTabsAndCopy') {
        const tabs = await chrome.tabs.query({ currentWindow: true });
        const urls = tabs.map(tab => tab.url).join("\n");
        
        // Save to storage
        await chrome.storage.local.set({ savedUrls: urls });
        
        // Copy to clipboard using active tab's content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { 
                action: 'copyToClipboard', 
                text: urls 
            });
        });
        
        // Visual feedback
        chrome.action.setBadgeText({ text: "✓" });
        setTimeout(() => chrome.action.setBadgeText({ text: "" }), 1000);
    }
});