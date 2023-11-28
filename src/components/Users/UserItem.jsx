
/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserListItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaPencilRuler } from "react-icons/fa";
// ICONS //

import axios from "axios"

// Gets the id from the current bug
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from "react";


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




  // Lets us get the User Id of the specific User we are on
  const userId = useParams().userId;

  // Sets the information of the user into this
  const [userProfile, setUserProfile] = useState({});


  const [userFullNameFromLocalStorage, setUserFullNameFromLocalStorage] = useState("");
  const [rolesFromLocalStorage,setRolesFromLocalStorage] = useState(null);
  const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);



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





    // THIS CHECKS both the roles of the user and to see if there name in local storage is the name of the user who created the user
    const canUserEditThisUser =
      rolesFromLocalStorage &&
      (rolesFromLocalStorage.includes('Technical Manager') ||  
        userProfile._id === usersIdFromLocalStorage
      );










return (
  <>


<div className=" slide_in_from_top">

  <div className="overviewInfo    user_background">


    <div className="top_button_styles">
      < a href="/userList" className="icon_link"    >
        <div className="back_button  back_button_background">
        <FaArrowLeft/>
        </div>
      </a>


      {canUserEditThisUser && (
        <Link to={`/userEditor/${userId}`} className="icon_link">
          <div className="edit_button  edit_button_background">
            <FaPencilRuler/>
          </div>
        </Link>
      )} 

    </div>
    

    
    <div className="bug_title_div">
      <div className="user_pic_name_container">

        <div className="profile_box">
          <div className="profile_card">
              <h2><strong>{greetingMessage}</strong></h2>
              <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
              <h2 className="users_name"><strong>{userProfile.fullName}</strong></h2>
          </div>
        </div>

      </div>

    </div>

</div> 
{/* <!-- overview info --> */}
















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">



{/* ROLES */}
<div className="accordion-item">
<h2 className="accordion-header">
  <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_roles" aria-expanded="false" aria-controls="users_roles">
    User&#39;s Role&#39;s
  </button>
</h2>
<div id="users_roles" className="accordion-collapse collapse">
  <div className="accordion-body">

    <div className="container text-center justify-content-center">
      
      <div className="row">
        <div className="col-sm">
          <h3>Quality Analyst</h3>
        </div>

        <div className="col-sm">
            <h3>Business Analyst</h3>
        </div>

        <div className="col-sm">
          <h3 className="developer_role">Developer</h3>
        </div>

        <div className="col-sm">
          <h3>Product Manager</h3>
        </div>

        <div className="col-sm">
          <h3>Technical Manager</h3>
        </div>

      </div>
    </div>
  
  </div>
</div>
</div>
{/* ROLES */}






{/* USERS OTHER NAMES */}
<div className="accordion-item">
<h2 className="accordion-header">
  <button className="accordion-button    accordion_button_animation   text-center  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_other_names" aria-expanded="true" aria-controls="users_other_names">
    Names
  </button>
</h2>
<div id="users_other_names" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
  <div className="accordion-body">

  <div className="row">

        <div className="col-sm">
          <h3 className="">FULL NAME HERE</h3>
        </div>

        <div className="col-sm">
          <h3>GIVEN NAME HERE</h3>
        </div>

        <div className="col-sm">
          <h3>FAMILY NAME HERE</h3>
        </div>

      </div>
    </div>

</div>
</div>
{/* USERS OTHER NAMES */}



</div>
{/* END OF ACCORDION */}





<div className="bottom_cap_under_accordion">
<div className="end_cap_base">

<div className="container ">
<p className="last_updated_on ">User Joined On: <span className="last_updated_on ">DATE HERE</span></p>
</div>


</div>
</div>










</div>
{/* <!-- wrapper--> */}


  
  </>)
}