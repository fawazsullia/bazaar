import React, {useState} from "react";
import * as loginStyle from "./styles/login.module.css";
import {Link, Redirect} from 'react-router-dom'
import firebase from '../firebaseConfig'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";

function Login() {

  let provider = new firebase.auth.GoogleAuthProvider();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setUserOnRegister } = bindActionCreators(actionCreators, dispatch);

const [email, setemail] = useState("")
const [password, setpassword] = useState("")
const [redirect, setredirect] = useState(false)
const [errorMessage, seterrorMessage] = useState("")
const [signingIn, setsigningIn] = useState(false)

//login with email flow
const loginEmail = () => {
  setsigningIn(true)
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {

    let user = userCredential.user;

    //query db for userdata
    var userRef = firebase.database().ref('users/' + user.uid);
userRef.on('value', (snapshot) => {
  const data = snapshot.val();

  const toSet =  {
    displayName: data.displayName,
    email: data.email,
    address : data.address,
    uid : data.uid,
    signedIn : true,
    cart : data.cart || [],
    orders : data.orders || []
    }
    setUserOnRegister(toSet);
    setredirect(true);
    localStorage.setItem("userUid", data.uid );
});
    // ...
  })
  .catch((error) => {
    seterrorMessage(error.message)
  });

}


//google signin workflow
const loginGoogle = () => {
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    var uid = result.user.uid;

    //query db for user data
    var userRef = firebase.database().ref('users/' + uid);
    userRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const toSet =  {
        displayName: data.displayName,
        email: data.email,
        address : data.address,
        uid : data.uid,
        signedIn : true,
        cart : data.cart || [],
        orders : data.orders || []
        }
        setUserOnRegister(toSet);
        setredirect(true);
        localStorage.setItem("userUid", data.uid );
    });

  }).catch((error) => {
    seterrorMessage(error.message)
    setsigningIn(false)
  });

}


  return (
    redirect ? <Redirect to="/" /> :

    <div className={loginStyle.container}>
        <div className={loginStyle.formContainer}>
      <form className={loginStyle.form}>
        <h2>Please Login here</h2>
        <input type="email" placeholder="Email" onChange={(e)=>{ setemail(e.target.value)}   }></input>
        <br />
        <input type="password" placeholder="Password" onChange={(e)=>{ setpassword(e.target.value)}   }></input>
        <p>{errorMessage}</p>
        <br />
        <button type="button" onClick={loginEmail}>{ signingIn ? "Logging In..." : "Login"}</button>
      </form>
      <p>New here?<Link to="/register"> Register here</Link></p>
      <div className={loginStyle.loginWithGoogle}>
          <p style={{textAlign : "center"}}>OR</p>
          <button type="button" onClick={loginGoogle}><span style={{fontWeight : "700", color : "#428BCA"}}>G</span>  Login with Google</button>
      </div>
      </div>
    </div>
  );
}

export default Login;

