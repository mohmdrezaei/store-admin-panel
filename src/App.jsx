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
import ProtectedRoutes from "router/ProtectedRoutes";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";




function App() {
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const token = getCookie("token");
  
  return (
    <TanstackQueryProvider>
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
      </TanstackQueryProvider>
  );
}

export default App;
