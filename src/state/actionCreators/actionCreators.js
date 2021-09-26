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
