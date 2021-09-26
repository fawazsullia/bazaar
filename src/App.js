import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state/actionCreators/index";
import { bindActionCreators } from "redux";
import { Switch, Route } from "react-router-dom";
import Register from "./views/Register";

import Container from "./components/Container";
import Shop from "./views/Shop";
import Login from "./views/Login";
import AfterRegister from "./views/AfterRegister";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { setProduct } = bindActionCreators(actionCreators, dispatch);

  //fetch data when initial loading

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

console.log(state)

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

        </Switch>
      </Container>
    </div>
  );
}

export default App;
