import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

function AdminPanel() {
  const [activeLink, setActiveLink] = useState(
    localStorage.getItem("activeLinkAPanel") || "index"
  );
  useEffect(() => {
    localStorage.setItem("activeLinkAPanel", activeLink);
  }, [activeLink]);
  return (
    <main className="flex flex-col lg:flex-row gap-x-2 xl:gap-x-14 px-2.5  xl:px-10 2xl:px-14 bg-white dark:bg-dark-100">
      <aside
        className="
          w-full lg:w-auto xl:pr-10 py-10 bg-white lg:bg-transparent dark:bg-dark-200 lg:dark:bg-transparent z-50 lg:shadow-none transition-all duration-500"
      >
        <div className="w-[200px]">
          <Link to="/">
            <img src="/images/logo-1.png" alt="logo-img" className="w-full" />
          </Link>
        </div>

        <ul className="my-2.5 childe:py-3 font-dana text-zinc-900 dark:text-white">
          <li>
            <Link
              to="/admin-panel"
              className={`${
                activeLink === "index" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("index")}
            >
              <svg className="w-7 h-7">
                <use href="#home"></use>
              </svg>
              <span>صفحه اصلی</span>
            </Link>
          </li>
          <li>
            <Link
              to="users"
              className={`${
                activeLink === "users" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("users")}
            >
              <svg className="w-7 h-7 stroke-[1.5px]">
                <use href="#user"></use>
              </svg>
              <span>کاربرها</span>
            </Link>
          </li>
          <li>
            <Link
              to="category"
              className={`${
                activeLink === "category" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("category")}
            >
              <svg className="w-7 h-7">
                <use href="#queue-list"></use>
              </svg>
              <span>برند محصولات</span>
            </Link>
          </li>
          <li>
            <Link
              to="products"
              className={`${
                activeLink === "products" ? "bg-primary-200 text-white" : ""
              } dashboard__li`}
              onClick={() => setActiveLink("products")}
            >
              <svg className="w-7 h-7">
                <use href="#shopping"></use>
              </svg>
              <span>محصولات</span>
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
                <use href="#shopping-bag"></use>
              </svg>
              <span>سفارش‌ها</span>
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
              <span>تیکت‌ها</span>
            </Link>
          </li>
          <li>
            <Link to="#" className="dashboard__li">
              <svg className="w-7 h-7">
                <use href="#arrow-right-start-on-rectangle"></use>
              </svg>
              <span>خروج</span>
            </Link>
          </li>
        </ul>
      </aside>
      <section className="max-w-[2000px] grow xl:grow mx-2.5 lg:mx-auto xl:px-10 bg-gray-100 dark:bg-dark-200 my-10 p-2.5 xl:p-10 shadow-lg rounded-[35px]">
        <Outlet />
      </section>
    </main>
  );
}

export default AdminPanel;
