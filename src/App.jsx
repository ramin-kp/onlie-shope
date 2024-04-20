import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import defaultOptions from "./Configs/queryClinet";
import SvgIcons from "./components/SvgIcons";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Aos from "aos";
import "aos/dist/aos.css";
import ThemContextProvider from "./context/ThemContextProvider";

function App() {
  const queryClient = new QueryClient({
    defaultOptions,
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemContextProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </ThemContextProvider>
        {/* <ReactQueryDevtools /> */}
      </QueryClientProvider>
      <SvgIcons />
      <Toaster toastOptions={{ style: { fontFamily: "dana" } }} />
      {Aos.init()}
    </>
  );
}

export default App;
