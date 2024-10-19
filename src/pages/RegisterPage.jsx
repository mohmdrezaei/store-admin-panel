import { registerUser } from "services/auth";
import { Link, useNavigate } from "react-router-dom";

import styles from "./AuthPage.module.css"
import logo from "assets/Union.png"

function RegisterPage({ formData, setFormData }) {
  const navigate = useNavigate();

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
    if (response) {
      console.log("ثبت نام با موفقیت انجام شد:", response);
      setFormData({ username: "", password: "" });
      navigate("/login");
    }
    if (error) {
      console.log("ثبت نام با مشکل ربرو شد!:", error.response.data.message);
    }
  };

  return (
    <div className={styles.auth}>
      <img src={logo} alt="" />
      <h1>فرم ثبت نام</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={changeHandler}
          className={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={changeHandler}
          className={styles.input}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          value={formData.confirmPassword}
          onChange={changeHandler}
          className={styles.input}
        />
        <button type="submit">ثبت نام</button>
      </form>
      <Link to="/login">حساب کاربری دارید؟</Link>
    </div>
  );
}

export default RegisterPage;
