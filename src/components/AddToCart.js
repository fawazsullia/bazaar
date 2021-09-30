import React, {useState} from 'react'
import * as addTocartStyle from './styles/addTocart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router';

function AddToCart({product, marginTop}) {

    const [redirect, setredirect] = useState(false)
    const [adding, setadding] = useState(false)

    

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { addTocart } = bindActionCreators(actionCreators, dispatch);

    if(state.currentUser.signedIn){
    var status = state.currentUser.cart.filter((prod)=>  prod.productId == product.id ).length
    }
    

    const tocart = () => {
        

if(status){ alert("Item already in cart")    }
else{
        
        if(state.currentUser.signedIn){
            setadding(true)
        addTocart(product);
       console.log(product);

fetch('https://bazaar-back.herokuapp.com/user/cart/add', {

method : 'PUT',
headers : {
    'content-type' : 'application/json'
},
body : JSON.stringify({uid : state.currentUser.uid, productId : product.id})

})
.then((res)=> res.json())
.then((response)=> setadding(false))
.catch((err) => {console.log(err); setadding(false)})


        }
        else { setredirect(true)   }}

    }
    
        
    return (

        redirect ? <Redirect to="/login" /> :
        <button className={addTocartStyle.btn} style={{marginTop : marginTop}} onClick={tocart}>
{ adding ? "Adding...." : "Add To Cart"}

        </button>
    )
}

export default AddToCart
