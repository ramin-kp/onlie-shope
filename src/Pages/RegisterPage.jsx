import React, { useState } from "react";
import SvgIcons from "../components/SvgIcons";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../Services/auth";
import { customToast } from "../utils/customToast";
import { setCookie } from "../utils/cookie";
import { useMutation } from "@tanstack/react-query";

function RegisterPage() {
  const [inputType, setInputType] = useState(true);
  const { data, isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: userRegister,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (values) => {
    const { userName, email, phone, password } = values;
    const userData = {
      userName,
      email,
      phone,
      password,
      role: "USER",
    };

    await mutate(userData);

    if (isError) {
      customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید.");
      return;
    }
    customToast("success", "با موفقیت ثبت نام انجام شد.");
    setCookie(userData);
    navigate("/");
  };
  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <div className="p-5 mx-2 bg-gray-300 shadow-lg  rounded-lg">
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
              className="w-full ltr-text"
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
              className="w-full ltr-text"
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
              className="w-full ltr-text"
              type="number"
              {...register("phone", {
                required: {
                  value: true,
                  message: "شماره موبایل خود را وارد کنید.",
                },
                maxLength: {
                  value: 11,
                  message: "شماره موبایل شما صحصح نمی باشد.",
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
              className="grow w-full ltr-text"
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
          {isPending ? (
            <button
              type="submit"
              className=" bg-red-600/60 text-white font-danaBold rounded-lg duration-75"
              disabled
            >
              <span className="loader inline-block "></span>
            </button>
          ) : (
            <button
              type="submit"
              className="p-2 px-3 bg-primary-200 text-white font-danaBold rounded-lg hover:bg-red-700 duration-75"
            >
              ثبت نام
            </button>
          )}
          <Link
            to="/login"
            className="p-2 px-3 text-center border-2 border-blue-600 text-blue-600 hover:text-white font-danaBold rounded-lg hover:bg-blue-600 duration-75"
          >
            ورود
          </Link>
        </form>
      </div>
    </main>
  );
}

export default RegisterPage;
