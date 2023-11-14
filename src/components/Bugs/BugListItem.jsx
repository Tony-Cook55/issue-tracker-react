// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugListItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowAltCircleLeft, FaShoppingCart, FaTrash, FaEdit } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function BugListItem(){

  return( 
    <>
<div className="wrapper">
  
<div className="overviewInfo">
  <div className="top_button_styles">
    <div className="back_button">
      <FaArrowAltCircleLeft/>
    </div>

    {/* <p className="spacer_text">ㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤㅤ</p> */}


    <div className="right_button button_background">
    <FaShoppingCart/>
    </div>
  </div>
  
  <div className="bug_title_div">
    <div className="">
      <h1>BUG TITLE HERE</h1>
      <p>Bug&#39;s Id <br/> 123456789023456789</p>

      <br></br>

      <h2>DESCRIPTION HERE</h2>
    </div>
  </div>
</div> 
{/* <!-- overview info --> */}
















{/* BEGGING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


  {/* STEPS TO REPRODUCE */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center" type="button" data-bs-toggle="collapse" data-bs-target="#steps_to_reproduce" aria-expanded="true" aria-controls="steps_to_reproduce">
        Steps To Reproduce
      </button>
    </h2>
    <div id="steps_to_reproduce" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <ol className="accordion_ol">
          <li>Step 1</li>
          <li>Step 2</li>
          <li>Step 3</li>
        </ol>
      </div>
    </div>
  </div>
  {/* STEPS TO REPRODUCE */}




  {/* BUG ADDED INFO */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#creation_information" aria-expanded="false" aria-controls="creation_information">
        Bug Creation Information
      </button>
    </h2>
    <div id="creation_information" className="accordion-collapse collapse">
      <div className="accordion-body">

        <div className="container text-center justify-content-center">
          <div className="row">
            <div className="col-sm">
              <h3>Added By User</h3>
              <h4>USER NAME HERE</h4>
            </div>

            <div className="col-sm">
              <h3>Created On</h3>
              <h4>DATE CREATE HERE</h4>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  </div>
  {/* BUG ADDED INFO */}




  {/* CLASSIFICATION */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
        Classification
      </button>
    </h2>
    <div id="classification" className="accordion-collapse collapse">
      <div className="accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row">
              <div className="col-sm">
                <h3>Classification</h3>
                <h4 className="">APPROVED</h4>
              </div>

              <div className="col-sm">
                <h3>Classified On</h3>
                <h4>DATE CREATE HERE</h4>
              </div>
            </div>
          </div>

      </div>
    </div>
  </div>
  {/* CLASSIFICATION */}




  {/* COMMENTS */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="false" aria-controls="comments">
        Comments
      </button>
    </h2>
    <div id="comments" className="accordion-collapse collapse">
      <div className="accordion-body">

          <div className="">
            <h2>MESSAGE TEXT HERE</h2>
            <h5>USER NAME HERE</h5>
            <h6>CREATED ON DATE HERE</h6>
          </div>

          <div className="pt-5">
            <h2>MESSAGE TEXT HERE</h2>
            <h5>USER NAME HERE</h5>
            <h6>CREATED ON DATE HERE</h6>
          </div>

      </div>
    </div>
  </div>
  {/* COMMENTS */}




  {/* TEST CASES */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#test_cases" aria-expanded="false" aria-controls="test_cases">
        Test Cases
      </button>
    </h2>
    <div id="test_cases" className="accordion-collapse collapse">
      <div className="accordion-body">

          <div className="">
            <h2>TITLE HERE</h2>
            <h5>CREATED BY USER HERE</h5>
            <h6>CREATED ON DATE HERE</h6>
            <h4>PASSED ?</h4>
            <h4>VERSION RELEASE</h4>
            <h4>APPLIED FIX ON DATE HERE</h4>
          </div>

      </div>
    </div>
  </div>
  {/* TEST CASES */}



</div>
{/* END OF ACCORDION */}





<div className="bottom_cap_under_accordion">






  
  <div className="end_cap_base">

    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-4">
          <button className="edit_button  ">
            <p className="edit_text"><FaEdit/></p>
            <p className="edit_text">Edit</p>
          </button> 
        </div>
        <div className="col-md-6 col-sm-4">
          <button className="delete_button  ">
              <p className="delete_text"><FaTrash/></p>
              <p className="delete_text">Delete</p>
          </button> 
        </div>
      </div>
    </div>

  </div>
</div>










</div>
{/* <!-- wrapper--> */}




</>
)



  
}