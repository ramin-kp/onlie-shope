import React from "react";

function DetailsBox({text , data , bgColor}) {
  return (
    <div className={`${bgColor} p-2.5 lg:p-5 font-dana text-base lg:text-lg text-center text-white rounded-xl`}>
      <div className="my-2.5 font-danaBold">{text}</div>
      <div>{data}</div>
    </div>
  );
}

export default DetailsBox;
