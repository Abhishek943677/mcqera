import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Menu() {
  const [showMenu, setShowMenu] = useState(true);

  const handleResize = () => {
    if (window.innerWidth <= 639) {
      setShowMenu(false);
    }else{
      setShowMenu(true)
    }
  };
  useEffect(() => {
    handleResize(); // Check size initially
    window.addEventListener("resize", handleResize); // Listen for window resize
    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  return (
    <div
      className={`${
        showMenu ? "" : "hidden"
      } bg-black  fixed bottom-4 left-1/2 transform -translate-x-1/2 h-fit py-2 px-5 rounded-xl flex justify-center space-x-8 z-50`}
    >
      <Link href="#intro" className="text-white hover:text-red-600">
        Intro
      </Link>
      <Link href="#services" className="text-white hover:text-red-600">
        Services
      </Link>
      <Link href="#features" className="text-white hover:text-red-600">
        Features
      </Link>
      <Link href="#about" className="text-white hover:text-red-600">
        About
      </Link>
      <Link href="#contact" className="text-white hover:text-red-600">
        Contact
      </Link>
    </div>
  );
}
