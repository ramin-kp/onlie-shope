import React from "react";

function MainImage() {
  return (
    // <section className="main-img h-[1000px] relative">
    //   <div className="-translate-x-[900px] translate-y-[400px] cursor-pointer group">
    //     <span className="absolute w-4 h-4 rounded-full bg-white"></span>
    //     <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
    //     <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">ramin</div>
    //   </div>
    //   <div className="-translate-x-[650px] translate-y-[200px] cursor-pointer group">
    //     <span className="absolute w-4 h-4 rounded-full bg-white"></span>
    //     <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
    //     <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">ramin</div>
    //   </div>
    //   <div className="-translate-x-[200px] translate-y-[200px] cursor-pointer group">
    //     <span className="absolute w-4 h-4 rounded-full bg-white"></span>
    //     <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
    //     <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">ramin</div>
    //   </div>
    // </section>
    <section className="main-img h-[1000px] relative">
      <div className="absolute top-[400px] left-[900px] cursor-pointer group">
        <span className="absolute w-4 h-4 rounded-full bg-white"></span>
        <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
        <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">
          ramin
        </div>
      </div>
      <div className="absolute top-[200px] left-[650px] cursor-pointer group">
        <span className="absolute w-4 h-4 rounded-full bg-white"></span>
        <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
        <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">
          ramin
        </div>
      </div>
      <div className="absolute top-[200px] left-[200px] cursor-pointer group">
        <span className="absolute w-4 h-4 rounded-full bg-white"></span>
        <span className="absolute w-4 h-4 rounded-full bg-white/80 opacity-75 animate-ping"></span>
        <div className="hidden group-hover:inline-block w-20 h-20 bg-white translate-y-5">
          ramin
        </div>
      </div>
    </section>
  );
}

export default MainImage;
