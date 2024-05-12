import React, { useEffect, useState } from "react";
import CityList from "./CityList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getCities, getProvinces } from "../Services/city";
import Loader from "./Loader";
import { useForm } from "react-hook-form";
import { customToast } from "../utils/customToast";
import { useNavigate } from "react-router-dom";
import { postOrderDetails } from "../Services/products";

function CustomerDetails({ step, setStep, data, dispatch }) {
  const [provinceText, setProvinceText] = useState("");
  const [cityText, setCityText] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const navigate = useNavigate();
  const { data: provinces, isPending: isProvinces } = useQuery({
    queryKey: ["provinces-data"],
    queryFn: getProvinces,
  });
  const { data: cities, isPending: isCities } = useQuery({
    queryKey: ["cities-data"],
    queryFn: getCities,
  });
  const { data: orderDetails, mutate } = useMutation({
    mutationFn: postOrderDetails,
    onSuccess: () => {
      setStep(0);
      dispatch({ type: "CHECKOUT" });
      navigate("/", { replace: true });
      customToast("success", "پرداخت شما با موفقیت انجام شد");
    },
    onError: () =>
      customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setCityText("");
  }, [provinceText]);

  console.log(orderDetails);

  const SubmitHandler = (value) => {
    if (!provinceText || !cityText) {
      return customToast("error", "استان و شهر خود را انتخاب کنید");
    }
    const orderData = {
      ...value,
      province: provinceText,
      city: cityText,
      productsDetails: data,
    };
    console.log(orderData);
    mutate(orderData);
  };
  if (isProvinces && isCities) return <Loader />;

  const { selectedItems, total } = data;
  return (
    <div className="">
      <div className="text-center md:text-right">
        <button
          className=" px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150"
          onClick={() => setStep((step) => step - 1)}
        >
          برگشت به سبد خرید
        </button>
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
              {...register("location", {
                required: {
                  value: true,
                  message: "لطفا آدرس خود را وارد کنید",
                },
                minLength: {
                  value: 10,
                  message: "لطفا آدرس خود را به درستی وارد کنید",
                },
              })}
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
              {...register("PostalCode", {
                required: {
                  value: true,
                  message: "لطفا کد پستی خود را وارد کنید",
                },
                pattern: {
                  value: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
                  message: "لطفا کد پستی خود را به درستی وارد کنید",
                },
              })}
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
              {...register("mobile", {
                required: {
                  value: true,
                  message: "لطفا تلفن همراه خود را وارد کنید",
                },
                pattern: {
                  value: /^09\d{9}$/,
                  message: "لطفا تلفن همراه خود را به درستی وارد کنید",
                },
              })}
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
              {...register("email", {
                required: {
                  value: true,
                  message: "لطفا آدرس ایمیل خود را وارد کنید",
                },
                pattern: {
                  value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "لطفا آدرس ایمیل خود را به درستی وارد کنید",
                },
              })}
              className={`${
                errors.email ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.email && errors.email.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="description" className="form-field__label">
              توضیخات سفارش(اختیاری)
            </label>
            <textarea
              id="description"
              {...register("description", {})}
              className="form-field__input p-2.5 outline-none rounded-lg"
              rows={5}
            />
          </div>
        </div>
        {/* product Details */}
        <div className="grow w-full md:w-1/2 p-5 mt-5 bg-gray-100/50 dark:bg-dark-200 rounded ">
          <div className="text-center">
            <h1 className="font-danaBold text-xl">سفارشات شما</h1>
            <p className="font-dana text-lg">جزئیات لیست سفارشات شما</p>
          </div>
          <div className="">
            <div className="flex items-center justify-between pb-5 font-danaMedium text-lg border-b-2 border-gray-300">
              <p>محصول</p>
              <p>جمع جزء</p>
            </div>
            <div className="divide-y divide-gray-200">
              {selectedItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-x-5 py-5"
                >
                  <p className="text-sm text-right">
                    {product.title} *{" "}
                    <span className="ltr-text">{product.quantity}</span>
                  </p>
                  <p className="text-sm text-gray-700/60 dark:text-gray-400 text-left md:text-center">
                    {(product.price * product.quantity).toLocaleString()} تومان
                  </p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between py-5 font-danaMedium text-lg border-t border-gray-300">
              <p>جمع جزء</p>
              <p className="text-primary-200">{total.toLocaleString()} تومان</p>
            </div>
            <div className=" pt-5 border-t border-gray-300">
              <div className="flex items-center justify-between font-danaMedium text-lg ">
                <p>حمل و نقل</p>
                <p className="text-primary-200">
                  {total > 500000 ? "رایگان" : "200000 تومان"}
                </p>
              </div>
              <span className="text-primary-200 dark:text-primary-200 text-base font-dana">
                بالای 500,000 تومان ارسال رایگان
              </span>
            </div>
            <div className="flex items-center justify-between py-5 font-danaBold text-lg border-t border-gray-300">
              <p>مجموع</p>
              <p className="text-primary-200">
                {total > 500000
                  ? total.toLocaleString()
                  : (total + 200000).toLocaleString()}{" "}
                تومان
              </p>
            </div>
            <div className="flex items-center justify-start gap-x-2 font-dana">
              <input type="radio" name="zarin" id="zarin" />
              <span>پرداخت با زرین‌پال</span>
              <img src="/images/zarin.png" className="w-10" alt="zarin-img" />
            </div>
            <div className="flex items-center justify-start gap-x-2 my-2.5 font-dana">
              <input type="radio" name="zarin" id="zarin" />
              <span>پرداخت با بانک ملت</span>
              <img src="/images/melat.png" className="w-10" alt="melat-img" />
            </div>
          </div>
          <div className="w-full my-5 text-center">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150"
            >
              ثبت سفارش
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CustomerDetails;
