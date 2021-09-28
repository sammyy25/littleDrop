import React, { useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import axios from 'axios';
import {forPsw} from '../action/userAction';

function ChangePsw(props) {
    const [email, setEmail] = useState('');
    const [code, setPassword] = useState();

   const userForPsw = useSelector(state => state.userForPsw);
   const {userOtp} = userForPsw;
   const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        if(userOtp) {
            dispatch(forPsw(email));
            props.history.push('/')
        } else{
            window.alert('Invalid OTP')
        }
    }
    
 
    return (
            <div className="form-container">
            <form  onSubmit={submitHandler}>
                <ul>
                <li>
                    <label htmlFor="email">
                          Enter Your  Email Address
                        </label>
                   <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </li>

                    <li>
                    <label htmlFor="pws">
                          Enter New Password
                        </label>
                   <input type="password" name="pws" id="pws" onChange={(e) => setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <button type="submit">Get OTP</button>
                    </li>
                </ul>
            </form>
           
        </div>
    )
}

export default ChangePsw