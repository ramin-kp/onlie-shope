import React from "react";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//pages
import HomePage from "../Pages/HomePage";
import RegisterPage from "../Pages/RegisterPage";
import LoginPage from "../Pages/LoginPage";
import Products from "../Pages/Products";
import ContactUs from "../Pages/contactUs";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import ProductsByBrand from "../Pages/ProductsByBrand";
import ProductsByCategory from "../Pages/ProductsByCategory";
import Orders from "../Pages/Orders";
import UserPanel from "../Pages/UserPanel/UserPanel";
import NotFoundPage from "./../Pages/NotFoundPage";
import UPaneIndex from "../Pages/UserPanel/UPaneIndex";
import UPanelOrders from "../Pages/UserPanel/UPanelOrders";
import UPanelUserInfo from "../Pages/UserPanel/UPanelUserInfo";
import UPanelAddress from "../Pages/UserPanel/UPanelAddress";

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
      <Route index element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products/:title" element={<ProductDetailsPage />} />
      <Route path="products/brand/:brandName" element={<ProductsByBrand />} />
      <Route
        path="products/brand/:brandName/:category"
        element={<ProductsByCategory />}
      />
      <Route path="/my-account/*" element={<UserPanel />}>
        <Route index element={<UPaneIndex />} />
        <Route path="orders" element={<UPanelOrders />} />
        <Route path="address" element={<UPanelAddress />} />
        <Route path="edit-account" element={<UPanelUserInfo />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
