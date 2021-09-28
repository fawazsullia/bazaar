const userReducer = (state = { signedIn : false}, action) => {

switch(action.type){

case 'setUserOnRegister' : 
  return action.payload


case 'addTocart' :
  return {...state , cart : [{productId : action.payload.id, count : 1}, ...state.cart]} 

  case 'signOut' : 
  return { signedIn : false  }

 default : return state 


}




}

export default userReducer