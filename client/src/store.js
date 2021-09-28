import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productSaveReducer, productDeleteReducer } from './reducer/productReducer';
import thunk from 'redux-thunk'
import { userRegisterReducer, userSigninReducer, getOtpReducer, confirmOtpReducer, forPwsReducer } from './reducer/userReducers';


const userInfo = localStorage.getItem("userInfo") || null;
const requestId = localStorage.getItem('requestId');
const userOtp = localStorage.getItem("userOtp") || null;

const initialState = { userSignin: { userInfo }, userRegister: {userInfo}, getOtp: {requestId}, pswFor: {userOtp}}
const reducer = combineReducers({
    productList: productListReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    getOtp: getOtpReducer,
    otpConfirm: confirmOtpReducer,
    pswFor: forPwsReducer
})

const store = createStore(reducer, initialState, compose(applyMiddleware(thunk)));

export default store;