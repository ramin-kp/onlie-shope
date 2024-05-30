import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";

//services
import { getCities, getProvinces } from "../../Services/city";
import { getAddress, updateAddress } from "../../Services/address";

//components
import CityList from "../../components/CityList";
import Loader from "./../../components/Loader";

//Fn
import { customToast } from "../../utils/customToast";

//config
import { addersSchema } from "../../Configs/schema";

//context
import { useUser } from "../../context/UserInfoContextProvider";

function UPanelAddress() {
  const [isShowAddressForm, setIsShowAddressForm] = useState(false);
  const [provinceText, setProvinceText] = useState("");
  const [cityText, setCityText] = useState("");
  const [provinceCode, setProvinceCode] = useState("");
  const [newAddress, setNewAddress] = useState({});

  //context
  const [userInfo] = useUser();

  //query
  const { data: provinces, isPending: isProvinces } = useQuery({
    queryKey: ["provinces-data"],
    queryFn: getProvinces,
  });

  const { data: cities, isPending: isCities } = useQuery({
    queryKey: ["cities-data"],
    queryFn: getCities,
  });
  const { data: userAddress, isPending: isUserAddressLoading } = useQuery({
    queryKey: ["userAddress-data"],
    queryFn: getAddress,
  });

  //mutation
  const { mutate: updateUserAddress, isPending: isUpdateAddressLoading } =
    useMutation({
      mutationFn: updateAddress,
    });

  //queryClient
  const queryClient = useQueryClient();

  //hook-form
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addersSchema),
  });

  //useEffect
  useEffect(() => {
    if (isUserAddressLoading) return;
    const res = userAddress.data.find(
      (address) => address.userId === userInfo.id
    );
    setNewAddress(res);
  }, [userAddress]);

  useEffect(() => {
    setValue("name", newAddress?.name);
    setValue("lastName", newAddress?.lastName);
    setValue("location", newAddress?.location);
    setValue("PostalCode", newAddress?.PostalCode);
    setValue("mobile", newAddress?.mobile);
    setValue("email", newAddress?.email);
  }, [newAddress]);

  //Fn
  const SubmitHandler = (values) => {
    if (!provinceText || !cityText) {
      return customToast("error", "استان و شهر خود را انتخاب کنید");
    }
    const data = {
      ...values,
      province: provinceText,
      city: cityText,
      userId: newAddress.userId,
    };
    updateUserAddress(
      { id: newAddress.id, data },
      {
        onSuccess: () => {
          customToast("success", "با موفقیت ثبت شد");
          queryClient.invalidateQueries({ queryKey: ["userAddress-data"] });
          setIsShowAddressForm((prev) => !prev);
          window.scrollTo(0, 0);
        },
        onError: () =>
          customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
      }
    );
  };
  console.log(newAddress);
  if (isCities) return <Loader />;
  return (
    <div className="text-zinc-900 dark:text-white">
      <h1 className=" my-5 pb-5 font-danaBold text-2xl  border-b-2 border-gray-200 dark:border-gray-700">
        جزییات حساب کاربری
      </h1>
      <div className="font-dana">
        <h2 className="font-danaBold text-xl">آدرس ثبت شده</h2>
        {newAddress.id ? (
          <div>
            <p>
              {newAddress?.name} {newAddress?.lastName}
            </p>
            <p> {newAddress?.province}</p>
            <p>{newAddress?.city}</p>
            <p>{newAddress?.location}</p>
            <p> {newAddress?.PostalCode}</p>
          </div>
        ) : (
          <div className="p-2.5 my-5 bg-primary-200 font-danaBold text-xl text-white text-center rounded-lg">
            آدرسی ثبت نشده است
          </div>
        )}
      </div>
      <button
        className="inline-block px-3 py-2 my-5 bg-primary-200 hover:bg-primary-100 font-dana text-white rounded-lg"
        onClick={() => setIsShowAddressForm((prev) => !prev)}
      >
        تغییر اطلاعات آدرس
      </button>
      <form
        className={`${
          isShowAddressForm ? "opacity-100 visible" : "h-0 opacity-0 invisible"
        } flex flex-col md:flex-row items-start justify-between gap-x-5 w-full p-5 transition-all duration-200`}
        onSubmit={handleSubmit(SubmitHandler)}
      >
        {/* customer Details */}
        <div className="grow w-full md:w-1/2 text-zinc-900 dark:text-white">
          <div className="form-field">
            <label htmlFor="name" className="form-field__label">
              نام
            </label>
            <input
              type="text"
              id="name"
              {...register("name")}
              className={`${
                errors.name ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.name && errors.name.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="lastName" className="form-field__label">
              نام خانوادگی
            </label>
            <input
              type="text"
              id="lastName"
              {...register("lastName")}
              className={`${
                errors.lastName ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.lastName && errors.lastName.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="location" className="form-field__label">
              آدرس دقیق
            </label>
            <input
              id="location"
              {...register("location")}
              className={`${
                errors.location ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.location && errors.location.message}
            </span>
          </div>

          <CityList
            provinces={provinces}
            cities={cities}
            cityText={cityText}
            setCityText={setCityText}
            provinceText={provinceText}
            setProvinceText={setProvinceText}
            provinceCode={provinceCode}
            setProvinceCode={setProvinceCode}
          />
          <div className="form-field">
            <label htmlFor="PostalCode" className="form-field__label">
              کد پستی
            </label>
            <input
              type="number"
              id="PostalCode"
              {...register("PostalCode")}
              className={`${
                errors.PostalCode ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.PostalCode && errors.PostalCode.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="mobile" className="form-field__label">
              تلفن همراه
            </label>
            <input
              type="number"
              id="mobile"
              {...register("mobile")}
              className={`${
                errors.mobile ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.mobile && errors.mobile.message}
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="email" className="form-field__label">
              آدرس ایمیل (اختیاری)
            </label>
            <input
              type="email"
              id="email"
              {...register("email")}
              className={`${
                errors.email ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.email && errors.email.message}
            </span>
          </div>

          <div className="w-full my-5 text-center">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150"
            >
              ثبت اطلاعات
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UPanelAddress;
