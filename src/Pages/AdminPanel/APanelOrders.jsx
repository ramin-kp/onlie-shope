import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

//components
import Loader from "../../components/Loader";
import DataTable from "../../components/adminPanel/DataTable";

//services
import {
  changeStatusOrder,
  getOrders,
  removeOrder,
} from "../../Services/orders";

//Fn
import { customToast } from "../../utils/customToast";
import { Link } from "react-router-dom";

function APanelOrders() {
  //query
  const queryKey = ["get-orders"];
  const { data: orders, isPending } = useQuery({
    queryKey,
    queryFn: getOrders,
  });

  //queryClient
  const queryClient = useQueryClient();

  //mutation
  const { mutate, isChangeStatusLoader } = useMutation({
    mutationFn: changeStatusOrder,
  });
  const { mutate: removeOrderMutate, isRemoveOrderLoader } = useMutation({
    mutationFn: removeOrder,
  });

  //Fn
  const clickHandler = (orderId, orderData) => {
    const newOrder = {
      ...orderData,
      status: 1,
    };
    //mutate
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
      >
        <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
          آیا از تغییر وضعیت سفارش مطمئن هستید
          <span className="mx-1 text-xl">❗</span>
        </h1>
        <div className="flex-center gap-x-5 my-2.5 text-white">
          <button
            className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
            onClick={() => {
              toast.dismiss(t.id);
              mutate(
                { orderId, newOrder },
                {
                  onSuccess: () => {
                    customToast(
                      "success",
                      "وضعیت سفارش مورد نظر با موفقیت تغییر کرد"
                    );
                    queryClient.invalidateQueries({
                      queryKey: ["get-orders"],
                    });
                  },
                  onError: () => {
                    customToast(
                      "error",
                      "مشکلی پیش آمده لطفا دوباره امتحان کنید"
                    );
                  },
                }
              );
            }}
            disabled={isChangeStatusLoader}
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
  const removeHandler = (orderId) => {
    //mutate
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
      >
        <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
          آیا از سفارش مطمئن هستید
          <span className="mx-1 text-xl">❗</span>
        </h1>
        <div className="flex-center gap-x-5 my-2.5 text-white">
          <button
            className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
            onClick={() => {
              toast.dismiss(t.id);
              removeOrderMutate(orderId, {
                onSuccess: () => {
                  customToast("success", " سفارش مورد نظر با موفقیت خذف شد");
                  queryClient.invalidateQueries({
                    queryKey: ["get-orders"],
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
            disabled={isChangeStatusLoader}
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

  if (isPending) return <Loader />;
  return (
    <>
      <div className="w-full grow overflow-x-auto">
        <DataTable text={"سفارش‌ها"}>
          <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
            <thead>
              <tr className="font-danaBold text-wrap">
                <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">
                  ردیف
                </th>
                <th className="bg-primary-100/65 py-5 ">نام مشتری</th>
                <th className="bg-primary-100/65 py-5 ">ایمیل</th>
                <th className="bg-primary-100/65 py-5 ">موبایل</th>
                <th className="bg-primary-100/65 py-5 ">آدرس</th>
                <th className="bg-primary-100/65 py-5 ">مبلغ سفارش</th>
                <th className="pl-1 bg-primary-100/65 py-5">حذف</th>
                <th className="pl-1 bg-primary-100/65 py-5">مشاهده سفارس</th>
                <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                  وضعیت سفارس
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.data
                .slice()
                .reverse()
                .map((order, index) => (
                  <tr
                    key={order.id}
                    className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
                  >
                    <td className="rounded-r-xl">{index + 1}</td>
                    <td>{`${order.name} ${order.lastName}`}</td>
                    <td>{order.email}</td>
                    <td>{order.mobile}</td>
                    <td>{order.location}</td>
                    <td>{`${order?.productsDetails.total.toLocaleString()} تومان`}</td>
                    <td>
                      <button
                        className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-150"
                        onClick={() => removeHandler(order.id)}
                      >
                        حذف
                      </button>
                    </td>
                    <td>
                      <Link
                        to={`${order.id}`}
                        className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-150"
                      >
                        مشاهده
                      </Link>
                    </td>
                    <td className="px-2 rounded-l-xl">
                      {order?.status === 1 ? (
                        <span className="inline-block px-1 py-2 bg-green-600 text-white rounded-lg transition-colors duration-150">
                          سفارش ارسال شده
                        </span>
                      ) : (
                        <button
                          className="px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white rounded-lg transition-colors duration-150"
                          onClick={() => clickHandler(order.id, order)}
                        >
                          تأیید سفارش
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </>
  );
}

export default APanelOrders;
