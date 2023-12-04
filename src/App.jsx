/* eslint-disable */



/* Steps taken for install 
  1. npm create vite@latest .
  2. npm i
  3. npm i bootstrap
  4. npm i nanoid   
  5. npm i lodash

  / Allows for the connection of the backend \
  6. npm i axios

  7. npm i react-icons  
  8. npm i react-router-dom    CHANGES PAGES

    /\ ADD THIS TO THE BACKEND TO ALLOW FOR axios TO CONNECT TO THE BACKEND /\
  9.  npm i cors

  \\ Steps with Axios for backend //
    1. npm i cors
    2. import cors from "cors";

    / Add this into the middleware ABOVE my routers in server.js   This --> app.use("/api/books", BookRouter);
    3 app.use(cors(
        {
        origin: "http://localhost:5173",
        credentials: true
        }
      )); 

    / THIS ACCEPTS JSON DATA IN THE BODY OF THE REQUEST FROM THE CLIENT ADD UNDER  app.use(cors());
    4. app.use(express.json()); 

  \\ Steps with Axios for backend //

  \/ ADD THIS TO THE BACKEND TO ALLOW FOR axios TO CONNECT TO THE BACKEND \/


  10. npm i react-toastify    ADD these imports:      https://fkhadra.github.io/react-toastify/introduction
      import { ToastContainer, toast } from 'react-toastify'
      import "react-toastify/dist/ReactToastify.css"

  11. npm i dotenv   : GETS US THE .env file


  Font Source Fonts     https://fontsource.org/ // This is the font poppins it can be called in like this : font-family: 'Poppins', sans-serif;
    1. npm install @fontsource/poppins          //   font-family: 'Poppins', sans-serif;
    2. npm install @fontsource-variable/lexend  //   font-family: 'Lexend Variable', sans-serif;
    3. npm install @fontsource/prompt           //   font-family: 'Prompt', sans-serif;
    4. npm install @fontsource/paytone-one      //   font-family: 'Paytone One', sans-serif;


        DEFAULT BOOTSTRAP FONT
    font-family: 'Segoe UI', bold;


  To Run Program: npm run dev   
*/




// ******************* IMPORTS ******************* //

//import { useState } from 'react'

import './App.css'

// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

import { useState, useEffect } from 'react'
//import { BrowserRouter as Router, Route  } from 'react-router-dom';

// COMPONENTS //
import HomePage from './components/HomePage';
import NavBar from './components/Navbar';
import LoginForm from './components/LoginForm';
import LoginFormRequiredMsg from './components/LoginRequiredMsg';
import RegisterForm from './components/RegisterForm';
import Footer from './components/Footer';

import BugList from './components/Bugs/BugList';
import BugItem from './components/Bugs/BugItem';
import BugEditor from './components/Bugs/BugEditor';
import AddNewBug from './components/Bugs/AddNewBug';

import UserList from './components/Users/UserList';
import UserItem from './components/Users/UserItem';
import UserEditor from './components/Users/UserEditor';

import Profile from './components/Users/Profile';
// COMPONENTS //


// TOASTIFY //
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
// TOASTIFY //


// FONTS //
import '@fontsource/poppins';  //   font-family: 'Poppins', sans-serif;
import '@fontsource-variable/lexend'; //   font-family: 'Lexend Variable', sans-serif;
import '@fontsource/prompt'; //   font-family: 'Prompt', sans-serif;
import '@fontsource/paytone-one';  //   font-family: 'Paytone One', sans-serif;
// FONTS //


/* LINKING TO OTHER PAGES */
import { BrowserRouter, Route, Routes } from 'react-router-dom';


// ******************* IMPORTS ******************* //






