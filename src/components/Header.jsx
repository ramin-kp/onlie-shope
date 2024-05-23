import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//services
import { getSubMenus } from "../Services/menus";

//components
import MobileHeader from "./MobileHeader";

//context
import { useTheme } from "../context/ThemContextProvider";
import { useCard } from "../context/CardContextProvider";
import { useUser } from "../context/UserInfoContextProvider";

//Fn
import { customToast } from "../utils/customToast";

function Header() {
  const [theme, setTheme] = useTheme();
  const [isShown, setIsShown] = useState(false);
  const [state] = useCard();
  const [userInfo, setUserInfo] = useUser();

  //query
  const { data, isError } = useQuery({
    queryKey: ["menu-data"],
    queryFn: getSubMenus,
  });

  //Fn
  const darkModeHandler = () => {
    setTheme("dark");
  };
  const lightModeHandler = () => {
    setTheme("light");
  };

  //Loader
  if (isError) return customToast("error", "مشکلی پیش آمده");

  return (
    // <!-- header -->
    <header className="sticky top-2 z-[100]">
      <div className="flex items-center justify-between m-5 p-5 bg-white dark:bg-dark-100 dark:text-white rounded-lg shadow-lg">
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
          darkModeHandler={darkModeHandler}
          lightModeHandler={lightModeHandler}
          data={data}
        />

        {/* <!-- App Logo && desktop Header --> */}
        <Link to="/" className="w-[150px]">
          <img className="w-full" src="/images/logo-1.png" alt="logo-icon" />
        </Link>
        {/* <!-- menus --> */}
        <ul className="hidden lg:flex lg:gap-x-20 childe:p-3 childe:text-base childe:flex-center font-danaBold childe:duration-150">
          <Link to="/" className="hover:text-primary-200">
            خانه
          </Link>

          <li className=" group">
            <Link
              className="relative flex items-end justify-center gap-1 group-hover:text-primary-200"
              to="/products"
            >
              فروشگاه
              <svg className="w-5 h-5 group-hover:rotate-180 transition-all duration-150">
                <use href="#arrow-down"></use>
              </svg>
            </Link>
            {/* <!-- subMenu for shopping --> */}
            <ul className="sub-menu--show z-50 dark:bg-dark-100">
              {data &&
                data.map((item) => (
                  <li key={item.id} className="childe:duration-150">
                    <Link
                      to={`/products/brand/${item.data.title.link}`}
                      className="inline-block mb-5 hover:text-primary-200"
                    >
                      {item.data.title.text}
                    </Link>
                    <div className="flex flex-col items-start justify-start gap-y-5 font-dana childe:duration-100">
                      {item.data.subMenus.map((item) => (
                        <Link
                          key={item.text}
                          to={`/products/brand/${item.link}`}
                          className="hover:text-primary-200"
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </li>
                ))}
            </ul>
          </li>

          <li className="hover:text-primary-200">
            <Link className="flex items-end justify-center" to="/contact-us">
              تماس با ما
            </Link>
          </li>
        </ul>
        {/* <!-- register & card --> */}
        <div className="flex-center gap-x-2 lg:gap-x-5 childe:duration-150">
          <div
            className={`${
              theme === "dark" ? "lg:flex-center" : ""
            } hidden w-10 h-10 lg:hover:bg-gray-100 lg:dark:hover:bg-dark-200 rounded-full hover:cursor-pointer text-yellow-500`}
            onClick={lightModeHandler}
          >
            <svg className="w-6 h-6 ">
              <use href="#sun"></use>
            </svg>
          </div>
          <div
            className={`${
              theme === "light" ? "lg:flex-center" : ""
            } hidden w-10 h-10 hover:bg-gray-100 rounded-full hover:cursor-pointer text-blue-800`}
            onClick={darkModeHandler}
          >
            <svg className="w-6 h-6">
              <use href="#moon"></use>
            </svg>
          </div>
          {userInfo && userInfo.role === "ADMIN" && (
            <Link
              to="/admin-panel"
              className="flex-center hover:text-primary-200 lg:w-10 lg:h-10 lg:hover:bg-gray-100 lg:dark:hover:bg-dark-200 rounded-full hover:cursor-pointer group"
            >
              <svg className="w-5 h-5 stroke-2">
                <use href="#setting"></use>
              </svg>
            </Link>
          )}
          {userInfo ? (
            <Link
              to="/my-account"
              className="flex-center hover:text-primary-200 lg:w-10 lg:h-10 lg:hover:bg-gray-100 lg:dark:hover:bg-dark-200 rounded-full hover:cursor-pointer group"
            >
              <svg className="w-5 h-5 stroke-2">
                <use href="#user"></use>
              </svg>
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden lg:inline-block px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white transition-all duration-100 rounded-lg"
              >
                ثبت‌نام | ورود
              </Link>
              <Link
                to="/login"
                className="flex-center lg:hidden  px-3 pb-2 bg-primary-200 hover:bg-primary-100 text-white transition-all duration-100 rounded-lg"
              >
                ورود
              </Link>
            </>
          )}

          <Link
            className="relative flex-center hover:text-primary-200 lg:w-10 lg:h-10 lg:hover:bg-gray-100 lg:dark:hover:bg-dark-200 rounded-full hover:cursor-pointer"
            to="/orders"
          >
            <svg className="w-5 h-5">
              <use href="#shopping-cart"></use>
            </svg>
          </Link>
          <Link
            to="/orders"
            className={`${
              state.itemCounter === 0
                ? "hidden"
                : "absolute left-12 lg:left-16 top-7 inline-block flex-center w-4 h-4 pt-1.5 bg-gray-200 dark:bg-white font-dana text-sm text-center text-primary-200 rounded-full quantity--shadow"
            }`}
          >
            {state.itemCounter}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
