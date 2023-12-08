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


import LoginFormRequiredMsg from "../LoginRequiredMsg";



// ******************* IMPORTS ******************* //









export default function UserList(){

  
  const [users, setUser] = useState([]);



  // PAGES AND NEW PAGES //
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

    // CHANGE THIS TO CHANGE THE AMOUNT OF ITEMS ON THE PAGE
    const pageSize = 6;
    const pageNumber = 1;

  const [searchParams, setSearchParams] = useState({keywords: "", role:"", maxAge:"", minAge:"", sortBy:""})
  // PAGES AND NEW PAGES //



  // Retrieve the user's info object from local storage
  const userInfo = JSON.parse(localStorage.getItem('fullName'));

  // Extract the fullName from the userInfo object
  const userFullName = userInfo ? userInfo.fullName : null;

  // Check if the user is logged in by verifying the existence of fullName
  const isLoggedIn = userFullName !== null;






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




  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => setPanelOpen(!panelOpen);



  return( 
    <>



{/* Check if the user is logged in before rendering content */}
{!isLoggedIn ? ( /* !isLoggedIn &&  bugs.length*/
        <h2>
          <Link to="/login">
            <LoginFormRequiredMsg />
          </Link>
        </h2>
      ) : 
      // !users.length ? (
      //   // <h1 className="no_bugs_found_message">There Are No Users</h1>
      //   <div className="loading_spinner_container ">
      //     <span className="loading_spinner"></span>
      //   </div>
      // ) :
      (


    <div>
        <div className={`search-panel ${panelOpen ? 'open' : ''}`}>
          <button className="toggle-button" onClick={togglePanel}>
            Toggle Search
          </button>

          <div className="panel-content">
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

                    <button type="submit">Search</button>
            </form>
          </div>
        </div>




              {/* MAPPED USERS LIST ITEM */}
              <div className="row text-center justify-content-center">
                <h1>Users Found: {users.length} </h1>
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



              {/* NO BUGS FOUND */}
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
            {/* NO BUGS FOUND */}

      </div>
      )}



    </>

  )


}