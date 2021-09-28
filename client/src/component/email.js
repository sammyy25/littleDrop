
import React, { useState} from 'react';
import {useSelector} from 'react-redux';
// import axios from 'axios';

function EmailVerifyOtp(props) {

    const [code, setCode] = useState('');
//    const [otp, setOtp] = useState()
   const userSignin = useSelector(state => state.userSignin);
   const {userInfo} = userSignin;
    const otp = userInfo.otp; 
    const submitHandler = (e) => {
        console.log(otp)
        e.preventDefault();
        if(otp == code){
            props.history.push('/')
           }else{
               window.alert('Invalid Activation Code')
           }
    }
    return (
        <div className="form">
            
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <label htmlFor="otp">
                            Enter OTP sent to 
                        </label>
                        <input name="code" placeholder="Enter Code" onChange={(e) => setCode(e.target.value)}/>
                    </li>

                    <li>
                        <button type="submit">Signin</button>
                    </li>
                   </ul>
            </form>
        </div>
    )
}

export default EmailVerifyOtp