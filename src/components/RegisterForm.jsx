
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import './componentsCSS/RegisterForm.css'

import { useNavigate } from "react-router-dom";

import axios from "axios";


import { useState } from 'react';


// ******************* IMPORTS ******************* //

export default function RegisterForm(  {setUserFullName, setUsersRole, setUsersId, showToast}){



  const [fullName, setFullName] = useState("");
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  {/* xxxxx ERROR HANDLING xxxxx */}
    const [error, setError] = useState("");

    const fullNameError = !fullName ? "Full Name is required" : "";

    const givenNameError = !givenName ? "Given Name is required" : "";

    const familyNameError = !familyName ? "Family Name is required" : "";

    // If no email is there say required : if otherwise : the email doesn't have @ say its required : if all good : do nothing " "
    const emailError = !email ? "Email is required" : 
    !email.includes("@") ? "Email must contain @" : "";

    // If no password say its required : if otherwise : the length is less than 8 say must be at least 8 : if all good : do nothing " "
    const passwordError = !password ? "Password is required" :
    password.length < 8 ? "Password Must be at least 8 characters" : "";
  {/* xxxxx ERROR HANDLING xxxxx */}



  const navigateToAnotherPage = useNavigate();


  // Allows the inputs to be entered and then we can set them from above
  function handleInputChange(event, setUserInputs) {
    setUserInputs(event.target.value);
  }



  // Plugs into the submit button --> onClick={(evt) => onSubmitLogin(evt)}
  function registerNewUser(evt){
    evt.preventDefault(); // Makes sure that the form doesn't try and post the submit button

    {/* xxxxx ERROR HANDLING xxxxx */}
      // Resets Error message on submit
      setError("");
      
      // If there is a error present we are going to make setError the value of the message to display
      if(fullNameError){
        setError(fullNameError);
        return;
      }
      else if(givenNameError){
        setError(givenNameError);
        return;
      }
      else if(familyNameError){
        setError(familyNameError);
        return;
      }
      else if(emailError){
        setError(emailError);
        return;
      }
      else if(passwordError){
        setError(passwordError);
        return;
      }
      else if (!fullName || !givenName || !familyName || !email || !password) {
        setError("All fields are required");
        return;
      }
    {/* xxxxx ERROR HANDLING xxxxx */}



    {/* SUCCESS  IF NO ERRORS POST REGISTER TO SERVER  SUCCESS */}

// ++++++++++++++++ ADDING A NEW USER TO THE DATABASE ++++++++++++++++++
    /* This is basically PostMan and on button click this function posts the info into our backend*/
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        // This is plugging in our inputs to the backends/server fullName, givenName, fullName, email, & password
          fullName: fullName,
          givenName: givenName,
          familyName: familyName,
          email: email,
          password: password
    }, 
    {
      // ! Receives the cookies from the server and is received on the client !
      withCredentials: true
    })
    // SUCCESS - If response is valid log our backend message results
    .then(response => {
      console.log(response.data);

      /* The code below will remove the fullName from local storage after 1 hour */
      const currentTime = new Date();
      const numHours = 1; // Change this number to change the time
      const expirationTime = currentTime.getTime() + numHours * 60 * 60 * 1000;

      // Makes an object and plugs it into fullName that has the users name and the time it should expire
      const user = {
        fullName : response.data.fullName,
        expiration : expirationTime,

        readable_expiration: new Date(expirationTime).toLocaleString("en-US", {
          timeZone: "UTC", // Change this to the user's timezone if needed
        }),
      }

      // Puts the user Object with the users fullName and the time it will expire into the local storage
      localStorage.setItem("fullName", JSON.stringify(user));


      //Sets this to the fullName from our database  calling from this in message in backend:  fullName: usersLoggedIn.fullName
      setUserFullName(response.data.fullName);

      // This gets the role from the message sent to check later on in functions like update
      setUsersRole(response.data.roles);

      // Sets the inserted Id the user gets when making a new account
      setUsersId(response.data.users_id);

      // Takes us to the homepage 
      navigateToAnotherPage("/");

      console.log("Go Home pls")

      // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
      showToast(response.data.User_Added, "success");

    })
    // xxxx ERROR BAD LOGIN xxxx
    .catch(error => {
    //console.log(error.response.data.error);

      // if there is an error and a response get the data of the error
      const responseError = error?.response?.data;

      // If bad error set our self made error message to the data from axios
      if(responseError){
        // If the error is a string then we send back the stringed response from Axios
        if(typeof responseError === "string"){ // Bad Username or Password
          setError(error.response.data);

          showToast(error.response.data, "error");
        }
        else if(responseError.error){  // Joi validation errors for Email
          setError(responseError.error);

          showToast(responseError.error, "error");
        }
      }
    });
