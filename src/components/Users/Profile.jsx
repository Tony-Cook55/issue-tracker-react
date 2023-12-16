/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./Profile.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaPencilRuler, FaArrowUp, FaSave, FaTrash } from "react-icons/fa";
// ICONS //

import axios from "axios"

// Gets the id from the current bug
import { useParams, Link, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";


import BugScoreMedal from "../BugGame/BugScoreMedal";


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/


// ******************* IMPORTS ******************* //


  
  /* ddddddddddddddddd DATE MESSAGE ddddddddddddddddd */
    // Get the current date
    const currentDate = new Date();
  
    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const currentDay = currentDate.getDay();
  
    // Define an array of greetings based on the day of the week
    const greetings = [
      'Happy Sunday',
      'Happy Monday',
      'Happy Tuesday',
      'Happy Wednesday',
      'Happy Thursday',
      'Happy Friday',
      'Happy Saturday',
    ];
  
    // Get the greeting for the current day
    const greetingMessage = greetings[currentDay];
  /* ddddddddddddddddd DATE MESSAGE ddddddddddddddddd */




export default function Profile(   {usersIdFromLocalStorage, showToast}  ){



    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/




// The actual bugs information
const [userProfile, setUserProfile] = useState({});



// These store the new updated values of these items
const [fullName, setFullName] = useState("");
const [givenName, setGivenName] = useState("");
const [familyName, setFamilyName] = useState("");


const [deleteCounter, setDeleteCounter] = useState(0);


const navigateToAnotherPage = useNavigate();



//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
useEffect(() => {



// Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
// We use ${userId} from above to get that users specific ID and we search as if in postman
axios.get(`${import.meta.env.VITE_API_URL}/api/users/${usersIdFromLocalStorage}`,  {withCredentials: true})
.then(response => {
  // Sets the database info into this
  setUserProfile(response.data);

    // Setting the new ITEMS THAT ARE UPDATED
    setFullName(response.data.fullName);
    setGivenName(response.data.givenName);
    setFamilyName(response.data.familyName);
})
.catch(error => {
  console.log(error)
}
);

}, [deleteCounter, usersIdFromLocalStorage]); // Add userId as a dependency to re-run the effect when it changes
//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //







// Define a function to handle local state update to allow instant update to view
const updateLocalState = (updatedUser) => {
  setUserProfile((prev) => ({
    ...prev,
    fullName: updatedUser.fullName,
    givenName: updatedUser.givenName,
    familyName: updatedUser.familyName,

    editable: false, // Exit edit mode
  }));
};



// uuuuuuuuuuuuuuuuu UPDATE A USER uuuuuuuuuuuuuuuuu //
function onUserUpdate(evt){
evt.preventDefault();

const updatedUser ={
  // Spreading the User Profile
  // ...userProfile,

  // Setting the new items here
  fullName: fullName,
  givenName: givenName,
  familyName: familyName,
}

// Update the local state immediately
updateLocalState(updatedUser);

// THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...usersProfile INFO THE ID WONT TRY AND BE PASSED INTO AS THE BODY
delete updatedUser._id;

// console.log(bugId);
console.log(updatedUser);


// Does the update backend function
axios.put(`${import.meta.env.VITE_API_URL}/api/users/me`,
// This spread of the bugs is what allows it to be sent as the body.params
updatedUser, {withCredentials: true})
.then(response => {

  // navigateToAnotherPage(`/`);
  showToast(response.data.Update_Successful, "success");
})
.catch(error => {
  console.log(error.Update_Error)
  }
);
// uuuuuuuuuuuuuuuuu UPDATE A USER uuuuuuuuuuuuuuuuu //

}





// -------------------- DELETING USER FROM DATABASE -------------------
function onUserDelete(evt, userId){
  evt.preventDefault();

  axios.delete(`${import.meta.env.VITE_API_URL}/api/users/delete/${userProfile._id}`, {withCredentials: true})
  .then(response => { 

    // When you delete a book this counter goes up by 1
    setDeleteCounter(previousCount => previousCount + 1);

    // response.data.message is our json message from the backend 
    console.log(response.data.User_Deleted);

    navigateToAnotherPage("/");

    location.reload();

    // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
    showToast(response.data.User_Deleted, "success");

  })
  .catch(error => 
    console.log(error)
  );
}
// -------------------- DELETING USER FROM DATABASE -------------------











  return(
    <>


<div className="button_container slide_in_from_top    ">

  <div className="overviewInfo    user_background"> {/* user_background */}

    {/* BUTTONS */}
    <div className="top_button_styles">

      {/* BACK HOME */}
      <Link to="/" className="icon_link"    >
        <div className="back_button  back_button_background">
            <FaArrowLeft/>
        </div>
      </Link>
      {/* BUG LIST */}


      {/* Edit User Button Puts Profile In Edit Mode*/}
        {/* When Edit Button is clicked */}
        {userProfile.editable ? (
          /* USER IN EDIT MODE */
            <button type="button" className="icon_link"
              onClick={(evt) => {
                  onUserUpdate(evt);
                  setUserProfile((prev) => ({ ...prev, editable: false }));
                  {/* TAKES YOU TO TOP OF THE PAGE */}
                    // Smooth scroll to the top on click
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth"
                    });
                  {/* TAKES YOU TO TOP OF THE PAGE */}
              }}
            >
              <div className="edit_button  edit_button_background">
                <FaSave />
              </div>
            </button>
          /* USER IN EDIT MODE */

        ) : (
          /* USER NOT IN EDIT MODE */
          <div>
            <div className="top_button_styles">
              <button type="button" className="icon_link "
                onClick={() => setUserProfile((prev) => ({ ...prev, editable: true }))}
              >
                <div className="edit_button  edit_button_background">
                    <FaPencilRuler />
                </div>
              </button>
            </div>



            
          </div>
          /* USER NOT IN EDIT MODE */
        )}
      {/* Edit User Button Puts Profile In Edit Mode*/}


    </div>
    {/* BUTTONS */}



    <div className="profile_top    justify-content-center align-items-center">
      <div className="user_pic_name_container">
        <div className="profile_box">
          <div className="profile_card">
              <h2 className="greeting_message"><strong>{greetingMessage}</strong></h2>
              <h2 className="users_name"><strong>{userProfile.fullName}</strong></h2>
              <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
              {/* <p>Last Time Logged In: {userProfile.lastTimeUserLoggedIn}</p> */}
          </div>
        </div>
      </div>


      {/* // ++++++ BUG GAME SCORE ++++++ // */}
      {/* Calling in the Medals For the users Score and passing the users Id in */}
      <div className="justify-content-center   text-center">
        <BugScoreMedal  usersId={usersId}/>
      </div>
      {/* // ++++++ BUG GAME SCORE ++++++ // */}




        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}

          <h1 className="enter_firing_range_text_profile">Enter The Firing Range</h1>

          <Link to="/bugGame">
            <img
              src="/images/colored_bug_logo.png"
              className="bug_image_profile"
              alt="Bug"
            />
          </Link>

        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}

    </div>


