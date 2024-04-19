import React from "react";
import { Link } from "react-router-dom";

function SliderCard({ data }) {
  console.log(data);
  const { id, image, title, price, offer } = data;
  return (
    <Link
      to={`/products/${id}`}
      className="flex flex-col w-[200px] lg:w-[300px] xl:w-[350px] px-2 py-1 mx-5 lg:mx-auto"
    >
      <div className="w-[150px] lg:w-[200px] mx-auto">
        <span className="inline-block p-1 mb-1  bg-primary-100 text-white rounded z-30">
          {offer.discount}%
        </span>
        <img src={`/images/${image}`} alt={title} className="w-full" />
      </div>
      <h3 className="my-2.5 font-danaBold text-sm text-right line-clamp-1">
        {title}
      </h3>
      <div className="flex flex-col lg:flex-row items-center justify-around font-dana">
        <span className="flex-center line-through text-gray-400">
          {price.toLocaleString()}
          <span className="mr-1">تومان</span>
        </span>
        <span className="flex-center text-primary-200 text">
          <span className="mr-1">تومان</span>
          {(price - (price * offer.discount) / 100).toLocaleString()}
        </span>
      </div>
      <span className="w-full p-1 mx-auto mt-2 bg-primary-100 font-dana text-white text-center">
        countDown
      </span>
    </Link>
  );
}

export default SliderCard;
