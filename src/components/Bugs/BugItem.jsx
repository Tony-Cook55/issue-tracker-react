
/* eslint-disable */

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

// Gets the id from the current bug
import { useParams, Link } from "react-router-dom";



// ******************* IMPORTS ******************* //









export default function BugItem(){

  // Lets us get the Bugs Id of the specific bug we are on
  const bugId = useParams().bugId;
  // console.log(bugId);

  const [bugItem, setBugItem] = useState({});

  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
    useEffect(() => {
      // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
      // We use ${bugId} from above to get that bugs specific ID and we search as if in postman
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,             {withCredentials: true})

      // If you retrieve bugs then set the bugs useState to the data you get from backend
      .then(response => {
        // Sets the database info into this
        setBugItem(response.data);
      })
      .catch(error => console.log(error));
  
    }, [bugId]); // Add bugId as a dependency to re-run the effect when it changes
  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //




  return(
    <>

  <div className="button_container   swing_in_right_fwd">

    <div className="overviewInfo">
      <div className="top_button_styles">
        < a href="/bugList" className="icon_link"    >
          <div className="back_button  back_button_background">
              <FaArrowLeft/>
          </div>
        </a>

        
        <Link to={`/bugEditor/${bugId}`} className="icon_link">
          <div className="edit_button  edit_button_background">
            <FaPencilRuler/>
          </div>
          </Link>
      </div>
      

      
      <div className="bug_title_div">
          <div className="">
            <h1>{bugItem.title}</h1>
            <p>Bug&#39;s Id <br/>{bugId}</p>

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

            {/* ADDED BY USER */}
            <div className="bug_information_div">
              <h3>Added By User</h3>
              {/* If the bugCreationInformation object && the bugCreationInformation[0] array is loaded do item*/}
              {bugItem.bugCreationInformation && bugItem.bugCreationInformation[0] && (
                <h4>{bugItem.bugCreationInformation[0].bugCreatedByUser}</h4>
              )}
            </div>
            {/* ADDED BY USER */}

            {/* CREATED ON DATE */}
            <div className="bug_information_div">
              <h3>Created On</h3>
              {bugItem.bugCreationInformation && bugItem.bugCreationInformation[0] && (
                <h4>{bugItem.bugCreationInformation[0].bugsCreationDate}</h4>
              )}
            </div>
            {/* CREATED ON DATE */}

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
        <div className="bug_information_div">
          <ol className="accordion_ol">

            {/* Checks if the array is there and then maps all the items in the array by calling them steps and giving each an index to identify them */}
            {bugItem.stepsToReproduce && bugItem.stepsToReproduce.map((mappedStep, index) => (
              <li className="mapped_bug_items" key={index}>{mappedStep}</li>
            ))}

          </ol>
        </div>
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
              {/* CLASSIFICATION OF BUG */}
              <div className="bug_information_div">
                <h3>Classification</h3>

                {bugItem.bugClassified && (
                  <h4>{bugItem.bugClassified.classification}</h4>
                )}
              </div>
              {/* CLASSIFICATION OF BUG */}

              {/* CLASSIFIED BY USER */}
              <div className="bug_information_div">
                <h3>Classified By User</h3>
                {bugItem.bugClassified && (
                  <div>
                    {/* IF the bugClassified object has lastClassifiedByUser it will show the Users Name : OTHERWISE : Show Message of no User */}
                    {bugItem.bugClassified.lastClassifiedByUser ? (
                      <h4>Last Classified By: {bugItem.bugClassified.lastClassifiedByUser}</h4>
                    ) : (
                      <h4>Not yet classified by any user</h4>
                    )}
                  </div>
                )}
              </div>
              {/* CLASSIFIED BY USER */}

              {/* CLASSIFIED ON DATE */}
              <div className="bug_information_div">
                <h3>Classified On</h3>
                {bugItem.bugClassified && (
                  <div>
                    {/* IF the bugClassified object has a date it was classified on "bugClassifiedOn" it will show the Date : OTHERWISE : Show Message of no Date */}
                    {bugItem.bugClassified.bugClassifiedOn ? (
                      <h4>Classified On: {bugItem.bugClassified.bugClassifiedOn}</h4>
                    ) : (
                      <h4>Bug Has Not Been Classified Yet</h4>
                    )}
                  </div>
                )}
              </div>
              {/* CLASSIFIED ON DATE */}
            </div>
          </div>

      </div>
    </div>
  </div>
  {/* CLASSIFICATION */}





  {/* ASSIGNED TO USER */}
  {/* THIS SEES IF bugItem.assignedTo exists and has a length greater than 0 before rendering the accordion section. If the condition is true, the entire accordion section will be rendered; : otherwise :, nothing will be rendered. */}
  {bugItem.assignedTo && bugItem.assignedTo.length > 0 && (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#assigned_to_user" aria-expanded="true" aria-controls="assigned_to_user">
          Assigned To
        </button>
      </h2>
      <div id="assigned_to_user" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="container text-center justify-content-center">
            <div className="">
              {/* ASSIGNED TO USERS NAME */}
              <div className="bug_information_div">
                {/* SEES IF bugItem.assignedTo exists and has a length greater than 0. If true, it renders the content inside the parentheses; :otherwise: it renders the NOT ASSIGNED YET after the : */}
                <div className="row text-center justify-content-center">
                  {bugItem.assignedTo.map((mappedItem, index) => (
                    <div key={index} className="mapped_bug_items col-md-4 col-sm-6">
                      {/* This is to add +1 for every mapped index we have. It uses index + 1 because index is zero-based, and we want to start the count from 1.  */}
                      <h2>User {index + 1}:</h2>
                      <h3>Assigned Name:</h3>
                      <p>{mappedItem.assignedToUser}</p>
                      <h3>User Who Assigned:</h3>
                      <p>{mappedItem.assignedByUser}</p>
                      <h3>Date Assigned:</h3>
                      <p>{mappedItem.bugAssignedOn}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  {/* ASSIGNED TO USER */}





  {/* TEST CASES */}
  {bugItem.testCases && bugItem.testCases.length > 0 && (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#test_cases_section" aria-expanded="true" aria-controls="test_cases_section">
          Test Cases
        </button>
      </h2>
      <div id="test_cases_section" className="accordion-collapse collapse">
        <div className="accordion-body">
          <div className="container text-center justify-content-center">
            <div className="">
              <div className="bug_information_div">
                {/* SEES IF bugItem.testCases exists and has a length greater than 0. If true, it renders the content inside the parentheses; :otherwise: it renders nothing after the : */}
                <div className="row text-center justify-content-center">
                  {bugItem.testCases.map((testCase, index) => (
                    <div key={index} className="mapped_bug_items col-md-4 col-sm-6">
                      <h2>Test Case {index + 1}:</h2>
                      <h3>Title:</h3>
                      <p>{testCase.title}</p>
                      <h3>Test Case Created By User:</h3>
                      <p>{testCase.testCaseCreatedByUser}</p>
                      <h3>Test Case Created On:</h3>
                      <p>{testCase.testCaseCreatedOn}</p>
                      <h3>Passed:</h3>
                      <p>{testCase.passed ? 'Yes' : 'No'}</p>
                      <h3>Version Release:</h3>
                      <p>{testCase.versionRelease}</p>
                      <h3>Applied Fix On Date:</h3>
                      <p>{testCase.appliedFixOnDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
  {/* TEST CASES */}





  {/* COMMENTS */}
  {/* THIS SEES IF bugItem.comments exists and has a length greater than 0 before rendering the accordion section. If the condition is true, the entire accordion section will be rendered; : otherwise :, nothing will be rendered. */}
  {bugItem.comments && bugItem.comments.length > 0 && (
  /* COMMENTS SECTION */
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button
        className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#comments_section" aria-expanded="true" aria-controls="comments_section">
        Comments
      </button>
    </h2>
    <div id="comments_section" className="accordion-collapse collapse">
      <div className="accordion-body">
        <div className="container text-center justify-content-center">
          <div className="">
            <div className="bug_information_div">
              {/* SEES IF bugItem.comments exists and has a length greater than 0. If true, it renders the content inside the parentheses; :otherwise: it renders nothing after the : */}
              <div className="row  text-center justify-content-center">
                {bugItem.comments.map((comment, index) => (
                  <div key={index} className="mapped_bug_items col-md-4 col-sm-6">
                    <h2>Comment {index + 1}:</h2>
                    <h3>Message:</h3>
                    <p>{comment.message}</p>
                    <h3>Comment Author:</h3>
                    <p>{comment.commentAuthor}</p>
                    <h3>Comment Created On:</h3>
                    <p>{comment.commentCreatedOn}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  /* COMMENTS SECTION */
)}
  {/* COMMENTS */}





{/* BUG CLOSED SECTION */}
{bugItem.bugClosed && (
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#bugClosed_section" aria-expanded="true" aria-controls="bugClosed_section" >
        Bug Closed
      </button>
    </h2>
    <div id="bugClosed_section" className="accordion-collapse collapse">
      <div className="accordion-body">
        <div className="container text-center justify-content-center">
          <div className="">
            <div className="bug_information_div">
              <div className="row  text-center justify-content-center">
                <div className=" col-md-4 col-sm-6">
                  <h3>Closed:</h3>
                  <p>{bugItem.bugClosed.closed}</p>
                  {bugItem.bugClosed.lastClosedByUser && (
                    <>
                      <h3>Last Closed By User:</h3>
                      <p>{bugItem.bugClosed.lastClosedByUser}</p>
                    </>
                  )}
                  {bugItem.bugClosed.bugClosedOn && (
                    <>
                      <h3>Bug Closed On:</h3>
                      <p>{bugItem.bugClosed.bugClosedOn}</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
{/* BUG CLOSED SECTION */}


</div>
{/* END OF ACCORDION */}






<div className="bottom_cap_under_accordion">
  <div className="end_cap_base">

  <div className="container ">
    <p className="last_updated_on "> 
      <span className="last_updated_on ">
      {/* Checks if the bug updated object is there AND if bugLastUpdatedOn is there IF NOT : OTHERWISE : Throw the Not updated yet message*/}
      {bugItem.bugUpdated && bugItem.bugUpdated.bugLastUpdatedOn ? (
                    <>
                      <p>Last Updated On:</p>
                      <p>{bugItem.bugUpdated.bugLastUpdatedOn}</p>
                    </>
      ) : (
        <p>This Bug Has Not Been Updated Yet</p>
      )}

      </span>
    </p>
  </div>

  </div>
</div>






</div>
{/* <!-- wrapper--> */}




</>
)




}