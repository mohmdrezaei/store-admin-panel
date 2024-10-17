import React, { useState } from "react";
import { registerUser } from "../services/auth";

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("گذرواژه ها مطابقت ندارند. لطفا دوباره امتحان کنید.");
      return;
    }

    const { response, error } = await registerUser(username, password);
    if(response){
      console.log("ثبت نام با موفقیت انجام شد:", response);
    }
    if(error){
      console.log("ثبت نام با مشکل ربرو شد!:", error.response.data.message);
    }
  };

  return (
    <div>
      <h1>فرم ثبت نام</h1>
      <form onSubmit={submitHandler}>
      <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={changeHandler}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={changeHandler} 
        />
        <input
          type="password"
          name="confirmPassword" 
          placeholder="تکرار رمز عبور"
          value={formData.confirmPassword}
          onChange={changeHandler}
        />
        <button type="submit">ثبت نام</button>
      </form>
      <a href="#">حساب کاربری دارید؟</a>
    </div>
  );
}

export default RegisterPage;
