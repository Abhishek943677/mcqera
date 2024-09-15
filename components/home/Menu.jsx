import Link from "next/link";
import React from "react";

export default function Menu() {
  return (
    <div className="bg-black  fixed bottom-4 left-1/2 transform -translate-x-1/2 h-fit py-2 px-5 rounded-xl flex justify-center space-x-8 z-50">
      <Link href="#intro" className="text-white hover:text-red-600">Intro</Link>
      <Link href="#services" className="text-white hover:text-red-600">Services</Link>
      <Link href="#features" className="text-white hover:text-red-600">Features</Link>
      <Link href="#about" className="text-white hover:text-red-600">About</Link>
      <Link href="#contact" className="text-white hover:text-red-600">Contact</Link>
    </div>
  );
}
