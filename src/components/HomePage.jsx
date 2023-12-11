
// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";
import "../components/componentsCSS/HomePage.css"



// ******************* IMPORTS ******************* //


export default function HomePage(){


    // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG
    const [usersFullNameFromLocalStorage, setUserFullNameFromLocalStorage] = useState("");
    const [rolesFromLocalStorage,setRolesFromLocalStorage] = useState(null);
    const [usersIdFromLocalStorage,setUsersIdFromLocalStorage] = useState(null);
    // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG

  useEffect(() => {

  // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG
    // This reads out of local storage for the Users Roles To see if they can Edit the Bug
    if(localStorage.getItem('roles'))
    {
      setRolesFromLocalStorage(JSON.parse(localStorage.getItem('roles')));
    }
    // Sets the fullName of the user object from local storage into the userFullName
    if(localStorage.getItem('fullName'))
    {
      setUserFullNameFromLocalStorage(JSON.parse(localStorage.getItem('fullName')));
    }
    if(localStorage.getItem('usersId'))
    {
      setUsersIdFromLocalStorage(JSON.parse(localStorage.getItem('usersId')));
    }
  // SEEING IF THE USER CAN EVEN UPDATE AND DELETE THIS BUG


    // This is for the title that jumps for every item add 0.1 seconds to its jump timer
    const titleSpans = document.querySelectorAll('.home_title span');
    titleSpans.forEach((span, index) => {
      span.style.animationDelay = `${index * 0.1}s`;
    });

  }, []);











  return(
    <>


<div className="home_container">
  <section className="full_screen_banner">
      <div className="full_screen_banner_content">



        <div className="home_title_entrance">

          <h1 className="home_title">
            <span>I</span>
            <span>s</span>
            <span>s</span>
            <span>u</span>
            <span>e</span>
            <br/>
            <span>T</span>
            <span>r</span>
            <span>a</span>
            <span>c</span>
            <span>k</span>
            <span>e</span>
            <span>r</span>
          </h1>
        </div>

      </div>
  </section>

</div>











{/* <section className="full_screen_banner">
      <div className="full_screen_banner_content"> */}


<section className="container">
      <div className="row">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card card_container">
            <div className="card__image-container">
              <img
                src="../images/colored_bug_logo.png"
                className="card-img-top"
                alt="Card image cap"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text--medium">
                Report Your Very Own Bugs
              </h5>
              <div className="card-info">
                <p className="text--medium">30 Min</p>
                <p className="card-price text--medium">Free</p>
              </div>
            </div>
          </div>
        </div>

        {/* Repeat the above card structure for the other cards */}

        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card__image-container">
            <img
                src="../images/colored_bug_logo.png"
                className="card-img-top"
                alt="Card image cap"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title text--medium">
                View And Comment On Other Users Bugs
              </h5>
              <div className="card-info">
                <p className="text--medium">30 Min</p>
                <p className="card-price text--medium">Free</p>
              </div>
            </div>
          </div>
        </div>


        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card__image-container">
              {/* <img
                src="https://images.unsplash.com/photo-1473283147055-e39c51463929?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
                className="card-img-top"
                alt="Card image cap"
              /> */}
            </div>
            <div className="card-body">
              <h5 className="card-title text--medium">
                Here's the Title of an Awesome Course
              </h5>
              <div className="card-info">
                <p className="text--medium">30 Min</p>
                <p className="card-price text--medium">Free</p>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>


{/* </div>
</section> */}
















      <h1>TODO:</h1>
      <ol className='accordion_ol mapped_bug_items     red_text'>
        <li>Make This Home Page</li>
        <li>Make Login In message page</li>
        <li>Make all pages require user to be logged in thus showing the login message</li>
        <li>ADD ERROR VALIDATION FOR ALMOST ALL INPUTS</li>
        <li>Css the searching list items in bugs and users</li>
        <li>Redo User Item</li>
        <li>Edit User Profile</li>
        <li>Change page change buttons on list items</li>
        <li>Edit all the edit functions of editing users and bugs</li>
        <li>Change the assign Users to bug by making it a dropdown or a new page</li>
        <li>Change names of css being used in several locations like item's css or make css files just for those</li>
        <li>Redo Page Selection Buttons on list</li>
        <li>Figure Out why pages have an extra page button on list</li>
      </ol>






    </>
  )

}