import { browser } from "webextension-polyfill-ts";

browser.runtime.onMessage.addListener((request) => {
  console.log(request);

  return Promise.resolve({ from: "background-script" });
});

browser.browserAction.onClicked.addListener((tab) => {
  (async () => {
    browser.tabs.sendMessage(tab.id, "toggle");
  })();
});
