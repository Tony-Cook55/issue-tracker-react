
/* eslint-disable */




// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import axios from "axios"


import { useState, useEffect } from "react"


import { Link, useNavigate } from "react-router-dom"


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



// ******************* IMPORTS ******************* //



export default function Comments( {bugItem, bugId, showToast} ){


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/


  const [testCases, setTestCases] = useState([]);

  const [newTestCase, setNewTestCase] = useState({
    title: "",
    passed: false,
    versionRelease: "",
    appliedFixOnDate: "",
  });





  // ~~~~~~~~~~~~~~~~ FIND ALL TEST CASES IN BUG ~~~~~~~~~~~~~~~~ //
  useEffect(() => {

    if (isLoggedIn) {
      axios.get(`${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/test/list`,{withCredentials: true})

      .then(response => {
        // Sets the database info into this
        setTestCases(response.data);

      })
      .catch(error => console.log(error));
  }

  }, [isLoggedIn, bugId]); // Add bugId as a dependency to re-run the effect when it changes
// ~~~~~~~~~~~~~~~~ FIND ALL TEST CASES IN BUG ~~~~~~~~~~~~~~~~ //








// ++++++++++++++++ ADDING A NEW TEST CASE TO BUG ++++++++++++++++++
const addNewTestCase = () => {


    // Validate new test case inputs
    if (
      !newTestCase.title ||
      !newTestCase.versionRelease
    ) {
      showToast("Please fill in all required fields", "error");
      return;
    }
    if (
      !newTestCase.title 
    ) {
      showToast("Please fill Test Case's Title", "error");
      return;
    }
    if (
      !newTestCase.versionRelease
    ) {
      showToast("Please Add the Version Release For This Test Case", "error");
      return;
    }
    // Ensure appliedFixOnDate is not empty if passed is true
    if (newTestCase.passed && !newTestCase.appliedFixOnDate) {
      showToast("Please Add The Data This Test Case Was Fixed On. Format: MM-DD-YYYY", "error");
      return;
    }

    // else if (
    //   !newTestCase.appliedFixOnDate.match(/^\d{2}-\d{2}-\d{4}$/) /* This regex (/^\d{2}-\d{2}-\d{4}$/) checks if the appliedFixOnDate follows the MM-DD-YYYY format. */
    // ) {
    //   showToast("Please Add The Data This Tets Case Was Fixed On. Format: MM-DD-YYYY", "error");
    //   return;
    // }



    const newTestCaseObject = {
      title: newTestCase.title,
      passed: newTestCase.passed,
      versionRelease: newTestCase.versionRelease,           // Send null if empty when not passed due to it being optional
      appliedFixOnDate: newTestCase.appliedFixOnDate === "" ? null : newTestCase.appliedFixOnDate,

    };



  // Update the local state immediately
  setTestCases([...testCases, newTestCaseObject]);
  setNewTestCase({
    title: "",
    passed: false,
    versionRelease: "",
    appliedFixOnDate: "",
  });

  console.log("appliedFixOnDate:", testCases.appliedFixOnDate);


  axios
    .put(
      `${import.meta.env.VITE_API_URL}/api/bugs/${bugId}/test/new`,
        newTestCase ,  // Pass newTestCase directly as the data
      { withCredentials: true }
    )
    .then((response) => {
      // After successfully adding a comment, update the comments state
      // setComments([...comments, response.data]); // Assuming the server returns the new comment
      // setNewComment(""); // Clear the input field after submitting a comment
      
      showToast(`${response.data.TestCase_Created}`, "success");
      // navigateToAnotherPage(`/`);
    })
    .catch((error) => {
      console.log(error);
    });
};
// ++++++++++++++++ ADDING A NEW TEST CASE TO BUG ++++++++++++++++++



  return(
<>
      <div className="container mt-5 mb-5">
        <div className="row height d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card">
              <div className="p-3 ">
                <h2>Test Cases Found: {testCases.length} </h2>
                {!isLoggedIn ? (
                  <Link to="/login">
                    <LoginFormRequiredMsg />
                  </Link>
                ) : !testCases.length ? (
                  <h1 className="no_comments_message">No Test Cases Yet</h1>
                ) : (
                  <div className="row text-center justify-content-center list_of_mapped_items_scrollBar">
                    {testCases.map((testCase, index) => (
                      <div key={index} className="mt-2 single_comment">
                        <div className="d-flex flex-row p-3">
                          <div className="w-100">
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="d-flex flex-row align-items-center">
                                <span className="mr-2">{testCase.testCaseCreatedByUser}</span>
                              </div>
                              <small>Version Release: {testCase.versionRelease}</small>
                            </div>
                            <h4><span className="mr-2">{testCase.title}</span></h4>
                            <p className="text-justify comment_text">
                              Passed: {testCase.passed ? "Yes" : "No"}
                            </p>
                            <p className="text-justify comment_text">
                              Applied Fix On: {testCase.appliedFixOnDate || "Not Fixed"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="add_comment_div align-items-center">
                <input
                  type="text"
                  className="add_comment_input form-control"
                  placeholder="Test Case Title"
                  value={newTestCase.title}
                  onChange={(e) =>
                    setNewTestCase({
                      ...newTestCase,
                      title: e.target.value,
                    })
                  }
                />
<div className="form-check">


<select
            className="form-control"
            value={newTestCase.passed ? "True" : "False"}
            onChange={(e) =>
              setNewTestCase({
                ...newTestCase,
                passed: e.target.value === "True",
              })
            }
          >
            <option value="True">Passed</option>
            <option value="False">Not Passed</option>
          </select>
          {newTestCase.passed && (
            <input
              type="text"
              className="add_comment_input form-control"
              placeholder="Applied Fix On (MM-DD-YYYY)"
              value={newTestCase.appliedFixOnDate}
              onChange={(e) =>
                setNewTestCase({ ...newTestCase, appliedFixOnDate: e.target.value })
              }
            />
          )}








                  <label
                    className="form-check-label"
                    htmlFor="passedCheckbox"
                  >
                    Passed
                  </label>
                </div>
                <input
                  type="text"
                  className="add_comment_input form-control"
                  placeholder="Version Release"
                  value={newTestCase.versionRelease}
                  onChange={(e) =>
                    setNewTestCase({
                      ...newTestCase,
                      versionRelease: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="add_new_comment_button"
                  onClick={addNewTestCase}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )

}