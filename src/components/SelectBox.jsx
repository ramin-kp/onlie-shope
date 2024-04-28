import React, { useState } from "react";

function SelectBox({ filterTitle, setFilterTitle, query, setQuery }) {
  const [showSelectBox, setShowSelectBox] = useState(false);
  const handleFilterChange = (title, filter) => {
    setFilterTitle(title);
    setQuery({ ...query, filter });
  };
  return (
    <div
      className="relative max-w-xs p-3 border border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer"
      onClick={() => setShowSelectBox((prev) => !prev)}
    >
      <span className={` flex items-center justify-between`}>
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
        } absolute top-14 right-16 flex-col items-center justify-center childe:p-3 bg-white dark:bg-dark-100 font-dana text-center dark:childe:text-white rounded-lg transition-all childe:duration-150 overflow-hidden z-20`}
      >
        <li
          className={`${
            filterTitle === "مرتب‌سازی پیش‌فرض"
              ? "bg-gray-300/60 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() => handleFilterChange("مرتب‌سازی پیش‌فرض", "default")}
        >
          مرتب‌سازی پیش‌فرض
        </li>
        <li
          className={`${
            filterTitle === "مرتب‌سازی بر اساس ارزان‌ترین"
              ? "bg-gray-300/60 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() =>
            handleFilterChange("مرتب‌سازی بر اساس ارزان‌ترین", "Inexpensive")
          }
        >
          مرتب‌سازی بر اساس ارزان‌ترین
        </li>
        <li
          className={`${
            filterTitle === "مرتب‌سازی بر اساس گران‌ترین"
              ? "bg-gray-300/60 dark:bg-gray-700"
              : ""
          } inline-block w-full h-full hover:bg-primary-200 hover:text-white`}
          onClick={() =>
            handleFilterChange("مرتب‌سازی بر اساس گران‌ترین", "Expensive")
          }
        >
          مرتب‌سازی بر اساس گران‌ترین
        </li>
      </ul>
    </div>
  );
}

export default SelectBox;
