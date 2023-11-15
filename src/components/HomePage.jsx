


import React from 'react';





export default function HomePage(){



  // const goToHomePage = () => {
  //   window.location.href = '/';
  // }


  const goToLoginPage = () => {
    window.location.href = '/login'; // Navigate to the login page
    console.log("Login Form Hit");
  };

  const goToRegisterPage = () => {
    window.location.href = '/register'; // Navigate to the register page
    console.log("Register Form Hit");
  };

  const goToBugItem = () => {
    window.location.href = '/bugItem';
  };

  const goToBugList = () => {
    window.location.href = '/bugList';
  };

  const goToBugEditor = () => {
    window.location.href = '/bugEditor';
  };



  
  const goToUserItem = () => {
    window.location.href = '/userItem';
  };

  const goToUserList = () => {
    window.location.href = '/userList';
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
          Bug Item
        </button>

        <button type="button" onClick={goToBugList} className='m-5'>
          Bug List
        </button>

        <button type="button" onClick={goToBugEditor} className='m-5'>
          Bug Editor
        </button>



        <button type="button" onClick={goToUserItem} className='m-5'>
          User Item
        </button>

        <button type="button" onClick={goToUserList} className='m-5'>
          User List
        </button>




      </div>
    </>
  )

}