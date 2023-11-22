// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugItem.css"

import axios from "axios"

import { useState, useEffect } from "react"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaPencilRuler } from "react-icons/fa";
// ICONS //


import { useParams } from "react-router-dom";


// ******************* IMPORTS ******************* //









export default function BugItem(){

  // Lets us get the Bugs Id of the specific bug we are on
  const bugId = useParams().bugId;
  // console.log(bugId);
  const [bugItem, setBugItem] = useState([]);


  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
    useEffect(() => {
      // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
      // We use ${bugId} from above to get that bugs specific ID and we search as if in postman
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,             {withCredentials: true})

      // If you retrieve bugs then set the bugs useState to the data you get from backend
      .then(response => {
        setBugItem(response.data);
      })
      .catch(error => console.log(error));

    }, );
  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //



//   function loopArray() {
//       let arr = bugItem.stepsToReproduce[0];

//     arr.forEach(element => {
//        console.log(element);
//     });
// }

// let i = 0;

// while (i < bugItem.stepsToReproduce.length) {
//     console.log(bugItem.stepsToReproduce[i]);
//     i++;
// }



// console.log(bugItem.bugCreationInformation[0].bugsCreationDate);
// console.log(bugItem.bugCreationInformation[0].bugCreatedByUser);


  return( 
    <>

  <div className="wrapper swing_in_right_fwd">

    <div className="overviewInfo">
      <div className="top_button_styles">
        < a href="/bugList" className="icon_link"    >
          <div className="back_button  back_button_background">
              <FaArrowLeft/>
          </div>
        </a>

        <a href="/bugEditor" className="icon_link"   >
          <div className="edit_button  edit_button_background">
            <FaPencilRuler/>
          </div>
        </a>
      </div>
      

      
      <div className="bug_title_div">
          <div className="">
            <h1>{bugItem.title}</h1>
            <p>Bug&#39;s Id <br/> {bugItem._id}</p>

            <br></br>

            <h2>{bugItem.description}</h2>
          </div>
      </div>
</div> 
{/* <!-- overview info --> */}
















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


  {/* BUG ADDED INFO */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#creation_information" aria-expanded="false" aria-controls="creation_information">
        Bug Creation Information
      </button>
    </h2>
    <div id="creation_information" className="accordion-collapse collapse">
      <div className="accordion-body">

        <div className="container text-center justify-content-center">
          <div className="row">
            {/* <div className="col-sm">
              <h3>Added By User</h3>
              <h4>{bugItem.bugCreationInformation[0].bugCreatedByUser}</h4>
            </div>

            <div className="col-sm">
              <h3>Created On</h3>
              <h4>{bugItem.bugCreationInformation[0].bugsCreationDate}</h4>
            </div> */}
          </div>
        </div>
      
      </div>
    </div>
  </div>
  {/* BUG ADDED INFO */}





  {/* STEPS TO REPRODUCE */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    accordion_button_animation   text-center  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#steps_to_reproduce" aria-expanded="true" aria-controls="steps_to_reproduce">
        Steps To Reproduce
      </button>
    </h2>
    <div id="steps_to_reproduce" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <ol className="accordion_ol">
          {/* <li>{bugItem.stepsToReproduce[0]}</li>
          <li>{bugItem.stepsToReproduce[1]}</li> */}
        </ol>
      </div>
    </div>
  </div>
  {/* STEPS TO REPRODUCE */}








  {/* CLASSIFICATION */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button   accordion_button_animation   text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
        Classification
      </button>
    </h2>
    <div id="classification" className="accordion-collapse collapse">
      <div className="accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row">
              {/* <div className="col-sm">
                <h3>Classification</h3>
                <h4 className="">{bugItem.bugClassified.classification}</h4>
              </div>

              <div className="col-sm">
                <h3>Classified On</h3>
                <h4>{bugItem.bugClassified.bugClassifiedOn}</h4>
              </div> */}
            </div>
          </div>

      </div>
    </div>
  </div>
  {/* CLASSIFICATION */}



    {/* ASSIGNED TO USER */}
    <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    accordion_button_animation   text-center  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#assigned_to_user" aria-expanded="true" aria-controls="assigned_to_user">
        Assigned To
      </button>
    </h2>
    <div id="assigned_to_user" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <h2>Assigned to User: NAME HERE</h2>
        <h3>USER ID HERE 1234567890</h3>
        <h4>Bug Assigned On: DATE HERE</h4>
      </div>
    </div>
  </div>
  {/* ASSIGNED TO USER */}



  {/* COMMENTS */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    accordion_button_animation   text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#comments" aria-expanded="false" aria-controls="comments">
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
      <button className="accordion-button    accordion_button_animation   text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#test_cases" aria-expanded="false" aria-controls="test_cases">
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




    {/* CLOSED */}
    <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    accordion_button_animation   text-center  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#closed" aria-expanded="true" aria-controls="closed">
        Closed
      </button>
    </h2>
    <div id="closed" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
      <div className="accordion-body">
        <h3>Is This Bug Closed: ADD True or False</h3>
        <h4>Closed On: ADD DATE HERE</h4>
      </div>
    </div>
  </div>
  {/* CLOSED */}



</div>
{/* END OF ACCORDION */}





<div className="bottom_cap_under_accordion">
  <div className="end_cap_base">

  <div className="container ">
    <p className="last_updated_on ">Last Updated On: <span className="last_updated_on ">DATE HERE</span></p>
  </div>


    {/* <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-4">
          
        </div>
        <div className="col-md-6 col-sm-4">

        </div>
      </div>
    </div> */}

  </div>
</div>










</div>
{/* <!-- wrapper--> */}




</>
)



  
}