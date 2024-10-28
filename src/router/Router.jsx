import ProtectedRoutes from "router/ProtectedRoutes";
import { useState } from "react";
import { getCookie } from "utils/cookie";
import RegisterPage from "pages/RegisterPage";
import LoginPage from "pages/LoginPage";
import ProductsPage from "pages/ProductsPage";
import PageNotFound from "pages/404";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function Router() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  
  const token = getCookie("token"); 
  return (
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
        <Route element={<ProtectedRoutes />}>
          <Route path="/products" element={<ProductsPage />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
