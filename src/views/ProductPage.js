import React from "react";
import * as productPageStyle from "./styles/productPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Product from "../components/Product";
import AddToCart from "../components/AddToCart";

function ProductPage() {
  const state = useSelector((state) => state);
  const productId = useLocation().pathname.trim().replace("/product/", "");
  const currentProduct = state.products.filter(
    (product) => product.id === Number(productId)
  )[0];

  return (
    <div className={productPageStyle.container}>
      <div className={productPageStyle.productContainer}>
        <div className={productPageStyle.productImage}>
          <img src={currentProduct.image} />
        </div>
        <div className={productPageStyle.productDetails}>
          <h2>{currentProduct.title}</h2>
          <span>
            {currentProduct.rating.rate}{" "}
            <img className={productPageStyle.star} src="/star.png" />{" "}
          </span>
          <span> /{currentProduct.rating.count} reviews</span>
          <p className={productPageStyle.price}>$ {currentProduct.price}</p>

          <p className={productPageStyle.description}>
            {currentProduct.description}. Bazaar has the best quality items and
            offer 30 days money back guarantee, no questions asked.
          </p>

          <AddToCart marginTop={"20px"} product={currentProduct} />
        </div>
      </div>
      <div className={productPageStyle.related}>
        <h3>Some similar products</h3>
        <div className={productPageStyle.relatedProducts}>
          {state.products
            .filter(
              (product) =>
                product.category === currentProduct.category &&
                product.id !== currentProduct.id
            )
            .map((product) => {
              return <Product product={product} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
