import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "./state/actionCreators/index";
import { bindActionCreators } from "redux";

import Container from "./components/Container";
import Shop from "./views/Shop";

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

  return (
    <div className="App">
      <Container>
        <Shop />
      </Container>
    </div>
  );
}

export default App;
