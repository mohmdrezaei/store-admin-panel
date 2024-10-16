import React, { useState } from "react";
import { registerUser } from "../services/auth";

function RegisterPage() {
  const [username , setUsername] =useState ("")
  const [password, setPassword] = useState("");
  const submitHandler =async (e) => {
    e.preventDefault();
    const {response , error} = await registerUser(username, password)
     console.log({response , error})
  };

  return (
    <div>
      <h1>فرم ثبت نام</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        {/* <input type="password" placeholder='تکرار رمز عبور'/> */}
        <button type="submit">ثبت نام</button>
      </form>
      <a href="#">حساب کاربری دارید؟</a>
    </div>
  );
}

export default RegisterPage;
