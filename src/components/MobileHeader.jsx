import React, { useState } from "react";
import { Link } from "react-router-dom";

function MobileHeader({
  isShown,
  setIsShown,
  theme,
  darkModeHandler,
  lightModeHandler,
  data,
}) {
  const [isShowCategory, setIsShowCategory] = useState(false);
  return (
    <header className="lg:hidden">
      <div
        className={`${
          isShown ? "translate-x-0" : "translate-x-full"
        } fixed inset-0 flex flex-col  w-[300px] h-screen p-3 bg-white dark:bg-dark-100 transition-all duration-300 z-50`}
      >
        {/* <!--  logo App --> */}

        <div className="flex items-center justify-between pb-5 border-b border-gray-300 dark:border-gray-600">
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
        <ul className="flex flex-col childe:text-base items-start justify-start gap-y-5 my-5 font-danaMedium childe:duration-150">
          <Link to="/">خانه</Link>

          <li className="flex flex-col">
            <div
              className="flex items-start gap-1"
              to="/products"
              onClick={() => setIsShowCategory(!isShowCategory)}
            >
              فروشگاه
              <svg
                className={`${
                  isShowCategory ? "rotate-180" : ""
                } w-5 h-5 transition-all duration-300`}
              >
                <use href="#arrow-down"></use>
              </svg>
            </div>
            <ul
              className={`${
                isShowCategory ? "flex h-auto" : "hidden h-0"
              } flex-col items-start justify-start gap-y-2 my-2 font-dana text-sm`}
            >
              {data &&
                data.map((item) => (
                  <Link key={item.id} to={`/category/${item.data.title.link}`}>
                    {item.data.title.text}
                  </Link>
                ))}
            </ul>
          </li>
          <li className="flex items-center justify-start ">
            <Link
              to="/contact-us"
              className="flex items-end justify-center gap-1"
            >
              تماس با‌ما
            </Link>
          </li>
        </ul>
        {/* <!-- register & card --> */}
        <div className="flex flex-col items-start justify-start gap-y-5 text-zinc-900 dark:text-white childe:duration-150">
          <div className="flex items-center justify-between gap-x-5 w-full">
            <p className="font-danaMedium">تم سایت:</p>
            <div
              className={`${
                theme === "dark" ? "flex-center" : "hidden"
              } w-10 h-10 text-yellow-500 rounded-full hover:cursor-pointer`}
              onClick={lightModeHandler}
            >
              <svg className="w-6 h-6 ">
                <use href="#sun"></use>
              </svg>
            </div>
            <div
              className={`${
                theme === "light" ? "flex-center" : "hidden"
              } w-10 h-10  text-blue-800 rounded-full hover:cursor-pointer`}
              onClick={darkModeHandler}
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
          isShown ? "fixed" : "hidden"
        } inset-0 left-2 w-screen h-screen bg-black/30 backdrop-blur-[3px] z-40`}
        onClick={() => setIsShown(false)}
      ></div>
    </header>
  );
}

export default MobileHeader;
