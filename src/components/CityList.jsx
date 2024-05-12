import React, { useEffect, useState } from "react";

function CityList({
  provinces,
  cities,
  cityText,
  setCityText,
  provinceText,
  setProvinceText,
  provinceCode,
  setProvinceCode,
}) {
  const [isShowProvince, setIsShowProvince] = useState(false);
  const [isShowCity, setIsShowCity] = useState(false);
  const [selectBox, setSelectBox] = useState(null);
  const [citiesData, setCitiesData] = useState([]);

  //citiesFilter
  useEffect(() => {
    if (!cities) return;
    const res = cities.data.filter((city) => city.province_id === provinceCode);
    setCitiesData(res);
  }, [cities, provinceCode]);

  const provinceInputHandler = (provinceName, code) => {
    setProvinceText(provinceName);
    setIsShowProvince((prev) => !prev);
    setProvinceCode(code);
  };
  const citiesInputHandler = (citiesName) => {
    setCityText(citiesName);
    setIsShowCity((prev) => !prev);
  };
  return (
    <>
      <div className="relative w-full cursor-pointer form-field">
        <label htmlFor="#province" className="form-field__label">
          استان
        </label>
        <span
          id="province"
          className={`form-field__select`}
          onClick={() => {
            setIsShowProvince((prev) => !prev);
            setSelectBox("province");
          }}
        >
          {!provinceText ? "استان خود را انتخاب کنید" : provinceText}
        </span>
        <ul
          className={`${
            isShowProvince && selectBox === "province"
              ? "inline-block "
              : "hidden"
          } form-field__option`}
        >
          {provinces?.data.map((province) => (
            <li
              key={province.id}
              className={`${
                province.name === provinceText
                  ? "bg-primary-200 text-white"
                  : ""
              } px-3 py-2 hover:bg-primary-200 hover:text-white transition-colors duration-150`}
              onClick={() => provinceInputHandler(province.name, province.id)}
            >
              {province.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative w-full childe:w-full cursor-pointer form-field">
        <label htmlFor="#city" className="form-field__label">
          شهر
        </label>

        <span
          id="city"
          className={`form-field__select`}
          onClick={() => {
            provinceText && setIsShowCity((prev) => !prev);
            provinceText && setSelectBox("city");
          }}
        >
          {!provinceText && "ابتدا استان خود را انتخاب کنید"}
          {!cityText && provinceText ? "شهر خود را انتخاب کنید" : cityText}
        </span>
        <ul
          className={`${
            isShowCity && selectBox === "city" && !isShowProvince
              ? "inline-block "
              : "hidden"
          } form-field__option`}
        >
          {citiesData?.length &&
            citiesData.map((city) => (
              <li
                key={city.id}
                className={`${
                  city.name === cityText ? "bg-primary-200 text-white" : ""
                } px-3 py-2 hover:bg-primary-200 hover:text-white transition-colors duration-150`}
                onClick={() => citiesInputHandler(city.name)}
              >
                {city.name}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default CityList;
