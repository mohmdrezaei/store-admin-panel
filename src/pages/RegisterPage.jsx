
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import styles from "./AuthPage.module.css"
import logo from "assets/Union.png"
import { useRegister } from "services/mutations";
import { toast } from "react-toastify";

function RegisterPage({ formData, setFormData }) {
  const navigate = useNavigate();
  const  {mutate} = useRegister()
  const { register, handleSubmit, formState: { errors } } = useForm();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = async (e) => {
    const { username, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("گذرواژه ها مطابقت ندارند. لطفا دوباره امتحان کنید.")
      return;
    }

    mutate({username , password},
      {
        onSuccess: () => {
          toast.success("ثبت نام با موفقیت انجام شد!")
          setFormData({ username: "", password: "" });
          navigate("/login");
        },
        onError: () => {
         toast.error("ثبت نام با مشکل روبرو شد")
        },
      }
    )

  };

  return (
    <div className={styles.auth}>
      <img src={logo} alt="" />
      <h1>فرم ثبت نام</h1>
      <form onSubmit={handleSubmit(submitHandler)} onChange={changeHandler}>
        <input
          type="text"
          name="username"
          placeholder="نام کاربری"
          className={styles.input}
          id="username"
          {...register('username', { required: true})} 
        />
         {errors.username && errors.username.type === "required" && <span>نام کاربری الزامی است</span>}
        <input
          type="password"
          name="password"
          placeholder="رمز عبور"
          className={styles.input}
          {...register('password', { required: true})} 
        />
         {errors.password && errors.password.type === "required" && <span>پسورد الزامی است</span>}
        <input
          type="password"
          name="confirmPassword"
          placeholder="تکرار رمز عبور"
          className={styles.input}
        />
        <button type="submit">ثبت نام</button>
      </form>
      <Link to="/login">حساب کاربری دارید؟</Link>
    </div>
  );
}

export default RegisterPage;
