import React, {useState} from 'react'
import * as addTocartStyle from './styles/addTocart.module.css'
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../state/actionCreators/index";
import { bindActionCreators } from "redux";
import { Redirect } from 'react-router';
import firebase from '../firebaseConfig'

function AddToCart({product, marginTop}) {

    const [redirect, setredirect] = useState(false)

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { addTocart } = bindActionCreators(actionCreators, dispatch);

    const tocart = () => {
        
        if(state.currentUser.signedIn){
        addTocart(product);
        let userRef = firebase.database().ref('users/' + state.currentUser.uid + "/cart");
        
        userRef.on('value', (snapshot) => {
            const data = snapshot.val();

            if(data){ userRef.update([{productId : product.id}, ...data])    }
            else { userRef.set( [{ productId : product.id, count : 1   }]  )  }
            console.log(data)
          });
        }
        else { setredirect(true)   }

    }
    
        
    return (

        redirect ? <Redirect to="/login" /> :
        <button className={addTocartStyle.btn} style={{marginTop : marginTop}} onClick={tocart}>
Add To Cart

        </button>
    )
}

export default AddToCart
