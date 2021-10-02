import React from 'react'
import {Link} from 'react-router-dom'
import * as thankyouStyle from './styles/thankyou.module.css'

function ThankYou() {
    return (
        <div className={thankyouStyle.container}>
            <h1>Thank You for Shopping with us.</h1>
            <p className={thankyouStyle.p}>Your order is being processed.</p>
            <Link to="/" style={{textDecoration : "none", color : "white"}}><p className={thankyouStyle.btn}>Shop</p></Link>
        </div>
    )
}

export default ThankYou
