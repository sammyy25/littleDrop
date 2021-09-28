import { CONFIRM_OTP_FAIL, CONFIRM_OTP_REQUEST, CONFIRM_OTP_SUCCESS, EMAIL_OTP_FAIL, EMAIL_OTP_REQUEST, EMAIL_OTP_SUCCESS, OTP_FAIL, OTP_REQUEST, OTP_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constant/userConst";

function userSigninReducer(state={}, action){
    switch(action.type){
        case USER_SIGNIN_REQUEST:
            return {loading: true};
        case USER_SIGNIN_SUCCESS:
            return{loading: false, userInfo: action.payload};
        case USER_SIGNIN_FAIL:
            return {loading: false, error: action.payload}
         default: return state;
    }
}
function getOtpReducer(state={}, action){
    switch(action.type){
        case OTP_REQUEST:
            return {loading: true};
        case OTP_SUCCESS:
            return{loading: false, requestId: action.payload};
        case OTP_FAIL:
            return {loading: false, error: action.payload}
         default: return state;
    }
}

function forPwsReducer(state={}, action){
    switch(action.type){
        case EMAIL_OTP_REQUEST:
            return {loading: true};
        case EMAIL_OTP_SUCCESS:
            return{loading: false, userOtp: action.payload};
        case EMAIL_OTP_FAIL:
            return {loading: false, error: action.payload}
         default: return state;
    }
}

function confirmOtpReducer(state={}, action){
    switch(action.type){
        case CONFIRM_OTP_REQUEST:
            return {loading: true};
        case CONFIRM_OTP_SUCCESS:
            return{loading: false, result: action.payload};
        case CONFIRM_OTP_FAIL:
            return {loading: false, error: action.payload}
         default: return state;
    }
}

function userRegisterReducer(state={}, action){
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading: true};
        case USER_REGISTER_SUCCESS:
            return{loading: false, userInfo: action.payload};
        case USER_REGISTER_FAIL:
            return {loading: false, error: action.payload}
         default: return state;
    }
}

export {
    userSigninReducer, userRegisterReducer, getOtpReducer, confirmOtpReducer, forPwsReducer
}