import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { getCities, getProvinces } from "../../Services/city";

//components
import CityList from "../../components/CityList";
import Loader from "./../../components/Loader";

//Fn
import { customToast } from "../../utils/customToast";

//config
import { addersSchema } from "../../Configs/schema";

function UPanelAddress() {
  const [provinceText, setProvinceText] = useState("");
  const [cityText, setCityText] = useState("");
  const [provinceCode, setProvinceCode] = useState("");

  //query
  const { data: provinces, isPending: isProvinces } = useQuery({
    queryKey: ["provinces-data"],
    queryFn: getProvinces,
  });

  const { data: cities, isPending: isCities } = useQuery({
    queryKey: ["cities-data"],
    queryFn: getCities,
  });

  //hook-form
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      location: "",
      PostalCode: "",
      mobile: "",
      email: "",
    },
    resolver: yupResolver(addersSchema),
  });

  //fn
  const SubmitHandler = (value) => {
    if (!provinceText || !cityText) {
      return customToast("error", "استان و شهر خود را انتخاب کنید");
    }
  };
  if (isCities) return <Loader />;
  return (
    <div>
      <h1 className=" my-5 pb-5 font-danaBold text-2xl text-zinc-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
        جزییات حساب کاربری
      </h1>
      <div className="font-dana">
        <h2 className="font-danaBold text-xl">آدرس ثبت شده</h2>
        <div>
          <p>رامین کریم پور</p>
          <p>آذربایجان شرقی</p>
          <p>بناب</p>
          <p>
            بناب خیابان مطهری-خیابان وحدت شرقی -کوچه فردیس33جنب آموزشگاه رانندگی
            سهند
          </p>
          <p> 5551979496</p>
        </div>
      </div>
      <form
        className="flex flex-col md:flex-row items-start justify-between gap-x-5 w-full p-5"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        {/* customer Details */}
        <div className="grow w-full md:w-1/2 text-zinc-900 dark:text-white">
          <div className="form-field">
            <label htmlFor="name" className="form-field__label">
              نام
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`${
                errors.name ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="lastName" className="form-field__label">
              نام خانوادگی
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`${
                errors.lastName ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.lastName && errors.lastName.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="location" className="form-field__label">
              آدرس دقیق
            </label>
            <input
              id="location"
              {...register("location")}
              className={`${
                errors.location ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.location && errors.location.message}
            </span>
          </div>

          <CityList
            provinces={provinces}
            cities={cities}
            cityText={cityText}
            setCityText={setCityText}
            provinceText={provinceText}
            setProvinceText={setProvinceText}
            provinceCode={provinceCode}
            setProvinceCode={setProvinceCode}
          />
          <div className="form-field">
            <label htmlFor="PostalCode" className="form-field__label">
              کد پستی
            </label>
            <input
              type="number"
              id="PostalCode"
              {...register("PostalCode")}
              className={`${
                errors.PostalCode ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.PostalCode && errors.PostalCode.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="mobile" className="form-field__label">
              تلفن همراه
            </label>
            <input
              type="number"
              id="mobile"
              {...register("mobile")}
              className={`${
                errors.mobile ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.mobile && errors.mobile.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-field__label">
              آدرس ایمیل (اختیاری)
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`${
                errors.email ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="w-full my-5 text-center">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150"
            >
              ثبت اطلاعات
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UPanelAddress;
