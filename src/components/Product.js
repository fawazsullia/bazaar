import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";
import * as productStyle from "./styles/product.module.css";

function Product({ product }) {
  const id = product.id;

  return (
    <div className={productStyle.container}>
      <p className={productStyle.view}>
        {" "}
        <Link
          to={`/product/${product.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          View Product
        </Link>
      </p>
      <img src={product.image} className={productStyle.image} />
      <p className={productStyle.price}>$ {product.price}</p>
      <p className={productStyle.title}>{product.title}</p>
      <AddToCart product={product} />
    </div>
  );
}

export default Product;
