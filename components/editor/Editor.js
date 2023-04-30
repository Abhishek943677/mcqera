import { Typography } from "@mui/material";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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
    <div className="text-editor w-full my-2 border border-green-600 rounded-md p-3">
      <Typography variant="h6" className="text-center" >{label}</Typography>
      <ReactQuill
        theme="snow"
        placeholder={label}
        modules={modules}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;
