import React, { useState } from "react";
import SvgIcons from "../components/SvgIcons";
import { useForm } from "react-hook-form";

function LoginPage() {
  const [inputType, setInputType] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = (values) => {
    console.log(values);
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <div className="p-5 mx-2 bg-gray-200 shadow-lg  rounded-lg">
        <img
          src="/images/logo-1.png"
          alt="log-icon"
          className="w-[400px] mx-auto"
        />
        <form
          className="flex flex-col justify-center items-center gap-y-5 max-w-full childe:w-full"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div>
            <input
              className="w-full"
              type="text"
              {...register("userName", {
                required: {
                  value: true,
                  message: "نام کاربری خود را وارد کنید.",
                },
                minLength: {
                  value: 3,
                  message: "نام کاربری باید بیشتر از سه کاراکتر باشد.",
                },
                maxLength: {
                  value: 20,
                  message: "نام کاربری باید کمتر از بیست کاراکتر باشد.",
                },
                pattern: {
                  value: /^[A-z0-9\-]+$/g,
                  message: "نام کاربری وارد شده معتبر نمی‌باشد.",
                },
              })}
              placeholder="نام کاربری"
            />
            <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
              {errors.userName && errors.userName.message}
            </h3>
          </div>
          <div>
            <input
              className="w-full"
              type="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "ایمیل خود را وارد کنید.",
                },
                pattern: {
                  value: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                  message: "ایمیل وارد شده معتبر نمی‌باشد.",
                },
              })}
              placeholder="ایمیل"
            />
            <h3 className="mt-3 font-danaMedium text-sm text-red-600">
              {errors.email && errors.email.message}
            </h3>
          </div>
          <div>
            <input
              className="w-full"
              type="number"
              {...register("phone", {
                required: {
                  value: true,
                  message: "شماره موبایل خود را وارد کنید.",
                },
                pattern: {
                  value: /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
                  message: "شماره موبایل وارد شده معتبر نمی‌باشد.",
                },
              })}
              placeholder="شماره موبایل"
            />
            <h3 className="mt-3 font-danaMedium text-sm text-red-600">
              {errors.phone && errors.phone.message}
            </h3>
          </div>
          <div className="relative">
            <input
              className="grow w-full"
              type={inputType ? "password" : "text"}
              {...register("password", {
                required: {
                  value: true,
                  message: "پسورد خود را وارد کنید.",
                },
                minLength: {
                  value: 8,
                  message: "پسورد باید بیشتر از سه کاراکتر باشد.",
                },
                maxLength: {
                  value: 20,
                  message: "پسورد باید کمتر از بیست کاراکتر باشد.",
                },
                pattern: {
                  value: /^[A-z0-9\-]+$/g,
                  message: "پسورد وارد شده معتبر نمی‌باشد.",
                },
              })}
              placeholder="پسورد"
            />
            <span
              className="absolute left-0 top-1/4 inline-block px-1 bg-white cursor-pointer"
              onClick={() => setInputType((prevData) => !prevData)}
            >
              <svg className={`${inputType ? "visible" : "hidden"} w-5 h-5`}>
                <use href="#eye-slash"></use>
              </svg>
            </span>
            <span
              className="absolute left-0 top-1/4 inline-block px-1 bg-white cursor-pointer"
              onClick={() => setInputType((prevData) => !prevData)}
            >
              <svg className={`${inputType ? "hidden" : "visible"} w-5 h-5`}>
                <use href="#eye"></use>
              </svg>
            </span>
            <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
              {errors.password && errors.password.message}
            </h3>
          </div>
          <button
            type="submit"
            className="p-2 px-3 bg-red-600 text-white font-danaBold rounded-lg hover:bg-red-700 duration-75"
          >
            ثبت نام
          </button>
        </form>
      </div>
      <SvgIcons />
    </main>
  );
}

export default LoginPage;
