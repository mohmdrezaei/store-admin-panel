
import { useState } from "react";
import Dashboard from "./Dashboard"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  return (
      <Routes >
        <Route path="/register" element={<RegisterPage formData={formData} setFormData={setFormData} />} />
        <Route path="/login" element={<LoginPage formData={formData} setFormData={setFormData} />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
  )
}

export default App