import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

//context
import { useUser } from "../../context/UserInfoContextProvider";
import { useTheme } from "../../context/ThemContextProvider";

//Fn
import { customToast } from "../../utils/customToast";
import { deleteCookie } from "../../utils/cookie";

function UserPanel() {
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLinkUPanel") || "my-account"
  );

  const navigate = useNavigate();

  //context
  const [userInfo, setUserInfo] = useUser();
  const [theme, setTheme] = useTheme();

  //useEffect
  useEffect(() => {
    if (activeLink === "my-account") return navigate(`/my-account`);
    navigate(`/my-account/${activeLink}`);
  }, [activeLink, navigate]);

  useEffect(() => {
    localStorage.setItem("activeLinkUPanel", activeLink);
  }, [activeLink]);

  //Fn
  const darkModeHandler = () => {
    setTheme("dark");
  };
  const lightModeHandler = () => {
    setTheme("light");
  };
  const logoutHandler = () => {
    navigate("/");
    customToast("success", "با موفقیت از حساب خود خارج شدید");
    setUserInfo("");
    deleteCookie("userData");
  };
  return (
    <main className="flex flex-col lg:flex-row gap-x-2 xl:gap-x-14 px-2.5  xl:px-10 2xl:px-14 bg-white dark:bg-dark-100">
      <aside
        className="
          w-full lg:w-auto px-2.5 lg:pr-5 py-10 bg-white lg:bg-transparent dark:bg-dark-200 lg:dark:bg-transparent z-50 lg:shadow-none transition-all duration-500"
      >
        <div className="w-[200px]">
          <Link to="/">
            <img src="/images/logo-1.png" alt="logo-img" className="w-full" />
          </Link>
        </div>

        <ul className="my-2.5 childe:py-3 font-dana text-zinc-900 dark:text-white">
          <li>
            <Link
              to="/my-account"
              className={`${
                activeLink === "my-account" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("my-account")}
            >
              <svg className="w-7 h-7">
                <use href="#home"></use>
              </svg>
              <span>پیشخوان</span>
            </Link>
          </li>
          <li>
            <Link
              to="orders"
              className={`${
                activeLink === "orders" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("orders")}
            >
              <svg className="w-7 h-7">
                <use href="#shopping"></use>
              </svg>
              <span>سفارش‌ها</span>
            </Link>
          </li>
          <li>
            <Link
              to="address"
              className={`${
                activeLink === "address" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("address")}
            >
              <svg className="w-7 h-7">
                <use href="#map"></use>
              </svg>
              <span>آدرس</span>
            </Link>
          </li>
          <li>
            <Link
              to="ticket"
              className={`${
                activeLink === "ticket" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("ticket")}
            >
              <svg className="w-7 h-7">
                <use href="#ticket"></use>
              </svg>
              <span>ارسال تیکت</span>
            </Link>
          </li>
          <li>
            <Link
              to="edit-account"
              className={`${
                activeLink === "edit-account" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("edit-account")}
            >
              <svg className="w-7 h-7 !stroke-[1.5px]">
                <use href="#user"></use>
              </svg>
              <span>جزئیات حساب</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="dashboard__li" onClick={logoutHandler}>
              <svg className="w-7 h-7">
                <use href="#arrow-right-start-on-rectangle"></use>
              </svg>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </aside>
      <section className="max-w-[1432px] xl:grow mx-2.5 lg:mx-auto xl:px-10 bg-gray-100 dark:bg-dark-200 my-10 p-10 shadow-lg rounded-[35px]">
        <div className="flex items-start justify-between">
          <h1 className="pb-5 my-5 font-danaBold text-2xl text-zinc-900 dark:text-white">
            {userInfo?.username} عزیز؛ خوش اومدی 🙌
          </h1>
          <div>
            <div
              className={`${
                theme === "dark" ? "lg:flex-center" : ""
              } hidden w-10 h-10 bg-dark-100 rounded-full hover:cursor-pointer text-yellow-500`}
              onClick={lightModeHandler}
            >
              <svg className="w-6 h-6 ">
                <use href="#sun"></use>
              </svg>
            </div>
            <div
              className={`${
                theme === "light" ? "lg:flex-center" : ""
              } hidden w-10 h-10 bg-white rounded-full hover:cursor-pointer text-blue-800`}
              onClick={darkModeHandler}
            >
              <svg className="w-6 h-6">
                <use href="#moon"></use>
              </svg>
            </div>
          </div>
        </div>
        <Outlet />
      </section>
    </main>
  );
}

export default UserPanel;
