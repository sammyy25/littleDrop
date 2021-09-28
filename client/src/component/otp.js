import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { confirmOtp} from '../action/userAction';

function Otp(props) {

    const [code, setCode] = useState('');
   
    
    const getOtp = useSelector(state => state.getOtp);
    const { requestId } = getOtp;

    const otpConfirm = useSelector(state=> state.otpConfirm)
    const {result} = otpConfirm;

    const userSignin = useSelector(state => state.userSignin);
     const {userInfo} = userSignin;

     const [reqID, setReqID] = useState(requestId);
    

     const dispatch = useDispatch();

     useEffect(() =>{
        if(result || userInfo){
            props.history.push('/')
            console.log(reqID)
           }else{
               window.alert('Invalid Activation Code')
               console.log(reqID)
           }
        return () => {

        }
    }, [result]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(confirmOtp(code, reqID, requestId));
        
        
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
                        <input name="requestId" type='text' value={requestId}/>
                    </li>

                    <li>
                        <button type="submit">Signin</button>
                    </li>
                   </ul>
            </form>
        </div>
    )
}

export default Otp