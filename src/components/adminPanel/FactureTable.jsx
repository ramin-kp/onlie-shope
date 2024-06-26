import React from "react";

//components
import DataTable from "./DataTable";
import { Link } from "react-router-dom";

function FactureTable({ orderDetails, isPending }) {
  const {
    id,
    name,
    lastName,
    location,
    email,
    mobile,
    province,
    city,
    PostalCode,
    productsDetails,
    productsDetails: { selectedItems },
  } = orderDetails;

  return (
    <div className="w-full grow dark:text-white">
      <DataTable text={"فاکتور سفارش محصولات"} font={"font-morabba text-2xl"}>
        <div className="text-left">
          <Link
            to="/admin-panel/orders"
            className="px-3 py-2 bg-primary-200 hover:bg-primary-100 font-dana text-white  rounded-lg print:hidden"
          >
            بازگشت
          </Link>
        </div>
        <div className="flex items-center justify-between mx-2.5">
          <div className="childe:my-2.5 font-dana">
            <p>
              <span>شماره فاکتور:</span>
              <span>{id}</span>
            </p>
            <p>
              <span> تاریخ:</span>
              <span>1403/02/22</span>
            </p>
          </div>
          <img src="/images/logo-1.png" alt="log-img" className="w-52 my-3" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-x-2 w-full py-2  childe:px-2 font-dana text-sm border border-gray-500">
          <div className="flex items-center justify-start gap-x-2 font-dana text-sm">
            <p className="font-danaBold">نام و نام خانوادگی:</p>
            <p>{`${name} ${lastName}`}</p>
          </div>
          <div className="flex items-center justify-start gap-x-2 font-dana">
            <p className="font-danaBold text-sm"> ایمیل:</p>
            <p>{email}</p>
          </div>
          <div className="flex items-center justify-start gap-x-2 font-dana text-sm">
            <p className="font-danaBold"> شماره تماس:</p>
            <p>{mobile}</p>
          </div>
          <div className="flex items-center justify-start gap-x-2 font-dana">
            <p className="font-danaBold text-sm"> آدرس:</p>
            <p>{`${province}-${city}-${location}`}</p>
          </div>
          <div className="flex items-center justify-start gap-x-2 font-dana  text-sm">
            <p className="font-danaBold"> کد پستی:</p>
            <p>{PostalCode}</p>
          </div>
        </div>
        <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
          <thead>
            <tr className="font-danaBold">
              <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">ردیف</th>
              <th className="bg-primary-100/65 py-5 ">نام کالا</th>
              <th className="bg-primary-100/65 py-5 ">تعداد</th>
              <th className="pl-1 bg-primary-100/65 py-5">قیمت</th>
              <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                قیمت کل
              </th>
            </tr>
          </thead>
          <tbody>
            {productsDetails.selectedItems.map((product, index) => (
              <tr
                key={product.id}
                className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
              >
                <td className="rounded-r-xl">{index + 1}</td>
                <td className="flex items-center justify-start gap-x-2">
                  <img
                    src={`/images/${product.image}`}
                    alt={product.title}
                    className="w-20"
                  />
                  {product.title}
                </td>
                <td>{product.quantity}</td>
                <td>{product.price} تومان</td>
                <td className="rounded-l-xl">
                  {product.price * product.quantity} تومان
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-evenly w-full childe:py-5 px-2.5 my-5 text-base lg:text-lg text-center bg-primary-200 text-white rounded-xl">
          <div className="flex items-center justify-start gap-x-2 w-full font-danaBold">
            <p className="h-full">تعداد کل محصولات:</p>
            <span>{productsDetails.itemCounter}</span>
          </div>
          <div className="flex items-center justify-end gap-x-2 w-full font-danaBold ">
            <p>جمع کل :</p>
            <span>{productsDetails.total.toLocaleString()}</span> تومان
          </div>
        </div>
      </DataTable>
    </div>
  );
}

export default FactureTable;
