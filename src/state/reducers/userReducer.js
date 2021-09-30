const userReducer = (state = { signedIn : false}, action) => {

switch(action.type){

case 'setUserOnRegister' : 
  return action.payload


case 'addTocart' :
return { ...state, cart : [ {productId : action.payload.id, count : 1}   , ...state.cart    ]    } 


  case 'signOut' : 
  return { signedIn : false  }

  case 'changeCartCount' :
    let newCart = state.cart.filter((item)=> item.productId !== action.payload.productId )
    newCart.unshift({productId: action.payload.productId, count : action.payload.count})
    return { ...state, cart : newCart}

    case 'deleteFromCart' : 
    let modifiedCart = state.cart.filter((item)=> item.productId !== action.payload  )
    return { ...state, cart : modifiedCart}

 default : return state 


}




}

export default userReducer