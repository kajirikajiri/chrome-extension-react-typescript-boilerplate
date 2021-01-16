import * as React from "react";
import * as ReactDOM from "react-dom";
import { Popup } from "./Popup";
import { browser } from "webextension-polyfill-ts";

(async () => {
  await browser.tabs.query({ active: true, currentWindow: true });
  ReactDOM.render(<Popup />, document.getElementById("popup"));
})();
