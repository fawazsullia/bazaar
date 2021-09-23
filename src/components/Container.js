import React, { Children } from "react";
import * as containerStyle from "./styles/container.module.css";

function Container({ children }) {
  return (
    <div className={containerStyle.outerContainer}>
      <div className={containerStyle.container}>
        <div className={containerStyle.logoDiv}>
          <p>Bazaar</p>
        </div>
        <nav className={containerStyle.navigation}>
          <ul>
            <li>Profile</li>
            <li>Login</li>
            <li>Register</li>
            <li>Admin</li>
            <li className={containerStyle.cartIcon}>
              <img src="shoppingCart.png"></img>
            </li>
          </ul>
        </nav>
      </div>
      {children}
      <footer className={containerStyle.footer}>
        <p>Made by Fawaz Sullia</p>
      </footer>
    </div>
  );
}

export default Container;
