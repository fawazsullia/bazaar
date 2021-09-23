import React from 'react'
import * as productStyle from './styles/product.module.css'

function Product({product}) {
    return (
        <div className={productStyle.container}>
          <img src={product.image} className={productStyle.image} />
          <p className={productStyle.price}>$ {product.price}</p>  
          <p className={productStyle.title}>{product.title}</p>  
            <button className={productStyle.button}>Add to cart</button>
        </div>
    )
}

export default Product
