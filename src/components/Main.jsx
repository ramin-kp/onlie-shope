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
    <section data-aos="fade-up">
      <SectionHeader
        title={"محصولات جدید"}
        href={["همه محصولات", "/products"]}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mx-2.5 my-5">
        {productsData &&
          productsData.data
            .slice(0, 9)
            .map((product) => <ProductCard key={product.id} data={product} />)}
      </div>
    </section>
  );
}

export default Main;
