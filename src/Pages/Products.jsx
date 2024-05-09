import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

//component
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import ProductCard from "./../components/ProductCard";
import Loader from "../components/Loader";
import SelectBox from "../components/SelectBox";

//function
import { customToast } from "../utils/customToast";
import {
  filterAvailableProducts,
  filterPriceProducts,
  filterProductBrand,
  filterProducts,
} from "../utils/products";

//services
import { getProductsData } from "../Services/products";
import AccordionBox from "../components/AccordionBox";

function Products() {
  const [productDisplay, setProductDisplay] = useState("grid");
  const [filterTitle, setFilterTitle] = useState("مرتب‌سازی پیش‌فرض");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({});
  const [price, setPrice] = useState([0, 100000000]);
  const queryKey = ["products-data"];
  const { data, isPending, isError } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });

  useEffect(() => {
    if (!data) return;
    setProducts(data.data);
  }, [data]);

  const handleFilterChange = async (newQuery) => {
    if (!data) return;
    setQuery(newQuery);
    let finalProducts = await filterProducts(data.data, newQuery?.filter);
    finalProducts = await filterProductBrand(finalProducts, newQuery?.brand);
    finalProducts = await filterAvailableProducts(
      finalProducts,
      newQuery?.available
    );
    finalProducts = await filterPriceProducts(finalProducts, price);
    setProducts(finalProducts);
  };

  if (isError) customToast("error", "مشکلی پیش آمده ");

  return (
    <>
      <Header />
      <main className="container my-5" data-aos="fade-up">
        <div className="mx-3 overflow-hidden rounded">
          <img
            src="/images/banner-1.jpg"
            alt="banner-img"
            className="lg:w-full mx-auto object-contain"
          />
        </div>
        <div className="my-5 mx-3 childe:my-5">
          <div className="flex items-center justify-between gap-x-5 w-full mx-auto bg-gray-200 dark:bg-dark-100 px-5 py-3 rounded-lg">
            {/* products sort */}
            <div className="hidden lg:flex items-center gap-x-5">
              <svg
                className={`${
                  productDisplay === "grid"
                    ? "text-primary-200"
                    : "dark:text-white"
                } w-7 h-7 cursor-pointer hover:scale-110 duration-200"`}
                onClick={() => setProductDisplay("grid")}
              >
                <use href="#squares"></use>
              </svg>
              <svg
                className={`${
                  productDisplay === "flex"
                    ? "text-primary-200"
                    : "dark:text-white"
                } w-7 h-7 cursor-pointer hover:scale-110 duration-200"`}
                onClick={() => setProductDisplay("flex")}
              >
                <use href="#list-bullet"></use>
              </svg>
            </div>
            <div className="w-full lg:w-[300px]">
              {/* select box */}
              <SelectBox
                filterTitle={filterTitle}
                setFilterTitle={setFilterTitle}
                query={query}
                handleFilterChange={handleFilterChange}
              />

              {/* select box */}
            </div>
          </div>
          {isPending && <Loader />}
          <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-x-10 px-3 xs:px-5">
            <div className="sm:sticky w-full my-5 sm:w-auto top-28 shadow-lg rounded-lg">
              <AccordionBox
                query={query}
                setQuery={setQuery}
                price={price}
                setPrice={setPrice}
                handleFilterChange={handleFilterChange}
                isBrand={1}
              />
            </div>
            {products?.length > 0 ? (
              <div
                className={`${
                  productDisplay === "grid"
                    ? "product-display--grid"
                    : "product-display--flex"
                } gap-5 mb-10`}
              >
                {products &&
                  products.map((product) => (
                    <ProductCard
                      key={product.id}
                      data={product}
                      display={productDisplay}
                    />
                  ))}
              </div>
            ) : (
              <div className="flex-center w-full p-5 bg-gray-300 dark:bg-dark-100 dark:text-white font-danaBold text-xl rounded-lg">
                محصولی با این فیلترها یافت نشد
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Products;
