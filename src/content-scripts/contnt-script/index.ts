import { browser } from "webextension-polyfill-ts";
import { addIframe } from "./addIframe/";
import { toggle } from "./toggle/";

const iframe = document.createElement("iframe");
let contents: Content[] = [];

browser.runtime.onMessage.addListener((request: FromPopup) => {
  if (request.from === "popup" && request.id > -1) {
    contents[request.id].el.scrollIntoView({ behavior: "smooth" });
    contents[request.id].el.style.background = "#f6bfbc";
    if (
      contents[request.id].tagName === "h1" ||
      contents[request.id].tagName === "h2" ||
      contents[request.id].tagName === "h3"
    ) {
      contents.some((copy) => {
        if (contents[request.id].id === copy.id) {
          contents[request.id].el.style.background = "#f6bfbc";
          return false;
        } else if (contents[request.id].id > copy.id) {
          contents[copy.id].el.style.background = "transparent";
          return false;
        } else if (
          contents[request.id].id < copy.id &&
          (copy.tagName === "h4" ||
            copy.tagName === "h5" ||
            copy.tagName === "h6" ||
            copy.tagName === "strong")
        ) {
          contents[copy.id].el.style.background = "#ffffee";
          return false;
        } else if (
          contents[request.id].id < copy.id &&
          (copy.tagName === "h1" ||
            copy.tagName === "h2" ||
            copy.tagName === "h3")
        ) {
          contents[copy.id].el.style.background = "transparent";
          return false;
        } else {
          contents[copy.id].el.style.background = "transparent";
          return false;
        }
      });
    }
  } else if (request.from === "popup" && request.init) {
    contents = Array.from(
      document.querySelectorAll("h1,h2,h3,h4,h5,h6,strong")
    ).map((element, id) => {
      const el = element as HTMLInputElement;
      return { el, id, tagName: el.localName, text: el.innerText, flag: false };
    });
    const send: ContentToPopupSendElements = { from: "content", contents };
    return Promise.resolve(send);
  } else {
    toggle(iframe);
  }
});

window.onload = () => {
  addIframe(iframe);
};
