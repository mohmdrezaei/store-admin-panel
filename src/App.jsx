
import { useState } from "react";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import PageNotFound from "pages/404";

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <BrowserRouter>
      <Routes >
        <Route path="/register" element={<RegisterPage formData={formData} setFormData={setFormData} />} />
        <Route path="/login" element={<LoginPage formData={formData} setFormData={setFormData} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App