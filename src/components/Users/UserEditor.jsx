/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserListItem.css"

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


// ******************* IMPORTS ******************* //

export default function UserEditor(  {showToast}  ){


  // This must match the id in the route path thats in App : path="/userEditor/:userId"
  const {userId} = useParams();

  // The actual bugs information
  const [userProfile, setUserProfile] = useState({});



  // These store the new updated values of these items
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [role, setRole] = useState([]); // <--- Its an empty array instead of string due to role being an array



  const [deleteCounter, setDeleteCounter] = useState(0);


  const navigateToAnotherPage = useNavigate();



//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
useEffect(() => {



  // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
  // We use ${userId} from above to get that users specific ID and we search as if in postman
  axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`,             {withCredentials: true})

  // If you retrieve the users then set the users useState to the data you get from backend
  .then(response => {
    // Sets the database info into this
    setUserProfile(response.data);


          // Setting the new ITEMS THAT ARE UPDATED
          setGivenName(response.data.givenName);
          setFamilyName(response.data.familyName);
          setRole(response.data.role);
  })
  .catch(error => {
    console.log(error)
  }
  );

}, [deleteCounter, userId]); // Add userId as a dependency to re-run the effect when it changes
//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //



// uuuuuuuuuuuuuuuuu UPDATE A USER uuuuuuuuuuuuuuuuu //
function onUserUpdate(evt){
  evt.preventDefault();

  const updatedUser ={
    // Spreading the book
    ...userProfile,

    // Setting the new items here
    givenName,
    familyName,
    role: userProfile.role, // Use userProfile.role instead of role
  }

    // Log the updatedUser to inspect the structure before making the request
    console.log('Updated User:', updatedUser);

  // THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...usersProfile INFO THE ID WONT TRY AND BE PASSED INTO AS THE BODY
  delete updatedUser._id;

  // console.log(bugId);
  console.log(updatedUser);

  // Does the update backend function
  axios.put(`${import.meta.env.VITE_API_URL}/api/users/update/${userId}`,
  // This spread of the bugs is what allows it to be sent as the body.params
  {givenName, familyName, role}, {withCredentials: true})
  .then(response => {
    // navigateToAnotherPage(`/`);
    navigateToAnotherPage(`/user/${userId}`);
    showToast(response.data.User_Updated, "success");
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

    axios.delete(`${import.meta.env.VITE_API_URL}/api/users/delete/${userId}`, {withCredentials: true})
    .then(response => { 

      // When you delete a book this counter goes up by 1
      setDeleteCounter(previousCount => previousCount + 1);

      // response.data.message is our json message from the backend 
      console.log(response.data.User_Deleted);

      navigateToAnotherPage("/userList");

      location.reload();

      // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
      showToast(response.data.User_Deleted, "success");

    })
    .catch(error => 
      console.log(error)
    );
  }
// -------------------- DELETING USER FROM DATABASE -------------------










return (
  <>

<form onSubmit={(evt) => onUserUpdate(evt)}>
  <div className=" slide_in_from_top">

    <div className="overviewInfo    user_background">


      <div className="top_button_styles">

              <Link to={`/user/${userId}`} className="icon_link">
                <div className="back_button  back_button_background">
                  <FaArrowLeft />
                </div>
              </Link>

              <button type="button" className="icon_link" data-bs-toggle="modal" data-bs-target="#confirmation_modal" >
                    <div className="edit_button  delete_button_background">
                      <FaTrash />
                    </div>
              </button>


              <button type="submit" className="icon_link" >
                <div className="edit_button  edit_button_background">
                  <FaSave />
                </div>
              </button>
      </div>
      

      
      <div className="bug_title_div">

            <h1>Currently Editing User</h1>
            <h2>{userProfile.fullName}</h2>

            <p className=" ">
                Time Spent Updating This User: <Stopwatch />
            </p>

        <div className="user_pic_name_container">

          <div className="profile_box">
            <div className="profile_card">
                <img src="/images/wide_ear_dog.png" className="user_profile_pic  rounded-circle" alt="User Avatar" />
                <h2 className="users_name  item_being_edited" ><strong>USER NAME HERE</strong></h2>
            </div>
          </div>

        </div>

      </div>

  </div> 
  {/* <!-- overview info --> */}







              {/* GIVEN NAME */}
                <p>Given Name</p>
                <input type="text" id="givenName" className="form-control" 
                  value={givenName} 
                  onChange={(evt) => setGivenName(evt.target.value)}></input>
              {/* GIVEN NAME */}


              {/* FAMILY NAME */}
                <p>Family Name</p>
                <input type="text" id="familyName" className="form-control" 
                  value={familyName} 
                  onChange={(evt) => setFamilyName(evt.target.value)}></input>
              {/* FAMILY NAME */}


              {/* USERS ROLES */}
              <p>Users Roles</p>
              <textarea id="role" className="form-control"
                value={role.join('\n')} // Join array elements with new lines
                onChange={(evt) => setRole(evt.target.value.split('\n'))} // Split textarea value into an array
                rows={5} // Set the initial height to 5 rows to show
              ></textarea>
              {/* USERS ROLES */}



  {/* BEGINNING OF ACCORDION */}
  <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">



  {/* ROLES */}
  <div className="accordion-item">
  <h2 className="accordion-header">
    <button className="accordion-button   accordion_button_animation    text-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_roles" aria-expanded="false" aria-controls="users_roles">
      User&#39;s Role&#39;s
    </button>
  </h2>
  <div id="users_roles" className="accordion-collapse collapse">
    <div className="accordion-body">

      <div className="container text-center justify-content-center">
        
        <div className="row">
          <div className="col-sm">
            <h3  className="item_being_edited">Quality Analyst</h3>
          </div>

          <div className="col-sm">
              <h3  className="item_being_edited">Business Analyst</h3>
          </div>

          <div className="col-sm">
            <h3  className="item_being_edited   developer_role">Developer</h3>
          </div>

          <div className="col-sm">
            <h3  className="item_being_edited">Product Manager</h3>
          </div>

          <div className="col-sm">
            <h3  className="item_being_edited">Technical Manager</h3>
          </div>

        </div>
      </div>
    
    </div>
  </div>
  </div>
  {/* ROLES */}






  {/* USERS OTHER NAMES */}
  <div className="accordion-item">
  <h2 className="accordion-header">
    <button className="accordion-button    accordion_button_animation   text-center  collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#users_other_names" aria-expanded="true" aria-controls="users_other_names">
      Names
    </button>
  </h2>
  <div id="users_other_names" className="accordion-collapse collapse "> {/*add:    show   to he className to allow it to always be open on start */}
    <div className="accordion-body">

    <div className="row">

          <div className="col-sm">
            <h3  className="item_being_edited">FULL NAME HERE</h3>
          </div>

          <div className="col-sm">
            <h3  className="item_being_edited">GIVEN NAME HERE</h3>
          </div>

          <div className="col-sm">
            <h3  className="item_being_edited">FAMILY NAME HERE</h3>
          </div>

        </div>
      </div>

  </div>
  </div>
  {/* USERS OTHER NAMES */}



  </div>
  {/* END OF ACCORDION */}





  <div className="bottom_cap_under_accordion">
    <div className="end_cap_base">

      <div className="container ">
        <p className="last_updated_on "> 
        

            {userProfile.userLastUpdated && (
              <p className="last_updated_on">User Last Updated On: <br/> {userProfile.userLastUpdated}</p>
            )}

            {!userProfile.userLastUpdated && (
              <p className="last_updated_on">User Has Not Been Updated Yet</p>
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
				<button type="button" className="btn btn-danger"  onClick={(evt) => onUserDelete(evt, userId)} >Delete</button>
			</div>
		</div>
	</div>
</div>     
{/* dddddddddddddddddddddd DELETING CONFIRMATION MODAL dddddddddddddddddddddd*/}




  </>
)


}