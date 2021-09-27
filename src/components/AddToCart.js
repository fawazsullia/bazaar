import React from 'react'
import * as addTocartStyle from './styles/addTocart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";

function AddToCart({product, marginTop}) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { addTocart } = bindActionCreators(actionCreators, dispatch);

    const tocart = () => {

        addTocart(product)

    }
    
        
    return (
        <button className={addTocartStyle.btn} style={{marginTop : marginTop}} onClick={tocart}>
Add To Cart

        </button>
    )
}

export default AddToCart
