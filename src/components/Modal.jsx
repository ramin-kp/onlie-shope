import React from "react";
import { Link } from "react-router-dom";

function Modal() {
  return (
    <div className="flex-center h-screen mx-10">
      <div className="flex-center flex-col bg-gray-300 dark:bg-dark-100 px-5 py-10 space-y-5 rounded-lg">
        <img src="/images/logo-1.png" alt="log-img" className="max-w-[250px]" />
        <span className="inline-block :dark:text-dark-200 loader"></span>
        <span className="pt-10 text-zinc-900 dark:text-white text-sm xs:text-xl text-center">
          ساخته شده با ❤️ توسط{" "}
          <span className="font-danaMedium text-gray-400 text-sm xs:text-xl hover:text-primary-200 duration-200">
            <Link to="https://takl.ink/ramin_kp" target="_blank">
              رامین کریم پور
            </Link>
          </span>
        </span>
      </div>
    </div>
  );
}

export default Modal;
