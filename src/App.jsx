import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import PageNotFound from "pages/404";


import TanstackQueryProvider from "provider/TanstackQueryProvider";
import { getCookie } from "utils/cookie";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Router from "router/Router";






function App() {
  
 
  
  return (
    <TanstackQueryProvider>
    <Router />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={true}
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools />
      </TanstackQueryProvider>
  );
}

export default App;
