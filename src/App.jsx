import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import { BrowserRouter, Navigate, redirect, Route, Routes, useNavigate } from "react-router-dom";
import PageNotFound from "pages/404";
import { getCookie } from "utils/cookie";

function App() {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const token = getCookie("token");

  const isAuthenticated = async () => {
    if (token) redirect("/dashboard");
    return null;
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/register"
          element={
            <RegisterPage formData={formData} setFormData={setFormData} />
          }
        />
        <Route
          path="/login"
          element={
            !token ? (
              <LoginPage formData={formData} setFormData={setFormData} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route exact={true}
          path="/dashboard"
          element={ <DashboardPage />}
          loader={async () => await isAuthenticated()}
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
