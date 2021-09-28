import axios from "axios";
import { USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,
     OTP_REQUEST, OTP_SUCCESS, OTP_FAIL, CONFIRM_OTP_REQUEST, CONFIRM_OTP_SUCCESS, CONFIRM_OTP_FAIL, EMAIL_OTP_REQUEST, EMAIL_OTP_SUCCESS, EMAIL_OTP_FAIL } from "../constant/userConst";

const signin = (email, password) => async (dispatch) => {
    dispatch({type: USER_SIGNIN_REQUEST, payload: {email, password}});
    try {
        const {data} = await axios.post("/api/users/signin", {email, password});
        dispatch({type: USER_SIGNIN_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_SIGNIN_FAIL, payload:error.message});
    }
}

const otpRequest = (requestId) => async (dispatch) => {
    dispatch({type: OTP_REQUEST, payload: {requestId}});
    try {
        const {data} = await axios.post("/api/users/getOtp", {requestId});
        dispatch({type: OTP_SUCCESS, payload:data});
        localStorage.setItem('requestId', JSON.stringify(data));
        console.log(data)
    } catch (error) {
        dispatch({type: OTP_FAIL, payload:error.message});
    }
}

const forPsw = (email, otp) => async (dispatch) => {
    dispatch({type: EMAIL_OTP_REQUEST, payload: {email, otp}});
    try {
        const {data} = await axios.post("/api/users/getOtp", {email, otp});
        dispatch({type: EMAIL_OTP_SUCCESS, payload:data});
        localStorage.setItem('userOtp', JSON.stringify(data));
        console.log(data)
    } catch (error) {
        dispatch({type: EMAIL_OTP_FAIL, payload:error.message});
    }
}

const confirmOtp = (result, requestId) => async (dispatch) => {
    dispatch({type: CONFIRM_OTP_REQUEST, payload: {result, requestId}});
    try {
        const {data} = await axios.post("/api/users/otp", { result});
        dispatch({type: CONFIRM_OTP_SUCCESS, payload:data});
        localStorage.setItem('result', JSON.stringify(data));
        console.log(result)
    } catch (error) {
        dispatch({type: CONFIRM_OTP_FAIL, payload:error.message});
    }
}

const register = (name, email, password, phone) => async (dispatch) => {
    dispatch({type: USER_REGISTER_REQUEST, payload: {name, email, phone, password}});
    try {
        const {data} = await axios.post("/api/users/register", {name, email, phone, password});
        dispatch({type: USER_REGISTER_SUCCESS, payload:data});
        localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload:error.message});
    }
}

export { signin, register, otpRequest, confirmOtp, forPsw};