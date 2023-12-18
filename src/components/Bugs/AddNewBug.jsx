
/* eslint-disable */


// ******************* IMPORTS ******************* //

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

// CSS //
import "./AddNewBug.css"


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
import { IsUserLoggedIn } from "../IsUserLoggedIn";

import LoginFormRequiredMsg from "../LoginRequiredMsg";
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



// ******************* IMPORTS ******************* //



export default function AddNewBug(  {showToast}  ) {

  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



  const navigateToAnotherPage = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState([""]);



  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [stepsToReproduceError, setStepsToReproduceError] = useState("");


  // THIS IS FOR ADDING MORE STEPS WHEN BUTTON IS CLICKED CHANGE THIS TO CHANGE TOTAL AMOUNT THAT CAN BE ADDED
  const MAX_STEPS_TO_REPRODUCE = 10;


  const validateInputs = () => {
    let valid = true;

    if (!title.trim()) {
      setTitleError("Title is required");
      valid = false;
    } else if (title.length < 1 || title.length > 40) {
      setTitleError("Title must be between 1 and 40 characters");
      valid = false;
    } else {
      setTitleError("");
    }


    if (!description.trim()) {
      setDescriptionError("Description is required");
      valid = false;
    } else if (description.length < 1 || description.length > 100) {
      setDescriptionError("Description must be between 1 and 100 characters");
      valid = false;
    } else {
      setDescriptionError("");
    }



    /* If there is no steps do this   and check every step even ones before filled out steps*/
    if (stepsToReproduce.length === 0 || stepsToReproduce.every(step => !step.trim())) {
      setStepsToReproduceError("At least 1 Step To Reproduce Is Required");
      valid = false;
    } else {
      setStepsToReproduceError("");
      stepsToReproduce.forEach((step, index) => {
        if (!step.trim() || step.length < 1 || step.length > 100) {
          setStepsToReproduceError(`Step ${index + 1} must be between 1 and 100 characters`);
          valid = false;
        }
      });
    }

    // showToast(`All Fields Are Required`,"error");

    return valid;
  };





  const onAddBug = (evt) => {
    evt.preventDefault();


    if (!validateInputs()) {
      return;
    }


    axios.post(`${import.meta.env.VITE_API_URL}/api/bugs/new`, 
    {title, description, stepsToReproduce}, 
    {withCredentials: true})
    .then(response => {
      console.log(response.data.Bug_Added);

      showToast(`${response.data.Bug_Added}`,"success");

      navigateToAnotherPage("/");
    })
    .catch(error => {
      // Log the entire error object for further inspection
      console.error("Full error object:", error);

      // Check if there's a response and data property
      if (error.response && error.response.data && error.response.data.error) {
        const detailsArray = error.response.data.error.details;
    
        // Check if detailsArray is an array before using forEach
        if (Array.isArray(detailsArray)) {
          // Handle errors for each field
          detailsArray.forEach(detail => {
            const { path, message } = detail;
    
            switch (path[0]) {
              case "title":
                setTitleError(message);
                break;
              case "description":
                setDescriptionError(message);
                break;
              case "stepsToReproduce":
                setStepsToReproduceError(message);
                break;
              default:
                // Handle other fields if needed
                break;
            }
          });
        } else {
          // Handle errors without a detailsArray
          console.error("Error details are not in an array:", error);
    
          // You may want to set a generic error message or handle it in a way that makes sense for your application
          // setError("An unexpected error occurred. Please try again.");
          showToast(`Please Try Again`,"error");
        }
      } else {
        // Handle errors without a response.data.error structure
        console.error("Error without response.data.error:", error);
        showToast(`Please Try Again`,"error");
        // You may want to set a generic error message or handle it in a way that makes sense for your application
        // setError("An unexpected error occurred. Please try again.");
      }
    });


  }










  return (
    <>



{/* Section: Design Block */}
<section className="scale_in_center">
  {/* Jumbotron --> */}
  <div className=" text-center text-lg-start">
    <div className="container">
      <div className="row  align-items-center      text-center justify-content-center">




        {/* This div sets the users form to be small and to the right */}
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form  onSubmit={(evt) => onAddBug(evt)}>

                  <h1 className="main_header">Report a Bug</h1>

                {/* TITLE */}
                <div className="form-outline mb-4">
                  <label  className="form_labels" htmlFor="title">Title</label>
                  <input type="text"
                    className="form_inputs"
                    value={title} 
                    onChange={(evt) => setTitle(evt.target.value)}
                    autoFocus
                  />

                  {/* Error Message */}
                  {titleError && 
                    <div className="alert alert-danger  text-center" role="alert">
                      <div className="error_message">{titleError}</div>
                    </div>
                  }
                  {/* Error Message */}

                </div>
                {/* TITLE */}


                {/* DESCRIPTION */}
                <div className="form-outline mb-4">
                  <label  className="form_labels" htmlFor="description">Description</label>
                  <textarea
                    className="form_inputs    text_area_input"
                    value={description}
                    onChange={(evt) => setDescription(evt.target.value)}
                    
                  />

                  {/* Error Message */}
                  {descriptionError && 
                    <div className="alert alert-danger  text-center" role="alert">
                      <div className="error_message">{descriptionError}</div>
                    </div>
                  }
                  {/* Error Message */}     

                </div>
                {/* DESCRIPTION */}




                {/* ADD STEPS TO REPRODUCE */}
                <div className="form-outline mb-4">
                  <label className="form_labels">Steps to Reproduce</label>
                  <div className="steps_to_reproduce_scroll">
                    {stepsToReproduce.map((step, index) => (
                      <div className="" key={index}>

                          <div className="row    text-center   justify-content-center">
                            {/* <div className="col-lg-10 col-md-10 col-sm-10 col-xs-4 "> */}
                              <div className="form-outline ">
                                <input
                                  type="text"
                                  className="form_inputs steps_to_reproduce_form_input"
                                  value={step}
                                  onChange={(e) => {
                                    const newSteps = [...stepsToReproduce];
                                    newSteps[index] = e.target.value;
                                    setStepsToReproduce(newSteps);
                                    // required
                                  }}
                                />
                              </div>
                            {/* </div> */}
                          </div>

                      </div>
                    ))}

                  </div>


                  {/* Error Message */}
                  {stepsToReproduceError && 
                    <div className="alert alert-danger  text-center" role="alert">
                      <div className="error_message">{stepsToReproduceError}</div>
                    </div>
                  }
                  {/* Error Message */}   


                  {/* Error Message */}
                    {(stepsToReproduce.length >= MAX_STEPS_TO_REPRODUCE) && (
                      <div className="alert alert-danger text-center" role="alert">
                        <div className="error_message">
                          Maximum steps reached. Only {MAX_STEPS_TO_REPRODUCE} Steps Allowed
                        </div>
                      </div>
                    )}
                  {/* Error Message */}



                  {/* If the steps length is less than the MAX STEPS we set up top, show the "Add Step" button */}
                  {stepsToReproduce.length < MAX_STEPS_TO_REPRODUCE && (
                    <button type="button" className="add_items_button"
                      onClick={() => setStepsToReproduce([...stepsToReproduce, ""])}
                    >
                      Add Step
                    </button>
                  )}


                </div>
                {/* ADD STEPS TO REPRODUCE */}


                {/* ADD BUTTON */}
                <div className="text-center">
                  <button type="submit" className="submit_form_button" >
                    Report Bug
                  </button>
                </div>
                {/* ADD BUTTON */}



              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Jumbotron --> */}
</section>
{/* Section: Design Block --> */}









    </>
  );
}