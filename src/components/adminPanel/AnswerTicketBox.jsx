import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { answerTicketData, removeTicket } from "../../Services/Ticket";
import { customToast } from "../../utils/customToast";

function AnswerTicketBox({
  setIsShowAnswerTicketBox,
  ticketAnswerData,
  queryClient,
}) {
  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: answerTicketData });

  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Fn
  const submitHandler = (values) => {
    const id = ticketAnswerData.id;
    const newTicketData = {
      answer: 1,
      title: ticketAnswerData.title,
      ticketData: [
        ...ticketAnswerData.ticketData,
        { text: values.text, role: "ADMIN" },
      ],
    };
    console.log("new =>", { ...newTicketData }, id);
    mutate(
      { id, newTicketData },
      {
        onSuccess: () => {
          customToast("success", "پاسخ تیکت شما با موفقیت ارسال شد.");
          queryClient.invalidateQueries({ queryKey: ["tickets-data"] });
          setIsShowAnswerTicketBox((prev) => !prev);
        },
        onError: () =>
          customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
      }
    );
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
              disabled={isPending}
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
