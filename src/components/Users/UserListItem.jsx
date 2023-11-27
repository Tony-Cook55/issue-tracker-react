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


// ******************* IMPORTS ******************* //

export default function UserListItem(  {userItem}  ){



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
                <p>{Array.isArray(userItem.role) ? userItem.role.join(', ') : userItem.role}</p>
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