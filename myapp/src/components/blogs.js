import React, { useState } from 'react'
import Create from './create';
import Header from './header';
import Home from './home';

const Blogs = ()=>{
    const [home,setHome] = useState(true);
    const [create,setCreate] = useState(false);

    const handleHome = ()=>{
        setHome(true);
        setCreate(false)
    }
    const handleCreate = ()=>{
        setHome(false);
        setCreate(true)
    }
    return (
        <div>
            <Header handleHome={handleHome} handleCreate={handleCreate}/>
            {home && <Home/>}
            {create && <Create/>}
        </div>
    )
}
export default Blogs;