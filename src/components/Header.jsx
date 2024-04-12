import React, { useState } from "react";
import api from "../Configs/api";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

function Header() {
  const [theme, setTheme] = useState("moon");
  const { data } = useQuery({
    queryKey: ["menu-data"],
    queryFn: async () => {
      const response = await api.get("menus");
      return await response.data;
    },
  });
  console.log(data);
  return (
    // <!-- desktop header -->
    <header>
      {/* <!-- App Logo --> */}
      <div className="container flex items-center justify-between my-5">
        <Link to="/" className="w-[200px]">
          <img className="w-full" src="/images/logo-1.png" alt="logo-icon" />
        </Link>
        {/* <!-- menus --> */}
        <ul className="flex  gap-x-20 childe:text-base childe:flex-center font-danaBold childe:duration-150">
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
        <div className="flex-center gap-x-5 childe:duration-150">
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
          <Link
            className="flex-center hover:text-primary-200 w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer"
            to=""
          >
            <svg className="w-5 h-5">
              <use href="#user"></use>
            </svg>
          </Link>
          <Link
            className="flex-center hover:text-primary-200 w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer"
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
