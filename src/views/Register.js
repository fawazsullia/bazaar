import React, {useState} from "react";
import * as registerStyle from "./styles/register.module.css";
import {Link, Redirect} from 'react-router-dom'
import firebase from '../firebaseConfig'

function Register() {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [confirmPass, setconfirmpass] = useState("")
  const [registering, setregistering] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")


  //function to signup with email
  
  const registerWithEmail = () => {
    
    if(password === confirmPass){
    setregistering(true)
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    setregistering(false)
    window.location.replace("http://localhost:3000/register-2");

  })
  .catch((error) => {
    setregistering(false)
    seterrorMessage(error.message)
    // ..
  });
}   else { seterrorMessage("Passwords don't match")}

  }

const registerWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    window.location.replace("http://localhost:3000/register-2");
  }).catch((error) => {
    console.log(error)
  });


}



  return (
    <div className={registerStyle.container}>
        <div className={registerStyle.formContainer}>
      <form className={registerStyle.form}>
        <h2>Please register here</h2>
        <input type="email" placeholder="Email" onChange={(e)=>{ setemail(e.target.value) }} value={email}></input>
        <br />
        <input type="password" placeholder="Password" onChange={(e)=>{ setpassword(e.target.value) }} value={password}></input>
        <br />
        <input type="password" placeholder="Confirm Password" onChange={(e)=> {setconfirmpass(e.target.value)}}></input>
        <p>{errorMessage}</p>
        <br />
        <button type="button" onClick={registerWithEmail}>{registering ? "Registering..." : "Register"}</button>
      </form>
      <p>Have an account? <Link to="/login">Login here</Link></p>
      <div className={registerStyle.signupWithGoogle}>
          <p style={{textAlign : "center"}}>OR</p>
          <button type="button"  onClick={registerWithGoogle}><span style={{fontWeight : "700", color : "#428BCA"}}>G</span>  Signup with google</button>
      </div>
      </div>
    </div>
  );
}

export default Register;
