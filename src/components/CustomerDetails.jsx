import React, { useState } from "react";
import CityList from "./CityList";
import { useQuery } from "@tanstack/react-query";
import { getCities, getProvinces } from "../Services/city";
import Loader from "./Loader";
import { useForm } from "react-hook-form";

function CustomerDetails({ step, setStep }) {
  const [cityText, setCityText] = useState(0);
  const [provinceText, setProvinceText] = useState(0);
  const { data: provinces, isLoading: isProvinces } = useQuery({
    queryKey: ["provinces-data"],
    queryFn: getProvinces,
  });
  const { data: cities, isLoading: isCities } = useQuery({
    queryKey: ["cities-data"],
    queryFn: getCities,
  });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const SubmitHandler = (data) => console.log(data);
  if (isProvinces && isCities) return <Loader />;
  return (
    <div>
      <form onSubmit={() => handleSubmit(SubmitHandler)}>
        <div className="form-field">
          <label htmlFor="name" className="form-field--label">
            نام
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: { value: true, message: "نام خود را وارد کنید" },
              minLength: {
                value: 3,
                message: "نام شما باید بیشتر از 3 کاراکتر باشد",
              },
              maxLength: {
                value: 20,
                message: "نام شما باید کمتر از 20 کاراکتر باشد",
              },
            })}
            className="form-field--input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="lastName" className="form-field--label">
            نام خانوادگی
          </label>
          <input
            type="text"
            id="lastName"
            {...register("lastName", {
              required: {
                value: true,
                message: "نام خانوادگی خود را وارد کنید",
              },
              minLength: {
                value: 3,
                message: "نام خانوادگی شما باید بیشتر از3 کاراکتر باشد",
              },
              maxLength: {
                value: 20,
                message: "نام خانوادگی شما باید بیشتر از20 کاراکتر باشد",
              },
            })}
            className="form-field--input"
          />
        </div>
        <div className="form-field">
          <label htmlFor="location" className="form-field--label">
            آدرس دقیق
          </label>
          <textarea
            id="location"
            {...register("location", {
              required: {
                value: true,
                message: "لطفا آدرس خود را وارد کنید",
              },
            })}
            className="form-field--input"
          />
        </div>
        <div>
          <CityList
            provinces={provinces}
            cities={cities}
            cityText={cityText}
            setCityText={setCityText}
            provinceText={provinceText}
            setProvinceText={setProvinceText}
          />
        </div>
      </form>
      <button onClick={() => setStep((step) => step - 1)}>back</button>
    </div>
  );
}

export default CustomerDetails;
