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




export default function Profile(   {usersIdFromLocalStorage}  ){






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
axios.get(`${import.meta.env.VITE_API_URL}/api/users/${usersIdFromLocalStorage}`,             {withCredentials: true})

// If you retrieve the users then set the users useState to the data you get from backend
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



// uuuuuuuuuuuuuuuuu UPDATE A USER uuuuuuuuuuuuuuuuu //
function onUserUpdate(evt){
evt.preventDefault();

const updatedUser ={
  // Spreading the book
  ...userProfile,

  // Setting the new items here
  fullName,
  givenName,
  familyName,
}


// THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...usersProfile INFO THE ID WONT TRY AND BE PASSED INTO AS THE BODY
delete updatedUser._id;

// console.log(bugId);
console.log(updatedUser);

// Does the update backend function
axios.put(`${import.meta.env.VITE_API_URL}/api/users/me`,
// This spread of the bugs is what allows it to be sent as the body.params
{fullName, givenName, familyName}, {withCredentials: true})
.then(response => {

  setUserProfile((prev) => ({
    ...prev,
    fullName: response.data.fullName,
    givenName: response.data.givenName,
    familyName: response.data.familyName,
    editable: false, // Exit edit mode
  }));

  // navigateToAnotherPage(`/`);
  showToast(response.data.Update_Successful, "success");
  // console.log(response.data);
})
.catch(error => {
  console.log(error.response)
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

      


{/* <form onSubmit={(evt) => onUserUpdate(evt)}>
<input type="text" id="givenName" className="form-control" value={givenName} onChange={(evt) => setGivenName(evt.target.value)}></input>


<input type="text" id="familyName" className="form-control" value={familyName} onChange={(evt) => setFamilyName(evt.target.value)}></input>


<button type="submit" className="icon_link" >
  <div className="edit_button  edit_button_background">
    <FaSave />
  </div>
</button>

</form> */}







<div className="button_container slide_in_from_top    ">

  <div className="overviewInfo    user_background">

    {/* USER LIST */}
    <div className="top_button_styles">
      < a href="/userList" className="icon_link"    >
        <div className="back_button  back_button_background">
        <FaArrowLeft/>
        </div>
      </a>
    {/* USER LIST */}


    {/* USER EDITOR */}
      {/* {canUserEditThisUser && (
        <Link to={`/userEditor/${userId}`} className="icon_link">
          <div className="edit_button  edit_button_background">
            <FaPencilRuler/>
          </div>
        </Link>
      )}  */}
    {/* USER EDITOR */}

    </div>
    

    
    <div className="bug_title_div">
      <div className="user_pic_name_container">
        <div className="profile_box">
          <div className="profile_card">
              <h2><strong>{greetingMessage}</strong></h2>
              <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
              {/* <img src="/images/user_profile_body.png" className="user_profile_pic  rounded-circle" alt="User Avatar" /> */}
              <h2 className="users_name"><strong>{userProfile.fullName}</strong></h2>


                              <p>
                                  User Last Updated <br/>
                                  {userProfile.userLastUpdated
                                      ? userProfile.userLastUpdated
                                      : "User hasn't been updated yet"}
                              </p>
          </div>
        </div>
      </div>

    </div>

</div> 
{/* <!-- overview info --> */}
















{/* BEGINNING OF ACCORDION */}
<div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">









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
        User's Roles
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
        Names
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



</div> {/* END OF ACCORDION */}





<div className="bottom_cap_under_accordion">
  <div className="end_cap_base">

  <div className="container ">
    <p className="last_updated_on "> 
    {userProfile.usersCreationDate && (
    <p className="last_updated_on">User Joined On: <br/> {userProfile.usersCreationDate}</p>
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

























<div class="container emp-profile">
            <form method="post">
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src="/images/user_profile_circle_filled.png" alt="Avatar"/>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="profile-head">
                                    <h2>
                                      {userProfile.fullName}
                                    </h2>
                                    <h6>
                                      {userProfile.role && userProfile.role.length > 0
                                        ? userProfile.role.join(', ')
                                        : 'No roles available'}
                                    </h6>
                                    <p class="proile-rating">User Id : <span>{userProfile._id}</span></p>
                        </div>
                    </div>
                </div>
                <div class="row  text-center justify-content-center">
                    <div class="col-md-4">
                        <div class=""> {/* profile-work */}
                            <p>User Joined On</p>
                            <p>{userProfile.usersCreationDate}</p>
                            <br/>
                            <p>User Last Updated</p>
                              <p>
                                  {userProfile.userLastUpdated
                                      ? userProfile.userLastUpdated
                                      : "User hasn't been updated yet"}
                              </p>
                        </div>
                    </div>

                    <div class="col-md-8 ">
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Full Name</label>
                                            </div>
                                            <div class="col-md-8">
                                            {userProfile.editable ? (
            <input
                type="text"
                id="fullName"
                className="form-control"
                value={fullName}
                onChange={(evt) => setFullName(evt.target.value)}
            />
        ) : (
            <p>{userProfile.fullName}</p>
        )}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Given Name</label>
                                            </div>
                                            <div class="col-md-8">
                                                        {userProfile.editable ? (
            <input
                type="text"
                id="givenName"
                className="form-control"
                value={givenName}
                onChange={(evt) => setGivenName(evt.target.value)}
            />
        ) : (
            <p>{userProfile.givenName}</p>
        )}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Family Name</label>
                                            </div>
                                            <div class="col-md-8">
                                            {userProfile.editable ? (
            <input
                type="text"
                id="familyName"
                className="form-control"
                value={familyName}
                onChange={(evt) => setFamilyName(evt.target.value)}
            />
        ) : (
            <p>{userProfile.familyName}</p>
        )}
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Users Id</label>
                                            </div>
                                            <div class="col-md-8">
                                                <p>{userProfile._id}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Email</label>
                                            </div>
                                            <div class="col-md-8">
                                                <p>{userProfile.email}</p>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <label>Users Roles</label>
                                            </div>
                                            <div class="col-md-8">
                                                <p>
                                                  {userProfile.role && userProfile.role.length > 0
                                                    ? userProfile.role.join(' ~ ')
                                                    : 'No roles available'}
                                                </p>
                                            </div>
                                        </div>




<div class="row">
    <div class="col-md-12">
        {userProfile.editable ? (
            <button
                type="button"
                className="btn btn-primary"
                onClick={(evt) => {
                    onUserUpdate(evt);
                    setUserProfile((prev) => ({ ...prev, editable: false }));
                }}
            >
                Save
            </button>
        ) : (
            <button
                type="button"
                className="icon_link"
                onClick={() => setUserProfile((prev) => ({ ...prev, editable: true }))}
            >
                <div className="edit_button  edit_button_background">
                    <FaPencilRuler />
                </div>
            </button>
        )}
    </div>
</div>


                            </div>
                        </div>
                    </div>
                </div>
            </form>           
        </div>











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

