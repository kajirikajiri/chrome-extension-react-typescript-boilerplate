import { browser } from "webextension-polyfill-ts";
export const sendToBackground = async (message) => {
  await browser.tabs.query({ active: true, currentWindow: true });
  const res = await browser.runtime.sendMessage(message);
  return res;
};
