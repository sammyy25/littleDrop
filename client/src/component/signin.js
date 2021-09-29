import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
 import { signin} from '../action/userAction';
import { setActive} from './Header'

function Signin(props) {

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const userSignin = useSelector(state => state.userSignin);
     const { loading, userInfo, error} = userSignin;

    const dispatch = useDispatch();


    useEffect(() =>{
        if(userInfo){
            props.history.push('/')
        }
        return () => {

        }
    }, [userInfo]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    }

    return (
        <div className="form">
            
            <form onSubmit={submitHandler}>
            <h3>
                Login
            </h3>
                <ul className="form-container">
                    <li>
                        {loading && <div>Loading..</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                   <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                   <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button type="submit">Signin</button>
                    </li>
                    <li> <Link to="/forgetpassword">Forget Password</Link></li>
                    <li>
                        New to Ems?
                    </li>
                    <button className="button">
                    <Link to="/register" className="button">Create Your Ems Account</Link>
                    </button>
                </ul>
            </form>
        </div>
    )
}

export default Signin
