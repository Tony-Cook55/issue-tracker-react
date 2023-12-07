
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


  const [comments, setComments] = useState([]);

  const [newComment, setNewComment] = useState("");


  const navigateToAnotherPage = useNavigate();


    // Retrieve the user's info object from local storage
    const userInfo = JSON.parse(localStorage.getItem('fullName'));

    // Extract the fullName from the userInfo object
    const userFullName = userInfo ? userInfo.fullName : null;
  
    // Check if the user is logged in by verifying the existence of fullName
    const isLoggedIn = userFullName !== null;


// ~~~~~~~~~~~~~~~~ FIND ALL COMMENTS IN BUG ~~~~~~~~~~~~~~~~ //
    useEffect(() => {

      if (isLoggedIn) {
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/list`,             {withCredentials: true})

        .then(response => {
          // Sets the database info into this
          setComments(response.data);

        })
        .catch(error => console.log(error));
    }
  
    }, [isLoggedIn, bugId]); // Add bugId as a dependency to re-run the effect when it changes
// ~~~~~~~~~~~~~~~~ FIND ALL COMMENTS IN BUG ~~~~~~~~~~~~~~~~ //




// ++++++++++++++++ ADDING A NEW COMMENT TO BUG ++++++++++++++++++
    const addNewComment = () => {

      const newTestCaseObject = { message: newComment, commentAuthor: userFullName, commentCreatedOn: new Date().toLocaleString() };

      // Update the local state immediately
      setComments([...comments, newTestCaseObject]);
      setNewComment(""); // Clear the input field after submitting a comment
    

      axios
        .put(
          `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/comment/new`,
          { message: newComment },
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
// ++++++++++++++++ ADDING A NEW COMMENT TO BUG ++++++++++++++++++



  return(
    <>


<div className="container mt-5 mb-5">

  <div className="row height d-flex justify-content-center align-items-center">
    <div className="col-md-8">
      <div className="card ">


        <div className="p-3 ">

          <h2>Comments Found: {comments.length} </h2>


          {/* Check if the user is logged in before rendering content OR if there is no BUGS : OTHERWISE : Show List*/}
          {!isLoggedIn ? ( /* !isLoggedIn &&  !bugs.length*/
              <h2>
                <Link to="/login">
                  <LoginFormRequiredMsg />
                </Link>
              </h2>
            ) :
              !comments.length ? (
                <h1 className="no_comments_message">No Comments On This Bug Yet</h1>
                // <div className="loading_spinner_container ">
                //   <span className="loading_spinner"></span>
                // </div>
              ) : (
              // Check if there are bugs, display the bug list if true
              <div className="row text-center justify-content-center   comment_list">
                {comments.map((comment) => (
                  <div key={comment._id} >  {/* className="col-lg-4 col-md-12 col-sm-12" */}
                    {/* 
                    {comment.commentAuthor}
                    {comment.message}
                    {comment.commentCreatedOn} 
                    */}

                    {/* ccccccccccccc ACTUAL MAPPED COMMENTS ccccccccccccc */}
                    <div className="mt-2  single_comment">

                      <div className="d-flex flex-row p-3">

                        <img src="/images/user_profile_body.png" width="40" height="40" className="rounded-circle mr-3" />

                        <div className="w-100">

                          <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <span className="mr-2">{comment.commentAuthor}</span>
                              </div>
                              <small>{comment.commentCreatedOn}</small>
                          </div>

                          <p className="text-justify comment_text ">{comment.message}</p>

                        </div>
                      </div>
                    </div>


                  </div>
                  ))}
                </div>
              )}
        </div>
        {/* ccccccccccccc ACTUAL MAPPED COMMENTS ccccccccccccc */}



        {/* +++++++++++++ ADD NEW COMMENT +++++++++++++ */}
        <div className="add_comment_div  align-items-center  ">

          <input type="text" className="add_comment_input form-control" placeholder="Add a Comment" 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button type="button" className="add_new_comment_button" onClick={addNewComment}>
            Submit
          </button>

        </div>
        {/* +++++++++++++ ADD NEW COMMENT +++++++++++++ */}

      
      </div>
    </div>
  </div>
</div>


    </>
  )
}





