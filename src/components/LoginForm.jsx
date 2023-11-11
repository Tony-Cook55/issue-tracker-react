
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import React, { useState } from 'react';

// CSS
import './componentsCSS/LoginForm.css'





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


      console.log("LOGIN SUCCESSFUL")
    } else {
      console.log("INVALID LOGIN")
    }
  };








  return (
    <>
      <div className="main_Login_Div">
        <h4 className="login_Header">Login</h4>
        <form className="login_Form" onSubmit={handleLogin}>

          {/* EMAIL INPUT */}
          <div className="login_Inputs_Div">
            <input type="email" id="email" name="email" placeholder="Email" className="login_Inputs" 
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          {/* EMAIL INPUT */}

          {/* PASSWORD INPUT */}
          <div className="login_Inputs_Div">
            <input type="password" id="password" name="password" placeholder="Password" className="login_Inputs"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          {/* PASSWORD INPUT */}

          {/* LOGIN BUTTON */}
          <button type="submit" className="login_Button" onClick={handleLogin}>
            LOGIN
            </button>
          {/* LOGIN BUTTON */}

        </form>

        {/* SIGN UP BUTTON */}
        <a className="register_Link" href="/register" >
          
          Don't Have An Account? <br /> Sign Up Here!
        </a>
        {/* SIGN UP BUTTON */} 

      </div>
    </>
  );
}