// ++++++++++++++++ ADDING A NEW USER TO THE DATABASE ++++++++++++++++++
  } // end of onSubmitLogin function







  return(
    <>
{/* Section: Design Block */}
<section className="scale_in_center">
  {/* Jumbotron --> */}
  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold main_header">
            Register To Report Your Very Own 
            <span className="highlighted_header"> Bugs</span>
          </h1>
          <p className="under_header_text">
            Create an account and be able to Create your very own bugs. Explore what others have to say and view their bugs. 
          </p>
        </div>

        {/* This div sets the users form to be small and to the right */}
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form>


                {/* Full Name */}
                <div className="form-outline mb-4">
                  <input value={fullName} name="fullName" type="text" id="fullName" className="register_inputs"   onChange={(e) => handleInputChange(e, setFullName)}  required/>
                  <label  className="under_input_placeholder" htmlFor="fullName">Full Name</label>
                </div>


                {/* 2 column grid layout with text inputs for the Given and Family names --> */}
                <div className="row">
                  <div className="col-md-6 mb-6">
                    <div className="form-outline">
                      <input value={givenName} name="givenName" type="text" id="givenName" className="register_inputs" onChange={(e) => handleInputChange(e, setGivenName)}  required/>
                      <label  className="under_input_placeholder" htmlFor="givenName">Given name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input value={familyName} name="familyName" type="text" id="familyName" className="register_inputs"  onChange={(e) => handleInputChange(e, setFamilyName)}  required/>
                      <label  className="under_input_placeholder" htmlFor="familyName">Family name</label>
                    </div>
                  </div>
                </div>


                {/* Email input --> */}
                <div className="form-outline mb-4">
                  <input value={email} name="email" type="email" id="email" className="register_inputs"  onChange={(e) => handleInputChange(e, setEmail)}  required/>
                  <label className="under_input_placeholder" htmlFor="email">Email address</label>
                </div>


                {/* Password input --> */}
                <div className="form-outline mb-4">
                  <input value={password} name="password" type="password" id="password" className="register_inputs"  onChange={(e) => handleInputChange(e, setPassword)}  required/>
                  <label className="under_input_placeholder" htmlFor="password">Password</label>
                </div>


                {/* xxxxxxxxxxxxx ERROR MESSAGE BOX xxxxxxxxxxxxx */}
                <div className="">

                  {/* IF error is truthy show the error this if not it wont display */}
                  {error && 
                    <div className="alert alert-danger" role="alert">
                      <p className="error_message">{error}</p>
                    </div>
                  }
                </div>
                {/* xxxxxxxxxxxxx ERROR MESSAGE BOX xxxxxxxxxxxxx */}


                {/* Submit button --> */}
                <div className="text-center">
                  <button type="submit" className="register_button" onClick={(evt) => registerNewUser(evt)}>
                    Register
                  </button>
                </div>


                {/* GO TO LOGIN FORM BUTTON */}
                <div className="text-center">
                  <a className="login_Link" href="/login" >
                    Login
                  </a>
                </div>
                {/* GO TO LOGIN FORM BUTTON */} 


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
  ) // end of return






} // end of export