import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth";
import { setCookie } from "../utils/cookie";

function LoginPage({ formData, setFormData }) {
  const navigate = useNavigate()
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
const submitHandler = async(e) => {
  e.preventDefault();
  const { username, password } = formData;
  const {response , error} =await loginUser(username, password);
  if(response) {
    console.log("ورود با موفقیت انجام شد:", response);
    setCookie(response.data)
    navigate("/dashboard")
  }
  if(error) {
    console.log("ورود با مشکل روبرو شد!:", error.response.data.message);
    alert(error.response.data.message);
  }
}

  return (
    <div>
      <h1>فرم ورود</h1>
      <form onSubmit={submitHandler}>
        <input
          name="username"
          type="text"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={changeHandler}
        />
        <button type="submit"> ورود</button>
        <Link to="/register">ایجاد حساب کاربری</Link>
      </form>
    </div>
  );
}

export default LoginPage;
