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

import BugItem from "./BugItem";

import LoginFormRequiredMsg from "../LoginRequiredMsg";



// ******************* IMPORTS ******************* //









export default function BugList(   {showToast }  ){




  const [bugs, setBugs] = useState([]);


  // PAGES AND NEW PAGES //
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchParams, setSearchParams] = useState({keywords: "", minPrice:"", maxPrice:"", genre:"", sortBy:""})
  // PAGES AND NEW PAGES //



  // Retrieve the user's info object from local storage
  const userInfo = JSON.parse(localStorage.getItem('fullName'));

  // Extract the fullName from the userInfo object
  const userFullName = userInfo ? userInfo.fullName : null;

  // Check if the user is logged in by verifying the existence of fullName
  const isLoggedIn = userFullName !== null;



  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //
  useEffect(() => {
    // Fetch bug data only if the user is logged in with their fullName
    if (isLoggedIn){
        axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list/`, 
        { withCredentials: true ,
          params: {pageSize: 3, pageNumber: 1}
        })
        .then(response => {
          setBugs(response.data.bugs);

          setTotalPages(Math.ceil(response.data.totalCount / 3)); // Total count is returned
          setCurrentPage(1);

          // showToast("Success! Found All Bugs", "success");
        })
        .catch(error => console.log(error));
    } // end of isLoggedIn


  }, [isLoggedIn]);
  // ~~~~~~~~~~~~~~~~ FIND ALL BUGS ~~~~~~~~~~~~~~~~ //



  const onSearchFormSubmit = (evt) => {
    evt.preventDefault();

    // the 3rd . like  .search || .minPrice  ==  the id of the input
    const keywords = evt.target.search.value;
    const classification = evt.target.classification.value;
    const maxAge = evt.target.maxAge.value;
    const minAge = evt.target.minAge.value;
    const closed = evt.target.closed.value;
    const sortBy = evt.target.sortBy.value;

    const newSearchParams = {keywords, classification, maxAge, minAge, closed, sortBy};
    setSearchParams(newSearchParams);
    fetchBugs({...newSearchParams, pageSize: 3, pageNumber: 1})

  }



  const fetchBugs = (params) => {
    //  console.log(`Search params are: ${JSON.stringify(params)}`);
    axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/list/`,
    {withCredentials: true,
      params: {...params, pageSize: 3} 
    }
    )
    .then(response => {
      setBugs(response.data.bugs); // Assuming response contains bugs
      setTotalPages(Math.ceil(response.data.totalCount / 3)); // Total count is returned
      // Setting the page to 1 when searching
      setCurrentPage(params.pageNumber || 1);
    })
    .catch(error => console.log(error));
  }


  // This creates an array of pages by taking the amount of pages from the useEffect then adds based on how many needed
  const generatePageNumbers = () => {
    const pageNumbers = [];
    for(let i = 1; i <= totalPages; i++){
      pageNumbers.push(i);
    }
    return pageNumbers;
  }


  // This will reload the list of items for every time the page button is clicked
  const handlePageChange = (pageNumber) => {
    fetchBugs({...searchParams, pageNumber});
  }




  return( 
    <>


    {/* Check if the user is logged in before rendering content OR if there is no BUGS : OTHERWISE : Show List*/}
    {!isLoggedIn ? ( /* !isLoggedIn &&  !bugs.length*/
        <h2>
          <Link to="/login">
            <LoginFormRequiredMsg />
          </Link>
        </h2>
      ) :
        !bugs.length ? (
          // <h1 className="no_bugs_found_message">There Are No Bugs</h1>
          <div className="loading_spinner_container ">
            <span className="loading_spinner"></span>
          </div>
        ) : (
        // Check if there are bugs, display the bug list if true
        <div>
    
          <form onSubmit={(evt) => onSearchFormSubmit(evt)}>



            {/* Searching for BUGS by Keywords */}
            <div className="form-group">
              <label htmlFor="search" className="form-label">Keywords</label>
              <input type="text" className="form-control" id="search" placeholder="Search Bugs By Keywords" />
            </div>
            {/* Searching for BUGS by Keywords */}



            {/* CLASSIFICATION */}
            <div className="form-group">
              <label htmlFor="classification" className="form-label">Classification</label>
              <select id="classification" className="form-control">
                <option value="">All</option>
                <option value="Approved" className="form-control">Approved</option>
                <option value="Unapproved" className="form-control">Unapproved</option>
                <option value="Duplicate" className="form-control">Duplicate</option>
                <option value="Unclassified" className="form-control">Unclassified</option>
              </select>
            </div>
            {/* CLASSIFICATION */}



            {/* Max and Min AGE */}
            <div className="form-group">
              <label htmlFor="maxAge" className="form-label">Max Age</label>
              <input type="number" className="form-control" id="maxAge" placeholder="Min Price" />
            </div>
            <div className="form-group">
              <label htmlFor="minAge" className="form-label">Min Age</label>
              <input type="number" className="form-control" id="minAge" placeholder="Max Price" />
            </div>
            {/* Max and Min AGE */}



            {/* CLOSED */}
            <div className="form-group">
              <label htmlFor="classification" className="form-label">Closed</label>
              <select id="classification" className="form-control">
                <option value="True" className="form-control">True</option>
                <option value="False" className="form-control">False</option>
              </select>
            </div>
            {/* CLOSED */}



            {/* Sort By Items */}
            <div className="form-group">
              <label htmlFor="sortBy" className="form-label">Sort By</label>
              <select id="sortBy" className="form-control">
                <option value="">Select A Item To Sort By</option>
                <option value="title" className="form-control">title</option>
                <option value="classification" className="form-control">classification</option>
                <option value="assignedTo" className="form-control">assignedTo</option>
                <option value="createdBy" className="form-control">createdBy</option>
                <option value="newest" className="form-control">newest</option>
                <option value="oldest" className="form-control">oldest</option>
              </select>
            </div>
            {/* Sort By Items */}




            {/* Submit Button */}
            <br/>
            <button type="submit" className="btn btn-primary">Search</button>
            <br/><br/>
            {/* Submit Button */}

          </form>

          {/* MAPPED BUG LIST ITEM */}
          <div className="row text-center justify-content-center">
            <h1>Bugs Found: {bugs.length} </h1>
            {bugs.map((bug) => (
              <div key={bug._id} className="col-lg-4 col-md-12 col-sm-12">
                <BugListItem bug={bug} key={bug._id}  />
              </div>
            ))}
          </div>
          {/* MAPPED BUG LIST ITEM */}



          {/* PAGE CHANGE */}
          <nav aria-label="Page Navigation">
            <ul className="pagination">
              {/* Returns the number page from the array then maps over each pageNumber*/}
              {/* If the currentPage your on is === to the number your own it will then make the class active to be blue*/}
              {generatePageNumbers().map((pageNumber) => (
                <li className={`page-item ${pageNumber === currentPage ? "active" : ""}`} key={pageNumber}>
                  <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                </li>
              ))}
            </ul>
          </nav>
          {/* PAGE CHANGE */}


      </div>
      )}


    </>

  )


}




