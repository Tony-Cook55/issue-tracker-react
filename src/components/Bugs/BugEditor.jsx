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
import { FaArrowLeft, FaSave } from "react-icons/fa";
// ICONS //

import axios from "axios";

import Stopwatch from "../Stopwatch/Stopwatch";

// used for getting the bugs ID
import { useParams, Link } from "react-router-dom";

import { useState, useEffect } from 'react';

// Changes pages
import { useNavigate } from "react-router-dom";


// ******************* IMPORTS ******************* //









export default function BugEditor(  {showToast}  ) {


  // This must match the id in the route path thats in App : path="/bugEditor/:bugId"
  const {bugId} = useParams();

  // The actual bugs information
  const [bugItem, setBugItem] = useState({});

    // These store the new updated values of these items
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const navigateToAnotherPage = useNavigate();


  //!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //
  useEffect(() => {
    // Gets our host and sees if they have the credentials and auth     Send this cookie back to the server
    // We use ${bugId} from above to get that bugs specific ID and we search as if in postman
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}`,             {withCredentials: true})

    // If you retrieve bugs then set the bugs useState to the data you get from backend
    .then(response => {
      // Sets the database info into this
      setBugItem(response.data);


            // Setting the new ITEMS THAT ARE UPDATED
            setTitle(response.data.title);
            setDescription(response.data.description);
    })
    .catch(error => {
      console.log(error)
    }
    );

  }, [bugId]); // Add bugId as a dependency to re-run the effect when it changes
//!!!!!!!!!!!!!!!!!!  SEARCHING BY ID !!!!!!!!!!!!!!!! //



  /* UPDATES THE BOOK */
  function onBugUpdate(evt){
    evt.preventDefault();

    const updatedBug ={
      // Spreading the book
      ...bugItem,

      // Setting the new items here
      title,
      description,
    }


    // THIS WILL DELETE THE ID SO WHEN WE SPREAD THE ...updatedBook THE ID WONT TRY AND BE PASSED INTO AS THE BODY
    delete updatedBug._id;

    console.log(bugId);
    console.log(updatedBug);

    // Does the update backend function
    axios.put(`${import.meta.env.VITE_API_URL}/api/bugs/update/${bugId}`,
    // This spread of the bugs is what allows it to be sent as the body.params
    {...updatedBug}
    , {withCredentials: true})
    .then(response => {
      navigateToAnotherPage(`/`);
      showToast(response.data.Bug_Updated, "success");
      console.log(response.data);
    })
    .catch(error => {
      console.log(error.response)
      }
    );


  }




  return (
    <>




    <form onSubmit={(evt) => onBugUpdate(evt)}>
      <div className=" swing_in_left_bck  ">
        <div className="overviewInfo">
          <div className="top_button_styles">

            <Link to={`/bugItem/${bugItem._id}`} className="icon_link">
              <div className="back_button  back_button_background">
                <FaArrowLeft />
              </div>
            </Link>


            <button type="submit" className="icon_link" >
              <div className="edit_button  edit_button_background">
                <FaSave />
              </div>
            </button>
          </div>

          <div className="bug_title_div">
            <div className="">
              <h1>You Are Now Updating Bug:</h1>
              <h2>{bugItem.title}</h2>

              <br />
              <input type="text" id="title" className="form-control" value={title} onChange={(evt) => setTitle(evt.target.value)}></input>


              <input type="text" id="description" className="form-control" value={description} onChange={(evt) => setDescription(evt.target.value)}></input>

              <br></br>

              <h2  className="">description</h2>
            </div>
          </div>
        </div>
        {/* <!-- overview info --> */}



        {/* BEGINNING OF ACCORDION */}
        <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">


          {/* STEPS TO REPRODUCE */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button text-center   collapsed  " type="button"  data-bs-target="#steps_to_reproduce" aria-expanded="true" aria-controls="steps_to_reproduce">
                Steps To Reproduce
              </button>
            </h2>
            <div id="steps_to_reproduce" className="accordion-collapse    ">
              {/*add:    show   to he className to allow it to always be open on start */}
              <div className="accordion-body">
                <ol className="accordion_ol" >
                  <li className="item_being_edited" >Step 1</li>
                  <li className="item_being_edited" >Step 2</li>
                  <li className="item_being_edited" >Step 3</li>
                </ol>
              </div>
            </div>
          </div>
          {/* STEPS TO REPRODUCE */}

          {/* CLASSIFICATION */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button text-center collapsed" type="button" /* data-bs-toggle="collapse" */ data-bs-target="#classification" aria-expanded="false" aria-controls="classification">
                Classification
              </button>
            </h2>
            <div id="classification" className="accordion-collapse ">
              {/* collapse lets the items close*/}
              <div className="accordion-body">
                <div className="container text-center justify-content-center">
                  <div className="row">
                    <div className="col-sm">
                      <h4  className="item_being_edited">classification</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* CLASSIFICATION */}

          {/* CLOSED */}
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button text-center  collapsed"
                type="button"
                /* data-bs-toggle="collapse" */
                data-bs-target="#closed"
                aria-expanded="true"
                aria-controls="closed"
              >
                Closed
              </button>
            </h2>
            <div id="closed" className="accordion-collapse  ">
              {/*add:    show   to he className to allow it to always be open on start */}
              <div className="accordion-body">
                <h3>Is This Bug Closed: </h3>
                <h3 className="item_being_edited">closed</h3>
              </div>
            </div>
          </div>
          {/* CLOSED */}
        </div>
        {/* END OF ACCORDION */}

        <div className="bottom_cap_under_accordion">
          <div className="end_cap_base">
            <div className="container ">
              <p className="last_updated_on ">
                Time Spent Updating This Bug: <Stopwatch />
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- wrapper--> */}
    </form>
    </>
  );
}