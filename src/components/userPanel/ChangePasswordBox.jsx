import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//config
import { passwordSchema } from "../../Configs/schema";

// Fn
import { customToast } from "../../utils/customToast";

function ChangePasswordBox({ userData, userInfo, queryClient, mutate }) {

  //hook-form
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: yupResolver(passwordSchema),
  });

  //Fn
  const submitHandler = (values) => {
    if (userData.password !== values.oldPassword)
      return customToast("error", "گذرواژه فعلی شما صحیح نمی باشد");
    console.log("password", values);
    const id = userInfo.id;
    const data = { password: values.newPassword };
    mutate(
      { id, data },
      {
        onSuccess: () => {
          customToast("success", "گذرواژه شما با موفقیت تغییر کرد");
          queryClient.invalidateQueries({ queryKey: ["get-userDataById"] });
          resetField("oldPassword", "");
          resetField("newPassword", "");
        },
        onError: (error) => {
          customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید");
          console.log(error);
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
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
          تغییر گذرواژه
        </button>
      </div>
    </form>
  );
}

export default ChangePasswordBox;
