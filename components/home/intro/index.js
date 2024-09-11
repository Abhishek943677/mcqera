import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Intro = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.play();
    }
  }, []);
  return (
    <div
      style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      className="m-[-4px] shadow-2xl"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        muted
        loop
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full object-fill z-[-1] !mt-0"
      />
      {/* Intro Text */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          textAlign: "center",
          zIndex: 1,
          fontSize: "3.5rem",
        }}
      >
      </div>
    </div>
  );
};

export default Intro;
