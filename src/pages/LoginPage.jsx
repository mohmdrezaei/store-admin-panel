import { Link, useNavigate } from "react-router-dom";

import { setCookie } from "utils/cookie";

import styles from "./AuthPage.module.css";
import logo from "assets/Union.png";
import { useLogin } from "services/mutations";

function LoginPage({ formData, setFormData }) {
  const navigate = useNavigate();
  const { mutate } = useLogin();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log("ورود با موفقیت انجام شد:", data);
          setCookie(data?.data.token);
          navigate("/dashboard");
        },
        onError: (error) => {
          console.log("ثبت نام با مشکل ربرو شد!:", error.response.data.message);
        },
      }
    );
  };

  return (
    <div className={styles.auth}>
      <img src={logo} alt="" />
      <h1>فرم ورود</h1>
      <form onSubmit={submitHandler}>
        <input
          name="username"
          type="text"
          placeholder="نام کاربری"
          value={formData.username}
          onChange={changeHandler}
          className={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="رمز عبور"
          value={formData.password}
          onChange={changeHandler}
          className={styles.input}
        />
        <button type="submit"> ورود</button>
        <Link to="/register">ایجاد حساب کاربری!</Link>
      </form>
    </div>
  );
}

export default LoginPage;
