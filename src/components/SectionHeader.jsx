import React from "react";
import { Link } from "react-router-dom";

function NewProducts({ title }) {
  return (
    <div className="flex items-center justify-between gap-x-2 my-8" data-aos="fade-up">
      <div className="flex-center">
        <span className="w-4 h-4 ml-2 rounded-full bg-primary-200"></span>
        <h2 className="font-morabba text-lg sm:text-xl lg:text-2xl dark:text-white">
          {title}
        </h2>
      </div>
      <Link
        to="/products"
        className="flex items-center justify-between p-2 font-danaMedium hover:bg-primary-200/60 childe:hover:text-white rounded-2xl duration-100"
      >
        <span className="text-sm sm:text-lg">همه محصولات</span>
        <svg className="w-5 h-5 mr-2">
          <use href="#arrow-left"></use>
        </svg>
      </Link>
    </div>
  );
}

export default NewProducts;
