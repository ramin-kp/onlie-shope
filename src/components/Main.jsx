import React from "react";
import { useQuery } from "@tanstack/react-query";

import SectionHeader from "./SectionHeader";
import { getProductsData } from "../Services/products";
import ProductCard from "./ProductCard";

function Main() {
  const queryKey = ["products-data"];
  const { data: productsData } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });

  return (
    <>
      <SectionHeader title={"محصولات جدید"}  href={["همه محصولات", "/products"]} />
      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-2.5 my-5"
        data-aos="fade-up"
      >
        {productsData &&
          productsData.data.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
      </section>
    </>
  );
}

export default Main;
