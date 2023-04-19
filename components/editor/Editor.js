import dynamic from 'next/dynamic'
import React from "react";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

import "react-quill/dist/quill.snow.css";
import QuillToolbar ,{modules,formats} from "./QuillToolbar";

export const Editor = ({value,handleChange,label}) => {
  
  return (
    <div className="text-editor w-full my-2">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        className="h-60"
        placeholder={label}
        modules={modules}
        formats={formats}

        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default Editor;