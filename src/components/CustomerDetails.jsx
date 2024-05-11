import React from "react";
import CityList from "./CityList";
import { useQuery } from "@tanstack/react-query";
import { getCities, getProvinces } from "../Services/city";
import Loader from "./Loader";

function CustomerDetails() {
  const { data: provinces, isLoading: isProvinces } = useQuery({
    queryKey: ["provinces-data"],
    queryFn: getProvinces,
  });
  const { data: cities, isLoading: isCities } = useQuery({
    queryKey: ["cities-data"],
    queryFn: getCities,
  });

  if (isProvinces && isCities) return <Loader />;
  return (
    <div>
      <CityList provinces={provinces} cities={cities} />
    </div>
  );
}

export default CustomerDetails;
