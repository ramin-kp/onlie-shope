import React, { useEffect, useState } from "react";

//component
import Breadcrumb from "../components/Breadcrumb";
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

//components
import Loader from "../components/Loader";

//services
import { getProductsData } from "../Services/products";

//function
import { customToast } from "../utils/customToast";

function ProductDetailsPage() {
  const [productsData, setProductsData] = useState({});
  const { title } = useParams();
  const queryKey = ["products-data"];
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey,
    queryFn: getProductsData,
  });
  useEffect(() => {
    const getData = () => {
      const res = products?.data.find(
        (product) => product.title === title.replaceAll("-", " ")
      );
      setProductsData(res);
    };
    getData();
  }, [products]);
  console.log("prod", products);
  console.log(productsData);

  if (isError) return customToast("error", "مشکلی پیش آمده");

  return (
    <>
      <Header />
      <main className="container">
        <Breadcrumb link={["products", "محصولات"]} title={title} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {productsData?.length ? (
            <>
              <div>
                <img src={`/images/${""}`} alt="" />
              </div>
              <div>e</div>
              <div className="col-span-2">e</div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default ProductDetailsPage;
