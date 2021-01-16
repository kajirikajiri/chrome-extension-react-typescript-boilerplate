interface PopupToContent {
  from: "popup";
}
interface PopupToContentWithId extends PopupToContent {
  id: number;
}
interface PopupToContentWithInit extends PopupToContent {
  init: true;
}
interface FromPopup {
  from: "popup";
  id?: number;
  init?: true;
}

interface ContentToPopup {
  from: "content";
}
interface ContentToPopupSendElements extends ContentToPopup {
  contents: Content[];
}
interface Content {
  id: number;
  tagName: string;
  text: string;
  flag: boolean;
  el: HTMLElement; // popupに送ると空のobjectになる
}
