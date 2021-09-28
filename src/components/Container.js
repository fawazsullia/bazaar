import React, { Children } from "react";
import {Link, NavLink} from 'react-router-dom'
import * as containerStyle from "./styles/container.module.css";
import firebase from "../firebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";



function Container({ children }) {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setProduct, setUserOnRegister, signOut } = bindActionCreators(actionCreators, dispatch);

  const signedIn = state.currentUser.signedIn;

  const handleSignOut = () => {
    firebase.auth().signOut().then(() => {
      localStorage.removeItem("userUid")
      alert("Signed Out successfully");
      signOut()
      
    }).catch((error) => {
      alert("Couldn't sign out")
    });
  }



const linkStyle = {
  textDecoration : "none",
  color : "inherit"
}

const linkActiveStyle = {
  color : "black",
  fontWeight : "600"
}


  return (
    <div className={containerStyle.outerContainer}>
      <div className={containerStyle.container}>
        <div className={containerStyle.logoDiv}>
          <p><Link to="/" style={linkStyle}  >Bazaar</Link></p>
        </div>
        <nav className={containerStyle.navigation}>
          <ul>
            <li><NavLink style={linkStyle} activeStyle={linkActiveStyle} to="/profile">Profile</NavLink></li>
            <li><NavLink style={linkStyle} activeStyle={linkActiveStyle} to="/login">Login</NavLink></li>
            <li><NavLink style={linkStyle} activeStyle={linkActiveStyle} to="/register">Register</NavLink></li>
            <li><NavLink style={linkStyle} activeStyle={linkActiveStyle} to="/admin">Admin</NavLink></li>
            <li className={containerStyle.cartIcon}>
            <Link style={linkStyle} to="/cart"><img src="shoppingCart.png"></img></Link>
            </li>
          </ul>
        </nav>
       { signedIn && <button type="button" onClick={handleSignOut}  className={containerStyle.signOut}>Log Out</button> }
      </div>
      {children}
      <footer className={containerStyle.footer}>
        <p>Made by Fawaz Sullia</p>
      </footer>
    </div>
  );
}

export default Container;
