import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Link, useParams } from "react-router-dom";
//services
import { getOrderDetails } from "../../Services/orders";

//components
import FactureTable from "../../components/adminPanel/FactureTable";
import Loader from "../../components/Loader";

function APanelOrderDetails() {
  const { id } = useParams();
  const { data: orderDetails, isPending } = useQuery({
    queryKey: ["get-orderDetails", id],
    queryFn: () => getOrderDetails(id),
  });

  console.log(orderDetails?.data);

  if (isPending) return <Loader />;

  return (
    <div className="w-full overflow-x-auto">
      <FactureTable orderDetails={orderDetails.data} />
      <button onClick={()=>window.print()} className="px-3 py-2 my-5 bg-primary-200 text-white rounded-lg print:hidden">
        دانلود فاکتور
      </button>
    </div>
  );
}

export default APanelOrderDetails;
