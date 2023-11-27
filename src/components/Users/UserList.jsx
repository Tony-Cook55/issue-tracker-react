// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserList.css"



import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";


import UserListItem from "./UserListItem";

import UserItem from "./UserItem";

import LoginFormRequiredMsg from "../LoginRequiredMsg";



// ******************* IMPORTS ******************* //









export default function UserList(){

  
  const [users, setUser] = useState([]);


  // Retrieve the user's info object from local storage
  const userInfo = JSON.parse(localStorage.getItem('fullName'));

  // Extract the fullName from the userInfo object
  const userFullName = userInfo ? userInfo.fullName : null;

  // Check if the user is logged in by verifying the existence of fullName
  const isLoggedIn = userFullName !== null;






  // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //
  useEffect(() => {
    // Fetch bug data only if the user is logged in with their fullName
    if (isLoggedIn) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/users/list`, { withCredentials: true })
        .then(response => {
          setUser(response.data);
        })
        .catch(error => console.log(error));
    }
  },  [isLoggedIn]);
  // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //

  return( 
    <>



{/* Check if the user is logged in before rendering content */}
{!isLoggedIn ? ( /* !isLoggedIn &&  bugs.length*/
        <h2>
          <Link to="/login">
            <LoginFormRequiredMsg />
          </Link>
        </h2>
      ) : (
        // Check if there are bugs, display the bug list if true
        <div className="row text-center justify-content-center">
          {users.map((userItem) => (
            <div key={userItem._id} className="col-lg-4 col-md-12 col-sm-12">
              <UserListItem userItem={userItem} key={userItem._id}/>
            </div>
          ))}
        </div>
      )}




    </>

  )


}