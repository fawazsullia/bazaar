import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state/actionCreators/index";
import { bindActionCreators } from "redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Register from "./views/Register";

import Container from "./components/Container";
import Shop from "./views/Shop";
import Login from "./views/Login";
import AfterRegister from "./views/AfterRegister";
import ProductPage from "./views/ProductPage";
import Cart from "./views/Cart";
import Loader from "./components/Loader";
import Checkout from "./views/Checkout";
import Profile from "./views/Profile";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setProduct, setUserOnRegister } = bindActionCreators(actionCreators, dispatch);

  const [loading, setloading] = useState(false)

  //fetch data when initial loading

  useEffect(() => {
    setloading(true)
    const uid = localStorage.getItem("userUid");
    console.log(uid)
    if(uid){

      fetch(`https://bazaar-back.herokuapp.com/user/${uid}`)
      .then((res)=> res.json())
      .then((data)=> {const toSet =  {
        displayName: data.displayName,
        email: data.email,
        address : data.address,
        uid : data.uid,
        signedIn : true,
        cart : data.cart,
        orders : data.orders,
        userType : data.userType
        }
        setUserOnRegister(toSet);

      })

  
;}
else {  setUserOnRegister({signedIn : false})   }
}, []);

useEffect(() => {
  fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    setProduct(data); setloading(false)
  })
  .catch((err) => setloading(false));
  
}, [])
   
let signedIn = state.currentUser.signedIn

console.log(state)

if(loading){  return <Loader />    }
else {
  return (
    <div className="App">
      <Container>
        <Switch>

          <Route exact path="/">
        <Shop />
        </Route>

        <Route path="/register">
        <Register />
        </Route>

        <Route path="/login">
        <Login />
        </Route>

        <Route path="/register-2">
        <AfterRegister />
        </Route>

        <Route path="/product/">
        <ProductPage />
        </Route>

        

        { signedIn ? <Route path="/checkout"  component={Checkout} /> : <Redirect to="/login" /> }


        { signedIn ? <Route path="/profile"  component={Profile} /> : <Redirect to="/login" /> }

        <Route path="/loader">
          <Loader />
        </Route>

        { signedIn ? <Route path="/cart"  component={Cart} /> : <Redirect to="/login" /> }

        
          

        </Switch>
      </Container>
    </div>
  );}
}

export default App;
