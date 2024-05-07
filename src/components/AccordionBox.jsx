import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

//services
import { getCategory } from "../Services/category";

//function
import { customToast } from "../utils/customToast";
import { useState } from "react";
import { createQueryObject } from "../utils/products";
import SliderBox from "./SliderBox";

function AccordionBox({ query, price, setPrice, handleFilterChange }) {
  const queryKey = ["category-data"];
  const { data: category, isError } = useQuery({
    queryKey,
    queryFn: getCategory,
  });

  const productBrandHandler = (brand) => {
    handleFilterChange(createQueryObject(query, { brand }));
  };
  const productAvailableHandler = (available) => {
    handleFilterChange(createQueryObject(query, { available }));
  };
  const priceHandler = (event, newValue) => {
    setPrice(newValue);
    handleFilterChange();
  };

  if (isError) return customToast("error", "مشکلی پیش آمده");
  return (
    <aside className="sm:childe:w-[250px] childe:w-full">
      <Accordion
        defaultExpanded
        className="w-[400px] p-2 my-2 dark:bg-dark-100 text-zinc-900 dark:text-white rounded"
      >
        <AccordionSummary
          expandIcon={
            <svg className="w-5 h-5 dark:text-white ">
              <use href="#arrow-down"></use>
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
          className=" border-b border-gray-100 "
        >
          <Typography component={"h3"} className="font-danaMedium text-lg">
            قیمت
          </Typography>
        </AccordionSummary>
        <div className="w-full pt-2 border-t border-gray-200 dark:border-gray-700">
          {/* <Range /> */}
          <SliderBox
            price={price}
            setPrice={setPrice}
            priceHandler={priceHandler}
          />
        </div>
      </Accordion>
      <Accordion
        defaultExpanded
        className="w-[200px] p-2 mb-2 dark:bg-dark-100 text-zinc-900 dark:text-white rounded"
      >
        <AccordionSummary
          expandIcon={
            <svg className="w-5 h-5 dark:text-white ">
              <use href="#arrow-down"></use>
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
          className=" border-b border-gray-100 "
        >
          <Typography component={"h3"} className="font-danaMedium text-lg">
            برند محصولات
          </Typography>
        </AccordionSummary>
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          {category &&
            category.data.map((item) => (
              <AccordionDetails
                key={item.id}
                className={`${
                  query?.brand === item.value
                    ? "bg-gray-200 !text-primary-200 dark:bg-dark-200/60"
                    : ""
                }  dark:bg-dark-100 hover:bg-gray-300 dark:hover:bg-dark-200/50 text-zinc-900  dark:text-white rounded transition-all duration-150 cursor-pointer group`}
                onClick={() => productBrandHandler(item.value)}
              >
                <Typography
                  component={"p"}
                  className="font-danaMedium group-hover:text-primary-200 transition-all duration-150"
                >
                  <span>{item.title}</span>
                </Typography>
              </AccordionDetails>
            ))}
        </div>
      </Accordion>
      <Accordion
        defaultExpanded
        className="w-[200px] p-2 dark:bg-dark-100 text-zinc-900 dark:text-white rounded"
      >
        <AccordionSummary
          expandIcon={
            <svg className="w-5 h-5 dark:text-white ">
              <use href="#arrow-down"></use>
            </svg>
          }
          aria-controls="panel1-content"
          id="panel1-header"
          className=" border-b border-gray-100 "
        >
          <Typography component={"h3"} className="font-danaMedium text-lg">
            موجودی
          </Typography>
        </AccordionSummary>
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <AccordionDetails
            className={`${
              query?.available === "AllProducts" ||
              query?.available === undefined
                ? "bg-gray-200 !text-primary-200 dark:bg-dark-200/60 "
                : ""
            } dark:bg-dark-100 hover:bg-gray-300 dark:hover:bg-dark-200/50 text-zinc-900  dark:text-white rounded transition-all duration-150 cursor-pointer group`}
            onClick={() => productAvailableHandler("AllProducts")}
          >
            همه‌محصولات
          </AccordionDetails>
          <AccordionDetails
            className={`${
              query?.available === 1
                ? "bg-gray-200 !text-primary-200 dark:bg-dark-200/60 "
                : ""
            } dark:bg-dark-100 hover:bg-gray-300 dark:hover:bg-dark-200/50 text-zinc-900  dark:text-white rounded transition-all duration-150 cursor-pointer group`}
            onClick={() => productAvailableHandler(1)}
          >
            محصولات موجود
          </AccordionDetails>
          <AccordionDetails
            className={`${
              query?.available === 0
                ? "bg-gray-200 !text-primary-200 dark:bg-dark-200/60 "
                : ""
            } dark:bg-dark-100 hover:bg-gray-300 dark:hover:bg-dark-200/50 text-zinc-900  dark:text-white rounded transition-all duration-150 cursor-pointer group`}
            onClick={() => productAvailableHandler(0)}
          >
            محصولات ناموجود
          </AccordionDetails>
        </div>
      </Accordion>
    </aside>
  );
}

export default AccordionBox;
