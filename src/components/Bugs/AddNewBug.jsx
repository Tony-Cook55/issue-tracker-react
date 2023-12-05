
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


  const [errors, setError] = useState({});


  const validateForm = () => {
    if (title.length < 1 || title.length > 40) {
      setError("Title must be between 1 and 40 characters long");
      return false;
    }

    if (description.length < 1 || description.length > 100) {
      setError("Description must be between 1 and 100 characters long");
      return false;
    }

    if (stepsToReproduce.some((step) => step.length < 1 || step.length > 100)) {
      setError("Each step must be between 1 and 100 characters long");
      return false;
    }

    setError("");
    return true;
  };



  const onAddBug = (evt) => {
    evt.preventDefault();

    setError("");


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
          {errors.title && <div className="error">{errors.title}</div>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(evt) => setDescription(evt.target.value)}
          />
          {errors.description && <div className="error">{errors.description}</div>}
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
              {errors.stepsToReproduce && (
                <div className="error">{errors.stepsToReproduce}</div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setStepsToReproduce([...stepsToReproduce, ""])}
          >
            Add Step
          </button>
        </div>

        <button type="submit">Submit Bug Report</button>
      </form>
    </>
  );
}