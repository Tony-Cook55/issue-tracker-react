
/* eslint-disable */




// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./Comments.css"

import axios from "axios"


import { useState, useEffect } from "react"


import { useNavigate } from "react-router-dom"


// ******************* IMPORTS ******************* //



export default function Comments( {bugItem, bugId, showToast} ){

  const [testCases, setTestCases] = useState([]);

  const [newTestCase, setNewTestCase] = useState("");


      // Retrieve the user's info object from local storage
      const userInfo = JSON.parse(localStorage.getItem('fullName'));

      // Extract the fullName from the userInfo object
      const userFullName = userInfo ? userInfo.fullName : null;
    
      // Check if the user is logged in by verifying the existence of fullName
      const isLoggedIn = userFullName !== null;



  // ~~~~~~~~~~~~~~~~ FIND ALL TEST CASES IN BUG ~~~~~~~~~~~~~~~~ //
  useEffect(() => {

    if (isLoggedIn) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/test/list`,{withCredentials: true})

      .then(response => {
        // Sets the database info into this
        setTestCases(response.data);

      })
      .catch(error => console.log(error));
  }

  }, [isLoggedIn, bugId]); // Add bugId as a dependency to re-run the effect when it changes
// ~~~~~~~~~~~~~~~~ FIND ALL TEST CASES IN BUG ~~~~~~~~~~~~~~~~ //








// ++++++++++++++++ ADDING A NEW TEST CASE TO BUG ++++++++++++++++++
const addNewComment = () => {

  const newTestCaseObject = { message: newComment, commentAuthor: userFullName, commentCreatedOn: new Date().toLocaleString() };

  // Update the local state immediately
  setComments([...comments, newTestCaseObject]);
  setNewComment(""); // Clear the input field after submitting a comment


  axios
    .put(
      `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`,
      { message: newTestCase },
      { withCredentials: true }
    )
    .then((response) => {
      // After successfully adding a comment, update the comments state
      // setComments([...comments, response.data]); // Assuming the server returns the new comment
      // setNewComment(""); // Clear the input field after submitting a comment
      
      showToast(`${Comment_Created}`, "success");
      // navigateToAnotherPage(`/`);
    })
    .catch((error) => {
      console.log(error);
    });
};
// ++++++++++++++++ ADDING A NEW TEST CASE TO BUG ++++++++++++++++++



  return(
    <>

    </>
  )

}