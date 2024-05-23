import React from "react";
import { Link } from "react-router-dom";

function UPaneIndex() {
  return (
    <div className="h-screen">
      <p className="my-5 font-dana text-xl text-zinc-900 dark:text-white">
        از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را مشاهده،
        آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب کاربری و کلمه
        عبور خود را ویرایش کنید.
      </p>
      <p className="my-5 font-dana text-xl text-zinc-900 dark:text-white">
        برای پیگیری و موجودی کالا ها با ما در{" "}
        <span className="text-primary-200 font-danaBold">
          <Link to="/contact-us">تماس</Link>
        </span>{" "}
        باشید
      </p>
    </div>
  );
}

export default UPaneIndex;
