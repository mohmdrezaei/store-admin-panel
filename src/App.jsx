
import Dashboard from "./Dashboard"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import { Navigate, Route, Routes } from "react-router-dom"

function App() {
  
  return (
      <Routes >
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
  )
}

export default App