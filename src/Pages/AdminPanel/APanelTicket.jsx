import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

//services
import { getTicket, removeTicket } from "../../Services/Ticket";

//component
import Loader from "../../components/Loader";
import DataTable from "../../components/adminPanel/DataTable";

//Fn
import { customToast } from "../../utils/customToast";

function APanelTicket() {
  //query
  const queryKey = ["tickets-data"];
  const { data: tickets, isPending } = useQuery({
    queryKey,
    queryFn: getTicket,
  });

  console.log(tickets?.data);

  //mutation
  const { mutate: removeTicketMutate, isPending: isRemoveTicketLoader } =
    useMutation({ mutationFn: removeTicket });

  //queryClient
  const queryClient = useQueryClient();

  //Fn
  const removeHandler = (ticketId) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
      >
        <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
          آیا از حذف تیکت مطمئن هستید
          <span className="mx-1 text-xl">❗</span>
        </h1>
        <div className="flex-center gap-x-5 my-2.5 text-white">
          <button
            className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
            onClick={() => {
              toast.dismiss(t.id);
              removeTicketMutate(ticketId, {
                onSuccess: () => {
                  customToast("success", "تیکت مورد نظر با موفقیت حذف شد");
                  queryClient.invalidateQueries({
                    queryKey: ["tickets-data"],
                  });
                },
                onError: () => {
                  customToast(
                    "error",
                    "مشکلی پیش آمده لطفا دوباره امتحان کنید"
                  );
                },
              });
            }}
            disabled={isRemoveTicketLoader}
          >
            بله
          </button>
          <button
            className="px-3 py-2 bg-blue-600 hover:bg-blue-500 font-dana rounded-lg transition-colors duration-150"
            onClick={() => toast.dismiss(t.id)}
          >
            خیر
          </button>
        </div>
      </div>
    ));
  };
  //loader
  if (isPending) return <Loader />;
  return (
    <>
      {/* ticketTable */}
      <div className="w-full grow">
        <DataTable text={"تیکت‌های کاربران"}>
          {tickets.data.length ? (
            <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
              <thead>
                <tr className="font-danaBold text-wrap">
                  <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">
                    ردیف
                  </th>
                  <th className="bg-primary-100/65 py-5 "> عنوان تیکت</th>
                  <th className="pl-1 bg-primary-100/65 py-5">حذف</th>
                  <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                    پاسخ
                  </th>
                </tr>
              </thead>
              <tbody>
                {tickets.data.map((ticket, index) => (
                  <tr
                    key={ticket.id}
                    className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
                  >
                    <td className="rounded-r-xl">{index + 1}</td>
                    <td>{ticket.title}</td>

                    <td>
                      <button
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-150"
                        onClick={() => removeHandler(ticket.id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td className="rounded-l-xl">
                      {ticket.answer === 0 ? (
                        <Link
                          to={`/admin-panel/ticket/answer/${ticket.id}`}
                          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white font-dana transition-all duration-150 rounded-lg"
                        >
                          پاسخ
                        </Link>
                      ) : (
                        <button className="px-3 py-2 bg-green-600 hover:bg-green-500 text-white font-dana transition-all duration-150 rounded-lg">
                          پاسخ داده شده
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <h1 className="p-2.5 my-5 bg-primary-200 font-danaBold text-xl text-white text-center rounded-lg">
              تیکتی وجود نداد
            </h1>
          )}
        </DataTable>
      </div>
    </>
  );
}

export default APanelTicket;
