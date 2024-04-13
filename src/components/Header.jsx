import React, { useState } from "react";
import api from "../Configs/api";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import MobileHeader from "./MobileHeader";

function Header() {
  const [theme, setTheme] = useState("moon");
  const [isShown, setIsShown] = useState(false);
  const { data } = useQuery({
    queryKey: ["menu-data"],
    queryFn: async () => {
      const response = await api.get("menus");
      return await response.data;
    },
  });
  console.log(data);
  return (
    // <!-- header -->
    <header>
      <div className="flex items-center justify-between m-5 px-5 bg-white">
        {/* // <!-- bars icon for Mobile version --> */}
        <div
          className="inline-block lg:hidden cursor-pointer"
          onClick={() => setIsShown(true)}
        >
          <svg className="w-5 h-5">
            <use href="#bars"></use>
          </svg>
        </div>
        {/* <!-- mobile header --> */}
        <MobileHeader
          isShown={isShown}
          setIsShown={setIsShown}
          theme={theme}
          setTheme={setTheme}
        />
        {/* <!-- App Logo --> */}
        <Link to="/" className="w-[150px]">
          <img className="w-full" src="/images/logo-1.png" alt="logo-icon" />
        </Link>
        {/* <!-- menus --> */}
        <ul className="hidden lg:flex lg:gap-x-20 childe:text-base childe:flex-center font-danaBold childe:duration-150">
          <Link to="/" className="hover:text-primary-200">
            خانه
          </Link>

          <li className="hover:text-primary-200">
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
          <li className="hover:text-primary-200">
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
        <div className="flex-center gap-x-2 lg:gap-x-5 childe:duration-150">
          <div
            className={`${
              theme === "sun" ? "lg:flex-center" : ""
            } hidden w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer`}
            onClick={() => setTheme("moon")}
          >
            <svg className="w-6 h-6 ">
              <use href="#sun"></use>
            </svg>
          </div>
          <div
            className={`${
              theme === "moon" ? "lg:flex-center" : ""
            } hidden w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer`}
            onClick={() => setTheme("sun")}
          >
            <svg className="w-6 h-6">
              <use href="#moon"></use>
            </svg>
          </div>
          <Link
            className="flex-center hover:text-primary-200 lg:w-10 lg:h-10 lg:hover:bg-gray-100 rounded-full hover:cursor-pointer"
            to=""
          >
            <svg className="w-5 h-5">
              <use href="#user"></use>
            </svg>
          </Link>
          <Link
            className="flex-center hover:text-primary-200 lg:w-10 lg:h-10 lg:hover:bg-gray-100 rounded-full hover:cursor-pointer"
            to=""
          >
            <svg className="w-5 h-5">
              <use href="#shopping-cart"></use>
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;