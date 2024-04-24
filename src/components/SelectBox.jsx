import React, { useState } from "react";

function SelectBox({ filterTitle, setFilterTitle, setProductsFilter }) {
  const [showSelectBox, setShowSelectBox] = useState(false);
  return (
    <div
      className="relative max-w-xs p-5 border border-gray-400 rounded-lg cursor-pointer"
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
      <div
        className={`${
          showSelectBox ? "flex" : "hidden"
        } absolute flex-col items-center justify-center gap-5 childe:bg-red-600 text-white `}
      >
        <span
          className={`hover:bg-primary-200 hover:text-white`}
          onClick={() => setFilterTitle("مرتب‌سازی پیش‌فرض")}
        >
          مرتب‌سازی پیش‌فرض
        </span>
        <span
          className={`hover:bg-primary-200 hover:text-white`}
          onClick={() => setFilterTitle("مرتب‌سازی بر اساس ارزان‌ترین")}
        >
          مرتب‌سازی بر اساس ارزان‌ترین
        </span>
        <span
          className={`hover:bg-primary-200 hover:text-white`}
          onClick={() => setFilterTitle("مرتب‌سازی بر اساس گران‌ترین")}
        >
          مرتب‌سازی بر اساس گران‌ترین
        </span>
      </div>
    </div>
  );
}

export default SelectBox;
