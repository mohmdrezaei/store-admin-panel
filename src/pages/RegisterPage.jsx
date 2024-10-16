import React from 'react'

function RegisterPage() { 
    const submitHandler = (e) => {
        e.preventDefault()
        console.log("register")
    }
  return (
    <div>
        <h1>فرم ثبت نام</h1>
        <form onSubmit={submitHandler}>
            <input type="text"  placeholder='نام کاربری'/>
            <input type="password"  placeholder='رمز عبور'/>
            <input type="password" placeholder='تکرار رمز عبور'/>
            <button type='submit'>ثبت نام</button>
        </form>
        <a href="#">حساب کاربری دارید؟</a>
    </div>
    
  )
}

export default RegisterPage