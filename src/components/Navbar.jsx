/* eslint-disable */


// *********** IMPORTS *********** //
import { NavLink } from "react-router-dom"


// CSS
import './componentsCSS/Navbar.css'

import axios from "axios";
// *********** IMPORTS *********** //




                              // Allows us to get the fullName from the user logging in and setting their fullName
export default function NavBar(      {userFullName,setUserFullName}       ){
  

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
      window.location.reload();
    })
    .catch(error => console.log(error));
  }



  return(
    <>
      <nav>
        <ul className="nav  nav-tabs">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>

          {/* If there is NO fullName Show the Login Link if THERE IS show nothing*/}
          {!userFullName && 
            <li className="nav-item">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
            </li>
          }

          <li className="nav-item">
            <NavLink to="/register" className="nav-link">
              Register
            </NavLink>
          </li>


            {/* THIS DISPLAYS THE USERS FULL NAME WE GET FROM LOGGING IN*/}
            {userFullName && 
              <div className="nav-item-group">
                <li className="nav-item">
                  <NavLink to="/profile" className="nav-link">
                    {userFullName}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link"    onClick={(evt) => onClickLogout(evt)}>
                    Logout
                  </button>
                </li>
              </div>
            }

        </ul>
      </nav>
    </>
  )


}