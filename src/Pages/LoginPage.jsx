import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import SvgIcons from "../components/SvgIcons";
import { authorizationUser, fetchUserLogin } from "../Services/auth";
import { setCookie } from "../utils/cookie";
import { useQuery } from "@tanstack/react-query";

function LoginPage() {
  const [inputType, setInputType] = useState(true);
  const { data, isPending } = useQuery({
    queryKey: ["User-data"],
    queryFn: fetchUserLogin,
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = async (values) => {
    if (!data) return;
    const res = authorizationUser(data, values);
    if (res) {
      toast.success("با موفقیت  وارد شدید");
      setCookie(res);
      navigate("/");
    } else {
      toast.error("نام کاربری یا  پسورد وارد شده صحیح نمی‌باشد.");
    }
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
          <div className="relative">
            <input
              className="grow w-full ltr-text"
              type={inputType ? "password" : "text"}
              {...register("password", {
                required: {
                  value: true,
                  message: "پسورد خود را وارد کنید.",
                },
              })}
              placeholder="پسورد"
            />
            <span
              className="absolute left-0 top-1/4  px-1  cursor-pointer"
              onClick={() => setInputType((prevData) => !prevData)}
            >
              <svg className={`${inputType ? "visible" : "hidden"} w-5 h-5`}>
                <use href="#eye-slash"></use>
              </svg>
            </span>
            <span
              className="absolute left-0 top-1/4  px-1  cursor-pointer"
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
            className="p-2 px-3 bg-primary-200 text-white font-danaBold rounded-lg hover:bg-red-700 duration-75"
          >
            ورود
          </button>
          <Link
            to="/register"
            className="p-2 px-3 text-center border-2 border-blue-600 text-blue-600 hover:text-white font-danaBold rounded-lg hover:bg-blue-600 duration-75"
          >
            ثبت نام
          </Link>
        </form>
      </div>
    </main>
  );
}

export default LoginPage;
