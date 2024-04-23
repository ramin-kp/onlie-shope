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
import { FormControl, MenuItem, Select } from "@mui/material";


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
  const [productDisplay, setProductDisplay] = useState("grid");

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
              {/* <select className="border border-gray-500 w-full dark:text-white">
                <option>select</option>
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
              </select> */}
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <Select
                  // value={"age"}
                  // onChange={"handleChange"}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"10"}>Ten</MenuItem>
                  <MenuItem value={"20"}>Twenty</MenuItem>
                  <MenuItem value={"30"}>Thirty</MenuItem>
                </Select>
              </FormControl>
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
              <div
                className={`${
                  productDisplay === "grid"
                    ? "product-display--grid"
                    : "product-display--flex"
                } gap-5 mb-10`}
              >
                {products.data.map((product) => (
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
