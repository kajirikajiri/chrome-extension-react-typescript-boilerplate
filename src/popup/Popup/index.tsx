import React, { FC, useEffect, useState } from "react";
import { browser } from "webextension-polyfill-ts";
import { sendToBackground } from "./sendToBackground";
import { sendToContentWithInit, sendToContentWithId } from "./sendToContent";
import "./index.scss";

export const Popup = () => {
  const [contents, setContents] = React.useState<Content[]>();
  const [clickElementIndex, setClickElementIndex] = useState<number>();
  useEffect(() => {
    (async () => {
      const res = await sendToContentWithInit({ from: "popup", init: true });
      console.log("popup", res);
      setContents(res.contents);
    })();
  }, []);

  const handleClickRow = async (element: Content) => {
    setClickElementIndex(element.id);
    if (
      element.tagName === "h1" ||
      element.tagName === "h2" ||
      element.tagName === "h3"
    ) {
      const copyArray = [...contents].map((content) => {
        content.flag = false;
        return content;
      });
      copyArray.some((copy) => {
        if (
          element.id < copy.id &&
          (copy.tagName === "h4" ||
            copy.tagName === "h5" ||
            copy.tagName === "h6" ||
            copy.tagName === "strong")
        ) {
          copyArray[copy.id].flag = true;
          return false;
        } else if (
          element.id < copy.id &&
          (copy.tagName === "h1" ||
            copy.tagName === "h2" ||
            copy.tagName === "h3")
        ) {
          return true;
        }
        return false;
      });
      setContents(copyArray);
    }
    const res = await sendToContentWithId({ from: "popup", id: element.id });
    console.log(res);
  };

  const pad = (tagName: string) => {
    if (tagName === "h4" || tagName === "h5" || tagName === "h6") {
      return "h456";
    } else if (tagName === "strong") {
      return "strong";
    } else {
      return "";
    }
  };

  if (Array.isArray(contents)) {
    return (
      <div>
        {Array.from(contents)
          .map((content) => {
            if (
              content.tagName === "h1" ||
              content.tagName === "h2" ||
              content.tagName === "h3"
            ) {
              return { ...content, flag: true };
            } else {
              return content;
            }
          })
          .map((element) => {
            if (element.flag) {
              return (
                <>
                  <div
                    key={element.id}
                    className="hover:bg-gray-100 text-gray-500 cursor-pointer pl-2"
                    style={
                      clickElementIndex === element.id
                        ? {
                            paddingTop: 2,
                            paddingBottom: 2,
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            borderLeft: "gray solid 4px",
                          }
                        : {
                            paddingTop: 2,
                            paddingBottom: 2,
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            borderLeft: "transparent solid 4px",
                          }
                    }
                    onClick={() => handleClickRow(element)}
                  >
                    <span className={pad(element.tagName)} />
                    {element.text}
                  </div>
                </>
              );
            } else {
              return <div key={element.id}></div>;
            }
          })}
      </div>
    );
  }

  return <div>...loading</div>;
};
