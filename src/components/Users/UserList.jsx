// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserList.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaPencilRuler } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function UserList(){

  return( 
    <>



{/* ~~~~~~~ TO HOME PAGE ~~~~~~~ */}
< a href="/" className="icon_link ag-courses-item_title" >
  <div className="">
      ~~~~ HOME PAGE ~~~~
  </div>
</a>
{/* ~~~~~~~ TO HOME PAGE ~~~~~~~ */}


<div className="ag-format-container      delay-1   item_come_in_animation   item_pop">
  <div className="item_list_box_flex">


  {/* ITEM */}
    <div className="list_item">
      <a href="/userItem" className="item_list_box_flex">
        <div className="list_item_background"></div>

        <div className="ag-courses-item_title">
          <p>User NAME HERE</p>
          <h6>ID HERE</h6>
        </div>


        <div className="ag-courses-item_title">
          <img src="/images/wide_ear_dog.png" className="user_profile_pic_small  rounded-circle" alt="User Avatar" />
        </div>


        <div className="list_item_date_container">
          User Joined On
          <span className="list_item_dates">
            <p>DATE HERE</p>
          </span>
        </div>

        < a href="/userEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}



{/* ITEM */}
<div className="list_item">
      <a href="/userItem" className="item_list_box_flex">
        <div className="list_item_background"></div>

        <div className="ag-courses-item_title">
          <p>User NAME HERE</p>
          <h6>ID HERE</h6>
        </div>


        <div className="ag-courses-item_title">
          <img src="/images/wide_ear_dog.png" className="user_profile_pic_small  rounded-circle" alt="User Avatar" />
        </div>


        <div className="list_item_date_container">
          User Joined On
          <span className="list_item_dates">
            <p>DATE HERE</p>
          </span>
        </div>

        < a href="/userEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}




  {/* ITEM */}
  <div className="list_item">
      <a href="/userItem" className="item_list_box_flex">
        <div className="list_item_background"></div>

        <div className="ag-courses-item_title">
          <p>User NAME HERE</p>
          <h6>ID HERE</h6>
        </div>


        <div className="ag-courses-item_title">
          <img src="/images/wide_ear_dog.png" className="user_profile_pic_small  rounded-circle" alt="User Avatar" />
        </div>


        <div className="list_item_date_container">
          User Joined On
          <span className="list_item_dates">
            <p>DATE HERE</p>
          </span>
        </div>

        < a href="/userEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}


  </div>
</div>





    </>

  )


}