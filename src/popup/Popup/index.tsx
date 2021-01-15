import React, { useEffect } from "react";
import { sendToBackground } from "./sendToBackground";
import { sendToContent } from "./sendToContent";

export default function Popup() {
  const handleClickSendBackground = async () => {
    const res = await sendToBackground({ from: "popup" });
    console.log(res);
  };

  const handleClickSendContent = async () => {
    const res = await sendToContent({ from: "popup" });
    console.log(res);
  };

  return (
    <div>
      <button className="text-xs" onClick={handleClickSendBackground}>
        send background
      </button>
      <button className="text-xs" onClick={handleClickSendContent}>
        send contentscript
      </button>
    </div>
  );
}
