// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugListItem.css"
import "./BugEditor.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaSave } from "react-icons/fa";
// ICONS //


import Stopwatch from "../Stopwatch/Stopwatch";

//import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function BugEditor() {
  const bugTitle = "BUG TITLE HERE"; // Replace with dynamic data from the database
  const bugId = "123456789023456789"; // Replace with dynamic data from the database
  const description = "DESCRIPTION HERE"; // Replace with dynamic data from the database
  const classification = "APPROVED"; // Replace with dynamic data from the database
  const classifiedOn = "DATE CREATE HERE"; // Replace with dynamic data from the database
  const isClosed = false; // Replace with dynamic data from the database
  const closedOn = "ADD DATE HERE"; // Replace with dynamic data from the database

  return (
    <>


{/* ~~~~~~~ TO HOME PAGE ~~~~~~~ */}
< a href="/" className="icon_link ag-courses-item_title" >
  <div className="">
      ~~~~ HOME PAGE ~~~~
  </div>
</a>
{/* ~~~~~~~ TO HOME PAGE ~~~~~~~ */}



      <div className="wrapper swing_in_left_bck  ">
        <div className="overviewInfo">
          <div className="top_button_styles">
            <a href="/bugItem" className="icon_link" title="Back To Bug">
              <div className="back_button  back_button_background">
                <FaArrowLeft />
              </div>
            </a>

            <a href="/bugItem" className="icon_link" title="Save This Bug">
              <div className="edit_button  edit_button_background">
                <FaSave />
              </div>
            </a>
          </div>

          <div className="bug_title_div">
            <div className="">
              <h1>You Are Now Updating Bug:</h1>
              <h3>{bugId}</h3>

              <br />

              <h1 contentEditable className="item_being_edited">{bugTitle}</h1>

              <br></br>

              <h2 contentEditable className="item_being_edited">{description}</h2>
            </div>
          </div>
        </div>
        {/* <!-- overview info --> */}



        {/* BEGINNING OF ACCORDION */}
        <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


          {/* STEPS TO REPRODUCE */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button text-center   collapsed  " type="button"  data-bs-target="#steps_to_reproduce" aria-expanded="true" aria-controls="steps_to_reproduce">
                Steps To Reproduce
              </button>
            </h2>
            <div id="steps_to_reproduce" className="accordion-collapse    ">
              {/*add:    show   to he className to allow it to always be open on start */}
              <div className="accordion-body">
                <ol className="accordion_ol" >
                  <li className="item_being_edited" contentEditable>Step 1</li>
                  <li className="item_being_edited" contentEditable>Step 2</li>
                  <li className="item_being_edited" contentEditable>Step 3</li>
                </ol>
              </div>
            </div>
          </div>
          {/* STEPS TO REPRODUCE */}

          {/* CLASSIFICATION */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button text-center collapsed" type="button" /* data-bs-toggle="collapse" */ data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
                Classification
              </button>
            </h2>
            <div id="classification" className="accordion-collapse ">
              {/* collapse lets the items close*/}
              <div className="accordion-body">
                <div className="container text-center justify-content-center">
                  <div className="row">
                    <div className="col-sm">
                      <h4 contentEditable className="item_being_edited">{classification}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CLASSIFICATION */}

          {/* CLOSED */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button text-center  collapsed"
                type="button"
                /* data-bs-toggle="collapse" */
                data-bs-target="#closed"
                aria-expanded="true"
                aria-controls="closed"
              >
                Closed
              </button>
            </h2>
            <div id="closed" className="accordion-collapse  ">
              {/*add:    show   to he className to allow it to always be open on start */}
              <div className="accordion-body">
                <h3>Is This Bug Closed: </h3>
                <h3 className="item_being_edited" contentEditable>{isClosed ? "True" : "False"}</h3>
              </div>
            </div>
          </div>
          {/* CLOSED */}
        </div>
        {/* END OF ACCORDION */}

        <div className="bottom_cap_under_accordion">
          <div className="end_cap_base">
            <div className="container ">
              <p className="last_updated_on ">
                Time Spent Updating This Bug: <Stopwatch />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- wrapper--> */}
    </>
  );
}