document.addEventListener("DOMContentLoaded", function () {
    let intervalInput = document.getElementById("interval");
    let setReminderBtn = document.getElementById("setReminder");
    let addWaterBtn = document.getElementById("addWater");
    let intakeCount = document.getElementById("intakeCount");

    chrome.storage.sync.get({ interval: 60, waterCount: 0 }, (data) => {
        intervalInput.value = data.interval;
        intakeCount.innerText = `🌊 Total: ${data.waterCount} glasses`;
    });

    setReminderBtn.addEventListener("click", () => {
        let interval = parseInt(intervalInput.value);
        if (interval > 0) {
            chrome.storage.sync.set({ interval: interval }, () => {
                chrome.alarms.create("popupAlarm", { periodInMinutes: interval });
                console.log(`Reminder set for every ${interval} minutes.`);
            });
        } else {
            alert("Please enter a valid time interval.");
        }
    });

    // addWaterBtn.addEventListener("click", () => {
    //     chrome.storage.sync.get({ waterCount: 0 }, (data) => {
    //         let newCount = data.waterCount + 1;
    //         chrome.storage.sync.set({ waterCount: newCount }, () => {
    //             intakeCount.innerText = `🌊 Total: ${newCount} glasses`;
    //         });
    //     });
    // });
});
