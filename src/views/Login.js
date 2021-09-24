import React from "react";
import * as loginStyle from "./styles/login.module.css";
import {Link} from 'react-router-dom'

function Login() {
  return (
    <div className={loginStyle.container}>
        <div className={loginStyle.formContainer}>
      <form className={loginStyle.form}>
        <h2>Please Login here</h2>
        <input type="email" placeholder="Email"></input>
        <br />
        <input type="password" placeholder="Password"></input>
        <br />
        <button type="button">Login</button>
      </form>
      <p>New here?<Link to="/register"> Register here</Link></p>
      <div className={loginStyle.loginWithGoogle}>
          <p style={{textAlign : "center"}}>OR</p>
          <button type="button"><span style={{fontWeight : "700", color : "#428BCA"}}>G</span>  Login with Google</button>
      </div>
      </div>
    </div>
  );
}

export default Login;

