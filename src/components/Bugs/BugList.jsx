/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugList.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaPencilRuler } from "react-icons/fa";
// ICONS //


import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";


import BugListItem from "./BugListItem";

import BugItem from "./BugItem";

import LoginFormRequiredMsg from "../LoginRequiredMsg";



// ******************* IMPORTS ******************* //









export default function BugList(   {showToast }  ){




  const [bugs, setBugs] = useState([]);



  // Retrieve the user's info object from local storage
  const userInfo = JSON.parse(localStorage.getItem('fullName'));

  // Extract the fullName from the userInfo object
  const userFullName = userInfo ? userInfo.fullName : null;

  // Check if the user is logged in by verifying the existence of fullName
  const isLoggedIn = userFullName !== null;



  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //
  useEffect(() => {
    // Fetch bug data only if the user is logged in with their fullName
    if (isLoggedIn) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`, { withCredentials: true })
        .then(response => {
          setBugs(response.data);

          // showToast("Success! Found All Bugs", "success");

        })
        .catch(error => console.log(error));

    }

    // return() => {
    //   showToast("Success! Found All Bugs", "success");
    // }


  }, [isLoggedIn]);
  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //





  return( 
    <>


    {/* Check if the user is logged in before rendering content OR if there is no BUGS : OTHERWISE : Show List*/}
    {!isLoggedIn ? ( /* !isLoggedIn &&  !bugs.length*/
        <h2>
          <Link to="/login">
            <LoginFormRequiredMsg />
          </Link>
        </h2>
      ) :
        !bugs.length ? (
          <h1 className="no_bugs_found_message">There Are No Bugs</h1>
        ) : (
        // Check if there are bugs, display the bug list if true
        <div className="row text-center justify-content-center">
          {bugs.map((bug) => (
            <div key={bug._id} className="col-lg-4 col-md-12 col-sm-12">
              <BugListItem bug={bug} key={bug._id}  />
            </div>
          ))}
        </div>
      )}


    </>

  )


}




