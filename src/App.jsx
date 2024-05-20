import React from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Aos from "aos";

//svgIcon
import SvgIcons from "./components/SvgIcons";

//components
import ScrollToTop from "./components/ScrollToTop";

//context
import ThemContextProvider from "./context/ThemContextProvider";
import CardContextProvider from "./context/CardContextProvider";

//configs
import defaultOptions from "./Configs/queryClinet";
import Router from "./Router/Router";

//styles
import "aos/dist/aos.css";

function App() {
  const queryClient = new QueryClient({
    defaultOptions,
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemContextProvider>
          <CardContextProvider>
            <Router />
            <ScrollToTop />
          </CardContextProvider>
        </ThemContextProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <SvgIcons />
      <Toaster
        toastOptions={{ style: { fontFamily: "dana" }, duration: 5000 }}
      />
      {Aos.init()}
    </>
  );
}

export default App;
