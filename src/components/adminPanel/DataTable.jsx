import React from "react";

function DataTable({ text, font, children }) {
  return (
    <div className="w-full grow">
      <h1
        className={`py-5 text-zinc-900 dark:text-white ${
          font ? font : "font-danaBold text-lg md:text-xl"
        }`}
      >
        {text}
      </h1>
      <div>{children}</div>
    </div>
  );
}

export default DataTable;
