import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//config
import { userInfoSchema } from "../../Configs/schema";

function UPanelUserInfo() {
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      mobile: "",
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(userInfoSchema),
  });

  const submitHandler = (values) => {
    resetField("name");
    resetField("lastName");
    resetField("email");
    resetField("mobile");
    resetField("oldPassword");
    resetField("newPassword");
  };
  return (
    <div className="text-zinc-900 dark:text-white">
      <h1 className="my-5 pb-5 font-danaBold text-2xl text-zinc-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
        جزییات حساب کاربری
      </h1>

      <form
        className="w-full lg:w-1/2 mx-auto"
        onSubmit={handleSubmit(submitHandler)}
      >
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
          <label htmlFor="email" className="form-field__label">
            ایمیل
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
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
          <label htmlFor="oldPassword" className="form-field__label">
            رمز عبور فعلی
          </label>
          <input
            type="password"
            id="oldPassword"
            {...register("oldPassword")}
            className={`${
              errors.oldPassword ? "border border-primary-200" : ""
            } form-field__input`}
          />
          <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
            {errors.oldPassword && errors.oldPassword.message}
          </span>
        </div>
        <div className="form-field">
          <label htmlFor="newPassword" className="form-field__label">
            رمز عبور جدید
          </label>
          <input
            type="password"
            id="newPassword"
            {...register("newPassword")}
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
