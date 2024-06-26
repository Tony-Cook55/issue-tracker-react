
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import axios from "axios";

// Lets us on a command go to another page
import { useNavigate } from "react-router-dom";


import { useState } from "react"

// CSS
import './componentsCSS/LoginForm.css'





// ******************* IMPORTS ******************* //



export default function LoginForm(    {setUserFullName,setUsersRole,setUsersId, showToast}   ) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  {/* xxxxx ERROR HANDLING xxxxx */}
    const [error, setError] = useState("");

    // If no email is there say required : if otherwise : the email doesn't have @ say its required : if all good : do nothing " "
    const emailError = !email ? "Email is required" : 
    !email.includes("@") ? "Email must contain @" : "";

    // If no password say its required : if otherwise : the length is less than 8 say must be at least 8 : if all good : do nothing " "
    const passwordError = !password ? "Password is required" :
    password.length < 8 ? "Password Must be at least 8 characters" : "";
  {/* xxxxx ERROR HANDLING xxxxx */}





  const navigateToAnotherPage = useNavigate();


  // Plugs into the submit button --> onClick={(evt) => onSubmitLogin(evt)}
  function onSubmitLogin(evt){
    evt.preventDefault(); // Makes sure that the form doesn't try and post the submit button

    {/* xxxxx ERROR HANDLING xxxxx */}
      // Resets Error message on submit
      setError("");
      
      // If there is a error present we are going to make setError the value of the message to display
      if(emailError){
        setError(emailError);
        return;
      }
      else if(passwordError){
        setError(passwordError);
        return;
      }
    {/* xxxxx ERROR HANDLING xxxxx */}



    {/* SUCCESS  IF NO ERRORS POST LOGIN TO SERVER  SUCCESS */}

    // [][][][][][][][][][] USER LOGIN WITH EMAIL & PASSWORD [][][][][][][][][][]
    /* This is basically PostMan and on button click this function posts the info into our backend*/
    axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        // This is plugging in our email & password to the backends/server email & password
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
        users_id: response.data.users_id,
        expiration: expirationTime

        // readable_expiration: new Date(expirationTime).toLocaleString("en-US", {
        //   timeZone: "UTC", // Change this to the user's timezone if needed
        // }),
      }

      // Puts the user Object with the users fullName and the time it will expire into the local storage
      localStorage.setItem("fullName", JSON.stringify(user));

      //Sets this to the fullName from our database  calling from this in message in backend:  fullName: usersLoggedIn.fullName
      setUserFullName(response.data.fullName);
      console.log(response.data);

      // This gets the role from the message sent to check later on in functions like update
      setUsersRole(response.data.roles);

      // Sets the users Id from the message back into the app to use later
      setUsersId(response.data.users_id);

      // Takes us to the homepage 
      navigateToAnotherPage("/");

      // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
      showToast(response.data.Welcome_Back, "success");
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
        }
        else if(responseError.error.details){  // Joi validation errors for Email
          setError(responseError.error.details[0].message);
        }
      }
    });
    // [][][][][][][][][][] USER LOGIN WITH EMAIL & PASSWORD [][][][][][][][][][]
  } // end of onSubmitLogin function



  return (
    <>
      <div className="main_form_div   scale_in_center">
        <h4 className="login_Header">Login</h4>
        <form className="login_Form">


          {/* EMAIL INPUT */}
          <div className="login_Inputs_Div">
            <input type="email" id="email" name="email" placeholder="Email" 
              className="login_Inputs" 
              required
              autoFocus
              onChange={(evt) => setEmail(evt.target.value)}
            />
          </div>
          {/* EMAIL INPUT */}



          {/* PASSWORD INPUT */}
          <div className="login_Inputs_Div">
            <input type="password" id="password" name="password" placeholder="Password" 
              className="login_Inputs"
              required
              onChange={(evt) => setPassword(evt.target.value)} 
            />
          </div>
          {/* PASSWORD INPUT */}



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



          {/* LOGIN BUTTON */}
          <button type="submit" className="login_Button" onClick={(evt) => onSubmitLogin(evt)}>
            Login
            </button>
          {/* LOGIN BUTTON */}

        </form> {/* End of form with all controls */}



        {/* SIGN UP BUTTON */}
        <a className="register_Link" href="/register">
          Don't Have An Account? <br /> Sign Up Here!
        </a>
        {/* SIGN UP BUTTON */} 



      </div>
    </>
  );
}
