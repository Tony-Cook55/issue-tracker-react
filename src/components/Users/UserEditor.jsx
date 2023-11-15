// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserListItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaSave } from "react-icons/fa";
// ICONS //

//import React, { useState } from 'react';


// ******************* IMPORTS ******************* //

export default function UserEditor(){






return (
  <>


<div className="wrapper slide_in_from_top">

  <div className="overviewInfo    user_background">


    <div className="top_button_styles">
      < a href="/userList" className="icon_link"    >
        <div className="back_button  back_button_background">
        <FaArrowLeft/>
        </div>
      </a>

      <a href="/userItem" className="icon_link"   >
        <div className="edit_button  edit_button_background">
        <FaSave/>
        </div>
      </a>
    </div>
    

    
    <div className="bug_title_div">

          <h1>Currently Editing User</h1>
          <h2>USER ID HERE</h2>

      <div className="user_pic_name_container">

        <div className="profile_box">
          <div className="profile_card">
              <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
              <h2 className="users_name  item_being_edited" contentEditable><strong>USER NAME HERE</strong></h2>
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
          <h3 contentEditable className="item_being_edited">Quality Analyst</h3>
        </div>

        <div className="col-sm">
            <h3 contentEditable className="item_being_edited">Business Analyst</h3>
        </div>

        <div className="col-sm">
          <h3 contentEditable className="item_being_edited   developer_role">Developer</h3>
        </div>

        <div className="col-sm">
          <h3 contentEditable className="item_being_edited">Product Manager</h3>
        </div>

        <div className="col-sm">
          <h3 contentEditable className="item_being_edited">Technical Manager</h3>
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
          <h3 contentEditable className="item_being_edited">FULL NAME HERE</h3>
        </div>

        <div className="col-sm">
          <h3 contentEditable className="item_being_edited">GIVEN NAME HERE</h3>
        </div>

        <div className="col-sm">
          <h3 contentEditable className="item_being_edited">FAMILY NAME HERE</h3>
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


  </>
)


}