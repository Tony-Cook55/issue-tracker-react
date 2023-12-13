
/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./UserList.css"



import axios from "axios"

import { useState, useEffect } from "react"

import { Link } from "react-router-dom";


import UserListItem from "./UserListItem";

import { FaSearch } from "react-icons/fa"

  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/

// ******************* IMPORTS ******************* //









export default function UserList(){


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



  
  const [users, setUser] = useState([]);



  // PAGES AND NEW PAGES //
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

    // CHANGE THIS TO CHANGE THE AMOUNT OF ITEMS ON THE PAGE
    const pageSize = 6;
    const pageNumber = 1;

  const [searchParams, setSearchParams] = useState({keywords: "", role:"", maxAge:"", minAge:"", sortBy:""})
  // PAGES AND NEW PAGES //










  // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //
  useEffect(() => {
    // Fetch User data only if the user is logged in with their fullName
    if (isLoggedIn) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/users/list/`, 
      { withCredentials: true,
        params: {pageSize, pageNumber}
      })
        .then(response => {
          setUser(response.data.users);

          setTotalPages(Math.ceil(response.data.totalCount / pageSize)); // Total count is returned
          setCurrentPage(1);
        })
        .catch(error => console.log(error));
    }
  },  [isLoggedIn]);
  // ~~~~~~~~~~~~~~~~ FIND ALL USERS ~~~~~~~~~~~~~~~~ //




  const onSearchFormSubmit = (evt) => {
    evt.preventDefault();

    // the 3rd . like  .keywords || .minPrice  ==  the id of the input
    const keywords = evt.target.keywords.value;
    const role = evt.target.role.value;
    const maxAge = evt.target.maxAge.value;
    const minAge = evt.target.minAge.value;
    const sortBy = evt.target.sortBy.value;

    const newSearchParams = {keywords, role, maxAge, minAge, sortBy};
    setSearchParams(newSearchParams);
    fetchUsers({...newSearchParams, pageSize, pageNumber})
  }



  
  const fetchUsers = (params) => {
    //  console.log(`Search params are: ${JSON.stringify(params)}`);
    axios.get(`${import.meta.env.VITE_API_URL}/api/users/list/`,
    {withCredentials: true,
      params: {...params, pageSize} 
    }
    )
    .then(response => {
      setUser(response.data.users); // Assuming response contains users
      setTotalPages(Math.ceil(response.data.totalCount / pageSize)); // Total count is returned
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
    fetchUsers({...searchParams, pageNumber});
  }



  /* Used in opening the search inputs */
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => setPanelOpen(!panelOpen);






  return( 
    <>



    <div>


        <div className={`search-panel ${panelOpen ? 'open' : ''}`}>
            <button className="toggle-button" onClick={togglePanel}>
              Toggle Search
            </button>

          <div className="panel-content">

            {/* Number of Results Found */}
            <h1 className="items_found_title">
              {users.length}
              <br/>
              Users Found
            </h1>
            {/* Number of Results Found */}

            <form onSubmit={(evt) => onSearchFormSubmit(evt)}>
                        {/* Searching for USERS by Keywords */}
                        <div className="form-group">
                          <label htmlFor="keywords" className="form-label">Keywords</label>
                          <input type="text" className="form-control" id="keywords" placeholder="Search Users By Keywords" />
                        </div>
                        {/* Searching for USERS by Keywords */}



                        {/* ROLE */}
                        <div className="form-group">
                          <label htmlFor="role" className="form-label">Role</label>
                          <select id="role" className="form-control">
                            <option value="">Choose User Role</option>
                            <option value="Developer" className="form-control">Developer</option>
                            <option value="Business Analysts" className="form-control">Business Analysts</option>
                            <option value="Quality Analyst" className="form-control">Quality Analyst</option>
                            <option value="Product Manager" className="form-control">Product Manager</option>
                            <option value="Technical Manager" className="form-control">Technical Manager</option>
                          </select>
                        </div>
                        {/* ROLE */}



                        {/* Max and Min AGE */}
                        <div className="form-group">
                          <label htmlFor="maxAge" className="form-label">Max Age</label>
                          <input type="number" className="form-control" id="maxAge" placeholder="Max Age" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="minAge" className="form-label">Min Age</label>
                          <input type="number" className="form-control" id="minAge" placeholder="Min Age" />
                        </div>
                        {/* Max and Min AGE */}
                        


                        {/* Sort By Items */}
                        <div className="form-group">
                          <label htmlFor="sortBy" className="form-label">Sort By</label>
                          <select id="sortBy" className="form-control">
                            <option value="">Select A Item To Sort By</option>
                            <option value="givenName" className="form-control">Given Name</option>
                            <option value="familyName" className="form-control">Family Name</option>
                            <option value="role" className="form-control">Role</option>
                            <option value="newest" className="form-control">Newest</option>
                            <option value="oldest" className="form-control">Oldest</option>
                          </select>
                        </div>
                        {/* Sort By Items */}

                    <button type="submit" className="add_items_button mt-4">Search</button>
            </form>
          </div>
        </div>




              {/* MAPPED USERS LIST ITEM */}
              <div className="row text-center justify-content-center">
                {users.map((userItem) => (
                  <div key={userItem._id} className="col-lg-4 col-md-12 col-sm-12">
                    <UserListItem userItem={userItem} key={userItem._id}/>
                  </div>
                ))}
              </div>
              {/* MAPPED USERS LIST ITEM */}



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



              {/* NO USERS FOUND */}
              {!users.length ? 
              (
              <div>
                <h1>No Users Found Please Try Again</h1>
              </div>
              ) : (
              <div className=" ">
                <span className=""></span>
              </div>
              )}
            {/* NO USERS FOUND */}

      </div>




    </>

  )


}