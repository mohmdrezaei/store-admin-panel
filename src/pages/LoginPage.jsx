import React from 'react'
import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <div>
        <h1>فرم ورود</h1>
        <form>
            <input type="text"  placeholder='نام کاربری'/>
            <input type="password"  placeholder='رمز عبور'/>
            <button type='submit'> ورود</button>
            <Link to="/register">ایجاد حساب کاربری</Link>
        </form>
    </div>
  )
}

export default LoginPage