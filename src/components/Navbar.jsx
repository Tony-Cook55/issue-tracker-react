/* eslint-disable */


// *********** IMPORTS *********** //
import { Link, NavLink } from "react-router-dom"


// CSS
import './componentsCSS/Navbar.css'

import axios from "axios";

import { useState, useEffect } from "react";


// Lets us on a command go to another page
import { useNavigate, useParams } from "react-router-dom";


// *********** IMPORTS *********** //




                              // Allows us to get the fullName from the user logging in and setting their fullName
export default function NavBar(      {userFullName,setUserFullName, usersIdFromLocalStorage, setUsersIdFromLocalStorage, showToast}       ){
  

  const navigateToAnotherPage = useNavigate();


// LOLOLOLOLOLOLOLOL  USER LOGS OUT  LOLOLOLOLOLOLOLOL //
  function onClickLogout(evt){
    evt.preventDefault();

    // axios will go to backend logout code and set the name to nothing and remove the fullName from local Storage
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`,{}, {withCredentials: true})
    .then(response => {
      console.log("Logout API response:", response.data);


      setUserFullName("");
      localStorage.removeItem("fullName");
      localStorage.removeItem("roles");
      localStorage.removeItem("usersId");

      // Remove bugsShot when user logs out
      localStorage.removeItem("bugsShot");


            // Print the current values for debugging
            console.log("After removal:", {
              fullName: localStorage.getItem("fullName"),
              roles: localStorage.getItem("roles"),
              usersId: localStorage.getItem("usersId")
            });

      // Goes to home page on successful logout
      navigateToAnotherPage("/");
      showToast(response.data, "success");

      window.location.reload();
    })
    .catch(error => console.log(error));
  }

// LOLOLOLOLOLOLOLOL  USER LOGS OUT  LOLOLOLOLOLOLOLOL //






/* ^^^^^^^^^^^^ ON LINK CLICK REFRESH AND SCROLL TO TOP ^^^^^^^^^^^^ */

// THIS ALLOWS WHEN A LINK IS CLICKED TO REFRESH THE PAGE ALLOWING THE NAVBAR WRAPPER TO RESET
const refreshNavbar = () => {
  window.location.reload();
};

// Scrolls to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Use "smooth" for a smooth scrolling effect, or "auto" for instant scrolling
  });
};

// const RefreshAndScrollOnClick = () => {
//   scrollToTop();
//   refreshNavbar();

//   setTimeout(() => {
//     refreshNavbar();
//   }, 100); 
// };
/* ^^^^^^^^^^^^ ON LINK CLICK REFRESH AND SCROLL TO TOP ^^^^^^^^^^^^ */



// Sets the information of the user into this
const [userProfile, setUserProfile] = useState({});




//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
  useEffect(() => {

    if(localStorage.getItem('usersId'))
    {
      setUsersIdFromLocalStorage(JSON.parse(localStorage.getItem('usersId')));
    }


    // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
    // We use ${userId} from above to get that users specific ID and we search as if in postman
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/${usersIdFromLocalStorage}`,             {withCredentials: true})

    // If you retrieve the user then set the users useState to the data you get from backend
    .then(response => {
      // Sets the database info into this
      setUserProfile(response.data);
    })
    .catch(error => console.log(error));

  }, []); // Add bugId as a dependency to re-run the effect when it changes
//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //





  return(
    <>

          <nav className="fixed-top">
            <input type="checkbox" id="active"/>
            <label htmlFor="active" className="menu-btn"><span></span></label>
            <label htmlFor="active" className="close"></label>
            

            
              <div className="wrapper">
                <ul className="navbar_ul">
                  {/* /////// HOME PAGE /////// */}
                  <li className="nav-item"  onClick={refreshNavbar}>
                    <NavLink to="/" className="nav-link">
                      Home
                    </NavLink>
                  </li>


                  <li className="nav-item"  onClick={refreshNavbar}  >
                    <NavLink to="bugGame" className="nav-link">
                      Bug Shooter
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






                  {/* ///////IF LOGGED IN   USERS NAME PROFILE PAGE AND LOGOUT BUTTON   IF LOGGED IN /////// */}
                    {/* THIS DISPLAYS THE USERS FULL NAME WE GET FROM LOGGING IN*/}
                    {userFullName && 
                      <div className="cursor_pointer">


                        {/* /////// LEADER BOARD /////// */}
                        <li className="nav-item"  onClick={refreshNavbar}>
                          <NavLink to="/leaderBoard" className="nav-link">
                            Leaderboard
                          </NavLink>
                        </li>
                        {/* /////// LEADER BOARD  /////// */}


                        {/* /////// ADD BUG /////// */}
                        <li className="nav-item"  onClick={refreshNavbar}>
                          <NavLink to="/report" className="nav-link">
                            Add Bug
                          </NavLink>
                        </li>
                        {/* /////// ADD BUG /////// */}


                        {/* /////// BUG LIST /////// */}
                        <li className="nav-item"  onClick={refreshNavbar}>
                          <NavLink to="bugList" className="nav-link">
                            Bug List
                          </NavLink>
                        </li>
                        {/* /////// BUG LIST /////// */}


                        {/* /////// USER LIST /////// */}
                        <li className="nav-item"  onClick={refreshNavbar}>
                          <NavLink to="userList" className="nav-link">
                            User List
                          </NavLink>
                        </li>
                        {/* /////// USER LIST /////// */}


                        {/* /////// PROFILE /////// */}
                        <li className="nav-item" onClick={refreshNavbar}>
                          <NavLink to="/profile" className="nav-link">
                            {/* {userFullName} */}
                            Profile
                          </NavLink>

                          {/* <Link to={`/userEditor/${userId}`} className="icon_link"> */}
                        </li>
                        {/* /////// PROFILE /////// */}


                        {/* /////// LOGOUT /////// */}
                        <li className="nav-item">
                          <a className="nav-link " onClick={(evt) => onClickLogout(evt)}>
                            Logout
                          </a>
                        </li>
                        {/* /////// LOGOUT /////// */}
                      </div>
                    }
                  {/* ///////IF LOGGED IN   USERS NAME PROFILE PAGE AND LOGOUT BUTTON   IF LOGGED IN /////// */}




                </ul>
              </div>
          </nav>



    </>
  )


}