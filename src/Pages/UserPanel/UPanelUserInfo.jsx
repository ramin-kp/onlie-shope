import React from "react";
import { useForm } from "react-hook-form";

function UPanelUserInfo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div>
      <h1 className="my-5 pb-5 font-danaBold text-2xl text-zinc-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
        جزییات حساب کاربری
      </h1>
      <form className="w-full lg:w-1/2 mx-auto">
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
          <label htmlFor="oldPassword" className="form-field__label">
            رمز عبور فعلی
          </label>
          <input
            type="password"
            id="oldPassword"
            {...register("oldPassword", {
              required: {
                value: true,
                message: "پسورد فعلی خود را وارد کنید.",
              },
            })}
            className={`${
              errors.odlPassword ? "border border-primary-200" : ""
            } form-field__input`}
          />
          <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
            {errors.odlPassword && errors.odlPassword.message}
          </span>
        </div>
        <div className="form-field">
          <label htmlFor="newPassword" className="form-field__label">
            رمز عبور جدید
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword", {
              required: {
                value: true,
                message: "پسورد جدید خود را وارد کنید.",
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
            className={`${
              errors.newPassword ? "border border-primary-200" : ""
            } form-field__input`}
          />
          <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
            {errors.newPassword && errors.newPassword.message}
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
      </form>
    </div>
  );
}

export default UPanelUserInfo;
