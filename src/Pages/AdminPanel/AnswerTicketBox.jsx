import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

//services
import { answerTicketData, getTicketById } from "../../Services/Ticket";

//Fn
import { customToast } from "../../utils/customToast";

//component
import Loader from "../../components/Loader";

function AnswerTicketBox() {
  //params
  const { id } = useParams();
  console.log(id);
  //query
  const queryKey = ["tickets-data", id];
  const { data: tickets, isPending: isTicketLoader } = useQuery({
    queryKey,
    queryFn: () => getTicketById(id),
  });
  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: answerTicketData });
  //queryClient
  const queryClient = useQueryClient();

  //hook-form
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { text: "" } });

  //Fn
  const submitHandler = (values) => {
    const { title, ticketData } = tickets?.data;
    const newTicketData = {
      answer: 1,
      title,
      ticketData: [...ticketData, { text: values.text, role: "ADMIN" }],
    };
    mutate(
      { id, newTicketData },
      {
        onSuccess: () => {
          customToast("success", "پاسخ تیکت شما با موفقیت ارسال شد.");
          queryClient.invalidateQueries({ queryKey: ["tickets-data"] });
          resetField("text");
        },
        onError: () =>
          customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
      }
    );
  };
  if (isTicketLoader) return <Loader />;
  console.log(tickets?.data);
  return (
    <div className="p-5 m-2.5 bg-white dark:bg-dark-100 dark:text-white rounded-xl z-50">
      <h2 className="font-danaMedium text-xl my-3.5">متن تیکت کاربر</h2>
      <div className="flex flex-col items-start justify-center">
        {tickets.data?.ticketData.map((ticket, index) => (
          <p
            key={index}
            className="inline-block w-auto my-2 p-2.5 bg-gray-300 whitespace-pre-wrap dark:bg-dark-200 border border-gray-300 dark:border-gray-700  rounded-lg"
          >
            {ticket.text}
          </p>
        ))}
      </div>
      <form onSubmit={handleSubmit(submitHandler)}>
        <h3 className="font-morabba text-xl">متن پاسخ تیکت را وارد کنید</h3>
        <div className="form-field">
          <label htmlFor="text" className="form-field__label">
            پاسخ متن تیکت
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
        <Link
        to="/admin-panel/ticket"
            className="px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white rounded-lg"
          >
            بازگشت
          </Link>
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
  );
}

export default AnswerTicketBox;
