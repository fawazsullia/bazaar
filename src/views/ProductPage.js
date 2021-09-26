import React from 'react'
import * as productPageStyle from './styles/productPage.module.css'

function ProductPage() {
    return (
        <div className={productPageStyle.container}>
            <div className={productPageStyle.productContainer}>
<div className={productPageStyle.productImage}></div>
<div className={productPageStyle.productDetails}></div>

            </div>
            <div></div>
        </div>
    )
}

export default ProductPage
