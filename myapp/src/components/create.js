import React,{useState} from 'react';
import axios from 'axios';
import './create.css'

const Create = ()=>{
    const [data,setData] = useState({title:"", description :""})

    const handleChange = ({currentTarget : input})=>{
        setData({...data,[input.name] : input.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const url = "http://localhost:8080/blogs";
            await axios.post(url,{
                headers:{authorization:token}
            },data);
            
        } catch (error) {
            console.log(error);
        }
    }
    console.log(data);
   return (
    <div>
        <div className='input-form'>
            <form onSubmit={handleSubmit}>
                <input type="text" name='title' value={data.title} onChange={handleChange} placeholder="Page Title"/>
                <textarea rows="5" name='description' value={data.description} onChange={handleChange} cols="10" placeholder='Page Content'/>
                <button type='submit'>Save</button>
            </form>
        </div>
    </div>
   )
}
export default Create;