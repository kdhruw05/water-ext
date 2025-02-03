console.log("Background script loaded!");

chrome.storage.sync.get({ interval: 60 }, (data) => {
    chrome.alarms.create("popupAlarm", { periodInMinutes: data.interval });
    console.log(`Popup Alarm set for every ${data.interval} minutes.`);
});

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "popupAlarm") {
        console.log("Opening centered popup...");

        chrome.system.display.getInfo((displays) => {
            if (displays.length === 0) return;

            let screenWidth = displays[0].workArea.width;
            let screenHeight = displays[0].workArea.height;

            let popupWidth = 300;
            let popupHeight = 300;

            let left = Math.round((screenWidth - popupWidth) / 2);
            let top = Math.round((screenHeight - popupHeight) / 2);

            chrome.windows.create({
                url: "reminder.html",
                type: "popup",
                width: popupWidth,
                height: popupHeight,
                left: left,
                top: top
            }, function (newWindow) {
                if (chrome.runtime.lastError) {
                    console.error("Popup Error:", chrome.runtime.lastError.message);
                } else {
                    console.log("Reminder popup opened successfully!");
                    chrome.storage.local.set({ reminderWindowId: newWindow.id });
                }
            });
        });
    }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "closeReminder") {
        console.log("Received close request");
        chrome.windows.getCurrent((win) => {
            if (win) {
                chrome.windows.remove(win.id);
            }
        });
    }
});