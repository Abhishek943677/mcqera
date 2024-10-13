import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import SunEditorPanel from "../learn/SunEditorPanel";

export const Editor = ({ value, handleChange, label }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="text-editor w-full my-2 rounded-md p-1">
      <Typography variant="h6" className="text-center" >{label}</Typography>
      <SunEditorPanel
        // theme="snow"
        // placeholder={label}
        // modules={modules}
        editorContent={value}
        handleChange={handleChange}
      />
      
      {/* below is quill editor , it is used before but all the editors are shifted to suneditor */}
      {/* <ReactQuill
        theme="snow"
        placeholder={label}
        modules={modules}
        value={value}
        onChange={handleChange}
      /> */}
    </div>
  );
};

export default Editor;
