import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { register} from '../action/userAction';


function Register(props) {

     const [email, setEmail] = useState('');
     const [name, setName] = useState('');
     const [password, setPassword] = useState('');
     const [tel, setTel] = useState('')
    //  const [rePassword, setRePassword] = useState('');
      const userRegister = useSelector(state => state.userRegister);
      const { loading, userInfo, error} = userRegister;

    const dispatch = useDispatch();

    const refreshPage = () =>{
        window.location.reload();
     }

    useEffect(() =>{
        if(userInfo){
            props.history.push('/')
            refreshPage()
        }
        return () => {

        }
    }, [userInfo]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name,email, password, tel));
    }

    return (
        <div className="form">
            
            <form onSubmit={submitHandler}>
            <h3>
                Create Account
            </h3>
                <ul className="form-container">
                    <li>
                        {loading && <div>Loading..</div>}
                        {error && <div>{error}</div>}
                    </li>
                    <li>
                        <label htmlFor="name">
                            Username
                        </label>
                   <input type="text" name="name" id="name" onChange={(e) => setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="email">
                            Email
                        </label>
                   <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
                    </li>
                    {/* onChange={(e) => setEmail(e.target.value)} */}
                    <li>
                        <label htmlFor="phone">
                            Phone Number
                        </label>
                   <input type="tel" name="phone" id="phone" onChange={(e) => setTel(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">
                            Password
                        </label>
                   <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} />
                    </li>
                    {/* <li>
                        <label htmlFor="rePassword">
                            Re-Enter Password
                        </label>
                   <input type="password" name="rePassword" id="rePassword" onChange={(e) => setRePassword(e.target.value)} />
                    </li> */}
                    <li>
                        <button type="submit">Register</button>
                    </li>
                    <li>
                        Already have an account? <Link to="/signin">Sign-In</Link>
                    </li>
                    
                </ul>
            </form>
        </div>
    )
}

export default Register
