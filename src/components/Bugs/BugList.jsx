/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugList.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaPencilRuler } from "react-icons/fa";
// ICONS //


import axios from "axios"

import { useState, useEffect } from "react"

import { Link, NavLink } from "react-router-dom";


import BugListItem from "./BugListItem";

import LoginFormRequiredMsg from "../LoginRequiredMsg";



// ******************* IMPORTS ******************* //









export default function BugList(   {showToast}  ){




  const [bugs, setBugs] = useState([]);
  const [deleteCounter, setDeleteCounter] = useState(0);


  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //
    // what ever is in those brackets "so" [deleteCounter], call useEffect
    useEffect(() => {
      // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list`,             {withCredentials: true})

      // If you retrieve bugs then set the bugs useState to the data you get from backend
      .then(response => {
        setBugs(response.data);
      })
      .catch(error => console.log(error));

    }, [deleteCounter]);
  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //


  // -------------------- DELETING BUG FROM DATABASE -------------------
    function onBugDelete(evt, bugId){
      evt.preventDefault();

      axios.delete(`${import.meta.env.VITE_API_URL}/api/bugs/delete/${bugId}`, {withCredentials: true})
      .then(response => { 
        // When you delete a book this counter goes up by 1
        setDeleteCounter(previousCount => previousCount + 1);

        // response.data.message is our json message from the backend 
        console.log(response.data.Bugs_Deleted);

        // This is our toast plugging in the toast function from app. so our message is our responses message and the type is success
        showToast(response.data.Bugs_Deleted, "success");

      })
      .catch(error => 
        console.log(error)
      );
    }
  // -------------------- DELETING BUG FROM DATABASE -------------------


  return( 
    <>


      {/* If there is no BUGS, display the h2  : IF THERE ARE : Map and list all of the following items*/}
      {!bugs.length ? <h2><Link to="/login">  <LoginFormRequiredMsg /> </Link></h2> :
            <div className="row  text-center justify-content-center">
              {bugs.map(bug => (
                  <div key={bug._id}  className="col-lg-4 col-md-12 col-sm-12">

                    <BugListItem  bug={bug} key={bug._id}   onBugDelete={onBugDelete}/>

                  </div>
              ))}
            </div>
      }



    </>

  )


}