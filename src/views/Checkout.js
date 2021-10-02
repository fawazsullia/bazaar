import React, {useState} from 'react'
import * as checkoutStyle from './styles/checkout.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";
import {todayDate} from '../helpers/todayDate'
import { Redirect } from 'react-router';
import {calculateTotal} from '../helpers/calculateTotal'


function  Checkout () {

    const state = useSelector(state => state)
    const dispatch = useDispatch();
  const { order, emptyCart } = bindActionCreators(actionCreators, dispatch);
    let requiredProduct;

let cartTotal = calculateTotal(state.products, state.currentUser.cart)

    const [ordering, setordering] = useState(false)
    const [redirect, setredirect] = useState(false)

    const handleOrder = async () => {
        setordering(true)
        let newArray = []
        let tempobj = {}

        try{
        state.currentUser.cart.map(async (product)=>  { requiredProduct = state.products.filter((selected)=> selected.id === product.productId    )[0]; 
        
        tempobj = {
               uid : state.currentUser.uid, 
            date : todayDate() ,
            productId : requiredProduct.id ,
            title : requiredProduct.title,
            count : product.count,
            total : product.count * requiredProduct.price,
            status : "Processing",
            image : requiredProduct.image

        }

      let res = await fetch("https://bazaar-back.herokuapp.com/user/orders", {
            method : 'PUT',
            headers : {
                'content-type' : 'application/json'
            },
            body : JSON.stringify(tempobj)
        }); 

    let response = await res.json()
     order(tempobj)   
        
        })
    setTimeout(() => {
        setordering(false)
        emptyCart();
    setredirect(true) 
    }, 2000);
   
    }
        catch(err){  console.log(err); setordering(false)}


    //     let promises = []
    //     newArray.forEach((obj)=> { let temp = fetch("https://bazaar-back.herokuapp.com/user/orders", {
    //         method : 'PUT',
    //         headers : {
    //             'content-type' : 'application/json'
    //         },
    //         body : JSON.stringify(obj)
    //     }); 
    // promises.push(temp)     }
        
    //     )

    //     console.log(promises)

    //     try{
    //    const res = await Promise.all(promises)
    //    const result = await res.map((arr)=> { arr.json()})
    //    console.log(result)
    //     }
    //     catch(err){
    //         throw Error("Could not order right now")
    //     }

    }


    return (

        redirect ? <Redirect to="/thank-you" /> :

        <div className={checkoutStyle.container}>
        <h3>Checkout</h3>

            <div className={checkoutStyle.firstRow}>
                <div className={checkoutStyle.addressContainer}>
        <p style={{fontWeight : "600"}}>Shipping address:</p>
        <p className={checkoutStyle.address}>{state.currentUser.address}</p>
                </div>

                <div className={checkoutStyle.totalContainer}>
        <h3>Total:</h3>
        <p>$ {cartTotal}</p>
        <button type="button" onClick={handleOrder}>{ ordering ? "Ordering..." : "Place Order"}</button>

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

            <button className={checkoutStyle.placeOrder2} type="button" onClick={handleOrder}>{ ordering ? "Ordering..." : "Place Order"}</button>
        </div>
    )
}

export default Checkout
