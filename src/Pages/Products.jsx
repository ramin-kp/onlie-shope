import React from "react";
import { useQuery } from "@tanstack/react-query";

//component
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import ProductCard from "./../components/ProductCard";
import Loader from "../components/Loader";

//function
import { customToast } from "../utils/customToast";

//services
import { getProductsData } from "../Services/products";
import { useState } from "react";

function Products() {
  const queryKey = ["products-data"];
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });
  const [hovered, setHovered] = useState(false);

  if (isError) return customToast("error", "مشکلی پیش آمده ");
  return (
    <>
      <Header />
      <main className="container my-5">
        <div className="w-full overflow-hidden rounded">
          <img
            src="/images/banner-1.jpg"
            alt="banner-img"
            className="w-full mx-auto object-cover "
          />
        </div>
        <div className="my-5 childe:my-5">
          <div className="flex items-start justify-between gap-x-5 w-full bg-white dark:bg-dark-100 px-5 py-3 rounded-lg">
            <div className="flex items-center gap-x-5">
              <svg className="w-7 h-7">
                <use href="#squares"></use>
              </svg>
              <svg className="w-7 h-7">
                <use href="#list-bullet"></use>
              </svg>
            </div>
            <div className="w-[300px]">
              <select className="border border-gray-500 w-full dark:text-white">
                <option >select</option>
                <option
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={`${hovered ? "bg-primary-200 text-white" : ""}`}
                >
                  ramin
                </option>
                <option
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={`${hovered ? "bg-primary-200 text-white" : ""}`}
                >
                  ramin
                </option>
                <option
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className={`${hovered ? "bg-primary-200 text-white" : ""}`}
                >
                  ramin
                </option>
              </select>
            </div>
          </div>
          {isPending ? (
            <Loader />
          ) : (
            <div className="flex justify-between items-start gap-x-10">
              <ul className="sticky top-28 flex flex-col items-center justify-start grow w-full shadow-lg rounded-lg">
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
                <li className="w-full space-y-5 bg-red-400">
                  Lorem ipsum dolor sit..
                </li>
              </ul>
              <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                {products.data.map((product) => (
                  <ProductCard key={product.id} data={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Products;
