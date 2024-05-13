import React from "react";

function UPanelOrders() {
  return (
    <div className="h-screen font-dana text-zinc-900 dark:text-white">
      {/* desktop response */}
      <div className="hidden lg:flex items-center justify-between pb-5 font-danaBold border-b-2 border-gray-300 dark:border-gray-600">
        <div>سفارش</div>
        <div>تاریخ</div>
        <div>وضعیت</div>
        <div>مجموع</div>
        <div>فاکتور</div>
      </div>
      <div className="hidden lg:block divide-y divide-gray-300 dark:divide-gray-700">
        <div className="flex items-center justify-between py-5">
          <div>#45545</div>
          <div>1403/01/23</div>
          <div>پست پیشتاز</div>
          <div>60,000,000تومان برای 3 محصول</div>
          <button className="bg-primary-200 hover:bg-primary-100 text-white px-3 py-2 rounded-lg transition-colors duration-150">
            مشاهده
          </button>
        </div>
        <div className="flex items-center justify-between py-5">
          <div>#45335</div>
          <div>1403/02/03</div>
          <div>پست پیشتاز</div>
          <div>15,000,000تومان برای 1 محصول</div>
          <button className="bg-primary-200 hover:bg-primary-100 text-white px-3 py-2 rounded-lg transition-colors duration-150">
            مشاهده
          </button>
        </div>
      </div>
      {/* mobile response */}
      <div className="flex flex-col items-stretch justify-between w-full divide-y divide-gray-200 dark:divide-gray-700 text-zinc-700 dark:text-white lg:hidden">
        <div className="flex flex-col items-start justify-between py-5 childe:w-full">
          <div className="flex items-center justify-between">
            <div className="font-danaBold">سفارش</div>

            <div>#45335</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">تاریخ</div>

            <div>1403/02/03</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">وضعیت</div>

            <div>پست پیشتاز</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">مجموع</div>

            <div>15,000,000تومان برای 1 محصول</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">فاکتور</div>
            <button className=" bg-primary-200 hover:bg-primary-100 text-white px-3 py-2 rounded-lg transition-colors duration-150">
              مشاهده
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start justify-between py-5 childe:w-full">
          <div className="flex items-center justify-between">
            <div className="font-danaBold">سفارش</div>

            <div>#45335</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">تاریخ</div>

            <div>1403/02/03</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">وضعیت</div>

            <div>پست پیشتاز</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">مجموع</div>

            <div>15,000,000تومان برای 1 محصول</div>
          </div>
          <div className="flex items-center justify-between py-2 ">
            <div className="font-danaBold">فاکتور</div>
            <button className=" bg-primary-200 hover:bg-primary-100 text-white px-3 py-2 rounded-lg transition-colors duration-150">
              مشاهده
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UPanelOrders;
