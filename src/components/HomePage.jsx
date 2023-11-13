


import React from 'react';





export default function HomePage(){





  const goToLoginPage = () => {
    window.location.href = '/login'; // Navigate to the login page
    console.log("Login Form Hit");
  };

  const goToRegisterPage = () => {
    window.location.href = '/register'; // Navigate to the register page
    console.log("Register Form Hit");
  };

  const goToBugItem = () => {
    window.location.href = '/bugItem'; // Navigate to the register page
    console.log("Register Form Hit");
  };




  return(
    <>
      <div>
      <h1>Welcome to the Home Page</h1>
        <button type="button" onClick={goToLoginPage} className='m-5'>
          Log In
        </button>
        <button type="button" onClick={goToRegisterPage} className='m-5'>
          Sign Up
        </button>

        <button type="button" onClick={goToBugItem} className='m-5'>
          1 Bug Item
        </button>
      </div>
    </>
  )

}