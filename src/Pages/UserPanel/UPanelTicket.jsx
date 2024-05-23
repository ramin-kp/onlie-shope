import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { sendTicket } from "../../Services/Ticket";

//config
import { ticketSchema } from "../../Configs/schema";

//Fn
import { customToast } from "../../utils/customToast";

function UPanelTicket() {
  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: sendTicket });
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      text: "",
    },
    resolver: yupResolver(ticketSchema),
  });

  //Fn
  const SubmitHandler = (values) => {
    const ticketData = {
      answer: 0,
      title: values.title,
      ticketData: [{ text: values.text, role: "USER" }],
    };
    mutate(ticketData, {
      onSuccess: () => {
        customToast(
          "success",
          "تیکت شما با موفقیت ارسال شد بعد برسی مدیران پاسخ داده می‌شود."
        ),
          resetField("title");
        resetField("text");
      },
      onError: () =>
        customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
    });
  };

  return (
    <div className="text-zinc-900 dark:text-white">
      <h1 className="my-5 pb-5 font-danaBold text-2xl text-zinc-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">ارسال تیکت</h1>
      <form
        className="flex flex-col md:flex-row items-start justify-between gap-x-5 w-full p-5"
        onSubmit={handleSubmit(SubmitHandler)}
      >
        {/* customer Details */}
        <div className="grow w-full md:w-1/2 text-zinc-900 dark:text-white">
          <div className="form-field">
            <label htmlFor="title" className="form-field__label">
              عنوان تیکت
            </label>
            <input
              type="text"
              id="title"
              {...register("title")}
              className={`${
                errors.title ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.title && errors.title.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="text" className="form-field__label">
              متن
            </label>
            <textarea
              type="text"
              id="text"
              {...register("text")}
              className={`${
                errors.text ? "border border-primary-200" : ""
              } form-field__input p-2.5 outline-none rounded-lg`}
              rows={5}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.text && errors.text.message}
            </span>
          </div>
          <div className="w-full my-5 text-center">
            {isPending ? (
              <button
                type="submit"
                className="w-full px-3 py-2 bg-gray-300 text-white font-danaBold rounded-lg transition-colors duration-150"
                disabled
              >
                <span className="loader"></span>
              </button>
            ) : (
              <button
                type="submit"
                className="w-full px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150"
              >
                ثبت اطلاعات
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default UPanelTicket;
