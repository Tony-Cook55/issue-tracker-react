
/* eslint-disable */


// *********** IMPORTS *********** //

import { Link } from 'react-router-dom'
import './componentsCSS/Footer.css'

import axios from 'axios';

// Lets us on a command go to another page
import { useNavigate, useParams } from "react-router-dom";

import { FaArrowUp } from 'react-icons/fa';

import { FaHome, FaCrosshairs, FaBug ,FaUserCircle   } from "react-icons/fa";
import { IoMdAddCircle, IoMdLogOut  } from "react-icons/io";

import { FaPerson, FaPersonCirclePlus, FaPersonChalkboard   } from 'react-icons/fa6'
// *********** IMPORTS *********** //



// Scrolls to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Use "smooth" for a smooth scrolling effect, or "auto" for instant scrolling
  });
};




export default function Footer( {userFullName,setUserFullName, usersIdFromLocalStorage, setUsersIdFromLocalStorage} ){



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


// THIS ALLOWS WHEN A LINK IS CLICKED TO REFRESH THE PAGE ALLOWING THE NAVBAR WRAPPER TO RESET
const refreshNavbar = () => {
  window.location.reload();
};
// LOLOLOLOLOLOLOLOL  USER LOGS OUT  LOLOLOLOLOLOLOLOL //









  return (
    <>
      {/* <footer className="text-white">
        &copy; Tony Cook 2023
      </footer> */}


<footer className="text-center text-white">

  <div className="footer_container    container ">
    <section className="mb-4">





      {/* /////// LOGIN & REGISTER PAGE /////// */}
        {/* If there is NO fullName Show the Login Link if THERE IS show nothing*/}
        {!userFullName && 
        <div>

          {/* / HOME / */}
          <Link to="/" className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
            <span className="footer_Links">Home</span>
          </Link>
          {/* / HOME / */}

          {/* / BUG SHOOTER / */}
          <Link to="bugGame" className="btn btn-outline-light btn-floating m-1" onClick={scrollToTop}>
            <span className="footer_Links">Bug Shooter</span>
          </Link>
          {/* / BUG SHOOTER / */}

          {/* / LOGIN PAGE / */}
            <Link to="/login"className="btn btn-outline-light btn-floating m-1" onClick={scrollToTop}>
              <span className="footer_Links">Login</span>
            </Link>
          {/* / LOGIN PAGE / */}

          {/* / REGISTER PAGE / */}
            <Link to="/register" className="btn btn-outline-light btn-floating m-1" onClick={scrollToTop}>
              <span className="footer_Links">Register</span>
            </Link>
          {/* / REGISTER PAGE / */}

        </div>
        }
      {/* /////// LOGIN & REGISTER PAGE /////// */}



      {/* ///////IF LOGGED IN   USERS NAME PROFILE PAGE AND LOGOUT BUTTON   IF LOGGED IN /////// */}
      {/* THIS DISPLAYS THE USERS FULL NAME WE GET FROM LOGGING IN*/}
      {userFullName && 

        <div>
            <Link to="/" className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
              <span className="footer_Links">Home</span>
            </Link>

            <Link to="bugGame" className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
              <span className="footer_Links">Bug Shooter</span>
            </Link>

            <Link to="report"  className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
              <span className="footer_Links">Report Bug</span>
            </Link>

            <Link to="bugList"  className="btn btn-outline-light btn-floating m-1"   onClick={scrollToTop}>
              <span className="footer_Links">Bug List</span>
            </Link>

            <Link to="userList" className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
              <span className="footer_Links">User List</span>
            </Link>

            <Link to="profile"  className="btn btn-outline-light btn-floating m-1"  onClick={scrollToTop}>
              <span className="footer_Links">Profile</span>
            </Link>

            <a className="btn btn-outline-light btn-floating m-1" role="button"       onClick={(evt) => onClickLogout(evt)}>
              <span className="footer_Links">Logout</span>
            </a>

        </div>
      }

    </section>
  </div>

  <div className="text-center p-3">
    © 2023 Copyright:
    Tony Cook
  </div>

            {/* TAKES YOU TO TOP OF THE PAGE */}
            <a href="#top" className="icon_link">
                <div className="back_to_top_background_footer">
                    <FaArrowUp/>
                </div>
              </a>
            {/* TAKES YOU TO TOP OF THE PAGE */}

</footer>
    </>
  )
}