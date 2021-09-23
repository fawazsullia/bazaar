const accountReducer = (state = [], action) => {
  switch (action.type) {
    case "setProducts":
      return action.payload;
    default:
      return state;
  }
};

export default accountReducer;
