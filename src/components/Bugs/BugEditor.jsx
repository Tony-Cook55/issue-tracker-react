/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


// CSS
import "./BugListItem.css"
import "./BugEditor.css"


// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaSave, FaArrowUp, FaTrash } from "react-icons/fa";
// ICONS //

import axios from "axios";

import Stopwatch from "../Stopwatch/Stopwatch";


// used for getting the bugs ID
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

// Changes pages
import { useNavigate } from "react-router-dom";



  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/


// ******************* IMPORTS ******************* //









export default function BugEditor(  {showToast}  ) {




  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/





  // This must match the id in the route path thats in App : path="/bugEditor/:bugId"
  const {bugId} = useParams();

  // The actual bugs information
  const [bugItem, setBugItem] = useState({});

    // These store the new updated values of these items
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [stepsToReproduce, setStepsToReproduce] = useState([]); // <--- Its an empty array instead of string due to stepsToReproduce being an array



    const [classification, setClassification] = useState("");

    const [assignedToUserId, setAssignedToUserId] = useState("");

    const [closeBug, setCloseBug] = useState("");


    const [deleteCounter, setDeleteCounter] = useState(0);


    const navigateToAnotherPage = useNavigate();


// -+ -+ -+ CAN USER UPDATE AND DELETE USER BUG+- +- +- //
  const [usersFullNameFromLocalStorage, setUserFullNameFromLocalStorage] = useState("");
  const [rolesFromLocalStorage,setRolesFromLocalStorage] = useState(null);
  const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);
// -+ -+ -+ CAN USER UPDATE AND DELETE USER BUG+- +- +- //





  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
  useEffect(() => {
    if (isLoggedIn){

      // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG
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
      // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG



        // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
        // We use ${bugId} from above to get that bugs specific ID and we search as if in postman
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,             {withCredentials: true})

        // If you retrieve bugs then set the bugs useState to the data you get from backend
        .then(response => {
          // Sets the database info into this
          setBugItem(response.data);

          // Setting the new ITEMS THAT ARE UPDATED
          setTitle(response.data.title);
          setDescription(response.data.description);
          setStepsToReproduce(response.data.stepsToReproduce);

          // Set the classification if available
          setClassification(response.data.bugClassified ? response.data.bugClassified.classification : '');

          // Sees if it can put in the true or false
          setCloseBug(response.data.bugClosed ? response.data.bugClosed.closed : "False")
        })
        .catch(error => {
          console.log(error)
        }
        );

  }

  }, [isLoggedIn, deleteCounter, bugId]); // Add bugId as a dependency to re-run the effect when it changes
//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //






  // -+ -+ -+ CAN USER UPDATE AND DELETE BUG +- +- +- //
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
  // -+ -+ -+ CAN USER UPDATE AND DELETE BUG +- +- +- //








