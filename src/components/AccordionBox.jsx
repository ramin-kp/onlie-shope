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
import { Link } from "react-router-dom";

function AccordionBox({ checked }) {
  const queryKey = ["category-data"];
  const {
    data: category,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: getCategory,
  });
  console.log(category);
  if (isError) return customToast("error", "مشکلی پیش آمده");
  return (
    <aside>
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
                  false ? "bg-gray-100 dark:bg-dark-100" : ""
                } dark:bg-dark-100 hover:bg-gray-100 dark:hover:bg-dark-200/50 text-zinc-900 dark:text-white rounded transition-all  duration-150 cursor-pointer group`}
              >
                <Typography
                  component={"p"}
                  className="font-dana group-hover:text-primary-200 transition-all duration-150"
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
            قیمت
          </Typography>
        </AccordionSummary>
        <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
          <AccordionDetails
            className={` dark:bg-dark-100 hover:bg-gray-100 dark:hover:bg-dark-200/50 hover:text-primary-200 text-zinc-900 dark:text-white rounded transition-all  duration-150 cursor-pointer group`}
          >
            سسس
          </AccordionDetails>
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
            className={` dark:bg-dark-100 hover:bg-gray-100 dark:hover:bg-dark-200/50 hover:text-primary-200 text-zinc-900 dark:text-white rounded transition-all duration-150 cursor-pointer group`}
          >
            محصولات موجود
          </AccordionDetails>
          <AccordionDetails
            className={` dark:bg-dark-100 hover:bg-gray-100 dark:hover:bg-dark-200/50 hover:text-primary-200 text-zinc-900 dark:text-white rounded transition-all duration-150 cursor-pointer group`}
          >
            محصولات ناموجود
          </AccordionDetails>
        </div>
      </Accordion>
    </aside>
  );
}

export default AccordionBox;
