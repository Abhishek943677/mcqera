import React from "react";
import { ShareSocial } from "react-share-social";

export default function Share({url}) {
  return (
    <div className="">
      <ShareSocial
        // url="https://mcqera-db.vercel.app"
        url={`https://mcqera-db.vercel.app${url}`}
        socialTypes={[
          "facebook",
          "whatsapp",
          "twitter",
          "linkedin",
          "telegram",
          "reddit",
          "instapaper",
          "hatena",
          "email",
          "mailru",
        ]}
        // title="Share with your friends...."
        style={{
          root: {
            background: "none",
            border: 0,
            color: "white",
            padding: 0,
            width: "100%",
            margin: 0,
          },
          copyContainer: {
            display: "none",
            
          },
        }}
        onSocialButtonClicked={() => {}}
      />
    </div>
  );
}
