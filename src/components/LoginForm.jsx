
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


  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Reset validation state on input change
    setEmailValid(true);
    setPasswordValid(true);
  };



  
  const handleLogin = (e) => {
    e.preventDefault();

    // Check if entered credentials are correct
    if (formData.email === "admin@example.com" && formData.password === "password") {
      // TAKES YOU TO THE HOME PAGE ON SUCCESSFUL LOGIN
      window.location.href = '/'; // Navigate to the home page
      console.log("LOGIN SUCCESSFUL");
    } else {
      // Handle invalid login
      if (formData.email !== "admin@example.com") {
        setEmailValid(false);
      }
      if (formData.password !== "password") {
        setPasswordValid(false);
      }
      console.log("INVALID LOGIN");
    }
  };







  return (
    <>
      <div className="main_Login_Div   scale_in_center">
        <h4 className="login_Header">Login</h4>
        <form className="login_Form" onSubmit={handleLogin}>


          {/* EMAIL INPUT */}
          <div className="login_Inputs_Div">
            <input type="email" id="email" name="email" placeholder="Email" 
              className="login_Inputs " 
              required
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* This is the Error message that appears after an unsuccessful input*/}
            {!emailValid && <div className="error_message">Email Is Invalid</div>}
          </div>
          {/* EMAIL INPUT */}



          {/* PASSWORD INPUT */}
          <div className="login_Inputs_Div">
            <input type="password" id="password" name="password" placeholder="Password" 
              className="login_Inputs ${!passwordValid && 'invalid'}"
              required
              value={formData.password}
              onChange={handleInputChange}
            />

            {/* This is the Error message that appears after an unsuccessful input*/}
            {!passwordValid && <div className="error_message">Password Is Invalid</div>}
          </div>
          {/* PASSWORD INPUT */}

          {/* LOGIN BUTTON */}
          <button type="submit" className="login_Button" onClick={handleLogin}>
            LOGIN
            </button>
          {/* LOGIN BUTTON */}

        </form>

        {/* SIGN UP BUTTON */}
        <a className="register_Link" href="/register">
          
          Don't Have An Account? <br /> Sign Up Here!
        </a>
        {/* SIGN UP BUTTON */} 

      </div>
    </>
  );
}
