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

import { Link } from "react-router-dom";


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/

// ******************* IMPORTS ******************* //


// ******************* IMPORTS ******************* //

export default function UserListItem(  {userItem}  ){

  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/

return (
  <>


<div className="item_list_container      delay-1  item_come_in_animation  item_pop">
  <div className="item_list_box_flex">


    {/* ITEM */} {/*  */}
    <div className="list_item">
          <Link to={`/user/${userItem._id}`} className="list_item_link">

            {/* This is the small bg in the corner */}
            <div className="background_circle_top_right"></div>
            <div className="background_circle_bottom_left"></div>


            {/* PROFILE PICTURE */}
            <div className="item_section_container">
              <img src="/images/user_profile_circle_filled.png" className="userListItem_profile_pic  rounded-circle" alt="User Avatar" />
            </div>
            {/* PROFILE PICTURE */}



            {/* USER NAME & ID */}
            <div className="list_item_title">
              {userItem.fullName}
              <h6 className="bugsId">{userItem._id}</h6>
            </div>
            {/* USER NAME & ID */}




            {/* ROLE */}
            <div className="item_section_container">
              <span className="item_section_title">Role</span>
              <p className="item_highlighted">
                {Array.isArray(userItem.role) ? userItem.role.join(', ') : userItem.role}
              </p>
            </div>
            {/* ROLE */}




            {/* CREATED ON DATE */}
            <div className="item_section_container">
              <span className="item_section_title">Created On</span>
              <p className="item_highlighted">
                {userItem.usersCreationDate}
              </p>
            </div>
            {/* CREATED ON DATE */}





          </Link>
      </div>
      {/* ITEM */}
  </div>
</div>


  </>
)


}