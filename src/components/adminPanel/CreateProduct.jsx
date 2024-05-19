import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

//services
import { getCategory, getCategoryProducts } from "../../Services/category";
import { createProducts } from "../../Services/products";

//Fn
import { customToast } from "../../utils/customToast";

function CreateProduct() {
  const [brandProducts, setBrandProducts] = useState([]);
  const [productsCategory, setProductsCategory] = useState("");

  //query
  const queryKey = ["category-data"];
  const { data: brands, isPending: isBrandLoader } = useQuery({
    queryKey,
    queryFn: getCategory,
  });
  const queryKeyCategoryProducts = ["categoryProducts-data"];
  const { data: categoryProducts, isPending: isCategoryProductsLoader } =
    useQuery({
      queryKey: queryKeyCategoryProducts,
      queryFn: getCategoryProducts,
    });

  //mutation
  const { mutate, isPending } = useMutation({ mutationFn: createProducts });

  //queryClient
  const queryClient = useQueryClient();

  //hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //Fn
  const submitHandler = (values) => {
    const {
      price,
      Number: numberProducts,
      discount,
      image,
      subTitle,
      title,
    } = values;
    const newProductData = {
      price: +price,
      details: {
        Amounts: values.Amounts.split("-"),
        Attributes: values.Attributes.split("-"),
      },
      offer: { discount },
      brand: brandProducts,
      category: productsCategory,
      Number: +numberProducts,
      image,
      subTitle,
      title,
    };

    mutate(newProductData, {
      onSuccess: () => {
        customToast("success", "محصول جدید با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["products-data"] });
      },
      onError: () => customToast("error", "مشکلی پیش آمده دوباره امتحان کنید"),
    });
  };

  return (
    <div className="pb-10 border-b border-gray-300 dark:border-gray-700">
      <h1 className="my-5 mx-2 font-danaBold text-zinc-900 dark:text-white text-xl">
        افزودن محصول جدید
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-y-5 childe:w-full text-zinc-900 dark:text-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("title", {
              required: {
                value: true,
                message: "نام محصول را وارد کنید.",
              },
            })}
            placeholder="نام محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.title && errors.title.message}
          </h3>
        </div>
        <div>
          <textarea
            className="w-full px-2.5 dark:bg-dark-100 rounded-lg outline-none"
            type="text"
            {...register("subTitle", {
              required: {
                value: true,
                message: "توضیحات را وارد کنید.",
              },
            })}
            rows={5}
            placeholder="توضیحات"
          />
          <h3 className="mt-3 font-danaMedium text-sm text-red-600">
            {errors.subTitle && errors.subTitle.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="number"
            {...register("price", {
              required: {
                value: true,
                message: "قیمت را وارد کنید.",
              },
            })}
            placeholder="قیمت"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.price && errors.price.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="number"
            {...register("Number", {
              required: {
                value: true,
                message: "تعداد محصول را وارد کنید.",
              },
            })}
            placeholder="تعداد محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Number && errors.Number.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="number"
            {...register("discount", {
              required: {
                value: true,
                message: "میزان تخفیف محصول را وارد کنید.",
              },
            })}
            placeholder="میزان تخفیف محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.discount && errors.discount.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("Attributes", {
              required: {
                value: true,
                message: "مشخصات محصول را وارد کنید.",
              },
            })}
            placeholder="مشخصات محصول را با - جدا جدا بنویسید"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Attributes && errors.Attributes.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("Amounts", {
              required: {
                value: true,
                message: "مقادیر مشخصات محصول را وارد کنید.",
              },
            })}
            placeholder="مقادیر مشخصات محصول را با - جدا جدا بنویسید"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Amounts && errors.Amounts.message}
          </h3>
        </div>
        <div>
          <select
            className="w-full p-2 dark:bg-dark-100 outline-none rounded-lg"
            type="number"
            {...register("brand", {
              required: {
                value: true,
                message: " برند محصول را وارد کنید.",
              },
            })}
            onChange={(e) => setBrandProducts(e.target.value.split(","))}
          >
            {!isBrandLoader &&
              brands.data.map((brand) => (
                <option
                  key={brand.id}
                  disabled={brand.value === "All" && true}
                  value={[brand.value, brand.title]}
                >
                  {brand.title === "همه محصولات" ? "برند محصول" : brand.title}
                </option>
              ))}
          </select>
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.brand && errors.brand.message}
          </h3>
        </div>
        <div>
          <select
            className="w-full p-2 dark:bg-dark-100 outline-none rounded-lg"
            type="number"
            {...register("category", {
              required: {
                value: true,
                message: " دسته بندی محصول را وارد کنید.",
              },
            })}
            onChange={(e) => setProductsCategory(e.target.value.split(","))}
          >
            {!isCategoryProductsLoader &&
              categoryProducts.data.map((category) => (
                <option
                  key={category.id}
                  value={[category.value, category.title]}
                >
                  {category.title}
                </option>
              ))}
          </select>
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.category && errors.category.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("image", {
              required: {
                value: true,
                message: "مسیرعکس محصول را وارد کنید.",
              },
            })}
            placeholder="مسیرعکس محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.image && errors.image.message}
          </h3>
        </div>
        {/* <div>
          <input
            className="dark:bg-dark-100 border border-gray-600 cursor-pointer"
            type="file"
            {...register("file", {
              required: {
                value: true,
                message: "عکس محصول را وارد کنید.",
              },
            })}
            placeholder="عکس محصول"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.file && errors.file.message}
          </h3>
        </div> */}
        {isPending ? (
          <button
            type="submit"
            className=" bg-red-600/60 text-white font-danaBold rounded-lg duration-75"
            disabled
          >
            <span className="loader inline-block "></span>
          </button>
        ) : (
          <button
            type="submit"
            className="p-2 px-3 bg-primary-200 text-white font-danaBold rounded-lg hover:bg-primary-100 outline-none transition-colors duration-75"
          >
            افزودن
          </button>
        )}
      </form>
    </div>
  );
}

export default CreateProduct;
