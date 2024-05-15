import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

//components
import Loader from "../../components/Loader";

//services
import {
  getAllUsers,
  removeUser,
  updateRoleUser,
} from "../../Services/adminPanel";
import DataTable from "../../components/adminPanel/DataTable";
import { toast } from "react-hot-toast";
import { customToast } from "../../utils/customToast";
import RegisterUser from "./RegisterUser";

function APanelUser() {
  //query
  const queryKey = ["getAllUsers"];
  const { data: users, isPending } = useQuery({
    queryKey,
    queryFn: getAllUsers,
  });

  const queryClient = useQueryClient();

  //mutation
  const {
    mutate,
    isPending: isRemoveUserLoader,
    error,
  } = useMutation({
    mutationKey: ["remove-user"],
    mutationFn: removeUser,
  });

  const { mutate: updateRole, isPending: isUpdateUserLoader } = useMutation({
    mutationKey: ["update-role"],
    mutationFn: updateRoleUser,
  });

  //removeUser-Fn
  const removeHandler = (userId) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
        >
          <h1 className="font-danaBold text-xl text-zinc-900 dark:text-white">
            آیا از حذف کاربر مطمئن هستید
            <span className="mx-1 text-xl">❗</span>
          </h1>
          <div className="flex-center gap-x-5 my-2.5 text-white">
            <button
              className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
              onClick={() => {
                toast.dismiss(t.id);
                mutate(userId, {
                  onSuccess: () => {
                    customToast("success", "کاربر مورد نظر با موفقیت حذف شد");
                    queryClient.invalidateQueries({
                      queryKey: ["getAllUsers"],
                    });
                  },
                  onError: () => {
                    console.log(error);
                    customToast(
                      "error",
                      "مشکلی پیش آمده لطفا دوباره امتحان کنید"
                    );
                  },
                });
              }}
              disabled={isRemoveUserLoader}
            >
              بله
            </button>
            <button
              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 font-dana rounded-lg transition-colors duration-150"
              onClick={() => toast.dismiss(t.id)}
            >
              خیر
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );

    //     className={`${
    //       t.visible ? "animate-enter" : "animate-leave"
    //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //   >
    //     <div className="flex-1 w-0 p-4">
    //       <div className="flex items-start">
    //         <div className="flex-shrink-0 pt-0.5">
    //           <img
    //             className="h-10 w-10 rounded-full"
    //             src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
    //             alt=""
    //           />
    //         </div>
    //         <div className="ml-3 flex-1">
    //           <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
    //           <p className="mt-1 text-sm text-gray-500">
    //             Sure! 8:30pm works great!
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex border-l border-gray-200">
    //       <button
    //         onClick={() => toast.dismiss(t.id)}
    //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //       >
    //         Close
    //       </button>
    //     </div>
    //   </div>
    // ));
  };
  //roleUpdate-Fn
  const roleUpdateHandler = (userId, role) => {
    toast.custom(
      (t) => (
        <div
          className={`${
            t.visible ? "animate-enter" : "animate-leave"
          } inline-flex flex-col items-center justify-center p-5 bg-white dark:bg-zinc-800 pointer-events-auto rounded-xl`}
        >
          <h1 className="font-danaBold text-xl text-center text-zinc-900 dark:text-white">
            آیا از تغییر نقش{" "}
            <span className="text-red-600">
              {role === "ADMIN" ? "کاربر" : "مدیر"}
            </span>{" "}
            به{" "}
            <span className="text-red-600">
              {role === "ADMIN" ? "مدیر" : "کاربر"}
            </span>{" "}
            مطمئن هستید
            <span className="mx-1 text-xl">❗</span>
          </h1>
          <div className="flex-center gap-x-5 my-2.5 text-white">
            <button
              className={`px-3 py-2 bg-red-600 font-dana rounded-lg transition-colors duration-150`}
              onClick={() => {
                toast.dismiss(t.id);
                updateRole(
                  { userId, role },
                  {
                    onSuccess: () => {
                      customToast(
                        "success",
                        "نقش کاربر مورد نظر با موفقیت  تغییر کرد"
                      );
                      queryClient.invalidateQueries({
                        queryKey: ["getAllUsers"],
                      });
                    },
                    onError: () => {
                      console.log(error);
                      customToast(
                        "error",
                        "مشکلی پیش آمده لطفا دوباره امتحان کنید"
                      );
                    },
                  }
                );
              }}
              disabled={isRemoveUserLoader}
            >
              بله
            </button>
            <button
              className="px-3 py-2 bg-blue-600 hover:bg-blue-500 font-dana rounded-lg transition-colors duration-150"
              onClick={() => toast.dismiss(t.id)}
            >
              خیر
            </button>
          </div>
        </div>
      ),
      { duration: 5000 }
    );
  };
  if (isPending) return <Loader />;
  return (
    <>
      <RegisterUser />
      <div className="overflow-auto">
        <DataTable text={"کاربران"}>
          <table className="border-separate border-spacing-y-2 w-full font-dana text-zinc-900 dark:text-white">
            <thead>
              <tr className="font-danaBold text-wrap">
                <th className="pr-1 bg-primary-100/65 py-5 rounded-r-md">
                  آیدی
                </th>
                <th className="bg-primary-100/65 py-5 ">نام کاربری</th>
                <th className="bg-primary-100/65 py-5 ">نقش</th>
                <th className="bg-primary-100/65 py-5 ">ایمیل</th>
                <th className="bg-primary-100/65 py-5 ">گذر واژه</th>
                <th className="bg-primary-100/65 py-5 ">موبایل</th>
                <th className="bg-primary-100/65 py-5 ">حذف</th>
                <th className="pl-1 bg-primary-100/65 py-5 rounded-l-md ">
                  تغییر نقش
                </th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((user, index) => (
                <tr
                  key={user.id}
                  className="text-center childe:py-5 childe:odd:bg-white dark:childe:odd:bg-dark-100 childe:even:bg-gray-300 dark:childe:even:bg-zinc-700"
                >
                  <td className="rounded-r-xl">{index + 1}</td>
                  <td>{user.username}</td>
                  <td
                    className={`${
                      user.role === "ADMIN" ? "text-red-600" : "text-blue-600"
                    }`}
                  >
                    {user.role === "ADMIN" ? "مدیر" : "کاربر"}
                  </td>
                  <td>{user.email}</td>
                  <td className="px-5 text-wrap">{user.password}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="px-3 py-2 bg-primary-200 hover:bg-primary-100 text-white rounded-lg transition-colors duration-150"
                      onClick={() => removeHandler(user.id)}
                    >
                      حذف
                    </button>
                  </td>
                  <td className="rounded-l-xl">
                    {user.role === "ADMIN" ? (
                      <button
                        className={`${
                          user.role === "ADMIN"
                            ? "bg-blue-600 hover:bg-blue-500"
                            : "bg-yellow-600 hover:bg-yellow-500"
                        } px-3 py-2 text-white text-sm rounded-lg transition-colors duration-150`}
                        onClick={() => roleUpdateHandler(user.id, "USER")}
                      >
                        تغییر به کاربر
                      </button>
                    ) : (
                      <button
                        className={`${
                          user.role === "ADMIN"
                            ? "bg-blue-600 hover:bg-blue-500"
                            : "bg-yellow-600 hover:bg-yellow-500"
                        } px-3 py-2 text-white text-sm rounded-lg transition-colors duration-150`}
                        onClick={() => roleUpdateHandler(user.id, "ADMIN")}
                      >
                        تغییر به مدیر
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </>
  );
}

export default APanelUser;
