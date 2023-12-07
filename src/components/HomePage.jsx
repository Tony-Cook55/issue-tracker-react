


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

  const goToUserEditor = () => {
    window.location.href = '/userEditor';
  };



  return(
    <>
      <div>

        <br/><br/>
      <h1>GARBAGE HOME PAGE PLEASE FOR THE LOVE OF GOD CHANGE ME!!</h1>








      <h1>TODO:</h1>
      <ol className='accordion_ol mapped_bug_items database_information'>
        <li>Home Page</li>
        <li>Login In message page</li>
        <li>Make all pages require user to be logged in thus showing the login message</li>
        <li>ADD ERROR VALIDATION FOR ALMOST ALL INPUTS</li>
        <li>Css the searching list items in bugs and users</li>
        <li>Edit User Profile</li>
        <li>Edit all the edit functions of editing users and bugs</li>
        <li></li>
        <li></li>
      </ol>






      
        {/* <button type="button" onClick={goToLoginPage} className='m-5'>
          Log In
        </button>
        <button type="button" onClick={goToRegisterPage} className='m-5'>
          Sign Up
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

        <button type="button" onClick={goToUserEditor} className='m-5'>
          User Editor
        </button> */}




      </div>
    </>
  )

}