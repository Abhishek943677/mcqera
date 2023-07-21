import { Link, ShareRounded } from "@mui/icons-material";
import React, { useState } from "react";
import { ShareSocial } from "react-share-social";

export default function Share({ url, title, description }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const shareData = {
    title: title || "Mcqera | Practice MCQs",
    text:
      description ||
      "Discover a comprehensive collection of multiple choice questions (MCQs) on our Mcqera.com.",
    url: `https://mcqera-db.vercel.app${url}`,
  };

  return (
    <div className=" flex flex-row h-fit ml-1">
      <ShareSocial
        url={`https://mcqera-db.vercel.app${url}`}
        socialTypes={[
          "facebook",
          "whatsapp",
          "twitter",
          "linkedin",
          "telegram",
          "reddit",
        ]}
        style={{
          root: {
            background: "none",
            display: "flex",
            flexWrap: "wrap",
            border: 0,
            color: "white",
            padding: 0,
            margin: 0,
          },
          copyContainer: {
            display: "none",
          },
        }}
        onSocialButtonClicked={() => {}}
      />

      {/* getlink button */}
      <div className={`my-auto mx-1 cursor-pointer hover:z-50 relative `}>

        {linkCopied && <p className=" absolute bottom-10">Link Copied</p>}

        <div
        className="  bg-red-700 rounded-full p-1"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(
                `https://mcqera-db.vercel${url}`
              );
              setLinkCopied(true)
              setTimeout(() => {
                setLinkCopied(false)
              }, 2000);
            } catch (err) {}
          }}
        >
          <Link fontSize="large" color="inherit" />
        </div>
      </div>

      {/* this is custom share button with navigator api */}
      {navigator.canShare && (
        <div
          className={`my-auto mx-1 cursor-pointer hover:z-50 bg-lime-700 rounded-full p-[0.6rem]`}
          onClick={async () => {
            try {
              await navigator.share(shareData);
            } catch (err) {}
          }}
        >
          <ShareRounded fontSize="medium" color="inherit" />
        </div>
      )}
    </div>
  );
}
