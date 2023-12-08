
/* eslint-disable */


// ******************* IMPORTS ******************* //

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

// CSS //
import "./AddNewBug.css"

// ******************* IMPORTS ******************* //



export default function AddNewBug(  {showToast}  ) {


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

    stepsToReproduce.forEach((step, index) => {
      if (!step.trim() || step.length < 1 || step.length > 100) {
        setStepsToReproduceError(`Step ${index + 1} must be between 1 and 100 characters`);
        valid = false;
      } else {
        setStepsToReproduceError("");
      }
    });

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
    .catch(error => 
      console.log(error)
    );
  

  }










  return (
    <>



{/* Section: Design Block */}
<section className="scale_in_center">
  {/* Jumbotron --> */}
  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
    <div className="container">
      <div className="row gx-lg-5 align-items-center      text-center justify-content-center">




        {/* This div sets the users form to be small and to the right */}
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form  onSubmit={(evt) => onAddBug(evt)}>

                  <h1 className="main_header">Report A Bug</h1>

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
                    className="form_inputs"
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
                            <div className="col-md-8">
                              <div className="form-outline ">
                                <input
                                  type="text"
                                  className="form_inputs"
                                  value={step}
                                  onChange={(e) => {
                                    const newSteps = [...stepsToReproduce];
                                    newSteps[index] = e.target.value;
                                    setStepsToReproduce(newSteps);
                                    required
                                  }}
                                />
                              </div>
                            </div>
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



                  {/* If the steps length is less than the MAX STEPS we set up top, show the "Add Step" button */}
                  {stepsToReproduce.length < MAX_STEPS_TO_REPRODUCE ? (
                    <button
                      type="button"
                      onClick={() => setStepsToReproduce([...stepsToReproduce, ""])}
                    >
                      Add Step
                    </button>
                  ) : (
                    /* If stepsToReproduceError is truthy, show the error message */
                    stepsToReproduceError && (
                      <div className="alert alert-danger text-center" role="alert">
                        <div className="error_message">
                          Maximum steps reached. Only {MAX_STEPS_TO_REPRODUCE} Steps Allowed
                        </div>
                      </div>
                    )
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