import { combineReducers } from "redux";
import productReducer from './productReducer'


const reducers = combineReducers({ products : productReducer});

export default reducers