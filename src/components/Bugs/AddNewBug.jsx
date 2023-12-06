
/* eslint-disable */


// ******************* IMPORTS ******************* //

import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

// ******************* IMPORTS ******************* //



export default function AddNewBug(  {showToast}  ) {


  const navigateToAnotherPage = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [stepsToReproduce, setStepsToReproduce] = useState([""]);



  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [stepsToReproduceError, setStepsToReproduceError] = useState("");


  const MAX_STEPS_TO_REPRODUCE = 5;


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
      <h1>REPORT A BUG</h1>
  
      <form  onSubmit={(evt) => onAddBug(evt)}>

        <div>
          <label>Title:</label>
          <input type="text"
            value={title} onChange={(evt) => setTitle(evt.target.value)}
          />
                    <div className="error">{titleError}</div>
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
                    <div className="error">{descriptionError}</div>

        </div>

        <div>
          <label>Steps to Reproduce:</label>
          {stepsToReproduce.map((step, index) => (
            <div key={index}>
              <input
                type="text"
                value={step}
                onChange={(e) => {
                  const newSteps = [...stepsToReproduce];
                  newSteps[index] = e.target.value;
                  setStepsToReproduce(newSteps);
                }}
              />
            </div>
          ))}
                    <div className="error">{stepsToReproduceError}</div>

          {stepsToReproduce.length < MAX_STEPS_TO_REPRODUCE ? (
            <button
              type="button"
              onClick={() => setStepsToReproduce([...stepsToReproduce, ""])}
            >
              Add Step
            </button>
          ) : (
            <div className="error">Maximum steps reached Only {MAX_STEPS_TO_REPRODUCE} Steps Allowed</div>
          )}

        </div>

        <button type="submit">Submit Bug Report</button>
      </form>



    </>
  );
}