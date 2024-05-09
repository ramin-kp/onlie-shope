import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ContactUs() {
  return (
    <>
      <Header />
      <main className="container p-10 my-10 bg-white dark:bg-dark-100 text-zinc-900 dark:text-white font-dana text-xl leading-10 rounded-2xl">
        <div>
          <h1 className="py-5 font-morabba text-4xl border-b border-gray-300 dark:border-gray-200">
            فروشگاه لوازم خانگی فرخی
          </h1>
          <h2 className="font-morabba text-2xl pt-5">
            اولین و معتبرترین فروشگاه لوازم خانگی در بناب
          </h2>
        </div>

        <section className="py-5">
          <h2 className="font-morabba text-2xl py-3">درباره ما</h2>
          <p>
            با سلام و احترام، ما در <strong>فروشگاه لوازم خانگی فرخی</strong> با
            سابقه‌ای درخشان در زمینه فروش انواع لوازم خانگی، مفتخریم که به عنوان{" "}
            <strong>اولین و معتبرترین فروشگاه لوازم خانگی در بناب</strong>، در
            خدمت شما عزیزان باشیم.
          </p>

          <p>
            در <strong>فروشگاه فرخی</strong>، شما می‌توانید{" "}
            <strong>گسترده‌ترین و به‌روزترین</strong> مجموعه لوازم خانگی را با
            <strong> برندهای معتبر ایرانی وخارجی</strong>، از جمله:
          </p>

          <ul className="list-disc marker:text-primary-200">
            <li>سامسونگ، ال‌جی، اسنوا، امرسان، پارس خزر، جی پلاس، و...</li>
          </ul>

          <p>
            در <strong>دسته‌بندی‌های مختلف</strong>، از جمله:
          </p>

          <ul className="list-disc marker:text-primary-200">
            <li>
              لوازم آشپزخانه: یخچال فریزر، اجاق گاز، هود، ماشین ظرفشویی،
              مایکروفر، قهوه‌ساز، تستر،...
            </li>
            <li>لوازم شستشو: لباسشویی، ماشین ظرفشویی، خشک‌کن،...</li>
            <li>لوازم صوتی و تصویری: تلویزیون، ساندبار، سیستم صوتی،...</li>
            <li>لوازم تهویه مطبوع: کولر گازی، کولر آبی، پنکه،...</li>
            <li>لوازم برقی کوچک: جاروبرقی، اتو بخار، مخلوط کن،...</li>
          </ul>

          <p>
            با <strong>بهترین قیمت‌ها و شرایط پرداخت متنوع</strong>، پیدا کنید.
          </p>
        </section>

        <section>
          <h2 className="font-morabba text-2xl py-3">خدمات ما</h2>
          <ul className="list-disc marker:text-primary-200">
            <li>مشاوره تخصصی</li>
            <li>گارانتی معتبر</li>
            <li>ارسال سریع و مطمئن</li>
            <li>خدمات پس از فروش</li>
            <li>خرید جهیزیه</li>
          </ul>
        </section>

        <section>
          <h2 className="font-morabba text-2xl py-3">آدرس و تماس</h2>
          <div className="flex flex-col items-start justify-center">
            <p>
              <strong>آدرس:</strong>
              <span>بناب-خیابان امام-فروشگاه پارس خزر</span>
            </p>
            <p>
              <strong>شماره تماس:</strong> <span>09140000000</span>
            </p>
            <p className="flex flex-col items-start justify-center gap-y-2">
              <strong>شبکه‌های اجتماعی:</strong>
              <span className="font-danaMedium text-lg">
                اینستاگرام:{" "}
                <a
                  href=""
                  className="hover:text-primary-200 transition-all duration-150"
                >
                  farokhi_appliances_bonab
                </a>
              </span>
              <span className="font-danaMedium text-lg">
                تلگرام:{" "}
                <a
                  href=""
                  className="hover:text-primary-200 transition-all duration-150"
                >
                  farokhi_appliances_bonab
                </a>
              </span>
            </p>
          </div>
        </section>
        <section>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d198.25772082030147!2d46.054303069241875!3d37.33958399844049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1715255124371!5m2!1sen!2s"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full my-3"
          ></iframe>
        </section>
        <p className="font-danaMedium text-xl mt-3">
          &copy; ۱۴۰۳ فروشگاه لوازم خانگی فرخی
        </p>
      </main>

      <Footer />
    </>
  );
}

export default ContactUs;
