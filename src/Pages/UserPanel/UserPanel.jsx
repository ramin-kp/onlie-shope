import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function UserPanel() {
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLink") || "my-account"
  );
  useEffect(() => {
    localStorage.setItem("activeLink", activeLink);
  }, [activeLink]);

  return (
    <main className="flex flex-col lg:flex-row items-start justify-between bg-white dark:bg-dark-100">
      <section
        className="
          w-full lg:w-auto px-5 lg:pr-10 py-10 bg-white lg:bg-transparent dark:bg-dark-200 lg:dark:bg-transparent z-50 lg:shadow-none transition-all duration-500"
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
              } user-dashboard__li`}
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
              } user-dashboard__li`}
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
              } user-dashboard__li`}
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
              to="edit-account"
              className={`${
                activeLink === "edit-account" ? "bg-primary-200 text-white" : ""
              } user-dashboard__li`}
              onClick={() => setActiveLink("edit-account")}
            >
              <svg className="w-7 h-7 !stroke-[1.5px]">
                <use href="#user"></use>
              </svg>
              <span>جزئیات حساب</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="user-dashboard__li">
              <svg className="w-7 h-7">
                <use href="#arrow-right-start-on-rectangle"></use>
              </svg>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </section>
      <section className="container bg-gray-100 dark:bg-dark-200 grow  lg:mx-10 my-10 p-10 shadow-xl rounded-[35px]">
        <Outlet />
      </section>
    </main>
  );
}

export default UserPanel;
