import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { userRegister } from "../../Services/auth";
import { customToast } from "../../utils/customToast";

function RegisterUser() {
  //hook-form
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      role: "USER",
    },
  });

  //queryClient
  const queryClient = useQueryClient();

  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: userRegister });
  const submitHandler = (values) => {
    resetField("username");
    resetField("email");
    resetField("phone");
    resetField("password");
    resetField("role");
    mutate(values, {
      onSuccess: () => {
        customToast("success", "کاربر مورد نظر با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
      },
      onError: () => customToast("error", "مشکلی پیش آمده دوباره امتحان کنید"),
    });
  };

  return (
    <div>
      <h1 className="mb-5 font-danaBold text-zinc-900 dark:text-white text-xl">
        ثبت نام کاربر جدید
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-y-5 childe:w-full text-zinc-900 dark:text-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="text"
            {...register("username", {
              required: {
                value: true,
                message: "نام کاربری را وارد کنید.",
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
            {errors.username && errors.username.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="email"
            {...register("email", {
              required: {
                value: true,
                message: "ایمیل را وارد کنید.",
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
            className="w-full ltr-text dark:bg-dark-100"
            type="number"
            {...register("phone", {
              required: {
                value: true,
                message: "شماره موبایل را وارد کنید.",
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
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="password"
            {...register("password", {
              required: {
                value: true,
                message: "پسورد را وارد کنید.",
              },
              minLength: {
                value: 8,
                message: "پسورد باید بیشتر از هشت کاراکتر باشد.",
              },
              maxLength: {
                value: 20,
                message: "پسورد باید کمتر از بیست کاراکتر باشد.",
              },
            })}
            placeholder="پسورد"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.password && errors.password.message}
          </h3>
        </div>
        <div>
          <select
            className="w-full py-2.5 px-2 dark:bg-dark-100 font-dana rounded outline-none"
            {...register("role", {
              required: {
                value: true,
                message: "نقش کاربر را انتخاب کنید",
              },
            })}
          >
            <option disabled>نقش کاربر را انتخاب کنید</option>
            <option value="USER">کاربر</option>
            <option value="ADMIN">مدیر</option>
          </select>
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.role && errors.role.message}
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
      </form>
    </div>
  );
}

export default RegisterUser;
