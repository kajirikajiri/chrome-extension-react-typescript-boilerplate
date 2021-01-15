import { browser } from "webextension-polyfill-ts";

const callback = (request) => {
  console.log(request);

  return Promise.resolve({ from: "content-script" });
};

browser.runtime.onMessage.addListener(callback);

// (async()=>{
//   const res = await browser.runtime.sendMessage({from: 'content-script'});
//   console.log(res)
// })()

console.log(21);