// uuuuuuuuuuuuuuuuu UPDATE A BUG uuuuuuuuuuuuuuuuu //
  function onBugUpdate(evt){
    evt.preventDefault();

    const updatedBug ={
      // Spreading the bug
      ...bugItem,

      // Setting the new items here
      title,
      description,
      stepsToReproduce
    }


    // THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...updatedBook THE ID WONT TRY AND BE PASSED INTO AS THE BODY
    delete updatedBug._id;

    // console.log(bugId);
    console.log(updatedBug);

    // Does the update backend function
    axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/update/${bugId}`,
    // This spread of the bugs is what allows it to be sent as the body.params
    {title, description, stepsToReproduce}, {withCredentials: true})
    .then(response => {

      // After updating the bug, hit the classification function that holds the relocate page
      onClassificationUpdate(evt);

      // Once a user 
      onAssignUserToBug(evt);

      onCloseBug(evt);


      showToast(response.data.Bug_Updated, "success");

      // navigateToAnotherPage(`/bugItem/${bugId}`);

    })
    .catch(error => {
      console.log(error.response),

      showToast(error.response.data.Update_Error, "error")
      showToast(error.response.data.Users_Allowed, "error")
      // showToast(error.response.data.Update_Error + " " + error.response.data.Users_Allowed, "error")
      }
    );
  }
  // uuuuuuuuuuuuuuuuu UPDATE A BUG uuuuuuuuuuuuuuuuu //








  // ucucucucucucucuc UPDATE BUGS CLASSIFICATION ucucucucucucucuc //
  function onClassificationUpdate(evt){
    evt.preventDefault();

    // if (!rolesFromLocalStorage && !rolesFromLocalStorage.includes('Business Analyst')) {
    //   // Show an error message or handle the lack of permission as needed
    //   showToast("You don't have permission to update classification", "error");
    //   return;
    // }

    // Axios call for classification update
  axios.put(
    `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/classify`,
    { classification },
    { withCredentials: true }
  )
    .then(response => {

      // showToast(response.data.Bug_Classified, "success");

      // After updating the classification, navigate to the Bug Item page
      navigateToAnotherPage(`/bugItem/${bugId}`);

    })
    .catch(error => {
      console.log(error.response);
      showToast(error.response.data.Assign_Error, "error");
      showToast(error.response.data.Users_Allowed, "error");
    });
  }
  // ucucucucucucucuc UPDATE BUGS CLASSIFICATION ucucucucucucucuc //















    // aaaaaaaaaaaaaaaaaa ASSIGN A BUG aaaaaaaaaaaaaaaaaa //



      const [allUsers, setUser] = useState([]);

      // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //
      useEffect(() => {
        // Fetch User data only if the user is logged in with their fullName
    
          axios.get(`${import.meta.env.VITE_API_URL}/api/users/list/`, 
          { withCredentials: true,})
            .then(response => {
              setUser(response.data.users);
    
            })
            .catch(error => console.log(error));
    
      },  []);
      // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //




      const onAssignUserToBug = () => {
        // Make a POST request to assign the user
        axios
          .put(
            `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/assign`,
            { assignedToUserId },
            { withCredentials: true }
          )
          .then((response) => {
            // Update the bugItem state to reflect the changes
            setBugItem((prevBugItem) => ({
              ...prevBugItem,
              assignedTo: response.data.assignedTo,
            }));

            // After Assigning the user to bug, navigate to the Bug Item page
            navigateToAnotherPage(`/bugItem/${bugId}`);
      
            showToast(response.data.Bug_Assigned, "success");
          })
          .catch((error) => {
            console.log(error.response);
            showToast(error.response.data.Assign_Error, "error");
            showToast(error.response.data.Users_Allowed, "error");
          });
      };
    // aaaaaaaaaaaaaaaaaa ASSIGN A BUG aaaaaaaaaaaaaaaaaa //




    
    // xxxxxxxxxxxxxxxxxxxx CLOSE BUG xxxxxxxxxxxxxxxxxxxx //
    function onCloseBug(evt){
      evt.preventDefault();
  
      // Axios call for classification update
    axios.put(
      `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/close`,
      { closed: closeBug },
      { withCredentials: true }
    )
      .then(response => {
  
        // After updating the closeBug, navigate to the Bug Item page
        navigateToAnotherPage(`/bugItem/${bugId}`);
  
      })
      .catch(error => {
        console.log(error.response);
        showToast(error.response.data.Error, "error");
      });
    }
    // xxxxxxxxxxxxxxxxxxxx CLOSE BUG xxxxxxxxxxxxxxxxxxxx //




    // -------------------- DELETING BUG FROM DATABASE -------------------
    function onBugDelete(evt, bugId){
      evt.preventDefault();

      axios.delete(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`, {withCredentials: true})
      .then(response => { 

        // When you delete a book this counter goes up by 1
        setDeleteCounter(previousCount => previousCount + 1);

        // response.data.message is our json message from the backend 
        console.log(response.data.Bugs_Deleted);

        navigateToAnotherPage("/bugList");

        location.reload();

        // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
        showToast(response.data.Bugs_Deleted, "success");

      })
      .catch(error => 
        console.log(error),
      );
    }
  // -------------------- DELETING BUG FROM DATABASE -------------------








  return (
    <>




    <form onSubmit={(evt) => onBugUpdate(evt)}>
      <div className=" swing_in_left_bck  ">
        <div className="overviewInfo">
          <div className="top_button_styles">

            {/* BACK TO BUG ITEM */}
            <Link to={`/bugItem/${bugItem._id}`} className="icon_link">
              <div className="back_button  back_button_background">
                <FaArrowLeft />
              </div>
            </Link>
            {/* BACK TO BUG ITEM */}


            {/* DELETE THIS BUG */}
            {canUserEditThisBug && (
            <button type="button" className="icon_link" data-bs-toggle="modal" data-bs-target="#confirmation_modal" >
                  <div className="edit_button  delete_button_background">
                    <FaTrash />
                  </div>
            </button>
            )}
            {/* DELETE THIS BUG */}


                  {/* <button className="delete_button">
                    <span viewBox="0 0 448 512" className="svgIcon">
                    <FaTrash />
                    </span>
                  </button> */}


            {/* SAVE/UPDATE THIS BUG */}
            {canUserEditThisBug && (
            <button type="submit" className="icon_link" >
              <div className="edit_button  edit_button_background">
                <FaSave />
              </div>
            </button>
            )}
            {/* SAVE/UPDATE THIS BUG */}



          </div>

          <div className="bug_title_div">
            <div className="">
              <h1>You Are Now Updating Bug:</h1>
              <h2>{bugItem.title}</h2>
              <p className=" ">{bugId}</p>

              <p className=" ">
                Time Spent Updating This Bug: <Stopwatch />
              </p>


            </div>
          </div>
        </div>
        {/* <!-- overview info --> */}



















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


  {/* TITLE */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
        Title
      </button>
    </h2>
    <div id="title" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row ">
              
                <div className="col-sm  accordion_edit_form_container">
                  {/* TITLE */}
                  <textarea  id="title" className="edit_form_input_center  item_being_edited   form-control   text-center  " 
                    value={title} 
                    onChange={(evt) => setTitle(evt.target.value)}></textarea>
                  {/* TITLE */}
                </div>

            </div>
          </div>

      </div>
    </div>
  </div>
  {/* TITLE */}



  {/* DESCRIPTION */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
        Description
      </button>
    </h2>
    <div id="title" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row ">
              
                <div className="col-sm  accordion_edit_form_container">
                  {/* DESCRIPTION */}
                      <textarea  id="description" className="edit_form_input_center  item_being_edited   form-control   text-center  " 
                        value={description} 
                        onChange={(evt) => setDescription(evt.target.value)}></textarea>
                  {/* DESCRIPTION */}
                </div>

            </div>
          </div>

      </div>
    </div>
  </div>
  {/* DESCRIPTION */}



  {/* STEPS TO REPRODUCE */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
        Steps To Reproduce
      </button>
    </h2>
    <div id="title" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row ">
              
                <div className="col-sm  accordion_edit_form_container">
                  {/* STEPS TO REPRODUCE */}
                  <p>Simply Go To a New Line To Add a New Step</p>
                  <textarea id="stepsToReproduce" className="edit_form_input_center  item_being_edited   form-control   text-center  "
                    value={stepsToReproduce.join('\n')} // Join array elements with new lines
                    onChange={(evt) => setStepsToReproduce(evt.target.value.split('\n'))} // Split textarea value into an array
                    rows={5} // Set the initial height to 5 rows to show
                  ></textarea>
                  {/* STEPS TO REPRODUCE */}
                </div>

            </div>
          </div>

      </div>
    </div>
  </div>
  {/* STEPS TO REPRODUCE */}



  {/* CLASSIFICATION */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
        Classification
      </button>
    </h2>
    <div id="classification" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row">
              
                <div className="col-sm   accordion_edit_form_container">
                      {rolesFromLocalStorage && rolesFromLocalStorage.includes('Business Analyst') && (
                        <select id="classification" className="edit_form_input_center  item_being_edited   form-control   text-center  "
                          value={classification}
                          onChange={(evt) => setClassification(evt.target.value)}
                        >
                          <option value="Unclassified" className="edit_form_select_options">Unclassified</option>
                          <option value="Approved" className="edit_form_select_options">Approved</option>
                          <option value="Unapproved" className="edit_form_select_options">Unapproved</option>
                          <option value="Duplicate" className="edit_form_select_options">Duplicate</option>
                        </select>
                      )}
                </div>

            </div>
          </div>

      </div>
    </div>
  </div>
  {/* CLASSIFICATION */}




  {/* ASSIGN A USER TO BUG */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
        Assign User To Bug
      </button>
    </h2>
    <div id="classification" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row">
              
                <div className="col-sm   accordion_edit_form_container">
                      {/* ASSIGN A USER TO BUG  WITH ID*/}
                        {/* {rolesFromLocalStorage && rolesFromLocalStorage.includes('Technical Manager') && (
                        <div className="d-flex flex-row align-items-center form-color">
                          <input type="text" placeholder="Enter User ID to Assign" className="edit_form_input_center  item_being_edited   form-control   text-center  "
                            value={assignedToUserId}
                            onChange={(evt) => setAssignedToUserId(evt.target.value)}
                          />
                          <button type="button" lassName="btn btn-primary ml-2"
                            onClick={onAssignUserToBug}
                          >
                            Assign User
                          </button>
                        </div>
                        )} */}
                      {/* ASSIGN A USER TO BUG */}

                      {/* ASSIGN A USER TO BUG WITH DROPDOWN */}
                        {rolesFromLocalStorage && rolesFromLocalStorage.includes('Technical Manager') && (
                          <div className="d-flex flex-row align-items-center form-color">
                            <select
                              id="assignedToUserId"
                              className="edit_form_input_center item_being_edited form-control text-center"
                              value={assignedToUserId}
                              onChange={(evt) => setAssignedToUserId(evt.target.value)}
                            >
                              <option value="" disabled>Select User</option>
                              {allUsers.map(user => (
                                <option key={user._id} value={user._id}>{user.fullName}</option>
                              ))}
                            </select>
                          </div>
                        )}
                      {/* ASSIGN A USER TO BUG */}
                </div>

            </div>
          </div>

      </div>
    </div>
  </div>
  {/* ASSIGN A USER TO BUG */}



  {/* CLOSE BUG */}
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
        Close Bug
      </button>
    </h2>
    <div id="title" className="accordion-collapse ">
      <div className="accordion-body  edit_form_accordion-body">

          <div className="container text-center justify-content-center">
            <div className="row ">
              
                <div className="col-sm  accordion_edit_form_container">
                  {/* CLOSE BUG */}
                  {rolesFromLocalStorage && rolesFromLocalStorage.includes('Business Analyst') && (
                  <div className="d-flex flex-row align-items-center form-color">
                    <select id="closeBug" className="edit_form_input_center  item_being_edited   form-control   text-center  " 
                      value={closeBug}
                      onChange={(evt) => setCloseBug(evt.target.value)}
                    >
                      <option value="">Is This Bug Closed?</option>
                      <option value="True">True</option>
                      <option value="False">False</option>
                    </select>
                  </div>
                  )}
                  {/* CLOSE BUG */}
                </div>

            </div>
          </div>

      </div>
      
    </div>


            {/* SAVE/UPDATE THIS BUG */}
            {canUserEditThisBug && (
            <button type="submit" className="icon_link" >
              <div className="edit_button  edit_button_background">
                <FaSave />
              </div>
            </button>
            )}
            {/* SAVE/UPDATE THIS BUG */}


  </div>
  {/* CLOSE BUG */}



</div>
{/* END OF ACCORDION */}















        <div className="bottom_cap_under_accordion">
          <div className="end_cap_base">
            <div className="container ">
              <p className="last_updated_on ">



              {bugItem.bugUpdated && bugItem.bugUpdated.bugLastUpdatedOn && (
                <p className="last_updated_on">Bug Last Updated On: <br/> {bugItem.bugUpdated.bugLastUpdatedOn}</p>
              )}

              {!bugItem.bugUpdated || !bugItem.bugUpdated.bugLastUpdatedOn && (
                <p className="last_updated_on">Bug not yet updated</p>
              )}


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
    </form>















{/* dddddddddddddddddddddd DELETING CONFIRMATION MODAL dddddddddddddddddddddd*/}
<div className="modal fade   modal-confirm"  id="confirmation_modal"  aria-labelledby="confirmation_modal_title" aria-hidden="true">
	<div className="modal-dialog "> {/* modal-dialog-centered */}
		<div className="modal-content">
			<div className="modal-header flex-column">

				{/* <div className="icon-box">
					<i className="material-icons"><FaTrash/></i>
				</div>			 */}

        {/* Close Button */}
        <button type="button" className="close" aria-hidden="true" data-bs-dismiss="modal" aria-label="Close">&times;</button>
        
				{/* <h4 className="modal-title w-100" id="confirmation_modal_title">Want To Delete This Bug?</h4>	 */}
        
        {/* <div className="modal-body">
          <p>Do you really want to delete this Bug? This process cannot be undone.</p>
        </div> */}

			</div>


        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}
              <section className=""> {/* delete_fullscreen_banner */}
                <div className="delete_fullscreen_banner_content">
                  <h1 className="eliminate_bug_text">Shoot The Bug To Delete It</h1>

                  <div className="modal-body">
                    <p>Do you really want to delete this Bug? This process cannot be undone. Just Shoot The Bug To Delete It.</p>
                  </div>

                  <img
                    src="/images/colored_bug_logo.png"
                    className="bug_image"
                    alt="Bug"
                  />

                  <img
                    src="/images/crosshair.png"
                    className="cross_hair"
                    alt="Crosshair"
                    onClick={(evt) => onBugDelete(evt, bugId)} // This Deletes the bug when the pic is clicked
                  />

                </div>
              </section>
        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}



			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
				{/* <button type="button" className="btn btn-danger"  onClick={(evt) => onBugDelete(evt, bugId)} >Delete</button> */}
			</div>
		</div>
	</div>
</div>     
{/* dddddddddddddddddddddd DELETING CONFIRMATION MODAL dddddddddddddddddddddd*/}


    </>
  );
}