const userReducer = (state = {}, action) => {

switch(action.type){

case 'setUserOnRegister' : 
  return action.payload


case 'addTocart' :
  return {...state , cart : [{productId : action.payload.id, count : 1}, ...state.cart]} 

 default : return state 


}




}

export default userReducer