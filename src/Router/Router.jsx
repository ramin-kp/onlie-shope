import React from "react";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//pages
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import Products from "../Pages/Products";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import NotFound from "./../Pages/NotFound";

//components
import Modal from "../components/Modal";

//services
import { getProductsData } from "../Services/products";
import { getSubMenus } from "../Services/menus";

function Router() {
  const { isPending: isProductsLoading } = useQuery({
    queryKey: ["products-data"],
    queryFn: getProductsData,
  });
  const { isPending: isMenuLoading } = useQuery({
    queryKey: ["menu-data"],
    queryFn: getSubMenus,
  });

  if (isProductsLoading && isMenuLoading) return <Modal />;
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="products/:title" element={<ProductDetailsPage />} />

      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
