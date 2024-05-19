import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

//component
import DataTable from "./../../components/adminPanel/DataTable";
import Loader from "./../../components/Loader";
import CreateProduct from "../../components/adminPanel/CreateProduct";

//services
import { getProductsData, removeProducts } from "../../Services/products";

//Fn
import { customToast } from "../../utils/customToast";

function APanelProducts() {
  //query
  const queryKey = ["products-data"];
  const { data: products, isPending } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });

  //queryClient
  const queryClient = useQueryClient();

  //mutation
  const { mutate, isPending: isRemoveCategoryLoader } = useMutation({
    mutationFn: removeProducts,
  });

  //Fn
  const removeHandler = (productId) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
        >
          <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
            آیا از حذف محصول مطمئن هستید
            <span className="mx-1 text-xl">❗</span>
          </h1>
          <div className="flex-center gap-x-5 my-2.5 text-white">
            <button
              className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
              onClick={() => {
                toast.dismiss(t.id);
                mutate(productId, {
                  onSuccess: () => {
                    customToast("success", "محصول مورد نظر با موفقیت حذف شد");
                    queryClient.invalidateQueries({
                      queryKey: ["products-data"],
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
      ),
      { duration: 5000 }
    );
  };

  //loader
  if (isPending) return <Loader />;

  return (
    <>
      {/* newProduct */}
      <CreateProduct />
      {/* Product table */}
      <DataTable text={"محصولات"}>
        <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
          <thead>
            <tr className="font-danaBold text-wrap">
              <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">آیدی</th>
              <th className="bg-primary-100/65 py-5 ">نام محصول</th>
              <th className="bg-primary-100/65 py-5 ">برند</th>
              <th className="bg-primary-100/65 py-5 ">تعداد</th>
              <th className="pl-1 bg-primary-100/65 py-5">حذف</th>
              <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                ویرایش
              </th>
            </tr>
          </thead>
          <tbody>
            {products.data.map((product, index) => (
              <tr
                key={product.id}
                className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
              >
                <td className="rounded-r-xl">{index + 1}</td>
                <td className="flex items-center justify-start gap-x-2.5">
                  <img
                    src={`/images/${product.image}`}
                    alt="product-img"
                    className="w-16 md:w-20"
                  />
                  {product.title}
                </td>
                <td>{product.brand[1]}</td>
                <td>{product.Number}</td>

                <td>
                  <button
                    className="px-3 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg transition-colors duration-150"
                    onClick={() => removeHandler(product.id)}
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
    </>
  );
}

export default APanelProducts;
