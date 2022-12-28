import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

const Login = ()=>{
    const [data,setData] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleChange = ({currentTarget : input})=>{
        setData({...data,[input.name] : input.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/login";
            const res = await axios.post(url, data);
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("isLoggedIn",true);
            window.location('/')
        } catch (error) {
            console.log(error.message);
        }
    }
    // console.log(data);
    return (
        <div className='l-container'>
            <div className='l-main'>
            <div className='login'>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>Email</p>
                        <input type="text" name='email' value={data.email} onChange={handleChange} required/>
                        <p>Password</p>
                        <input type="password" name='password' value={data.password} onChange={handleChange} required/>
                    </div>
                    <div className='l-btns'>
                    <button type='submit' className="l-btn">Log In</button>
                    <p>Forgot Password?</p>
                    </div>
                </form>
            </div>
            <p id='account'>Need an account?<u onClick={()=>navigate('/register')}>SIGN UP</u></p>
        </div>
        </div>
    )
}
export default Login;