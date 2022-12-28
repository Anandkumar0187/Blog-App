import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import Login from './components/login';
import Register from './components/register';
import Blogs from './components/blogs';

function App() {
  const loggedIn = localStorage.getItem('isLoggedIn')
  return (
    <div>
      <Routes>
        
        <Route path='/login' exact element={loggedIn? <Blogs/>:<Login/>}/>
        <Route path='/register' exact element={<Register/>}/>


        <Route path='/' element={<Navigate replace to="/login"/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
