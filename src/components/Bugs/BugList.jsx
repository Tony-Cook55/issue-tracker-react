// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugList.css"

// ICONS //   Call them in like this    <FaClock/>
import {  } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function BugList(){

  return( 
    <>
<div className="ag-format-container">
  <div className="ag-courses_box">

    <div className="ag-courses_item">
      <a href="#" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <p>Description Here</p>
          <p>Classification HERE</p>
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