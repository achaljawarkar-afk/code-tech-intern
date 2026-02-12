let startTime = {};
let timeSpent = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    const url = new URL(tab.url).hostname;
    startTime[url] = Date.now();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    const url = new URL(tab.url).hostname;
    startTime[url] = Date.now();
  }
});

setInterval(() => {
  for (let site in startTime) {
    const now = Date.now();
    const diff = Math.floor((now - startTime[site]) / 1000);
    timeSpent[site] = (timeSpent[site] || 0) + diff;
    startTime[site] = now;
  }

  chrome.storage.local.set({ timeSpent });
}, 5000);
