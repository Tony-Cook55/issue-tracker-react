
/* Steps taken for install 
  1. npm create vite@latest .
  2. npm i
  3. npm i bootstrap
  4. npm i nanoid   
  5. npm i lodash
  6. npm i axios
  7. npm i react-icons  
  8. 


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

import React from 'react';
//import { BrowserRouter as Router, Route  } from 'react-router-dom';

// COMPONENTS //
//import LoginForm from  "./components/LoginForm";

import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

import BugListItem from './components/Bugs/BugListItem';
import BugList from './components/Bugs/BugList';
import BugEditor from './components/Bugs/BugEditor';

import UserListItem from './components/Users/UserListItem';
import UserList from './components/Users/UserList';
import UserEditor from './components/Users/UserEditor';
// COMPONENTS //


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

  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  


  return (
    <div>

        <BrowserRouter>
          <Routes path='/'>
              {/* App will always go to the home page due to the / */}
              <Route path="/" element={<HomePage />} />
              <Route path="login" element={<LoginForm />} />
              <Route path="register" element={<RegisterForm />} />


              <Route path="bugItem" element={<BugListItem />} />
              <Route path="bugList" element={<BugList />} />
              <Route path="bugEditor" element={<BugEditor />} />



              <Route path="userItem" element={<UserListItem />} />
              <Route path="userList" element={<UserList />} />
              <Route path="userEditor" element={<UserEditor />} />
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App
