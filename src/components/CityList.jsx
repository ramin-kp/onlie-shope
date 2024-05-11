import React, { useState } from "react";

function CityList({
  provinces,
  cities,
  cityText,
  setCityText,
  provinceText,
  setProvinceText,
}) {
  const [isShowProvince, setIsShowProvince] = useState(false);
  const [isShowCity, setIsShowCity] = useState(false);
  console.log({ provinces, cities });
  return (
    <div>
      <div>
        <span
          className={"px-3 py-2 font-danaBold border border-gray-400"}
          onClick={() => setIsShowProvince((prev) => !prev)}
        >
          {provinceText === 0
            ? "استان خود را انتخاب کنید"
            : provinces?.data[provinceText - 1].name}
        </span>
        <ul className={`${isShowProvince ? "inline-block " : "hidden"} h-20 bg-gray-400 dark:bg-dark-100 overflow-y-auto`}>
          {provinces?.data.map((province) => (
            <li key={province.id} onClick={() => setProvinceText(province.id)}>
              {province.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="h-40 overflow-y-scroll">
          {cities?.data.map((city) => (
            <li key={city.id}>{city.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CityList;
