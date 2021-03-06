import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as cartStyle from "./styles/cart.module.css";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";
import { calculateTotal } from "../helpers/calculateTotal";
import Spinner from "../components/Spinner";
import config from "../config";

function Cart() {
  const state = useSelector((state) => state);
  let requiredProduct;

  const [loading, setloading] = useState(false);

  const dispatch = useDispatch();
  const { changeCartCount, deleteFromcart } = bindActionCreators(
    actionCreators,
    dispatch
  );

  let cartTotal = calculateTotal(state.products, state.currentUser.cart);

  const changeCount = (e) => {
    setloading(true);
    let productId = Number(e.target.id);
    let count = e.target.value;

    changeCartCount({ productId: productId, count: count });

    fetch(`${config.baseUrl}/user/cart/count`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: state.currentUser.uid,
        count: count,
        productId: productId,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setloading(false);
      })
      .catch((err) => {
        alert("Failed to update cart");
        setloading(false);
      });
  };

  //delete item from cart
  const deleteItem = (e) => {
    setloading(true);
    let productId = Number(e.target.id);
    fetch(`${config.baseUrl}/user/cart/del`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        uid: state.currentUser.uid,
        productId: productId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((response) => {
        deleteFromcart(productId);
        setloading(false);
      })
      .catch((err) => {
        alert("Somrthing went wrong. Try again");
        setloading(false);
      });
  };

  return (
    <div
      className={cartStyle.container}
      style={{ opacity: loading ? "20%" : "" }}
    >
      <div className={cartStyle.cartListContainer}>
        {loading && <Spinner />}

        <h2>Shopping Cart</h2>
        <hr />
        {state.currentUser.cart.length == 0 ? (
          <p style={{ textAlign: "center", marginTop: "20%" }}>Cart is empty</p>
        ) : (
          <div className={cartStyle.cartList}>
            {state.currentUser.cart.map((product) => {
              requiredProduct = state.products.filter(
                (selected) => selected.id === product.productId
              )[0];

              return (
                <div className={cartStyle.product} key={requiredProduct.id}>
                  <img src={requiredProduct.image} />
                  <div className={cartStyle.details}>
                    <span className={cartStyle.prodTitle}>
                      {requiredProduct.title}
                    </span>
                    <span>$ {requiredProduct.price}</span>
                    {/* <p>{requiredProduct.description}</p> */}
                    <div className={cartStyle.edit}>
                      <select
                        onChange={changeCount}
                        id={requiredProduct.id}
                        value={product.count}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                      </select>
                      <span id={requiredProduct.id} onClick={deleteItem}>
                        delete
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className={cartStyle.totalDiv}>
        <p className={cartStyle.moneyback}>100% Pay Protection</p>
        <p>Cart Total : $ {cartTotal}</p>
        {state.currentUser.cart.length === 0 ? (
          <button type="button" disabled="true">
            Cart is Empty
          </button>
        ) : (
          <Link to="/checkout">
            <button type="button">Buy</button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Cart;
