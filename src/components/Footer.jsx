import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white shadow-2xl" data-aos="fade-up">
      <div className="flex flex-wrap items-center justify-around gap-x-10 gap-y-5 px-8 py-5 container">
        <div className="grow">
          <h3 className="font-danaBold text-base xs:text-xl text-center mb-2">فروشگاه ما</h3>
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
              <Link to="/">حساب کاربری من</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">سبد خرید</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">پیگیری سفارش</Link>
            </li>
          </ul>
          <ul className="font-dana text-sm xs:text-lg">
            <h3 className="font-danaBold text-base xs:text-xl text-center mb-2">اطلاعات</h3>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">حساب کاربری من</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">سبد خرید</Link>
            </li>
            <li className="hover:text-primary-200 duration-200">
              <Link to="/">پیگیری سفارش</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="px-5 py-3 font-dana text-center text-sm xs:text-lg border-t border-gray-200">
        <span>
          ساخته شده با ❤️ توسط{" "}
          <span className="font-danaMedium text-gray-400 hover:text-primary-200 duration-200">
            <Link to="https://t.me/ramin_kp81">رامین کریم پور</Link>
          </span>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
