import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
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
import UPaneIndex from "../Pages/UserPanel/UPaneIndex";
import UPanelOrders from "../Pages/UserPanel/UPanelOrders";
import UPanelUserInfo from "../Pages/UserPanel/UPanelUserInfo";
import UPanelAddress from "../Pages/UserPanel/UPanelAddress";
import UPanelTicket from "../Pages/UserPanel/UPanelTicket";
import AdminPanel from "../Pages/AdminPanel/AdminPanel";
import APanelIndex from "../Pages/AdminPanel/APanelIndex";
import APanelUser from "../Pages/AdminPanel/APanelUser";
import APanelCategory from "../Pages/AdminPanel/APanelCategory";
import APanelBrand from "../Pages/AdminPanel/APanelBrand";
import APanelProducts from "../Pages/AdminPanel/APanelProducts";
import APanelOrders from "../Pages/AdminPanel/APanelOrders";
import APanelOrderDetails from "../Pages/AdminPanel/APanelOrderDetails";
import APanelTicket from "../Pages/AdminPanel/APanelTicket";
import NotFoundPage from "../Pages/NotFoundPage";

//components
import Modal from "../components/Modal";

//services
import { getProductsData } from "../Services/products";
import { getSubMenus } from "../Services/menus";
import { useUser } from "../context/UserInfoContextProvider";

function Router() {
  const [userInfo, setUserInfo] = useUser();
  console.log(userInfo);

  //Query
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
      <Route
        path="/register"
        element={userInfo ? <Navigate to="/my-account" /> : <RegisterPage />}
      />
      <Route
        path="/login"
        element={userInfo ? <Navigate to="/my-account" /> : <LoginPage />}
      />
      <Route path="/products" element={<Products />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/products/:title" element={<ProductDetailsPage />} />
      <Route path="products/brand/:brandName" element={<ProductsByBrand />} />
      <Route
        path="products/brand/:brandName/:category"
        element={<ProductsByCategory />}
      />
      <Route
        path="/my-account/*"
        element={userInfo ? <UserPanel /> : <Navigate to="/register" />}
      >
        <Route index element={<UPaneIndex />} />
        <Route path="orders" element={<UPanelOrders />} />
        <Route path="address" element={<UPanelAddress />} />
        <Route path="ticket" element={<UPanelTicket />} />
        <Route path="edit-account" element={<UPanelUserInfo />} />
      </Route>
      <Route
        path="/admin-panel/*"
        element={
          userInfo && userInfo.role === "ADMIN" ? (
            <AdminPanel />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route index element={<APanelIndex />} />
        <Route path="users" element={<APanelUser />} />
        <Route path="brand" element={<APanelBrand />} />
        <Route path="category" element={<APanelCategory />} />
        <Route path="products" element={<APanelProducts />} />
        <Route path="orders" element={<APanelOrders />} />
        <Route path="orders/:id" element={<APanelOrderDetails />} />
        <Route path="ticket" element={<APanelTicket />} />
      </Route>
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default Router;
