import React from "react";
import * as registerStyle from "./styles/register.module.css";
import {Link} from 'react-router-dom'

function Register() {
  return (
    <div className={registerStyle.container}>
        <div className={registerStyle.formContainer}>
      <form className={registerStyle.form}>
        <h2>Please register here</h2>
        <input type="name" placeholder="Name"></input>
        <br />
        <input type="email" placeholder="Email"></input>
        <br />
        <input type="password" placeholder="Password"></input>
        <br />
        <input type="password" placeholder="Confirm Password"></input>
        <br />
        <button type="button">Register</button>
      </form>
      <p>Have an account? <Link to="/login">Login here</Link></p>
      <div className={registerStyle.signupWithGoogle}>
          <p style={{textAlign : "center"}}>OR</p>
          <button type="button"><span style={{fontWeight : "700", color : "#428BCA"}}>G</span>  Signup with google</button>
      </div>
      </div>
    </div>
  );
}

export default Register;
