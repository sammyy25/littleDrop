import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { productListReducer, productSaveReducer, productDeleteReducer } from './reducer/productReducer';
import thunk from 'redux-thunk'
import { userRegisterReducer, userSigninReducer, getOtpReducer, confirmOtpReducer, forPwsReducer } from './reducer/userReducers';
import Cookie from 'js-cookie';


const userInfo = Cookie.get("userInfo") || null;
const requestId = Cookie.get('requestId');
const userOtp = Cookie.get("userOtp") || null;

const initialState = { userSignin: { userInfo }, userRegister: {userInfo}, getOtp: {requestId}, userForPsw: {userOtp}}
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