import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from './Configs/queryClinet';
import SvgIcons from "./components/SvgIcons";

function App() {
  const queryClient = new QueryClient({
    defaultOptions,
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </QueryClientProvider>
      <SvgIcons />
      <Toaster toastOptions={{ style: { fontFamily: "dana" } }} />
    </>
  );
}

export default App;
