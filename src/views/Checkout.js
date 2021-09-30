import React from 'react'
import * as checkoutStyle from './styles/checkout.module.css'
import { useSelector, useDispatch } from "react-redux";


function Checkout() {
    const state = useSelector(state => state)
    let requiredProduct;




    return (
        <div className={checkoutStyle.container}>
        <h3>Checkout</h3>

            <div className={checkoutStyle.firstRow}>
                <div className={checkoutStyle.addressContainer}>
        <p style={{fontWeight : "600"}}>Shipping address:</p>
        <p className={checkoutStyle.address}>Shipping address that is usally longer should go here, fetched from the user component</p>
                </div>

                <div className={checkoutStyle.totalContainer}>
        <h3>Total:</h3>
        <p>Rs 3000</p>
        <button>Place Order</button>

                </div>

            </div>

           
           
           
           <div className={checkoutStyle.productsContainer}>
            { state.currentUser.cart.map((product)=>  { requiredProduct = state.products.filter((selected)=> selected.id === product.productId    )[0];
            
            return <div className={checkoutStyle.cardContainer}>
                <span className={checkoutStyle.title}>{requiredProduct.title}</span>
                <span className={checkoutStyle.price}>$ {requiredProduct.price}</span>
                <span className={checkoutStyle.count}>{product.count}</span>
                <span className={checkoutStyle.total}>$ {product.count * requiredProduct.price}</span>
            </div>
            
            
            
    })}

            </div> 

            <div className={checkoutStyle.paymentContainer}>
            <h3>Select payment mode:</h3>
            <input type="radio" name="payment"></input> Cash on delivery <br />
            <input type="radio" name="payment"></input> Debit/Credit card <br />
            <input type="radio" name="payment"></input> Internet Banking

            </div>

            <button className={checkoutStyle.placeOrder2}>Place Order</button>
        </div>
    )
}

export default Checkout
