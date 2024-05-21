import { useQuery } from "@tanstack/react-query";
import React from "react";

//components
import Loader from "../../components/Loader";
import DetailsBox from "./../../components/adminPanel/DetailsBox";
import ChartBox from "../../components/adminPanel/ChartBox";
import DataTable from "../../components/adminPanel/DataTable";

//services
import { getstoreData } from "../../Services/adminPanel";

function APanelIndex() {
  const queryKey = ["storeData"];
  const { data, isPending } = useQuery({ queryKey, queryFn: getstoreData });
  if (isPending) return <Loader />;
  const { users, totalPrice, totalOrders, totalTickets, charts, newUsers } =
    data?.data;
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-5">
        <DetailsBox
          text={"مجموع کاربرها"}
          data={users}
          bgColor={"bg-primary-200"}
        />
        <DetailsBox
          text={"مجموع خریدها"}
          data={totalPrice}
          bgColor={"bg-purple-600"}
        />
        <DetailsBox
          text={"مجموع سفارش‌ها"}
          data={totalOrders}
          bgColor={"bg-orange-600"}
        />
        <DetailsBox
          text={"مجموع تیکت‌ها"}
          data={totalTickets}
          bgColor={"bg-blue-600"}
        />
      </div>
      <ChartBox charts={charts} />
      <div className="overflow-auto border-t border-gray-300 dark:border-gray-700">
        <DataTable text={"کاربران اخیر"}>
          <table className="w-full font-dana text-zinc-900 dark:text-white">
            <thead className="">
              <tr className="font-danaBold">
                <th className="pr-1 bg-primary-100/65 py-2 rounded-r-md">
                  ردیف
                </th>
                <th className="bg-primary-100/65 py-2 ">نام کاربری</th>
                <th className="bg-primary-100/65 py-2 ">نقش</th>
                <th className="bg-primary-100/65 py-2 ">ایمیل</th>
                <th className="pl-1 bg-primary-100/65 py-2 rounded-l-md">
                  موبایل
                </th>
              </tr>
            </thead>
            <tbody>
              {newUsers
                .slice()
                .reverse()
                .map((user, index) => (
                  <tr key={user.id} className="text-center childe:py-5">
                    <td>{index + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.role === "ADMIN" ? "مدیر" : "کاربر"}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </DataTable>
      </div>
    </div>
  );
}

export default APanelIndex;
