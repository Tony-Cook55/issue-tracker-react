// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugList.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaPencilRuler } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function BugList(){

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
  <div className="ag-courses_box">


  {/* ITEM */}
    <div className="ag-courses_item">
      <a href="/bugItem" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <h6>ID HERE</h6>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>

        < a href="/bugEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}




  {/* ITEM */}
  <div className="ag-courses_item">
      <a href="/bugItem" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <h6>ID HERE</h6>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>

        < a href="/bugEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}



  


  {/* ITEM */}
  <div className="ag-courses_item">
      <a href="/bugItem" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <h6>ID HERE</h6>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>

        < a href="/bugEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}



  {/* ITEM */}
  <div className="ag-courses_item">
      <a href="/bugItem" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <h6>ID HERE</h6>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>

        < a href="/bugEditor" className="icon_link ag-courses-item_title" >
            <div className="edit_button edit_button_background">
                <FaPencilRuler/>
            </div>
          </a>

      </a>
    </div>
  {/* ITEM */}



    {/* ITEM */}
    <div className="ag-courses_item">
      <a href="/bugItem" className="ag-courses-item_link">
        <div className="ag-courses-item_bg"></div>

        <div className="ag-courses-item_title">
          <p>BUG TITLE 1</p>
          <h6>ID HERE</h6>
        </div>

        <div className="ag-courses-item_date-box">
          Created
          <span className="ag-courses-item_date">
            <p>CREATED ON DATE HERE</p>
          </span>
        </div>

        < a href="/bugEditor" className="icon_link ag-courses-item_title" >
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