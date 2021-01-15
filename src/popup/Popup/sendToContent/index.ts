import { browser } from "webextension-polyfill-ts";
export const sendToContent = async (message) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const res = await browser.tabs.sendMessage(tabs[0].id, message);
  return res;
};
