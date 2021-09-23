import React, { useState } from "react";
import { useSelector } from "react-redux";
import Product from "../components/Product";
import * as shopStyle from "./styles/shop.module.css";

function Shop() {
  const state = useSelector((state) => state);
  const [currentCategory, setcurrentCategory] = useState("all");
  const [activeCategory, setactiveCategory] = useState("1")

  return (
    <div className={shopStyle.container}>
      <div className={shopStyle.bannerDiv}></div>
      <div>
        <div className={shopStyle.flexDiv}>
          <div className={shopStyle.categoryDiv}>
            <p>Categories</p>
            <ul>
              <li id="1"
              onClick={() => {setcurrentCategory("all"); setactiveCategory('1')}}
              style={{ backgroundColor : activeCategory === '1' ? "#E5E5E5" : ""}}
              >All
              </li>
              <li id="2"
                onClick={() => {
                  setcurrentCategory("men's clothing");  setactiveCategory('2')
                }}
                style={{ backgroundColor : activeCategory === '2' ? "#E5E5E5" : ""}}
                >Men's clothing
              </li>
              <li id="3"
                onClick={() => {
                  setcurrentCategory("women's clothing");  setactiveCategory('3')
                }}
                style={{ backgroundColor : activeCategory === '3' ? "#E5E5E5" : ""}}
              >
                Women's clothing
              </li>
              <li id="4"
                onClick={() => {
                  setcurrentCategory("jewelery");  setactiveCategory('4')
                }}
                style={{ backgroundColor : activeCategory === '4' ? "#E5E5E5" : ""}}
              >
                Jewelery
              </li>
              <li id="5"
                onClick={() => {
                  setcurrentCategory("electronics");  setactiveCategory('5')
                }}
                style={{ backgroundColor : activeCategory === '5' ? "#E5E5E5" : ""}}
              >
                Electronics
              </li>
            </ul>
          </div>
          <div className={shopStyle.productListDiv}>
            {state.products
              .filter((product) => {
                if (currentCategory !== "all") {
                  return product.category === currentCategory;
                } else {
                  return product.price > 0;
                }
              })
              .map((product) => {
                return <Product product={product} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
