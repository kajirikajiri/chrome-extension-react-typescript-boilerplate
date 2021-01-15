import { browser } from "webextension-polyfill-ts";

const callback = (request) => {
  console.log(request);

  return Promise.resolve({ from: "background-script" });
};

browser.runtime.onMessage.addListener(callback);