</div> 
{/* <!-- overview info --> */}















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">

<div className="">

  {/* When the Edit Button is clicked This will show */}
  {userProfile.editable ? (
    <div>
        {/* EDIT FULL NAME */    /* Code ripped straight from the UserEditor.jsx */}
        <div className="accordion-item">          
            <h2 className="accordion-header">
              <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
                Full Name
              </button>
            </h2>
            <div id="title" className="accordion-collapse ">
              <div className="accordion-body  edit_form_accordion-body">

                  <div className="container text-center justify-content-center">
                    <div className="row ">
                      
                        <div className="col-sm  accordion_edit_form_container">
                          {/* fullName */}
                          <textarea  id="fullName" className="edit_form_input_center  item_being_edited   form-control   text-center" 
                            value={fullName} 
                            onChange={(evt) => setFullName(evt.target.value)}></textarea>
                          {/* fullName */}
                        </div>

                    </div>
                  </div>

              </div>
            </div>
          </div>
        {/* FULL NAME */}


        {/* GIVEN NAME */}
        <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
            Given Name
          </button>
        </h2>
        <div id="title" className="accordion-collapse ">
          <div className="accordion-body  edit_form_accordion-body">

              <div className="container text-center justify-content-center">
                <div className="row ">
                  
                    <div className="col-sm  accordion_edit_form_container">
                      {/* Given Name */}
                      <textarea  id="givenName" className="edit_form_input_center  item_being_edited   form-control   text-center  " 
                        value={givenName} 
                        onChange={(evt) => setGivenName(evt.target.value)}></textarea>
                      {/* Given Name */}
                    </div>

                </div>
              </div>

          </div>
        </div>
      </div>
      {/* GIVEN NAME */}



      {/* FAMILY NAME */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button    text-center " type="button"  data-bs-target="#" aria-expanded="false" aria-controls="">
            Family Name
          </button>
        </h2>
        <div id="title" className="accordion-collapse ">
          <div className="accordion-body  edit_form_accordion-body">

              <div className="container text-center justify-content-center">
                <div className="row ">
                  
                    <div className="col-sm  accordion_edit_form_container">
                      {/* Family Name */}
                      <textarea  id="familyName" className="edit_form_input_center  item_being_edited   form-control   text-center  " 
                        value={familyName} 
                        onChange={(evt) => setFamilyName(evt.target.value)}></textarea>
                      {/* Family Name */}
                    </div>

                </div>
              </div>

          </div>
        </div>
      </div>
      {/* FAMILY NAME */}

    </div> /* End of container for all edits*/




  ) : ( /* ITEMS SHOWN NORMALLY WHEN NOT IN EDIT MODE */
    <div>




      {/* SENSITIVE USER INFORMATION ACCORDION */}
        {/* Check if the logged-in user has the necessary role or is viewing their own profile */}
        <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button accordion_button_animation text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#sensitive_user_info" aria-expanded="true" aria-controls="sensitive_user_info">
                Sensitive User Information
              </button>
            </h2>
            <div id="sensitive_user_info" className="accordion-collapse collapse">
              <div className="accordion-body">
                <div className="container text-center justify-content-center">
                  <div className="row text-center justify-content-center">
                    {/* Render sensitive user information here */}
                    <div className="">
                      <p className="title_of_database_information">Email</p>
                        <p className="database_information">{userProfile.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      {/* SENSITIVE USER INFORMATION ACCORDION */}


      {/* USERS ROLES */}
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_roles" aria-expanded="false" aria-controls="users_roles">
            Roles You Have
          </button>
        </h2>
        <div id="users_roles" className="accordion-collapse collapse">
          <div className="accordion-body">

            <div className="container text-center justify-content-center">
              <div className="row">

                {/* USERS ROLE */}
                <div className="bug_information_div">
                    {/* Checks if the array is there and then maps all the items in the array by calling them steps and giving each an index to identify them */}
                    {userProfile.role && userProfile.role.map((mappedRoles, index) => (
                      <li className="users_roles" key={index}>{mappedRoles}</li>
                    ))}
                </div>
                {/* USERS ROLE */}

              </div>
            </div>
          
          </div>
        </div>
      </div>
      {/* USERS ROLES */}


      {/* USERS OTHER NAMES */}
      <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#creation_information" aria-expanded="false" aria-controls="creation_information">
              Your Names
            </button>
          </h2>
          <div id="creation_information" className="accordion-collapse collapse">
            <div className="accordion-body">

              <div className="container text-center justify-content-center">
                <div className="row">

                  {/* FULL NAME */}
                  <div className="bug_information_div">
                    <p className="title_of_database_information">Full Name</p>
                      <p className="database_information">{userProfile.fullName}</p>
                  </div>
                  {/* FULL NAME */}

                  {/* GIVEN NAME */}
                  <div className="bug_information_div">
                    <p className="title_of_database_information">Given Name</p>
                      <p className="database_information">{userProfile.givenName}</p>
                  </div>
                  {/* GIVEN NAME */}

                  {/* FAMILY NAME */}
                  <div className="bug_information_div">
                    <p className="title_of_database_information">Family Name</p>
                      <p className="database_information">{userProfile.familyName}</p>
                  </div>
                  {/* FAMILY NAME */}

                </div>
              </div>
            
            </div>
          </div>
        </div>
        {/* USERS OTHER NAMES */}

    </div> /* End of container for all SHOWN BASE INFO */
  )}

</div>






    {/* Edit User Button Puts Profile In Edit Mode*/}
    <div className="row">
        <div className="col-md-12">

            {/* When Edit Button is clicked */}
            {userProfile.editable ? (
              /* USER IN EDIT MODE */
                <button type="button" className="icon_link   mb-3"
                  onClick={(evt) => {
                      onUserUpdate(evt);
                      setUserProfile((prev) => ({ ...prev, editable: false }));
                      {/* TAKES YOU TO TOP OF THE PAGE */}
                        // Smooth scroll to the top on click
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth"
                        });
                      {/* TAKES YOU TO TOP OF THE PAGE */}
                  }}
                >
                  <div className="edit_button  edit_button_background">
                    <FaSave />
                  </div>
                </button>
              /* USER IN EDIT MODE */

            ) : (
              <span></span>
              /* USER NOT IN EDIT MODE */
                // <button type="button" className="icon_link my-3"
                //   onClick={() => setUserProfile((prev) => ({ ...prev, editable: true }))}
                // >
                //   <div className="edit_button  edit_button_background">
                //       <FaPencilRuler />
                //   </div>
                // </button>
              /* USER NOT IN EDIT MODE */
            )}

        </div>
    </div>
    {/* Edit User Button Puts Profile In Edit Mode*/}





