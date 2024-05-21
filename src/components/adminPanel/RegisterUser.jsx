import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { userRegister } from "../../Services/auth";

//Fn
import { customToast } from "../../utils/customToast";

//config
import { aPanelUserSchema } from "../../Configs/schema";

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
    resolver: yupResolver(aPanelUserSchema),
  });

  //queryClient
  const queryClient = useQueryClient();

  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: userRegister });

  //Fn
  const submitHandler = (values) => {
    mutate(values, {
      onSuccess: () => {
        customToast("success", "کاربر مورد نظر با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["getAllUsers"] });
        resetField("username");
        resetField("email");
        resetField("phone");
        resetField("password");
        resetField("role");
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
            {...register("username")}
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
            {...register("email")}
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
            {...register("phone")}
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
            {...register("password")}
            placeholder="پسورد"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.password && errors.password.message}
          </h3>
        </div>
        <div>
          <select
            className="w-full py-2.5 px-2 dark:bg-dark-100 font-dana rounded outline-none"
            {...register("role")}
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
