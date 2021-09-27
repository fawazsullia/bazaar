import React from 'react'
import {useSelector} from 'react-redux'
import * as cartStyle from './styles/cart.module.css'

function Cart() {

const state = useSelector(state => state)
let requiredProduct;

    return (
        <div className={cartStyle.container}>
            <div className={cartStyle.cartListContainer}>
             <h2>Shopping Cart</h2>   
             <hr />
             <div className={cartStyle.cartList}>
                 { state.currentUser.cart.map((product)=>  { requiredProduct = state.products.filter((selected)=> selected.id === product.productId    )[0];
                
                return <div className={cartStyle.product}>
                    <img src={requiredProduct.image} />
                    <div className={cartStyle.details}>
                        <span className={cartStyle.prodTitle} >{requiredProduct.title}</span>
                        <span>$ {requiredProduct.price}</span>
                        {/* <p>{requiredProduct.description}</p> */}
                        <div className={cartStyle.edit}>
                            <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                            <span>delete</span>
                        </div>
                    </div>
                    
                </div>
                }      )     }
             </div>
            </div>
            <div className={cartStyle.totalDiv}>
                <p className={cartStyle.moneyback}>100% Pay Protection</p>
                <p>Cart Total (4 items) : $200</p>
                <button type="button">Buy</button>
            </div>
        </div>
    )
}

export default Cart
