import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { userRegister } from "../Services/auth";

//Fn
import { customToast } from "../utils/customToast";
import { setCookie } from "../utils/cookie";

//config
import { registerUserSchema } from "../Configs/schema";

function RegisterPage() {
  const [inputType, setInputType] = useState(true);

  //mutation
  const { mutate, isPending, isError } = useMutation({
    mutationFn: userRegister,
  });

  //navigate
  const navigate = useNavigate();

  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerUserSchema),
  });

  //Fn
  const submitHandler = (values) => {
    const { username, email, phone, password } = values;
    const userData = {
      username,
      email,
      phone,
      password,
      role: "USER",
    };

    mutate(userData, {
      onSuccess: () => {
        customToast("success", "با موفقیت ثبت نام انجام شد.");
        setCookie(userData);
        navigate("/");
      },
      onError: () =>
        customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید."),
    });
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
              {...register("username")}
              placeholder="نام کاربری"
            />
            <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
              {errors.username && errors.username.message}
            </h3>
          </div>
          <div>
            <input
              className="w-full ltr-text"
              type="email"
              {...register("email")}
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
              {...register("phone")}
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
              {...register("password")}
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
              className="p-2 px-3 bg-primary-200 text-white font-danaBold rounded-lg hover:bg-primary-100 outline-none transition-colors duration-75"
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
