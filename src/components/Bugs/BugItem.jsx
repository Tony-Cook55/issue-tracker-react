
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
import { FaArrowLeft, FaPencilRuler, FaArrowUp } from "react-icons/fa";
// ICONS //

// Gets the id from the current bug
import { useParams, Link } from "react-router-dom";



import Comments from "./Comments"

import TestCases from "./TestCases"



// ******************* IMPORTS ******************* //









export default function BugItem( {showToast} ){

  // Lets us get the Bugs Id of the specific bug we are on
  const bugId = useParams().bugId;
  // console.log(bugId);

  const [bugItem, setBugItem] = useState({});


  const [usersFullNameFromLocalStorage, setUserFullNameFromLocalStorage] = useState("");
  const [rolesFromLocalStorage,setRolesFromLocalStorage] = useState(null);
  const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);


  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
    useEffect(() => {
      
      // This reads out of local storage for the Users Roles To see if they can Edit the Bug
      if(localStorage.getItem('roles'))
      {
        setRolesFromLocalStorage(JSON.parse(localStorage.getItem('roles')));
      }
      // Sets the fullName of the user object from local storage into the userFullName
      if(localStorage.getItem('fullName'))
      {
        setUserFullNameFromLocalStorage(JSON.parse(localStorage.getItem('fullName')));
      }
      if(localStorage.getItem('usersId'))
      {
        setUsersIdFromLocalStorage(JSON.parse(localStorage.getItem('usersId')));
      }


      // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
      // We use ${bugId} from above to get that bugs specific ID and we search as if in postman
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,             {withCredentials: true})

      // If you retrieve bugs then set the bugs useState to the data you get from backend
      .then(response => {
        // Sets the database info into this
        setBugItem(response.data);

        // console.log("User In Storage: " + userFullName.fullName);
        // console.log("User who made bug: " + bugItem.bugCreationInformation[0].bugCreatedByUser);
      })
      .catch(error => console.log(error));
  
    }, [bugId]); // Add bugId as a dependency to re-run the effect when it changes
  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //




  // THIS CHECKS both the roles of the user and to see if there name in local storage is the name of the user who created the bug
  const canUserEditThisBug =
  rolesFromLocalStorage &&
  (rolesFromLocalStorage.includes('Business Analyst') ||
    (bugItem.bugCreationInformation &&
      bugItem.bugCreationInformation.length > 0 &&
       /* IF the users ID from local storage matches that of the users ID who CREATED THE BUG they can edit */
      bugItem.bugCreationInformation[0]._id === usersIdFromLocalStorage  // Check user's ID
       /* IF the users fullName from local storage matches that of the user who is CREATED THE BUG they can edit */
      //  && bugItem.bugCreationInformation[0].bugCreatedByUser === usersFullNameFromLocalStorage.fullName
      ) ||
      /* Looks in the assignedTo Object Array and sees if the usersId Matches that of Who Made it*/
    (bugItem.assignedTo &&
      bugItem.assignedTo.some(
        (assignedUser) => assignedUser.assignedToUserId === usersIdFromLocalStorage // Check user's ID
      ))
  );





  return(
    <>

{/* <!-- overview info --> */}
  <div className="button_container   swing_in_right_fwd">

    <div className="overviewInfo">
      <div className="top_button_styles">

        {/* BUG LIST */}
        <Link to="/bugList" className="icon_link"    >
          <div className="back_button  back_button_background">
              <FaArrowLeft/>
          </div>
        </Link>
        {/* BUG LIST */}

        {/* EDIT BUG */}
          {canUserEditThisBug && (
            <Link to={`/bugEditor/${bugId}`} className="icon_link">
              <div className="edit_button  edit_button_background">
                <FaPencilRuler/>
              </div>
            </Link>
          )} 
        {/* EDIT BUG */}
      </div>
      

      
      <div className="bug_title_div">
          <div className="">
            <h1 className="bugs_title">{bugItem.title}</h1>
            <p>{bugId}</p>

            <h4>{bugItem.description}</h4>
          </div>
      </div>
</div> 
{/* <!-- overview info --> */}
















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


  {/* BUG CREATION INFO */}
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
              <p className="title_of_database_information">Added By User</p>
              {/* If the bugCreationInformation object && the bugCreationInformation[0] array is loaded do item*/}
              {bugItem.bugCreationInformation && bugItem.bugCreationInformation[0] && (
                <p className="database_information">{bugItem.bugCreationInformation[0].bugCreatedByUser}</p>
              )}
            </div>
            {/* ADDED BY USER */}

            {/* CREATED ON DATE */}
            <div className="bug_information_div">
              <p className="title_of_database_information">Created On</p>
              {bugItem.bugCreationInformation && bugItem.bugCreationInformation[0] && (
                <p className="database_information">{bugItem.bugCreationInformation[0].bugsCreationDate}</p>
              )}
            </div>
            {/* CREATED ON DATE */}

          </div>
        </div>
      
      </div>
    </div>
  </div>
  {/* BUG CREATION INFO */}





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
              <li className="mapped_bug_items database_information" key={index}>{mappedStep}</li>
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
                <p className="title_of_database_information">Classification</p>

                {bugItem.bugClassified && (
                  <p className="database_information">{bugItem.bugClassified.classification}</p>
                )}
              </div>
              {/* CLASSIFICATION OF BUG */}

              {/* CLASSIFIED BY USER */}
              <div className="bug_information_div">
                <p className="title_of_database_information">Classified By User</p>
                {bugItem.bugClassified && (
                  <div>
                    {/* IF the bugClassified object has lastClassifiedByUser it will show the Users Name : OTHERWISE : Show Message of no User */}
                    {bugItem.bugClassified.lastClassifiedByUser ? (
                      <p className="database_information">{bugItem.bugClassified.lastClassifiedByUser}</p>
                    ) : (
                      <p className="database_information">No User Has Classified This Bug</p>
                    )}
                  </div>
                )}
              </div>
              {/* CLASSIFIED BY USER */}

              {/* CLASSIFIED ON DATE */}
              <div className="bug_information_div">
                <p className="title_of_database_information">Classified On</p>
                {bugItem.bugClassified && (
                  <div>
                    {/* IF the bugClassified object has a date it was classified on "bugClassifiedOn" it will show the Date : OTHERWISE : Show Message of no Date */}
                    {bugItem.bugClassified.bugClassifiedOn ? (
                      <p className="database_information">{bugItem.bugClassified.bugClassifiedOn}</p>
                    ) : (
                      <p className="database_information">Bug Has Not Been Classified Yet</p>
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
                      <p className="mapped_item_title">User {index + 1}:</p>

                        <p className="title_of_database_information">User Assigned</p>
                        <p className="database_information">{mappedItem.assignedToUser}</p>

                        <p className="title_of_database_information">User Who Assigned</p>
                        <p className="database_information">{mappedItem.assignedByUser}</p>

                        <p className="title_of_database_information">Date Assigned</p>
                        <p className="database_information">{mappedItem.bugAssignedOn}</p>
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
  {/* {bugItem.testCases && bugItem.testCases.length > 0 && ( */}
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
                  {/* {bugItem.testCases.map((testCase, index) => (
                    <div key={index} className="mapped_bug_items col-md-4 col-sm-6">
                      <p className="mapped_item_title">Test Case {index + 1}:</p>

                        <p>{testCase._id}</p>

                        <p className="title_of_database_information">Title</p>
                        <p className="database_information">{testCase.title}</p>

                        <p className="title_of_database_information">Test Case Created By User</p>
                        <p className="database_information">{testCase.testCaseCreatedByUser}</p>

                        <p className="title_of_database_information">Test Case Created On</p>
                        <p className="database_information">{testCase.testCaseCreatedOn}</p>

                        <p className="title_of_database_information">Passed</p>
                        <p className="database_information">{testCase.passed}</p>

                        <p className="title_of_database_information">Version Release</p>
                        <p className="database_information">{testCase.versionRelease}</p>

                        <p className="title_of_database_information">Applied Fix On Date</p>
                        <p className="database_information">{testCase.appliedFixOnDate}</p>
                    </div>
                  ))} */}
                  <TestCases  bugItem={bugItem}  bugId={bugId} showToast={showToast}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/* )} */}
  {/* TEST CASES */}





  {/* COMMENTS */}
  {/* THIS SEES IF bugItem.comments exists and has a length greater than 0 before rendering the accordion section. If the condition is true, the entire accordion section will be rendered; : otherwise :, nothing will be rendered. */}
  {/* {bugItem.comments && bugItem.comments.length > 0 && ( */}

  <div className="accordion-item   ">
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
                {/* {bugItem.comments.map((comment, index) => (
                  <div key={index} className="mapped_bug_items col-md-4 col-sm-6">
                    
                    <p className="mapped_item_title">Comment {index + 1}:</p>
                      <p>{comment._id}</p>

                      <p className="title_of_database_information">Message:</p>
                      <p className="database_information">{comment.message}</p>

                      <p className="title_of_database_information">Comment Author:</p>
                      <p className="database_information">{comment.commentAuthor}</p>

                      <p className="title_of_database_information">Comment Created On:</p>
                      <p className="database_information">{comment.commentCreatedOn}</p>
                  </div>
                ))} */}
                <Comments  bugItem={bugItem}  bugId={bugId} showToast={showToast}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

{/* )} */}
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

                  <p className="title_of_database_information">Closed:</p>

                  <p className="database_information">{bugItem.bugClosed.closed}</p>
                  {bugItem.bugClosed.lastClosedByUser && (
                    <>
                      <p className="title_of_database_information">Last Closed By User:</p>
                      <p className="database_information">{bugItem.bugClosed.lastClosedByUser}</p>
                    </>
                  )}
                  {bugItem.bugClosed.bugClosedOn && (
                    <>
                      <p className="title_of_database_information">Bug Closed On:</p>
                      <p className="database_information">{bugItem.bugClosed.bugClosedOn}</p>
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
      <span className=" ">
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


        {/* TAKES YOU TO TOP OF THE PAGE */}
          <a href="#top" className="icon_link">
            <div className="  back_to_top_background">
                <FaArrowUp/>
            </div>
          </a>
        {/* TAKES YOU TO TOP OF THE PAGE */}


    </p>
  </div>

  </div>
</div>





</div>
{/* <!-- wrapper--> */}




</>
)




}