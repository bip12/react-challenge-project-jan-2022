import React, { useState } from 'react';
import { SERVER_IP } from '../../private';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import './register.css';


const ADD_USER_URL = `${SERVER_IP}/api/register`;

const RegisterForm = () => {
    const [ user, setUser] = useState({
            name:'',
            email:'',
            password:'',
            reEnterPassword:''
        })

    const handleChange = e => {
        const { name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        })
        // console.log(e.target);
    } 
    
    const register = () => {
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post(ADD_USER_URL, user)
            .then( res => 
                {
                    alert(res.data.message)
                    goToLogin();        
                })
        } else {
            alert("Invalid input");
        }
    }

    const goToLogin = () => {
        return <Redirect to="/Login" />
    }

    return ( 
        <div className='register'>
            {console.log('User', user)}
            <h1>Register</h1>
            <input type='text' name='name' value={user.name} placeholder='Enter your Name' onChange={ handleChange }/>
            <input type='text' name='email' value={user.email} placeholder='Enter your Email' onChange={ handleChange }/>
            <input type='password' name='password' value={user.password} placeholder='Enter your Password' onChange={ handleChange }/>
            <input type='password' name='reEnterPassword' value={user.reEnterPassword} placeholder='Re-enter your Password' onChange={ handleChange }/>
            <div className='button' onClick={register}>Register</div>
            <div>or</div>
            <div>
                <Link to={"/login"} className="mt-2">  
                    <div type="submit" className="button">Login</div>
                </Link>
            </div>
        </div> 
     );
}
 
export default RegisterForm;