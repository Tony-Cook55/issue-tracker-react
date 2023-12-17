
/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaPencilRuler, FaArrowUp } from "react-icons/fa";
// ICONS //

import axios from "axios"

// Gets the id from the current bug
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";



  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/

// ******************* IMPORTS ******************* //


  
  /* ddddddddddddddddd DATE MESSAGE ddddddddddddddddd */
    // Get the current date
    const currentDate = new Date();
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = currentDate.getDay();
  
    // Define an array of greetings based on the day of the week
    const greetings = [
      'Happy Sunday',
      'Happy Monday',
      'Happy Tuesday',
      'Happy Wednesday',
      'Happy Thursday',
      'Happy Friday',
      'Happy Saturday',
    ];
  
    // Get the greeting for the current day
    const greetingMessage = greetings[currentDay];
  /* ddddddddddddddddd DATE MESSAGE ddddddddddddddddd */






export default function UserItem(){


    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



  // Lets us get the User Id of the specific User we are on
  const userId = useParams().userId;

  // Sets the information of the user into this
  const [userProfile, setUserProfile] = useState({});


  // -+ -+ -+ CAN USER UPDATE AND DELETE USER +- +- +- //
  const [userFullNameFromLocalStorage, setUserFullNameFromLocalStorage] = useState("");
  const [rolesFromLocalStorage,setRolesFromLocalStorage] = useState(null);
  const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);
// -+ -+ -+ CAN USER UPDATE AND DELETE USER +- +- +- //


  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
    useEffect(() => {
      
      // This reads out of local storage for the Users Roles To see if they can Edit the User
      if(localStorage.getItem('roles'))
      {
        setRolesFromLocalStorage(JSON.parse(localStorage.getItem('roles')));
      }
      // Sets the fullName of the user object from local storage into the userFullName
      if(localStorage.getItem('fullName'))
      {
        setUserFullNameFromLocalStorage(JSON.parse(localStorage.getItem('fullName')));
      }
      if(localStorage.getItem('usersId'))
      {
        setUsersIdFromLocalStorage(JSON.parse(localStorage.getItem('usersId')));
      }


      // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
      // We use ${userId} from above to get that users specific ID and we search as if in postman
      axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`,             {withCredentials: true})

      // If you retrieve the user then set the users useState to the data you get from backend
      .then(response => {
        // Sets the database info into this
        setUserProfile(response.data);

      })
      .catch(error => console.log(error));
  
    }, [userId]); // Add bugId as a dependency to re-run the effect when it changes
  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //




// -+ -+ -+ CAN USER UPDATE  USER +- +- +- //
    // THIS CHECKS both the roles of the user and to see if there id is in local storage is also the id of the user who this is
    const canUserEditThisUser =
      rolesFromLocalStorage &&
      (rolesFromLocalStorage.includes('Technical Manager')
      // || userProfile._id === usersIdFromLocalStorage
      );
// -+ -+ -+ CAN USER UPDATE  USER +- +- +- //







return (
  <>


<div className="button_container slide_in_from_top    ">

  <div className="overviewInfo    user_background">

    {/* USER LIST */}
    <div className="top_button_styles">
      < a href="/userList" className="icon_link"    >
        <div className="back_button  back_button_background">
        <FaArrowLeft/>
        </div>
      </a>
    {/* USER LIST */}


    {/* USER EDITOR */}
      {canUserEditThisUser && (
        <Link to={`/userEditor/${userId}`} className="icon_link">
          <div className="edit_button  edit_button_background">
            <FaPencilRuler/>
          </div>
        </Link>
      )} 
    {/* USER EDITOR */}

    </div>
    

    
    <div className="bug_title_div">
      <div className="user_pic_name_container">
        <div className="profile_box">
          <div className="profile_card">
              <h1 className=""><strong>{userProfile.fullName}</strong></h1>
              <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
              {/* <p>Last Time Logged In: {userProfile.lastTimeUserLoggedIn}</p> */}
              <p>
                Last Time Logged In: <br/> {userProfile.lastTimeUserLoggedIn
                  ? userProfile.lastTimeUserLoggedIn
                  : "New Account"
                }
              </p>
          </div>
        </div>
      </div>

    </div>

</div> 
{/* <!-- overview info --> */}
















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">









{/* SENSITIVE USER INFORMATION ACCORDION */}
{/* Check if the logged-in user has the necessary role or is viewing their own profile */}
<div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sensitive_user_info" aria-expanded="true" aria-controls="sensitive_user_info">
          Sensitive User Information
        </button>
      </h2>
      <div id="sensitive_user_info" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="container text-center justify-content-center">
            <div className="row text-center justify-content-center">
              {/* Render sensitive user information here */}
              <div className="">
                <p className="title_of_database_information">Email</p>
                  <p className="database_information">{userProfile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
{/* SENSITIVE USER INFORMATION ACCORDION */}









  {/* USERS ROLES */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_roles" aria-expanded="false" aria-controls="users_roles">
        User's Roles
      </button>
    </h2>
    <div id="users_roles" className="accordion-collapse collapse">
      <div className="accordion-body">

        <div className="container text-center justify-content-center">
          <div className="row">

            {/* USERS ROLE */}
            <div className="bug_information_div">
                {/* Checks if the array is there and then maps all the items in the array by calling them steps and giving each an index to identify them */}
                {userProfile.role && userProfile.role.map((mappedRoles, index) => (
                  <li className="users_roles" key={index}>{mappedRoles}</li>
                ))}
            </div>
            {/* USERS ROLE */}

          </div>
        </div>
      
      </div>
    </div>
  </div>
  {/* USERS ROLES */}









  {/* USERS OTHER NAMES */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#creation_information" aria-expanded="false" aria-controls="creation_information">
        Names
      </button>
    </h2>
    <div id="creation_information" className="accordion-collapse collapse">
      <div className="accordion-body">

        <div className="container text-center justify-content-center">
          <div className="row">

            {/* FULL NAME */}
            <div className="bug_information_div">
              <p className="title_of_database_information">Full Name</p>
                <p className="database_information">{userProfile.fullName}</p>
            </div>
            {/* FULL NAME */}

            {/* GIVEN NAME */}
            <div className="bug_information_div">
              <p className="title_of_database_information">Given Name</p>
                <p className="database_information">{userProfile.givenName}</p>
            </div>
            {/* GIVEN NAME */}

            {/* FAMILY NAME */}
            <div className="bug_information_div">
              <p className="title_of_database_information">Family Name</p>
                <p className="database_information">{userProfile.familyName}</p>
            </div>
            {/* FAMILY NAME */}

          </div>
        </div>
      
      </div>
    </div>
  </div>
  {/* USERS OTHER NAMES */}



</div> {/* END OF ACCORDION */}





<div className="bottom_cap_under_accordion">
  <div className="end_cap_base">

  <div className="container ">
    <p className="last_updated_on "> 
    {userProfile.usersCreationDate && (
    <p className="last_updated_on">User Joined On: <br/> {userProfile.usersCreationDate}</p>
  )}

        {/* TAKES YOU TO TOP OF THE PAGE */}
          <a href="#top" className="icon_link">
            <div className="  back_to_top_background">
                <FaArrowUp/>
            </div>
          </a>
        {/* TAKES YOU TO TOP OF THE PAGE */}


    </p>
  </div>

  </div>
</div>









</div>
{/* <!-- wrapper--> */}


  
  </>)
}