import { browser } from "webextension-polyfill-ts";
export const sendToContentWithInit = async (
  message: PopupToContentWithInit
) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const res: ContentToPopupSendElements = await browser.tabs.sendMessage(
    tabs[0].id,
    message
  );
  return res;
};

export const sendToContentWithId = async (message: PopupToContentWithId) => {
  const tabs = await browser.tabs.query({ active: true, currentWindow: true });
  const res: ContentToPopup = await browser.tabs.sendMessage(
    tabs[0].id,
    message
  );
  return res;
};
