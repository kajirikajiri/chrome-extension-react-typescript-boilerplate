import { dragElement } from "./dragElement";

export const addIframe = (iframe: HTMLIFrameElement) => {
  iframe.style.background = "#fff";
  iframe.style.height = "100%";
  iframe.style.width = "0px";
  iframe.style.borderLeft = "5px solid #eee";
  iframe.style.position = "fixed";
  iframe.style.top = "0px";
  iframe.style.right = "0px";
  iframe.style.zIndex = "2147483647";
  iframe.frameBorder = "none";
  iframe.src = chrome.extension.getURL("popup.html");
  document.body.appendChild(iframe);
};
