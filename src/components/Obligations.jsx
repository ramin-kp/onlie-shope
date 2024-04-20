import React from "react";
import SvgIcons from "./SvgIcons";

function Obligations() {
  return (
    <section
      className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-10 xs:gap-5 my-20 text-zinc-900 dark:text-white"
      data-aos="fade-up"
    >
      <div className="flex flex-col xl:flex-row items-center justify-center gap-x-5 mb-auto">
        <div className="flex-center w-16 h-16 mb-2 xl:mb-auto rounded-full border border-gray-400 dark:border-white">
          <svg className="w-7 h-7">
            <use href="#truck"></use>
          </svg>
        </div>
        <div className="flex flex-col items-center xl:items-start justify-center gap-y-2">
          <span className="font-danaBold text-lg xl:text-xl">ارسال رایگان</span>
          <span className="font-dana text-sm lg:text-base text-center">
            رسال رایگان سفارشات بالای 1 م.ت
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-x-5 mb-auto">
        <div className="flex-center w-16 h-16 mb-2 xl:mb-auto rounded-full border border-gray-400 dark:border-white">
          <svg className="w-7 h-7">
            <use href="#currency-dollar"></use>
          </svg>
        </div>
        <div className="flex flex-col items-center xl:items-start justify-center gap-y-2">
          <span className="font-danaBold text-lg xl:text-xl">
            تضمین بازگشت وجه
          </span>
          <span className="font-dana text-sm lg:text-base text-center">
            ضمانت بازگشت وجه تا 30 روز
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-x-5 mb-auto">
        <div className="flex-center w-16 h-16 mb-2 xl:mb-auto rounded-full border border-gray-400 dark:border-white">
          <svg className="w-7 h-7">
            <use href="#phone"></use>
          </svg>
        </div>
        <div className="flex flex-col items-center xl:items-start justify-center gap-y-2">
          <span className="font-danaBold text-lg xl:text-xl">
            پشتیبانی آنلاین
          </span>
          <span className="font-dana text-sm lg:text-base text-center">
            پشتیبانی دوستانه 24/7
          </span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-center gap-x-5 mb-auto">
        <div className="flex-center w-16 h-16 mb-2 xl:mb-auto rounded-full border border-gray-400 dark:border-white">
          <svg className="w-7 h-7">
            <use href="#credit-card"></use>
          </svg>
        </div>
        <div className="flex flex-col items-center xl:items-start justify-center gap-y-2">
          <span className="font-danaBold text-lg xl:text-xl">پرداخت امن</span>
          <span className="font-dana text-sm lg:text-base text-center">
            پرداخت با تمامی کارت های بانکی
          </span>
        </div>
      </div>
    </section>
  );
}

export default Obligations;
