import dynamic from "next/dynamic";
import React from "react";
import { useState } from "react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

export default function SunEditorPanel({handleChange,editorContent}) {

  return (
    <div className="caret-red-800 cursor-copy ">
      <SunEditor
        onChange={handleChange}
        defaultValue={editorContent}
        setOptions={{
          buttonList: [
            ["undo", "redo"],
            ["fontSize", "formatBlock"],
            ["bold", "underline"],
            ["italic", "strike"],
            ["subscript", "superscript"],
            ["paragraphStyle", "blockquote"],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],
            ["table", "horizontalRule"],
            ["link", "image", "video", "audio"],
            ["fullScreen", "showBlocks", "codeView"],
            "/",
            ["preview", "print"],
          ],
          minHeight:"200px",
          defaultTag: "div",
          showPathLabel: false,
        }}
      />
    </div>
  );
}
