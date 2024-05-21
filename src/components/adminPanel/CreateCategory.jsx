import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

//services
import { createCategoryProducts } from "../../Services/category";

//Fn
import { customToast } from "../../utils/customToast";
import { yupResolver } from "@hookform/resolvers/yup";

//config
import { categorySchema } from "../../Configs/schema";

function CreateCategory({ queryClient }) {
  const { mutate, isPending } = useMutation({
    mutationFn: createCategoryProducts,
  });

  //hook-form
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      value: "",
    },
    resolver: yupResolver(categorySchema),
  });

  //Fn
  const submitHandler = (values) => {
    mutate(values, {
      onSuccess: () => {
        customToast("success", "دسته‌بندی مورد نظر با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["categoryProducts-data"] });
        resetField("title");
        resetField("value");
      },
      onError: () => {
        customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید");
      },
    });
  };
  return (
    <div className="pb-10 border-b border-gray-300 dark:border-gray-700">
      <h1 className="my-5 mx-2 font-danaBold text-zinc-900 dark:text-white text-xl">
        افزودن دسته‌بندی جدید
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-y-5 childe:w-full text-zinc-900 dark:text-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="text"
            {...register("title")}
            placeholder="دسته‌بندی"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.title && errors.title.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full ltr-text dark:bg-dark-100"
            type="text"
            {...register("value")}
            placeholder=" ولیو به انگلیسی"
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

export default CreateCategory;
