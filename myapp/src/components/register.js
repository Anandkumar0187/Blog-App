import React,{useState} from 'react';
import axios from 'axios';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = ()=>{
    const [data,setData] = useState({email:"",password:""});
    const navigate = useNavigate();

    const handleChange = ({currentTarget : input})=>{
        setData({...data,[input.name] : input.value})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const url = "http://localhost:8080/register";

            await axios.post(url,data);
            navigate('/login')

        } catch (error) {
            console.log(error.message);
        }        
    }
    console.log(data);
    return (
        <div className='r-container'>
            <div className='r-main'>
            <div className='signUp'>
                <h1>Sign Up</h1>
                <form>
                    <div>
                        <p>Email</p>
                        <input type="text" name='email' value={data.email} onChange={handleChange} required/>
                        <p>Password</p>
                        <input type="password" name='password' required/>
                        <p>Confirm Password</p>
                        <input type="password" name='password' value={data.password} onChange={handleChange} required/>
                        <input type="checkbox"/><label>Remember me?</label>
                    </div>
                    <div>
                    <button className="r-btn" onClick={handleSubmit}>Sign Up</button>
                    <p>Already Register?<u onClick={()=>navigate('/login')}>Log In</u></p>
                    </div>
                </form>
            </div>
        </div>
        </div>
    )
}
export default Register;