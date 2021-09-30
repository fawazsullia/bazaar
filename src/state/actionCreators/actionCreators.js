 export const setProduct = (data) => {
  return (dispatch) => {
    dispatch({ type: 'setProducts', payload: data });
  };
};

export const setUserOnRegister = (data) => {

return (dispatch) => {

  dispatch( { type : 'setUserOnRegister' , payload : data  }  )
}

}

export const addTocart = (data) => {

return (dispatch)=>{

  dispatch({type : "addTocart", payload : data})

}

}

export const signOut = () => {

return (dispatch)=> {
  dispatch({type : "signOut"})
}


}

export const changeCartCount = (data) => {

return (dispatch) => {
  dispatch({type : 'changeCartCount', payload : data})
}

}

export const deleteFromcart = (data) => {

return (dispatch) => {
  dispatch({type : 'deleteFromCart', payload : data})
}

}
