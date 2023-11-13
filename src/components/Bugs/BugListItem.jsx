// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugListItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowAltCircleLeft, FaShoppingCart } from "react-icons/fa";
// ICONS //

import React, { useState } from 'react';


// ******************* IMPORTS ******************* //









export default function BugListItem(){

  return( 
    <>
<div className="wrapper">

  
<div className="overviewInfo">
  <div className="actions">
    <div className="backbutton ">
      <FaArrowAltCircleLeft/>
    </div>

    <div className="cartbutton neurobutton"> 
    <FaShoppingCart/>
    </div>
  </div>
  
  <div className="bug_title_div">
    <div className="grouptext">
      <h1>BUG TITLE HERE</h1>
      <p>Bug&#39;s Id: <br/> 123456789023456789</p>
    </div>
  </div>
</div> 
{/* <!-- overview info --> */}





<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header">SOMETHING HERE</h2>
    <div id="created_by_user" className="accordion-collapse collapse show"> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <strong>This is the first item accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>












<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">

  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <strong>This is the first item accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>


  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse">
      <div className="accordion-body">
        <strong>This is the third item accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>



</div>






<div className="productSpecifications">

  <h1> Steps To Reproduce </h1>
    <ol className="steps_to_reproduce">
      <li>Step 1</li>
      <li>Step 2</li>
      <li>Step 3</li>
    </ol>

    
  
  <div className="productFeatures">
    <div className="feature">
      <div className="featureIcon">
      </div>
      <div className="featureText">
        <p> <strong>Futuristic</strong></p>
        <p>Design</p>
      </div>
    </div>
    <div className="feature">
      <div className="featureIcon">
      </div>
      <div className="featureText">
        <p> <strong>Built-in</strong></p>
        <p>Microphone</p>
      </div>
    </div>
    <div className="feature">
      <div className="featureIcon">
      </div>
      <div className="featureText">
        <p> <strong>Haptic</strong></p>
        <p>Feedback</p>
      </div>
      </div>
    <div className="feature">
      <div className="featureIcon">
      </div>
      <div className="featureText">
        <p> <strong>Fast charge</strong></p>
        <p>USB-C port</p>
      </div>
    </div>
  </div>
  
  <div className="checkoutButton">
    <div className="priceTag">
      <span>$</span>50
    </div>
    <button className="preorder">
      <p>Preorder</p>
      <div className="buttonaction">
      <FaArrowAltCircleLeft/>
      </div>
    </button> 
  </div>
</div>
{/* <!-- product specificaiton --> */}









</div>
{/* <!-- wrapper--> */}




</>
)



  
}