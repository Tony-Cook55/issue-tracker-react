
/* Steps taken for install 
  1. npm create vite@latest .
  2. npm i
  3. npm i bootstrap
  4. npm i nanoid   
  5. npm i lodash
  6. npm i axios
  7. npm i react-icons  
  8. npm install @fontsource/poppins    // This is the font poppins it can be called in like this : font-family: 'Poppins', sans-serif;





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

import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import HomePage from './components/HomePage';
// COMPONENTS //


// FONTS //
import '@fontsource/poppins';
// FONTS //


// ******************* IMPORTS ******************* //






function App() {

  //const [isAuthenticated, setIsAuthenticated] = useState(false);

  


  return (
    <div>

        <LoginForm />

    </div>
  );
}

export default App
