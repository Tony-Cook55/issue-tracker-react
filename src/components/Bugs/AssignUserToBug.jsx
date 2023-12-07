


/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


// CSS
import "./BugListItem.css"
import "./BugEditor.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaArrowLeft, FaSave, FaArrowUp, FaTrash } from "react-icons/fa";
// ICONS //

import axios from "axios";

import Stopwatch from "../Stopwatch/Stopwatch";

// used for getting the bugs ID
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

// Changes pages
import { useNavigate } from "react-router-dom";




// ******************* IMPORTS ******************* //









export default function AssignUserToBug(  {showToast}  ) {



  const [assignedToUserId, setAssignedToUserId] = useState("");







  return(
    <>

              {/* ASSIGN A USER TO BUG */}
              <p>Assign User to Bug</p>

    </>
  )



}



