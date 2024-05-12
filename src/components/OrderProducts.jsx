import React, { useEffect } from "react";
import OrderTable from "./OrderTable";

function OrderProducts({ data, step, setStep, dispatch }) {
  const { selectedItems, total, itemCounter, checkout } = data;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);
  return (
    <section className="flex flex-col lg:flex-row items-start justify-between gap-x-10">
      <>
        {/* products map */}
        <OrderTable products={selectedItems} dispatch={dispatch} />
        {/* total price */}
        <div className="w-full lg:w-1/3 p-5 border-[5px] font-dana border-gray-300 dark:border-gray-600 rounded">
          <h1 className="py-2 font-danaBold text-primary-200 text-xl">
            جمع کل سبد خرید
          </h1>
          <div className="divide-y dark:divide-gray-600 space-y-5 childe:pt-5">
            <div className="flex items-center justify-between">
              <span>جمع جزء</span>
              <span className="text-gray-500">
                {total.toLocaleString()} تومان
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>جمع کل محصولات</span>
              <span className="text-primary-200">{itemCounter}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>حمل و نقل</span>
              <span className="text-primary-200">100,000 تومان</span>
            </div>

            <div className="flex items-center justify-between">
              <span>هزینه بیمه</span>
              <span className="text-primary-200">100,000 تومان</span>
            </div>
            <div className="flex items-center justify-between font-danaBold">
              <h2>مجموع</h2>
              <span className="text-primary-200">
                {(total + 200000).toLocaleString()} تومان
              </span>
            </div>
          </div>
          <div className="flex-center w-full">
            <button
              className="inline-block px-3 py-2 mt-5 mx-auto bg-primary-200 hover:bg-primary-100 font-danaMedium text-white rounded-lg outline-none  duration-150"
              onClick={() => setStep((step) => (step < 3 ? step + 1 : step))}
            >
              ادامه جهت تسویه حساب
            </button>
          </div>
        </div>
      </>
    </section>
  );
}

export default OrderProducts;
