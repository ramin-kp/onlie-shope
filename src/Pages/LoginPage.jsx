import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { fetchUserLogin } from "../Services/auth";

//components
import Loader from "./../components/Loader";

//Fn
import { getCookie, setCookie } from "../utils/cookie";
import { authorizationUser } from "../utils/helpers";

//config
import { loginUserSchema } from "../Configs/schema";

//context
import { useUser } from "../context/UserInfoContextProvider";

function LoginPage() {
  const [inputType, setInputType] = useState(true);
  //query
  const queryKey = ["User-data"];
  const { data, isPending } = useQuery({
    queryKey,
    queryFn: fetchUserLogin,
  });

  //navigate
  const navigate = useNavigate();

  //context
  const [userInfo, setUserInfo] = useUser();

  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginUserSchema) });

  //Fn
  const submitHandler = async (values) => {
    if (!data) return;
    const res = authorizationUser(data, values);
    if (res) {
      setCookie(res);
      setUserInfo(getCookie("userData"));
      toast.success("با موفقیت  وارد شدید");
      navigate("/");
    } else {
      toast.error("نام کاربری یا  پسورد وارد شده صحیح نمی‌باشد.");
    }
  };

  if (isPending) return <Loader />;

  return (
    <main className="flex flex-col justify-center items-center h-screen ">
      <div className="p-5 mx-2 bg-gray-300 shadow-lg  rounded-lg">
        <Link to="/" className="inline-block">
          <img
            src="/images/logo-1.png"
            alt="log-icon"
            className="w-[400px] mx-auto"
          />
        </Link>
        <form
          className="flex flex-col justify-center items-center gap-y-5 max-w-full childe:w-full"
          onSubmit={handleSubmit(submitHandler)}
        >
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
          <div className="relative">
            <input
              className="grow w-full ltr-text"
              type={inputType ? "password" : "text"}
              {...register("password")}
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
