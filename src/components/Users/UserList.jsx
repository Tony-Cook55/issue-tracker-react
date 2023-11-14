// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserList.css"

// ICONS //   Call them in like this    <FaClock/>
import {  } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function UserList(){

  return( 
    <>
<div className="ag-format-container">
  <div className="ag-courses_box">

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>USER NAME HERE</p>
        </div>


  {/* ROLES */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center collapsed        ag-courses-item_title" type="button" data-bs-toggle="collapse" data-bs-target="#roles" aria-expanded="false" aria-controls="roles">
        Comments
      </button>
    </h2>
    <div id="roles" className="accordion-collapse collapse">
      <div className="accordion-body">

      <div className="ag-courses-item_date-box ">
          User&#39;s Roles
          <span className="ag-courses-item_date">
            <ul>
              <li>Developer, </li>
              <li>Business Analyst, </li>
              <li>Quality Analyst, </li>
              <li>Product Manager, </li>
              <li>Technical Manager</li>
            </ul>
          </span>
        </div>

      </div>
    </div>
  </div>
  {/* ROLES */}


        <div className="ag-courses-item_date-box">
          User Joined
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>
      </a>
    </div>

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 2</p>

        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>
      </a>
    </div>



    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 3</p>

        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>
      </a>
    </div>



    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>Forgot how to use Bootstrap</p>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>11/14/2023</p>
          </span>
        </div>
      </a>
    </div>




    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>Awesome Cook Bug title right here</p>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>11/11/2023</p>
          </span>
        </div>
      </a>
    </div>


  </div>
</div>
    </>

  )


}