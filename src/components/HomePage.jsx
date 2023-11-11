


import React from 'react';





export default function HomePage(){





  const handleLoginClick = () => {
    window.location.href = '/LoginForm'; // Navigate to the login page
    console.log("Login Form");
  };

  const handleRegisterClick = () => {
    window.location.href = '/RegisterForm'; // Navigate to the register page
    console.log("Register Form");
  };




  return(
    <>
      <div>
      <h1>Welcome to the Home Page</h1>
        <button type="button" onClick={handleLoginClick}>
          Log In
        </button>
        <button type="button" onClick={handleRegisterClick}>
          Sign Up
        </button>
      </div>
    </>
  )

}