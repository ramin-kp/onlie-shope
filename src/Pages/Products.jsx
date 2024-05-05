import React, { useEffect } from "react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

//component
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import ProductCard from "./../components/ProductCard";
import Loader from "../components/Loader";
import SelectBox from "../components/SelectBox";

//function
import { customToast } from "../utils/customToast";
import {
  filterProductBrand,
  filterProducts,
  getInitialQuery,
} from "../utils/products";

//services
import { getProductsData } from "../Services/products";
import AccordionBox from "../components/AccordionBox";

function Products() {
  const [productDisplay, setProductDisplay] = useState("grid");
  const [filterTitle, setFilterTitle] = useState("مرتب‌سازی پیش‌فرض");
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const queryKey = ["products-data"];
  const { data, isPending, isError } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });

  useEffect(() => {
    setQuery({});
    if (!data) return;
    console.log("get", getInitialQuery(searchParams));
    setProducts(data.data);
  }, [data]);

  const handleFilterChange = async (newQuery) => {
    if (!data) return;
    console.log("newQuery", newQuery);
    setQuery(newQuery);
    setSearchParams(newQuery);
    let finalProducts = await filterProducts(data.data, newQuery.filter);
    finalProducts = await filterProductBrand(finalProducts, newQuery.brand);
    console.log(finalProducts);
    setProducts(finalProducts);
  };

  if (isError) customToast("error", "مشکلی پیش آمده ");

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
            {/* products sort */}
            <div className="flex items-center gap-x-5">
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
            <div className="w-[300px]">
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
          {products?.length > 0 && (
            <div className="flex justify-between items-start gap-x-10">
              <div className="sticky top-28 w-[350px] shadow-lg rounded-lg">
                <AccordionBox
                  query={query}
                  setQuery={setQuery}
                  handleFilterChange={handleFilterChange}
                />
              </div>
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
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Products;
