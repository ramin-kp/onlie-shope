import React from "react";
import { useForm } from "react-hook-form";

function AnswerTicketBox({ setIsShowAnswerTicketBox }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (values) => {
    const ticketData = {
      ...values,
      answer: 1,
    };
    console.log(ticketData);
  };
  return (
    <>
      <div className="fixed top-[30%] w-[500px] min-h-[250px] p-5 bg-white dark:bg-dark-100 rounded-xl z-50">
        <h3 className="font-morabba text-xl">متن پاسخ تیکت را وارد کنید</h3>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-field">
            <label htmlFor="text" className="form-field__label">
              متن تیکت
            </label>
            <textarea
              id="text"
              {...register("text")}
              className={`${
                errors.text ? "border border-primary-200" : ""
              } form-field__input p-2.5 outline-none rounded-lg`}
              rows={3}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.text && errors.text.message}
            </span>
          </div>
          <div className="flex items-center justify-start gap-x-5">
            <button
              className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg"
              onClick={() => setIsShowAnswerTicketBox((prev) => !prev)}
            >
              لغو
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg"
            >
              ارسال
            </button>
          </div>
        </form>
      </div>
      <div className="fixed inset-0 w-screen h-screen bg-zinc-800/80 z-40"></div>
    </>
  );
}

export default AnswerTicketBox;
