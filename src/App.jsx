import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./pages/ProductsPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import PageNotFound from "pages/404";

import { getCookie } from "utils/cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProtectedRoutes from "router/ProtectedRoutes";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";




function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        staleTime: 60 * 1000,
        cacheTime: 60 * 1000,
      },
    },
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const token = getCookie("token");
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              !token ? (
                <RegisterPage formData={formData} setFormData={setFormData} />
              ) : (
                <Navigate to="/products" />
              )
              
            }
          />
          <Route
            path="/login"
            element={
              !token ? (
                <LoginPage formData={formData} setFormData={setFormData} />
              ) : (
                <Navigate to="/products" />
              )
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
         <Route  element={<ProtectedRoutes/>}>
         <Route path="/products" element={ <ProductsPage/>}/>
          </Route>
          <Route path="*" element={ <PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        rtl={true}
        draggable
        pauseOnHover
        theme="light"
      />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
