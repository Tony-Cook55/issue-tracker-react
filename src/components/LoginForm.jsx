
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import React, { useState } from 'react';
//import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS
import './componentsCSS/LoginForm.css'


// 
import { useNavigate } from 'react-router-dom';


// ******************* IMPORTS ******************* //



export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };



  const handleLogin = (e) => {
    e.preventDefault();
    // Check if entered credentials are correct
    if (formData.email === "admin@example.com" && formData.password === "password") {
      // Call the login success event handler (you can replace this with your logic)
      history.push('/home');
      console.log("LOGIN SUCCESSFUL")
    } else {
      console.log("INVALID LOGIN")
    }
  };



  const NavigateToRegister = () => {
    // Use history.push to navigate to the RegisterForm component
    history.push('/register');
  };




  return (
    <>
      <div className="login">
        <h4>Login</h4>
        <form onSubmit={handleLogin}>

          {/* EMAIL INPUT */}
          <div className="text_area">
            <input type="email" id="email" name="email" placeholder="Email" className="text_input" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {/* EMAIL INPUT */}

          {/* PASSWORD INPUT */}
          <div className="text_area">
            <input type="password" id="password" name="password" placeholder="Password" className="text_input"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* PASSWORD INPUT */}

          {/* LOGIN BUTTON */}
          <button type="submit" className="btn" onClick={handleLogin}>LOGIN</button>
          {/* LOGIN BUTTON */}

        </form>

        {/* SIGN UP BUTTON */}
        <a className="link" href="/register" onClick={NavigateToRegister}>
          Sign Up
        </a>
        {/* SIGN UP BUTTON */} 

      </div>
    </>
  );
}
