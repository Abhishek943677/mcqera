import Link from "next/link";
import React from "react";
import ExploreButton from "./exploreButton";

const CardComponent = ({item}) => {
  return (
    <div className="perspective-1000 w-[20rem] h-[30rem] my-4 " data-aos='zoom-in-up' data-aos-duration='500'>
      {/* <div className="relative h-full rounded-[50px] bg-gradient-to-tr from-violet-900 to-violet-950 transition-all duration-500 transform-style-3d shadow-[rgba(5,71,17,0)_40px_50px_25px_-40px,rgba(5,71,17,0.2)_0px_25px_25px_-5px] hover:rotate-3d hover:shadow-[rgba(5,71,17,0.3)_30px_50px_25px_-40px,rgba(5,71,17,0.1)_0px_25px_30px_0px]"> */}
      <div className="relative h-full rounded-[50px] bg-gradient-to-b from-blue-950 to bg-slate-950 transition-all duration-500 transform-style-3d shadow-[rgba(5,71,17,0)_40px_50px_25px_-40px,rgba(5,71,17,0.2)_0px_25px_25px_-5px] hover:rotate-3d hover:shadow-[rgba(5,71,17,0.3)_30px_50px_25px_-40px,rgba(5,71,17,0.1)_0px_25px_30px_0px]">
        <div className="absolute inset-[8px] rounded-[55px] rounded-tr-full bg-gradient-to-t from-[rgba(255,255,255,0.1)] to-[rgba(255,255,255,0.3)] translate-z-[25px] border-l border-b border-white transition-all duration-500"></div>
        
        <div className="p-[100px_60px_0_30px] translate-z-[26px]">
          <span className="block text-3xl">{item.title}</span>
          <span className="block text-white mt-5 opacity-100">{item.description}</span>
        </div>

        <div className="absolute bottom-5 left-5 right-5 p-2 flex items-center justify-between translate-z-[26px]">
          <div className="flex gap-2 transform-style-3d">
            
           <Link href={item.link} target="_blank">  <ExploreButton /> </Link>
          </div>

        </div>

      
      </div>
    </div>
  );
};

export default CardComponent;
