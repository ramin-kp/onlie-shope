import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

//services
import { createCategory } from "../../Services/category";
import { customToast } from "../../utils/customToast";

function CreateBrand({queryClient}) {
  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: createCategory });

  //hook-form
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      value: "",
    },
  });
  const submitHandler = (values) => {
    resetField("title");
    resetField("value");
    mutate(values, {
      onSuccess: () => {
        customToast("success", "برند محصول مورد نظر با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["category-data"] });
      },
      onError: () => customToast("error", "مشکلی پیش آمده دوباره امتحان کنید"),
    });
  };
  return (
    <div className="pb-10 border-b border-gray-300 dark:border-gray-700">
      <h1 className="my-5 mx-2 font-danaBold text-zinc-900 dark:text-white text-xl">
        افزودن برند جدید
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-y-5 childe:w-full text-zinc-900 dark:text-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="text"
            {...register("title", {
              required: {
                value: true,
                message: "نام برند محصول را وارد کنید.",
              },
            })}
            placeholder="برند محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.title && errors.title.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="text"
            {...register("value", {
              required: {
                value: true,
                message: "لینک را وارد کنید.",
              },
            })}
            placeholder=" لینک به انگلیسی"
          />
          <h3 className="mt-3 font-danaMedium text-sm text-red-600">
            {errors.value && errors.value.message}
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
            افزودن
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateBrand;
