const userReducer = (state = {}, action) => {

switch(action.type){

case 'setUserOnRegister' : 
  return action.payload

 default : return state 


}




}

export default userReducer