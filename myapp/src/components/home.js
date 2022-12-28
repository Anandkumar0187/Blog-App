import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.css';

const Home = ()=>{
    const [data,setData] = useState([]);
    useEffect(()=>{
        const url = "http://localhost:8080/blogs";
        const token = localStorage.getItem('token')
        axios.get(url,{
            headers:{authorization:token}
        }).then(resp=> setData(resp.data.data));
    },[])
console.log(data);
    return (
        <div>
            {data.map((item)=>(
                <div key={item._id}>
                    <p>Title : {item.title}</p>
                    <p>Description : {item.description}</p>
                </div>
            ))}
        </div>
    )
}
export default Home;