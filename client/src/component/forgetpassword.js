
import React, { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {forPsw} from '../action/userAction';

function ForgetPsw(props) {
    const [email, setEmail] = useState('');
    const [ isActive, setActive] = useState(false);
    const [code, setCode] = useState();

   const userForPsw = useSelector(state => state.userForPsw);
   const {userOtp} = userForPsw;
   const otp = userOtp.otp;
   const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(otp == code) {
            dispatch(forPsw(email, otp));
            props.history.push('/')
        } else{
            window.alert('Invalid OTP')
        }
    }
    const getCode = (e) => {
        e.preventDefault();
        dispatch(forPsw(email));
    }
  
    function handleShow(e) {
        e.preventDefault();
        setActive(true) 
    }
    return (
        <div className="passform">
            <div className="form-container">
            <form  onSubmit={getCode}>
                <ul>
                <li>
                    <label htmlFor="email">
                          Enter Your  Email Address
                        </label>
                   <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <button onClick={handleShow}>Get OTP</button>
                    </li>
                </ul>
            </form>
            {isActive ?
            <form onSubmit={submitHandler}>
                 <ul>
                    <li>
                        <label htmlFor="otp">
                            Enter OTP sent to Your Email
                        </label>
                        <input type="number" name="code" placeholder="Enter Code" onChange={(e) => setCode(e.target.value)} />
                    </li>

                    <li>
                        <button type="submit">Submit</button>
                    </li>
                    </ul> 
            </form> : null }
        </div>
        </div>
    )
}

export default ForgetPsw