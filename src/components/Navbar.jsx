/* eslint-disable */


// *********** IMPORTS *********** //
import { Link, NavLink } from "react-router-dom"


// CSS
import './componentsCSS/Navbar.css'

import axios from "axios";

import { useState } from "react";


// Lets us on a command go to another page
import { useNavigate } from "react-router-dom";
// *********** IMPORTS *********** //




                              // Allows us to get the fullName from the user logging in and setting their fullName
export default function NavBar(      {userFullName,setUserFullName}       ){
  

  const navigateToAnotherPage = useNavigate();


  /* LOGOUT BUTTON FUNCTION */
  function onClickLogout(evt){
    evt.preventDefault();

    // axios will go to backend logout code and set the name to nothing and remove the fullName from local Storage
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`,
    {}, 
    {withCredentials: true})
    .then(response => {
      setUserFullName("");
      localStorage.removeItem("fullName");
      //console.log(response.data);

      // Goes to home page on successful logout
      navigateToAnotherPage("/");
      window.location.reload();
    })
    .catch(error => console.log(error));
  }


  // THIS ALLOWS WHEN A LINK IS CLICKED TO REFRESH THE PAGE ALLOWING THE NAVBAR WRAPPER TO RESET
  const refreshNavbar = () => {
    window.location.reload();
  };





  return(
    <>

          <nav className="fixed-top">
            <input type="checkbox" id="active"/>
            <label htmlFor="active" className="menu-btn"><span></span></label>
            <label htmlFor="active" className="close"></label>
            

            
              <div className="wrapper">
                <ul>
                  {/* /////// HOME PAGE /////// */}
                  <li className="nav-item"  onClick={refreshNavbar}>
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>
                  {/* /////// HOME PAGE /////// */}


                  {/* /////// LOGIN & REGISTER PAGE /////// */}
                    {/* If there is NO fullName Show the Login Link if THERE IS show nothing*/}
                    {!userFullName && 
                    <div>
                      {/* / LOGIN PAGE / */}
                      <li className="nav-item" onClick={refreshNavbar}>
                        <NavLink to="/login" className="nav-link" >
                          Login
                        </NavLink>
                      </li>
                      {/* / LOGIN PAGE / */}

                      {/* / REGISTER PAGE / */}
                      <li className="nav-item" onClick={refreshNavbar}>
                        <NavLink to="/register" className="nav-link" onClick={refreshNavbar}>
                          Register
                        </NavLink>
                      </li>
                      {/* / REGISTER PAGE / */}
                    </div>
                    }
                  {/* /////// LOGIN & REGISTER PAGE /////// */}


                  {/* /////// REGISTER PAGE /////// */}
                  {/* <li>
                    <NavLink to="/register" className="nav-link">
                      Register
                    </NavLink>
                  </li> */}
                  {/* /////// REGISTER PAGE /////// */}



                  {/* /////// BUG LIST /////// */}
                  <li className="nav-item"  onClick={refreshNavbar}>
                    <NavLink to="bugList" className="nav-link">
                      Bug List
                    </NavLink>
                  </li>
                  {/* /////// BUG LIST /////// */}



                  {/* ///////  USERS NAME PROFILE PAGE AND LOGOUT BUTTON/////// */}
                    {/* THIS DISPLAYS THE USERS FULL NAME WE GET FROM LOGGING IN*/}
                    {userFullName && 
                      <div className="cursor_pointer">
                        <li className="nav-item" onClick={refreshNavbar}>
                          <NavLink to="/profile" className="nav-link">
                            {userFullName}
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link " onClick={(evt) => onClickLogout(evt)}>
                            Logout
                          </a>
                        </li>
                      </div>
                    }
                  {/* ///////  USERS NAME PROFILE PAGE AND LOGOUT BUTTON/////// */}




                </ul>
              </div>
          </nav>



    </>
  )


}