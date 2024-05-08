import React, { useEffect, useState } from "react";

//component
import Breadcrumb from "../components/Breadcrumb";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

//components
import Loader from "../components/Loader";

//services
import { getProductsData } from "../Services/products";

//function
import { customToast } from "../utils/customToast";

function ProductDetailsPage() {
  const [productsData, setProductsData] = useState({});
  const params = useParams();
  const queryKey = ["products-data"];
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });
  useEffect(() => {
    const getData = () => {
      const res = products?.data.find(
        (product) => product.title === params.title
      );
      setProductsData(res);
    };
    getData();
  }, [products]);

  if (isError) return customToast("error", "مشکلی پیش آمده");

  return (
    <>
      <Header />
      <main className="container">
        <Breadcrumb link={["products", "محصولات"]} title={params.title} />
        {productsData?.id ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-16 mx-2 p-3 font-dana">
            <div className="mx-auto w-[250px] lg:w-[450px]">
              <img
                src={`/images/${productsData.image}`}
                className=""
                alt="products-img"
              />
            </div>
            <div className="space-y-5 mt-5 text-zinc-900 dark:text-white">
              <h1 className="font-danaBold text-base sm:text-xl lg:text-2xl">
                {productsData.title}
              </h1>
              {}
              {!!productsData.price == 0 ? (
                <h3 className="pb-5 text-xl border-b border-gray-300">
                  ناموجود
                </h3>
              ) : !!productsData.offer?.discount ? (
                <div className="flex items-center justify-between gap-x-5 pb-5 text-lg sm:text-xl border-b border-gray-300 dark:border-gray-700">
                  <div className="flex flex-item justify-between gap-x-5">
                    <span className="line-through text-gray-400">
                      {productsData.price.toLocaleString()}
                    </span>
                    <h3 className="text-lg sm:text-xl">
                      {(
                        productsData.price -
                        (productsData.price * productsData.offer.discount) / 100
                      ).toLocaleString()}{" "}
                      تومان
                    </h3>
                  </div>
                  <span className="inline-block px-3 py-1.5 my-auto bg-primary-200 text-center text-white text-sm rounded-lg">
                    {productsData.offer.discount}% تخفیف
                  </span>
                </div>
              ) : (
                `${productsData.price.toLocaleString()} تومان`
              )}

              <div>
                <p className="text-gray-600 dark:text-gray-500">
                  {productsData.subTitle}
                </p>
                <div className="my-5">
                  <button className="px-5 py-3 bg-primary-200 font-dana text-white rounded-lg hover:bg-red-700 duration-75">
                    افزودن به سبد خرید
                  </button>
                </div>
                <div className="childe:flex childe:items-center childe:justify-start childe:gap-5 space-y-3 font-dana text-base text-gray-600 dark:text-gray-400">
                  <h4>
                    برند:
                    <span className="">{productsData.brand[1]}</span>
                  </h4>
                  <h4>
                    دسته‌بندی:
                    <span className="">{productsData.category[1]}</span>
                  </h4>
                </div>
                <div className="flex items-center justify-start gap-x-5 mt-5">
                  <Link to="https://instagram.com/ramin._kp/" target="_blank">
                    <svg className="w-6 h-6 text-zinc-900 dark:bg-white rounded-md">
                      <use href="#instagram"></use>
                    </svg>
                  </Link>
                  <Link to="https://t.me/ramin_kp81" target="_blank">
                    <svg className="w-6 h-6 text-zinc-900 dark:bg-white rounded-md">
                      <use href="#telegram"></use>
                    </svg>
                  </Link>
                  <Link to="https://instagram.com/ramin._kp/" target="_blank">
                    <svg className="w-6 h-6 text-zinc-900 dark:bg-white rounded-md">
                      <use href="#whatsapp"></use>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2 pt-6 border-t border-gray-300 dark:border-gray-700">
              <h2 className="font-danaBold text-2xl text-primary-200">
                مشخصات کالا
              </h2>
              <div className="flex items-center justify-start w-full my-5">
                <div className="w-1/3 divide-y divide-gray-300 dark:divide-gray-700">
                  {productsData.details.Attributes.map((item, index) => (
                    <div
                      key={index}
                      className="flex-center p-1 sm:p-5 h-20 font-dana text-sm md:text-base text-zinc-900 dark:text-white border-l border-gray-300 dark:border-gray-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
                <div className="w-2/3 divide-y divide-gray-300 dark:divide-gray-700">
                  {productsData.details.Amounts.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center p-5 h-20 font-dana text-sm md:text-base text-right text-gray-700 dark:text-gray-500"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
