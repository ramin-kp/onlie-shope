import React from "react";

function DataTable({text,children}) {
  return (
    <div className="w-full">
      <h1 className="py-5 font-danaBold text-lg md:text-xl text-zinc-900 dark:text-white ">
        {text}
      </h1>
      <div>{children}</div>
    </div>
  );
}

export default DataTable;
