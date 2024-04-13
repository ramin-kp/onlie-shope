import React from "react";
import { Link } from "react-router-dom";

function MobileHeader({ isShown, setIsShown, theme, setTheme }) {
  return (
    <header>
      <div
        className={`${
          isShown ? "translate-x-0" : "translate-x-full"
        } absolute inset-0 flex flex-col lg:hidden w-[300px] h-screen p-3 bg-white transition-all duration-300 z-10`}
      >
        {/* <!--  logo App --> */}

        <div className="flex items-center justify-between pb-5 border-b border-b-gray-300">
          <Link className="flex-center w-40" to="/">
            <img src="/images/logo-1.png" alt="logo-icon" className="w-full" />
          </Link>
          <span
            className="inline-block flex-center w-10 h-10 cursor-pointer"
            onClick={() => setIsShown(false)}
          >
            <svg className="w-5 h-5">
              <use href="#x-mark"></use>
            </svg>
          </span>
        </div>

        {/* <!-- menus --> */}
        <ul className="flex flex-col childe:text-base childe:items-center childe:justify-start gap-y-5 my-5 font-danaMedium childe:duration-150">
          <Link to="/" className="hover:text-primary-200">
            خانه
          </Link>

          <li className="flex items-center justify-start hover:text-primary-200">
            <Link
              className="flex items-end justify-center gap-1"
              to="/products"
            >
              فروشگاه
              <svg className="w-5 h-5">
                <use href="#arrow-down"></use>
              </svg>
            </Link>
          </li>
          <li className="flex items-center justify-start hover:text-primary-200">
            <Link
              className="flex items-end justify-center gap-1"
              to="/about-us"
            >
              درباه‌ما
              <svg className="w-5 h-5">
                <use href="#arrow-down"></use>
              </svg>
            </Link>
          </li>
        </ul>
        {/* <!-- register & card --> */}
        <div className="flex flex-col items-start justify-start gap-y-5 childe:duration-150">
          <div className="flex items-center justify-between gap-x-5 w-full">
            <p className="font-danaMedium">تم سایت:</p>
            <div
              className={`${
                theme === "sun" ? "flex-center" : "hidden"
              } w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer`}
              onClick={() => setTheme("moon")}
            >
              <svg className="w-6 h-6 ">
                <use href="#sun"></use>
              </svg>
            </div>
            <div
              className={`${
                theme === "moon" ? "flex-center" : "hidden"
              } w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer`}
              onClick={() => setTheme("sun")}
            >
              <svg className="w-6 h-6">
                <use href="#moon"></use>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- background for MobileHeader  --> */}
      <div
        className={`${
          isShown ? "absolute" : "hidden"
        } inset-0 w-screen h-screen bg-black/30 backdrop-blur-[3px]`}
        onClick={() => setIsShown(false)}
      ></div>
    </header>
  );
}

export default MobileHeader;
