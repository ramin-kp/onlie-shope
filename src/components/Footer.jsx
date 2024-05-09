import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className=" bg-white dark:bg-dark-100 shadow-2xl text-zinc-900 dark:text-white"
      data-aos="fade-up"
    >
      <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-5 px-8 py-5 container">
        <div className="grow">
          <h3 className="font-danaBold text-base xs:text-xl text-center mb-2">
            فروشگاه ما
          </h3>
          <p className="font-dana text-sm xs:text-lg text-center">
            آذربایجان شرقی -بناب-خیابان امام-فروشگاه پارس خزر
          </p>
        </div>
        <div className="flex md:grow items-center justify-between gap-x-20 md:gap-x-5">
          <ul className="font-dana text-sm xs:text-lg">
            <h3 className="font-danaBold text-base xs:text-xl text-center mb-2">
              دسترسی سریع
            </h3>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/user-dashboard">حساب کاربری من</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/orders">سبد خرید</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">پیگیری سفارش</Link>
            </li>
          </ul>
          <ul className="font-dana text-sm xs:text-lg">
            <h3 className="font-danaBold text-base xs:text-xl text-center mb-2">
              اطلاعات
            </h3>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/contact-us">تماس با ما</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/products">محصولات</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-5 py-3 font-dana text-center text-sm xs:text-lg border-t border-gray-200 dark:border-gray-700">
        <span>
          ساخته شده با ❤️ توسط{" "}
          <span className="font-danaMedium text-gray-400 hover:text-primary-200 duration-200">
            <Link
              to="https://takl.ink/ramin_kp"
              target="_blank"
              className="underline underline-offset-[5px]"
            >
              رامین کریم پور
            </Link>
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
