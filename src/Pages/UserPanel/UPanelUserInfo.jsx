import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//config
import { userInfoSchema } from "../../Configs/schema";

//services
import { getUserById, updateUserById } from "../../Services/auth";

//component
import Loader from "./../../components/Loader";
import ChangePasswordBox from "../../components/userPanel/ChangePasswordBox";

//context
import { useUser } from "../../context/UserInfoContextProvider";
import { customToast } from "../../utils/customToast";

// Fn
import { getCookie, setCookie } from "../../utils/cookie";

function UPanelUserInfo() {
  //context
  const [userInfo, setUserInfo] = useUser();
  //query
  const queryKey = ["get-userDataById"];
  const { data: userData, isPending } = useQuery({
    queryKey,
    queryFn: () => getUserById(userInfo.id),
  });
  //mutation
  const { mutate, isPending: isUpdateUserLoader } = useMutation({
    mutationKey: ["update-user", userInfo.id],
    mutationFn: updateUserById,
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
    defaultValues: {
      username: "",
      email: "",
      phone: "",
    },
    resolver: yupResolver(userInfoSchema),
  });

  // useEffect
  useEffect(() => {
    if (isPending) return;
    const { username, email, phone, oldPassword, newPassword } = userData?.data;
    setValue("username", username);
    setValue("email", email);
    setValue("phone", phone);
  }, [userData, setUserInfo]);

  //Fn
  const submitHandler = (values) => {
    if (isPending) return;
    const id = userInfo.id;
    const data = values;
    mutate(
      { id, data },
      {
        onSuccess: () => {
          customToast("success", "اطلاعات شما با موفقیت تغییر کرد");
          setCookie(userData.data);
          setUserInfo(getCookie("userData"));
          queryClient.invalidateQueries({ queryKey: ["get-userDataById"] });
        },
        onError: () =>
          customToast("error", "مشکلی پیش آمده لطفا دوباره امتحان کنید"),
      }
    );
  };

  //loader
  if (isPending) return <Loader />;

  return (
    <div className="text-zinc-900 dark:text-white">
      <h1 className="my-5 pb-5 font-danaBold text-2xl text-zinc-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700">
        جزییات حساب کاربری
      </h1>
      <div>
        <form
          className="w-full lg:w-1/2 mx-auto"
          onSubmit={handleSubmit(submitHandler)}
        >
          <div className="form-field">
            <label htmlFor="username" className="form-field__label">
              نام کاربری
            </label>
            <input
              type="text"
              id="username"
              {...register("username")}
              className={`${
                errors.username ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.username && errors.username.message}
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="email" className="form-field__label">
              ایمیل
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
          <div className="form-field">
            <label htmlFor="phone" className="form-field__label">
              تلفن همراه
            </label>
            <input
              type="number"
              id="phone"
              {...register("phone")}
              className={`${
                errors.phone ? "border border-primary-200" : ""
              } form-field__input`}
            />
            <span className="inline-block mt-3 font-danaMedium text-primary-200 text-base">
              {errors.phone && errors.phone.message}
            </span>
          </div>
          <div className="w-full my-5 text-center">
            <button
              type="submit"
              className="w-full px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white font-danaBold rounded-lg transition-colors duration-150 outline-none"
            >
              ثبت اطلاعات
            </button>
          </div>
        </form>
        <ChangePasswordBox
          userData={userData?.data}
          userInfo={userInfo}
          queryClient={queryClient}
          mutate={mutate}
          setUserInfo={setUserInfo}
        />
      </div>
    </div>
  );
}

export default UPanelUserInfo;
