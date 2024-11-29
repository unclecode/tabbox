// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById("url-textarea");
    const copyButton = document.getElementById("copy-clipboard");
    const exportButton = document.getElementById("export-file");
    const homeDirInput = document.getElementById("home-dir");

    // Load saved URLs
    chrome.storage.local.get(['savedUrls'], (result) => {
        if (result.savedUrls) {
            textarea.value = result.savedUrls;
        }
    });

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(textarea.value);
        showNotification("Copied to clipboard!");
    });

    exportButton.addEventListener("click", () => {
        const text = textarea.value;
        if (!text) return;

        const date = new Date().toISOString().replace(/:/g, "-").split(".")[0];
        const dir = homeDirInput.value || "Downloads";
        const filename = `${dir}/TabBox_${date}.txt`;

        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        chrome.downloads.download({
            url: url,
            filename: filename
        });
        
        URL.revokeObjectURL(url);
    });
});

// Add to content.js for clipboard handling
