import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { getCategory, getCategoryProducts } from "../../Services/category";
import { createProducts } from "../../Services/products";

//Fn
import { customToast } from "../../utils/customToast";

//config
import { productsSchema } from "../../Configs/schema";

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
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      subTitle: "",
      price: "",
      Number: "",
      discount: "",
      Attributes: "",
      Amounts: "",
      brand: "",
      category: "",
      image: "",
    },

    resolver: yupResolver(productsSchema),
  });

  //Fn
  const submitHandler = (values) => {
    if ((!brandProducts, !productsCategory))
      return customToast("error", "لطفا دسته‌بندی و برند کالا را انتخاب کنید");
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
        customToast("success", "کالا جدید با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["products-data"] });
        resetField("title");
        resetField("subTitle");
        resetField("price");
        resetField("Number");
        resetField("discount");
        resetField("Attributes");
        resetField("Amounts");
        resetField("brand");
        resetField("category");
        resetField("image");
      },
      onError: () => customToast("error", "مشکلی پیش آمده دوباره امتحان کنید"),
    });
  };

  return (
    <div className="pb-10 border-b border-gray-300 dark:border-gray-700">
      <h1 className="my-5 mx-2 font-danaBold text-zinc-900 dark:text-white text-xl">
        افزودن کالا جدید
      </h1>
      <form
        className="flex flex-col justify-center items-center gap-y-5 childe:w-full text-zinc-900 dark:text-white"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("title")}
            placeholder="نام کالا"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.title && errors.title.message}
          </h3>
        </div>
        <div>
          <textarea
            className="w-full px-2.5 dark:bg-dark-100 rounded-lg outline-none"
            type="text"
            {...register("subTitle")}
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
            {...register("price")}
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
            {...register("Number")}
            placeholder="تعداد کالا"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Number && errors.Number.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="number"
            {...register("discount")}
            placeholder="میزان تخفیف کالا"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.discount && errors.discount.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("Attributes")}
            placeholder="جزئیات و مشخصات کالا را با - جدا جدا بنویسید"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Attributes && errors.Attributes.message}
          </h3>
        </div>
        <div>
          <input
            className="w-full dark:bg-dark-100"
            type="text"
            {...register("Amounts")}
            placeholder="مقادیر جزئیات و مشخصات کالا را با - جدا جدا بنویسید"
          />
          <h3 className="mt-3 font-danaMedium w-full text-sm text-red-600">
            {errors.Amounts && errors.Amounts.message}
          </h3>
        </div>
        <div>
          <select
            className="w-full p-2 dark:bg-dark-100 outline-none rounded-lg"
            type="number"
            {...register("brand")}
            onChange={(e) => setBrandProducts(e.target.value.split(","))}
          >
            {!isBrandLoader &&
              brands.data.map((brand) => (
                <option
                  key={brand.id}
                  disabled={brand.value === "All" && true}
                  value={[brand.value, brand.title]}
                >
                  {brand.title === "همه کالاها" ? "برند کالا" : brand.title}
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
            {...register("category")}
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
            {...register("image")}
            placeholder="مسیرعکس کالا"
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
                message: "عکس کالا را وارد کنید.",
              },
            })}
            placeholder="عکس کالا"
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
