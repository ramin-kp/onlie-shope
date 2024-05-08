import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({ link, title }) {
  return (
    <div className="mx-5 lg:mx-2">
      <Breadcrumbs
        aria-label="breadcrumb"
        className="bg-gray-300 dark:bg-dark-100 p-5 my-5 font-dana text-sm md:text-base lg:text-lg dark:text-gray-400 rounded-md"
      >
        <Link
          to="/"
          className="hover:text-primary-200 transition-all duration-200"
        >
          خانه
        </Link>
        <Link
          to={`/${link[0]}`}
          className="hover:text-primary-200 transition-all duration-200"
        >
          {link[1]}
        </Link>
        <Typography
          component="p"
          className="font-dana text-sm md:text-base lg:text-lg text-zinc-900 dark:text-white"
        >
          {title}
        </Typography>
      </Breadcrumbs>
    </div>
  );
}

export default Breadcrumb;
