import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ data }) {
  const { id, link = "/", image, title, subTitle, price } = data;
  return (
    <div key={id} className="bg-gray-200 dark:bg-dark-100 rounded-lg px-4 py-2 cursor-pointer hover:-translate-y-2 text-zinc-900 dark:text-white duration-500 shadow-lg">
      <Link to={`products/${link}`}>
        <img src={`/images/${image}`} alt="product-img" />
      </Link>
      <div className="my-5 h-[105px]">
        <Link
          to={`/products/${link}`}
          className="font-danaBold text-base line-clamp-2 hover:text-primary-200 duration-100"
        >
          {title}
        </Link>
        <p className="pt-2 font-dana text-gray-500/80  dark:text-gray-500 line-clamp-2">{subTitle}</p>
      </div>
      <div className="flex items-center justify-between p-2 font-danaMedium text-lg border-t border-gray-100 dark:border-gray-700">
        <span>قیمت:</span>
        <span className="text-primary-200 ">
          {price?.toLocaleString()} تومان
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
