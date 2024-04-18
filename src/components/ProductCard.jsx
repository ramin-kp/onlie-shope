import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ data }) {
  const { id, link = "/", image, title, subTitle, price } = data;
  return (
    <div key={id} className="bg-gray-200 rounded-lg px-4 py-2">
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
        <p className="pt-2 opacity-60 line-clamp-2">{subTitle}</p>
      </div>
      <div className="flex items-center justify-between p-2 font-danaMedium text-lg border-t border-gray-100">
        <span>قیمت:</span>
        <span className="text-primary-200 ">
          {price?.toLocaleString()} تومان
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
