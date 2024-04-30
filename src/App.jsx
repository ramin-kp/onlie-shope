import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Aos from "aos";

//pages
import HomePage from "./Pages/HomePage";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Products from "./Pages/Products";
import NotFound from "./Pages/NotFound";

//svgIcon
import SvgIcons from "./components/SvgIcons";

//context
import ThemContextProvider from "./context/ThemContextProvider";

//configs
import defaultOptions from "./Configs/queryClinet";

//styles
import "aos/dist/aos.css";
// import { StyledEngineProvider } from "@mui/material";

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
            <Route path="/products" element={<Products />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </ThemContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <SvgIcons />
      <Toaster toastOptions={{ style: { fontFamily: "dana" } }} />
      {Aos.init()}
      
      {/* </StyledEngineProvider> */}
    </>
  );
}

export default App;
