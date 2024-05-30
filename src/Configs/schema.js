import * as yup from "yup";

//adminPanel
const brandSchema = yup.object({
  title: yup
    .string()
    .required("نام برند کالا را وارد کنید.")
    .transform((value) => value.trim()),
  value: yup
    .string()
    .required("لینک را وارد کنید.")
    .transform((value) => value.trim()),
});
const categorySchema = yup.object({
  title: yup
    .string()
    .required("نام کتگلوری را وارد کنید.")
    .transform((value) => value.trim()),
  value: yup
    .string()
    .required("لینک را وارد کنید.")
    .transform((value) => value.trim()),
});
const productsSchema = yup.object({
  title: yup
    .string()
    .required("نام کالا را وارد کنید.")
    .transform((value) => value.trim()),
  subTitle: yup
    .string()
    .required("توضیحات کالا را وارد کنید.")
    .transform((value) => value.trim()),
  price: yup
    .string()
    .required("قیمت کالا را وارد کنید.")
    .transform((value) => value.trim()),
  Number: yup
    .string()
    .required("تعداد کالا را وارد کنید.")
    .transform((value) => value.trim()),
  discount: yup
    .string()
    .required("میزان تخفیف کالا را وارد کنید.")
    .transform((value) => value.trim()),
  Attributes: yup
    .string()
    .required("عنوان جزئیات کالا را وارد کنید.")
    .transform((value) => value.trim()),
  Amounts: yup
    .string()
    .required("مقدار جزئیات کالا را وارد کنید.")
    .transform((value) => value.trim()),
  brand: yup
    .string()
    .required("بردند کالا را وارد کنید.")
    .transform((value) => value.trim()),
  category: yup
    .string()
    .required("دسته‌بندی کالا را وارد کنید.")
    .transform((value) => value.trim()),
  image: yup
    .string()
    .required("عکس کالا را وارد کنید.")
    .transform((value) => value.trim()),
});
const aPanelUserSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری را وارد کنید.")
    .min(3, "نام کاربری باید بیشتر از 3 کاراکتر باشد.")
    .max(20, "نام کاربری باید کمتر از 20 کاراکتر باشد.")
    .matches(/^[A-z0-9\-]+$/g, "نام کاربری وارد شده معتبر نمی‌باشد.")
    .transform((value) => value.trim()),
  email: yup
    .string()
    .required("ایمیل را وارد کنید.")
    .matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
      "ایمیل وارد شده معتبر نمی‌باشد."
    )
    .transform((value) => value.trim()),
  phone: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "شماره موبایل شما نباید کمتر از11 کاراکتر باشد")
    .max(11, "شماره موبایل شما نباید بیشتر از11 کاراکتر باشد")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره موبایل خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  password: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "پسورد باید بیشتر از 8 کاراکتر باشد.")
    .max(20, "پسورد باید کمتر از 20 کاراکتر باشد.")
    .transform((value) => value.trim()),
  role: yup
    .string()
    .required("نقش کاربر را انتخاب کنید")
    .transform((value) => value.trim()),
});
const answerTicket = yup.object({
  title: yup
    .string()
    .required("عنوان تیکت را وارد کنید")
    .transform((value) => value.trim()),
  text: yup
    .string()
    .required("متن تیکت خود را وارد کنید")
    .transform((value) => value.trim()),
});

