
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

import { FaSearch, FaArrowUp } from "react-icons/fa"

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

    // Smooth scroll to the top on click
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }







  /* Used in opening the search inputs */
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  /* Used in opening the search inputs */



  
  return( 
    <>



<div>
      <div id="mySidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>

            {/* Number of Results Found */}
            <h1 className="items_found_title">
              {users.length}
              <br/>
              Users Found
            </h1>
            {/* Number of Results Found */}

            <form onSubmit={(evt) => onSearchFormSubmit(evt)}>
                        {/* Searching for USERS by Keywords */}
                        <div className="form-group   search_input_div">
                          <input type="text" className="edit_form_input_center  item_being_edited   form-control   text-center"  id="keywords" placeholder="Search Users By Keyword" />
                        </div>
                        {/* Searching for USERS by Keywords */}



                        {/* ROLE */}
                        <div className="form-group  search_input_div">
                          <select id="role" className="edit_form_input_center  item_being_edited   form-control   text-center">
                            <option value="">Choose User Role</option>
                            <option value="Developer" className="form-control">Developer</option>
                            <option value="Business Analyst" className="form-control">Business Analysts</option>
                            <option value="Quality Analyst" className="form-control">Quality Analyst</option>
                            <option value="Product Manager" className="form-control">Product Manager</option>
                            <option value="Technical Manager" className="form-control">Technical Manager</option>
                          </select>
                        </div>
                        {/* ROLE */}



                        {/* Max and Min AGE */}
                        <div className="form-group  search_input_div">
                          <input type="number" className="edit_form_input_center  item_being_edited   form-control   text-center" id="maxAge" placeholder="Max Age" min="0"  />
                        </div>
                        <div className="form-group  search_input_div">
                          <input type="number" className="edit_form_input_center  item_being_edited   form-control   text-center" id="minAge" placeholder="Min Age" min="0" />
                        </div>
                        {/* Max and Min AGE */}
                        


                        {/* Sort By Items */}
                        <div className="form-group  search_input_div">
                          <select id="sortBy" className="edit_form_input_center  item_being_edited   form-control   text-center">
                            <option value="">Select A Item To Sort By</option>
                            <option value="givenName" className="form-control">Given Name</option>
                            <option value="familyName" className="form-control">Family Name</option>
                            <option value="role" className="form-control">Role</option>
                            <option value="newest" className="form-control">Newest</option>
                            <option value="oldest" className="form-control">Oldest</option>
                          </select>
                        </div>
                        {/* Sort By Items */}

                    <button type="submit" className="submit_form_button mt-4">Search</button>
            </form>
      </div>



      <div id="main">
        {/* The button is now part of the main content */}
        <button className="open_search_button" onClick={toggleSidebar}>
          {sidebarOpen ? '✕' : <FaSearch/>} {/* Toggle between ☰ (open) and ✕ (close) */}
        </button>
      </div>


    </div>



    <div>







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
              <div className="">
                  <nav className="pagination_container" aria-label="Page navigation">

                      <ul className="pagination justify-content-center">
                        {/* Returns the number page from the array then maps over each pageNumber*/}
                        {/* If the currentPage your on is === to the number your own it will then make the class active to be blue*/}
                        {generatePageNumbers().map((pageNumber) => (
                          <li className={`page-item ${pageNumber === currentPage ? "active" : ""}`} key={pageNumber}>
                            <button className="page-link" onClick={() => handlePageChange(pageNumber)}>{pageNumber}</button>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Takes you back to the top */}
                      <a href="#top" className="icon_link   mt-4">
                          <div className="back_to_top_background">
                              <FaArrowUp/>
                          </div>
                      </a>
                      {/* Takes you back to the top */}

                  </nav>
              </div>
              {/* PAGE CHANGE */}





              {/* NO USERS FOUND */}
              {!users.length ? 
              (
              <div>
                  <section className="no_items_found_banner">
                    <div className="no_items_found_content">

                        <div className="drop_container">
                            <div className="No">No</div>
                            <div className="Results">Results</div>
                            <div className="Found">Found</div>
                            {/* <div className="p">P</div>
                            <div className="s">!</div> */}
                        </div>

                    </div>
                  </section>
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