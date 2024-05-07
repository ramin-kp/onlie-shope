import React, { useState } from "react";

//function
import { createQueryObject } from "../utils/products";

function SelectBox({ filterTitle, setFilterTitle, query, handleFilterChange }) {
  const [showSelectBox, setShowSelectBox] = useState(false);
  const filterHandler = (title, filter) => {
    setFilterTitle(title);
    handleFilterChange(createQueryObject(query, { filter }));
  };
  return (
    <div
      className="relative max-w-xs p-3 text-zinc-800 dark:text-white border border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer"
      onClick={() => setShowSelectBox((prev) => !prev)}
    >
      <span className={`flex items-center justify-between font-danaMedium text-sm sm:text-lg`}>
        {filterTitle}
        <svg
          className={`${
            showSelectBox ? "rotate-180" : ""
          } w-5 h-5 transition-all duration-150`}
        >
          <use href="#arrow-down"></use>
        </svg>
      </span>
      <ul
        className={`${
          showSelectBox ? "flex" : "hidden"
        } absolute top-14 xs:top-16 right-0 flex-col mt-4 xs:mt-auto items-center justify-center w-full childe:p-3 bg-gray-300 dark:bg-dark-200 text-sm sm:text-lg text-center dark:childe:text-white rounded-lg shadow-xl transition-all childe:duration-150 overflow-hidden z-20`}
      >
        <li
          className={`${
            filterTitle === "مرتب‌سازی پیش‌فرض"
              ? "bg-gray-400 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() => filterHandler("مرتب‌سازی پیش‌فرض", "default")}
        >
          مرتب‌سازی پیش‌فرض
        </li>
        <li
          className={`${
            filterTitle === "مرتب‌سازی بر اساس ارزان‌ترین"
              ? "bg-gray-400 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() =>
            filterHandler("مرتب‌سازی بر اساس ارزان‌ترین", "Inexpensive")
          }
        >
          مرتب‌سازی بر اساس ارزان‌ترین
        </li>
        <li
          className={`${
            filterTitle === "مرتب‌سازی بر اساس گران‌ترین"
              ? "bg-gray-400 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() =>
            filterHandler("مرتب‌سازی بر اساس گران‌ترین", "Expensive")
          }
        >
          مرتب‌سازی بر اساس گران‌ترین
        </li>
      </ul>
    </div>
  );
}

export default SelectBox;
