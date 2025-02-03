document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("closeReminder").addEventListener("click", function () {
        console.log("OK button clicked! Sending close request.");
        
        chrome.runtime.sendMessage({ action: "closeReminder" }, (response) => {
            if (chrome.runtime.lastError) {
                console.warn("Background script not ready. Retrying...");
                setTimeout(() => {
                    chrome.runtime.sendMessage({ action: "closeReminder" });
                }, 1000);
            }
        });
    });
});
