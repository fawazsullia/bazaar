import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import * as cartStyle from './styles/cart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";


function Cart() {

const state = useSelector(state => state)
let requiredProduct;

const [amount, setamount] = useState(0)

const dispatch = useDispatch()
const { setProduct, setUserOnRegister, changeCartCount, deleteFromcart } = bindActionCreators(actionCreators, dispatch);



const changeCount = (e) =>{

    let productId = Number(e.target.id)
    let count = e.target.value;

    changeCartCount({productId : productId, count : count})

    fetch('https://bazaar-back.herokuapp.com/user/cart/count', {

method : 'PUT',
headers : {
    'content-type' : 'application/json'
},
body : JSON.stringify({ uid : state.currentUser.uid, count : count, productId : productId})

    } )
    .then((res)=> res.json())
    .then((response)=> { console.log(response)     })
    .catch((err)=> {console.log(err)})

}

const deleteItem = (e) => {

let productId = Number(e.target.id);
deleteFromcart(productId)
fetch('https://bazaar-back.herokuapp.com/user/cart/del', { 

method : 'PUT', 
headers : {
    'content-type' : 'application/json'
},
body : JSON.stringify({uid: state.currentUser.uid , productId : productId})

 })
 .then((res)=> {res.json()})
 .then((response)=> { console.log(response)  })
 .catch((err)=> {console.log(err)})

}




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
                            <select onChange={changeCount} id={requiredProduct.id} value={product.count}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                            </select>
                            <span id={requiredProduct.id} onClick={deleteItem}>delete</span>
                        </div>
                    </div>
                    
                </div>
                }      )     }
             </div>
            </div>
            <div className={cartStyle.totalDiv}>
                <p className={cartStyle.moneyback}>100% Pay Protection</p>
                <p>Cart Total (4 items) : $200</p>
              { state.currentUser.cart.length === 0 ? <button type="button" disabled="true">Cart is Empty</button> : <Link to="/checkout"><button type="button">Buy</button></Link> }
            </div>
        </div>
    )
}

export default Cart