function App() {


  // This will hold in the fullName and expiration Time about the user once logged in
  const [userFullName, setUserFullName] = useState("");

  // Sets the roles that a user has once logged in
  const [usersRole, setUsersRole] = useState(null);
  // Sets the id we get when a user logs in 
  const [usersId, setUsersId] = useState(null);



  // This gets the users Id from local storage
  const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);



  // When the component loads use this
  useEffect(() => {
    // Getting the fullName and setting it in our local storage to allow for users to refresh and their name stays
    const getFullName = JSON.parse(localStorage.getItem("fullName"));


    // After We Set the Roles we will save them to Local Storage to be called in on other pages
    if(usersRole){
      localStorage.setItem('roles',JSON.stringify(usersRole));
      }

    // Sets the Id of the user from logging in or making an account into storage
    if(usersId){
      localStorage.setItem('usersId', JSON.stringify(usersId))
    }

    if (getFullName) {

      // Set the userFullName state with the retrieved value
      setUserFullName(getFullName.fullName);

      /* The code below will remove the fullName from local storage after 1 hour */
      const currentTime = new Date();

      // Check if the current time is equal to or past the expiration time
      if (currentTime.getTime() >= getFullName.expiration) {
        localStorage.removeItem("fullName"); // If expired, remove fullName from local storage, reset state, and reload the page
        localStorage.removeItem("roles");
        localStorage.removeItem("usersId");

        setUserFullName(null);
        setUsersRole(null);
        setUsersId(null);

        location.reload();


        // LOLOLOLOLOLOLOLOL  USER LOGS OUT  LOLOLOLOLOLOLOLOL //
        axios.post(`${import.meta.env.VITE_API_URL}/api/users/logout`, {withCredentials: true})
        .then(response => { 
          location.reload();
          // response.data.message is our json message from the backend 
          console.log(response.data.message);
        })
        .catch(error => 
          console.log(error)
        );
        // LOLOLOLOLOLOLOLOL  USER LOGS OUT  LOLOLOLOLOLOLOLOL //
      }
    }
  }, [userFullName ,usersRole, usersId]);







  // This is the little pop up function called toasts that we can call in and set the message we want and type of toast
  function showToast(message, type) {
    // When called in we must specify the message and the type of toast we want it to look like
    toast(message, {
      type: type,              // info, success, warning, error, default
      position: "bottom-right", // top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
    });
  }




  return (
    <>
      <div className="container       d-flex flex-column min-vh-100">

        <header>
          <nav>
            <NavBar userFullName={userFullName} setUserFullName={setUserFullName} usersIdFromLocalStorage={usersIdFromLocalStorage} setUsersIdFromLocalStorage={setUsersIdFromLocalStorage}/>
          </nav>
        </header>


        <main>
          <ToastContainer className={"toast_message"}/>
          <Routes>
            <Route path="/" element={<HomePage showToast={showToast} />} />
            <Route path="/loginRequiredMsg" element={<LoginFormRequiredMsg />} />
            <Route path="/login" element={
              <LoginForm 
              setUserFullName={setUserFullName} 
              setUsersRole={setUsersRole} 
              setUsersId={setUsersId} 
              showToast={showToast} />
            } />
            <Route path="/register" element={
              <RegisterForm 
              setUserFullName={setUserFullName} 
              setUsersRole={setUsersRole} 
              setUsersId={setUsersId} 
              showToast={showToast} />
            } />


            <Route path="bugList" element={<BugList  userFullName={userFullName} showToast={showToast}  />} />
            {/* SEARCH BUG BY ID*/}
            <Route path="/bugItem/:bugId" element={<BugItem showToast={showToast}/>} />
            {/* EDIT BUGS */}
            <Route path="/bugEditor/:bugId" element={<BugEditor showToast={showToast}/>} />
            {/* ADD BUGS */}
            <Route path="/report" element={<AddNewBug showToast={showToast}/>} />


            <Route path="userList" element={<UserList userFullName={userFullName} showToast={showToast}/>} />
            <Route path="/user/:userId" element={<UserItem  showToast={showToast}/>} />
            <Route path="/userEditor/:userId" element={<UserEditor showToast={showToast}/>} />

            <Route path="/profile" element={<Profile showToast={showToast} usersIdFromLocalStorage={usersIdFromLocalStorage}/>} />
          </Routes>
        </main>

      </div>


      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App
