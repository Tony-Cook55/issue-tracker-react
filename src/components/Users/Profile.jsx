/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaPencilRuler, FaArrowUp, FaSave } from "react-icons/fa";
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
{givenName, familyName}, {withCredentials: true})
.then(response => {
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






  return(
    <>

      <h1> PROFILE </h1>
      <br/>      <br/>

      <h1>{userProfile.fullName}</h1>
      <h1>Id: {userProfile._id}</h1>
      <br/>      <br/>

      <h1>Given Name</h1>
      <h1>{userProfile.givenName}</h1>
      <br/>      <br/>

      <h1>Family Name</h1>
      <h1>{userProfile.familyName}</h1>
      <br/>      <br/>



<form onSubmit={(evt) => onUserUpdate(evt)}>
<input type="text" id="givenName" className="form-control" value={givenName} onChange={(evt) => setGivenName(evt.target.value)}></input>


<input type="text" id="familyName" className="form-control" value={familyName} onChange={(evt) => setFamilyName(evt.target.value)}></input>


<button type="submit" className="icon_link" >
  <div className="edit_button  edit_button_background">
    <FaSave />
  </div>
</button>

</form>



    </>
  )
}

