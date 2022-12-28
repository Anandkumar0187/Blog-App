import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css'

const Header = ({handleHome,handleCreate})=>{
    const navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.clear();
        navigate('/')
    }
    return (
        <div>
            <div className='navbar'>
                <h2>BlogApp</h2>
                <div>
                    <h3 onClick={handleHome}>Home</h3>
                    <h3 onClick={handleCreate}>Create</h3>
                </div>
                <h3 onClick={handleLogout}>Logout</h3>
            </div>
        </div>
    )
}
export default Header;