</div> {/* END OF ACCORDION */}








  <div className="bottom_cap_under_accordion">
    <div className="end_cap_base">

    <div className="container ">
      <div className="last_updated_on "> 
          {userProfile.usersCreationDate && (
            <p className="last_updated_on">User Joined On: <br/> {userProfile.usersCreationDate}</p>
          )}
      </div>

      {/* TAKES YOU TO TOP OF THE PAGE */}
      <a href="#top" className="icon_link">
          <div className="  back_to_top_background">
              <FaArrowUp/>
          </div>
        </a>
      {/* TAKES YOU TO TOP OF THE PAGE */}
    </div>
  </div>
</div>






</div>
{/* <!-- wrapper--> */}

































        {/* <button type="button" className="icon_link" data-bs-toggle="modal" data-bs-target="#confirmation_modal" >
                    <div className="edit_button  delete_button_background">
                      <FaTrash />
                    </div>
              </button> */}



{/* dddddddddddddddddddddd DELETING CONFIRMATION MODAL dddddddddddddddddddddd*/}
{/* <div className="modal fade   modal-confirm"  id="confirmation_modal"  aria-labelledby="confirmation_modal_title" aria-hidden="true">
	<div className="modal-dialog ">
		<div className="modal-content">
			<div className="modal-header flex-column">
				<div className="icon-box">
					<i className="material-icons"><FaTrash/></i>
				</div>						
				<h4 className="modal-title w-100" id="confirmation_modal_title">Are you sure?</h4>	
                <button type="button" className="close" aria-hidden="true" data-bs-dismiss="modal" aria-label="Close">&times;</button>
			</div>
			<div className="modal-body">
				<p>Do you really want to delete this User? This process cannot be undone.</p>
			</div>
			<div className="modal-footer justify-content-center">
				<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
				<button type="button" className="btn btn-danger"  onClick={(evt) => onUserDelete(evt, userProfile._id)} >Delete</button>
			</div>
		</div>
	</div>
</div>   */}
{/* dddddddddddddddddddddd DELETING CONFIRMATION MODAL dddddddddddddddddddddd*/}





    </>
  )
}