//orders page
const customerSchema = yup.object({
  name: yup
    .string()
    .required("نام خود را وارد کنید")
    .min(3, "نام شما باید بیشتر از 3 کاراکتر باشد")
    .max(20, "نام شما باید کمتر از 20 کاراکتر باشد")
    .transform((value) => value.trim()),
  lastName: yup
    .string()
    .required("نام خانوادگی خود را وارد کنید")
    .min(3, "نام خانوادگی شما باید بیشتر از3 کاراکتر باشد")
    .max(20, "نام خانوادگی شما باید بیشتر از20 کاراکتر باشد")
    .transform((value) => value.trim()),
  location: yup
    .string()
    .required("لطفا آدرس خود را وارد کنید")
    .min(10, "لطفا آدرس خود را به درستی وارد کنید")

    .transform((value) => value.trim()),
  PostalCode: yup
    .string()
    .required("لطفا کد پستی خود را وارد کنید")
    .min(10, "کدپستی شما نباید کمتر از10 کاراکتر باشد")
    .max(10, "کدپستی شما نباید بیشتر از10 کاراکتر باشد")
    .matches(
      /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      "لطفا کد پستی خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  mobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "شماره موبایل شما نباید کمتر از11 کاراکتر باشد")
    .max(11, "شماره موبایل شما نباید بیشتر از11 کاراکتر باشد")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره موبایل خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  email: yup
    .string()
    .nullable()
    .notRequired()
    .transform((value) => (value ? value.trim() : null))
    .test(
      "is-valid-email",
      "لطفا یک ایمیل معتبر وارد کنید",
      (value) =>
        !value || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ),
  description: yup
    .string()
    .nullable()
    .notRequired()
    .transform((value) => (value ? value.trim() : null))
    .test(
      "is-valid-email",
      "لطفا متن خود را وارد کنید",
      (value) => !value || /^\s+$/.test(value)
    ),
});

//userPanel
const addersSchema = yup.object({
  name: yup
    .string()
    .required("نام خود را وارد کنید")
    .min(3, "نام شما باید بیشتر از 3 کاراکتر باشد")
    .max(20, "نام شما باید کمتر از 20 کاراکتر باشد")
    .transform((value) => value.trim()),
  lastName: yup
    .string()
    .required("نام خانوادگی خود را وارد کنید")
    .min(3, "نام خانوادگی شما باید بیشتر از3 کاراکتر باشد")
    .max(20, "نام خانوادگی شما باید بیشتر از20 کاراکتر باشد")
    .transform((value) => value.trim()),
  location: yup
    .string()
    .required("لطفا آدرس خود را وارد کنید")
    .min(10, "لطفا آدرس خود را به درستی وارد کنید")

    .transform((value) => value.trim()),
  PostalCode: yup
    .string()
    .required("لطفا کد پستی خود را وارد کنید")
    .min(10, "کدپستی شما نباید کمتر از10 کاراکتر باشد")
    .max(10, "کدپستی شما نباید بیشتر از10 کاراکتر باشد")
    .matches(
      /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
      "لطفا کد پستی خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  mobile: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "شماره موبایل شما نباید کمتر از11 کاراکتر باشد")
    .max(11, "شماره موبایل شما نباید بیشتر از11 کاراکتر باشد")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره موبایل خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  email: yup
    .string()
    .nullable()
    .notRequired()
    .transform((value) => (value ? value.trim() : null))
    .test(
      "is-valid-email",
      "لطفا یک ایمیل معتبر وارد کنید",
      (value) =>
        !value || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
    ),
});
const userInfoSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری را وارد کنید.")
    .min(3, "نام کاربری  باید بیشتر از 3 کاراکتر باشد.")
    .max(20, "نام کاربری  باید کمتر از 20 کاراکتر باشد.")

    .transform((value) => value.trim()),

  email: yup
    .string()
    .required("ایمیل را وارد کنید.")
    .matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
      "ایمیل وارد شده معتبر نمی‌باشد."
    )
    .transform((value) => value.trim()),
  phone: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "شماره موبایل شما نباید کمتر از11 کاراکتر باشد")
    .max(11, "شماره موبایل شما نباید بیشتر از11 کاراکتر باشد")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره موبایل خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
});
const passwordSchema = yup.object({
  oldPassword: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "پسورد باید بیشتر از 8 کاراکتر باشد.")
    .max(20, "پسورد باید کمتر از 20 کاراکتر باشد.")
    .transform((value) => value.trim()),
  newPassword: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "پسورد باید بیشتر از 8 کاراکتر باشد.")
    .max(20, "پسورد باید کمتر از 20 کاراکتر باشد.")
    .transform((value) => value.trim()),
});
const ticketSchema = yup.object({
  title: yup
    .string()
    .required("عنوان تیکت را وارد کنید")
    .transform((value) => value.trim()),
  text: yup
    .string()
    .required("متن تیکت خود را وارد کنید")
    .transform((value) => value.trim()),
});

//login && register page
const loginUserSchema = yup.object({
  email: yup
    .string()
    .required("ایمیل را وارد کنید.")
    .matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
      "ایمیل وارد شده معتبر نمی‌باشد."
    )
    .transform((value) => value.trim()),
  password: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "پسورد باید بیشتر از 8 کاراکتر باشد.")
    .max(20, "پسورد باید کمتر از 20 کاراکتر باشد.")
    .transform((value) => value.trim()),
});
const registerUserSchema = yup.object({
  username: yup
    .string()
    .required("نام کاربری را وارد کنید.")
    .min(3, "نام کاربری باید بیشتر از 3 کاراکتر باشد.")
    .max(20, "نام کاربری باید کمتر از 20 کاراکتر باشد.")
    .matches(/^[A-z0-9\-]+$/g, "نام کاربری وارد شده معتبر نمی‌باشد.")
    .transform((value) => value.trim()),
  email: yup
    .string()
    .required("ایمیل را وارد کنید.")
    .matches(
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
      "ایمیل وارد شده معتبر نمی‌باشد."
    )
    .transform((value) => value.trim()),
  phone: yup
    .string()
    .required("لطفا شماره موبایل خود را وارد کنید")
    .min(11, "شماره موبایل شما نباید کمتر از11 کاراکتر باشد")
    .max(11, "شماره موبایل شما نباید بیشتر از11 کاراکتر باشد")
    .matches(
      /((0?9)|(\+?989))\d{2}\W?\d{3}\W?\d{4}/g,
      "لطفا شماره موبایل خود را به درستی وارد کنید"
    )
    .transform((value) => value.trim()),
  password: yup
    .string()
    .required("پسورد را وارد کنید.")
    .min(8, "پسورد باید بیشتر از 8 کاراکتر باشد.")
    .max(20, "پسورد باید کمتر از 20 کاراکتر باشد.")
    .transform((value) => value.trim()),
});

export {
  brandSchema,
  categorySchema,
  productsSchema,
  aPanelUserSchema,
  answerTicket,
  customerSchema,
  addersSchema,
  userInfoSchema,
  passwordSchema,
  ticketSchema,
  loginUserSchema,
  registerUserSchema,
};
