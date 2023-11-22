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











  (function() {
    var $body = document.body
    , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0];
  
    if ( typeof $menu_trigger !== 'undefined' ) {
      $menu_trigger.addEventListener('click', function() {
        $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
      });
    }
  
  }).call(this);










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






      <nav class="navbar navbar-expand-lg navbar-dark p-3 bg-danger" id="headerNav">
      <div class="container-fluid">
        <a class="navbar-brand d-block d-lg-none" href="#">
          <img src="/images/wide_ear_dog.png" height="80" />
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class=" collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav mx-auto ">
            <li class="nav-item">
              <a class="nav-link mx-2 active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-2" href="#">Products</a>
            </li>
            <li class="nav-item d-none d-lg-block">
              <a class="nav-link mx-2" href="#">
                <img src="/images/wide_ear_dog.png" height="80" />
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link mx-2" href="#">Pricing</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Company
                </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="#">Blog</a></li>
                <li><a class="dropdown-item" href="#">About Us</a></li>
                <li><a class="dropdown-item" href="#">Contact us</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>







    {/* <nav>
      <div class="navbar">
        <div class="container nav-container">
            <input class="checkbox" type="checkbox" name="" id="" />
            <div class="hamburger-lines">
              <span class="line line1"></span>
              <span class="line line2"></span>
              <span class="line line3"></span>
            </div>  
          <div class="logo">
            <h1>Navbar</h1>
          </div>
          <div class="menu-items">
            <li><a href="#">Home</a></li>
            <li><a href="#">about</a></li>
            <li><a href="#">blogs</a></li>
            <li><a href="#">portfolio</a></li>
            <li><a href="#">contact</a></li>
          </div>
        </div>
      </div>
    </nav>
 */}











    <input type="checkbox" id="active" />
    <label for="active" class="menu-btn"><span></span></label>
    <label for="active" class="close"></label>
    <div class="wrapper">
      <ul>
<li><a href="#">Home</a></li>
<li><a href="#">About</a></li>
<li><a href="#">Services</a></li>
<li><a href="#">Gallery</a></li>
<li><a href="#">Feedback</a></li>
</ul>
</div>






      
    </>
  )


}