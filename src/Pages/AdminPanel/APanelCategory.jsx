import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

//services
import {
  getCategoryProducts,
  removeCategoryProducts,
} from "../../Services/category";

//components
import Loader from "../../components/Loader";
import DataTable from "../../components/adminPanel/DataTable";
import CreateCategory from "../../components/adminPanel/CreateCategory";

//Fn
import { customToast } from "../../utils/customToast";
import { toast } from "react-hot-toast";

function APanelCategory() {
  //queryClient
  const queryClient = useQueryClient();

  //query
  const queryKey = ["categoryProducts-data"];
  const { data: categoryProducts, isPending } = useQuery({
    queryKey,
    queryFn: getCategoryProducts,
  });

  //mutate
  const { mutate, isPending: isRemoveCategoryLoader } = useMutation({
    mutationFn: removeCategoryProducts,
  });

  //Fn
  const removeHandler = (categoryId) => {
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
      >
        <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
          آیا از حذف دسته‌بندی مطمئن هستید
          <span className="mx-1 text-xl">❗</span>
        </h1>
        <div className="flex-center gap-x-5 my-2.5 text-white">
          <button
            className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
            onClick={() => {
              toast.dismiss(t.id);
              mutate(categoryId, {
                onSuccess: () => {
                  customToast("success", "دسته‌بندی مورد نظر با موفقیت حذف شد");
                  queryClient.invalidateQueries({
                    queryKey: ["categoryProducts-data"],
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
            disabled={isRemoveCategoryLoader}
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
      <CreateCategory queryClient={queryClient} />
      <div className="w-full grow">
        <DataTable text={"دسته‌بندی محصولات"}>
          <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
            <thead>
              <tr className="font-danaBold text-wrap">
                <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">
                  ردیف
                </th>
                <th className="bg-primary-100/65 py-5 ">نام دسته‌بندی</th>
                <th className="bg-primary-100/65 py-5 ">ولیو</th>
                <th className="pl-1 bg-primary-100/65 py-5">حذف</th>
                <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                  ویرایش
                </th>
              </tr>
            </thead>
            <tbody>
              {categoryProducts.data.map((category, index) => (
                <tr
                  key={category.id}
                  className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
                >
                  <td className="rounded-r-xl">{index + 1}</td>
                  <td>{category.title}</td>
                  <td>{category.value}</td>
                  <td>
                    <button
                      className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-150"
                      onClick={() => removeHandler(category.id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td className="rounded-l-xl">
                    <button
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors duration-150"
                      // onClick={() => removeHandler(category.id)}
                    >
                      ویرایش
                    </button>
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

export default APanelCategory;
