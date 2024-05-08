import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ data, display }) {
  const { id, link = "/", image, title, subTitle, price, Number } = data;
  return (
    <div
      key={id}
      className={`${
        display === "flex" ? "product-card--flex" : ""
      } gap-10 px-4 py-2 bg-gray-300/60 dark:bg-dark-100 rounded-lg cursor-pointer hover:-translate-y-2 text-zinc-900 dark:text-white duration-500 shadow-lg`}
    >
      {/* image */}
      <Link
        to={`/products/${title}`}
        className="inline-block flex-center shrink-0  rounded-lg overflow-hidden"
      >
        <img
          src={`/images/${image}`}
          alt="product-img"
          className=" w-[230px] h-[230px] shrink-0"
        />
      </Link>

      {/* details */}
      <div className="mt-5 flex flex-col justify-between ">
        <Link
          to={`/products/${title}`}
          className="h-[50px] font-danaBold text-base line-clamp-2 hover:text-primary-200 duration-100"
        >
          {title}
        </Link>

        <p
          className={`${
            display === "flex" ? "" : ""
          } pt-2 font-dana text-gray-500/80  dark:text-gray-500 line-clamp-2`}
        >
          {subTitle}
        </p>

        {/* price */}
        {Number ? (
          <div className="flex items-center justify-between px-2 pt-2 mt-2 font-danaMedium text-lg border-t border-gray-300 dark:border-gray-700">
            <span>قیمت:</span>
            <span className="text-primary-200 ">
              {price?.toLocaleString()} تومان
            </span>
          </div>
        ) : (
          <div className="flex-center p-2 font-danaMedium text-lg border-t border-gray-300 dark:border-gray-700">
            <span className="text-primary-200 ">ناموجود</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
