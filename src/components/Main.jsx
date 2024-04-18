import React from "react";
import { useQuery } from "@tanstack/react-query";

import SectionHeader from "./SectionHeader";
import { getProductsData } from "../Services/products";
import { Link } from "react-router-dom";

function Main() {
  const queryKey = ["products-data"];
  const {
    data: productsData,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });
  console.log({ productsData, isError, isPending });
  return (
    <>
      <SectionHeader title={"محصولات جدید"} />
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-2.5 my-5"
        data-aos="fade-up"
      >
        {productsData &&
          productsData.data.map((product) => (
            <div key={product.id} className="bg-gray-200 rounded-lg px-4 py-2">
              <Link to={`products/${product.link}`}>
                <img src={`/images/${product.image}`} alt="product-img" />
              </Link>
              <div className="my-5 h-[105px]">
                <Link
                  to={`/products/${product.link}`}
                  className="font-danaBold text-base line-clamp-2 hover:text-primary-200 duration-100"
                >
                  {product.title}
                </Link>
                <p className="pt-2 opacity-60 line-clamp-2">
                  {product.subTitle}
                </p>
              </div>
              <div className="flex items-center justify-between p-2 font-danaMedium text-lg border-t border-gray-100">
                <span>قیمت:</span>
                <span className="text-primary-200 ">
                  {product.price.toLocaleString()} تومان
                </span>
              </div>
            </div>
          ))}
      </section>
    </>
  );
}

export default Main;
