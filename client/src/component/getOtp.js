// <!-- {{ message }}

// <form method="post" action="verify">
//     <input name="number" type="tel">
//     <button>Get Code</button>
// </form> -->

import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {otpRequest} from '../action/userAction';

function GetOtp(props) {
    const userSignin = useSelector(state => state.userSignin);
     const {userInfo} = userSignin;

     const getOtp = useSelector(state => state.getOtp);
     const { requestId} = getOtp;
     const dispatch = useDispatch();

     const submitHandler = (e) => {
        e.preventDefault();
        dispatch(otpRequest(requestId))
        props.history.push('/otp')
    }
    return (
        <div className="form">
            
            <form onSubmit={submitHandler}>
                <h3> Verify your Account By Sms</h3>
                <p>A one time password will be send to { userInfo.phone}</p>
                <input name="email" type="hidden" value={userInfo.email}></input>
                <button>Get Code</button>
            </form>
           
        </div>
    )
}

export default GetOtp