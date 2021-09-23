 export const setProduct = (data) => {
  return (dispatch) => {
    dispatch({ type: 'setProducts', payload: data });
  };
};
