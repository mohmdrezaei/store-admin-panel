import React from 'react'

function LoginPage() {
  return (
    <div>
        <h1>فرم ورود</h1>
        <form>
            <input type="text"  placeholder='نام کاربری'/>
            <input type="password"  placeholder='رمز عبور'/>
            <button type='submit'> ورود</button>
            <a href="#">حساب کاربری دارید؟</a>
        </form>
    </div>
  )
}

export default LoginPage