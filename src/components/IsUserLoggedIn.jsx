/* eslint-disable */



import React from 'react';

/* THIS PAGE IS TO CHECK THE USERS LOCAL STORAGE FOR A 
  fullName, _id, and roles. THEY GAIN THESE BY LOGGING IN
*/



export function IsUserLoggedIn() {
  // Retrieve the user's info object from local storage
  const userInfo = JSON.parse(localStorage.getItem('fullName'));

  // Extract the user's information
  const userFullName = userInfo ? userInfo.fullName : null;
  // const usersId = userInfo ? userInfo.userId : null;
  const usersId = userInfo ? userInfo.users_id : null;
  const roles = JSON.parse(localStorage.getItem('roles'));

  // Check if the user is logged in by verifying the existence of fullName and userId
  const isLoggedIn = userFullName !== null && usersId !== null;

  return {
    userFullName,
    usersId,
    roles,
    isLoggedIn,
  };
}