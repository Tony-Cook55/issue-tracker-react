
// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";
import "../components/componentsCSS/HomePage.css"


import Confetti from 'react-dom-confetti';

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






  const [hits, setHits] = useState(0);
  const [bugClicked, setBugClicked] = useState(false);
  const [bugVisible, setBugVisible] = useState(true);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });

  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });


  const handleBugClick = (event) => {
    setBugClicked(true);
    setHits((prevHits) => prevHits + 1);

    // Hide the bug after a delay
    setBugVisible(false);

    // Set the bug position for the confetti to follow
    setBugPosition({ x: event.clientX, y: event.clientY });

    // Set the bug position for the confetti to follow
    setConfettiPosition({ x: event.clientX, y: event.clientY });

    // Reset the bug visibility and position after another delay
    setTimeout(() => {
      setBugVisible(true);
      setBugClicked(false);

      // Set the bug position for the confetti to follow
      setBugPosition({ x: event.clientX, y: event.clientY });

      // Reset the confetti position
      setConfettiPosition({ x: 0, y: 0 });

    }, 5000); // Adjust the delay as needed
  };


  

  const confettiConfig = {
    angle: 100,
    spread: 160,
    startVelocity: 40,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 1000,
    stagger: 3,
    width: '20px',
    height: '20px',
    colors: ['#12cf21', '#3e9946', '#43b64c', '#9df7a5', '#13e024'],
    // colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };



  return(
    <>



<div className="">
  {bugVisible && (
        <div
          className={`bug_flys_across_screen ${bugClicked ? 'bug_clicked' : ''}`}
          onClick={handleBugClick}
          // style={{ position: 'absolute', left: bugPosition.x, top: bugPosition.y }}
        >
          <img className="bug_fly_img" src="../images/colored_bug_logo.png" alt="Bug" />
        </div>
      )}


        <div
          className="confetti_fullScreen"
          style={{ position: 'absolute', left: confettiPosition.x, top: confettiPosition.y }}
        >
          <div className="confetti_content"></div>
          <Confetti active={bugClicked} config={confettiConfig} />
        </div>

        <div className="counter">Hits: {hits}</div>
</div>


{/* 
    <div className="animation-container" style={{ position: 'relative' }}>
      {bugVisible && (
        <div
          className={`bug_flys_across_screen ${bugClicked ? 'bug_clicked' : ''}`}
          onClick={handleBugClick}
          style={{ position: 'absolute', left: bugPosition.x, top: bugPosition.y }}
        >
          <img className="bug_fly_img" src="../images/colored_bug_logo.png" alt="Bug" />
        </div>
      )}

      <div className={`confetti-container ${bugClicked ? 'bug_clicked' : ''}`}>
        
        <Confetti active={bugClicked} config={confettiConfig} />
      </div>
    </div> */}




      {/* This is the bug image that fly's across the screen*/}
        {/* <div className="bug_flys_across_screen">
          <img className="bug_fly_img" src="../images/colored_bug_logo.png"></img>
        </div> */}



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











<section className="full_screen_cards">
  <div className="full_screen_cards_content">


    <section className="container">
      <div className="row">

      {/* EXPLORE BUGS */}
      <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card__image-container">
              <img
                src="../images/bug_on_code.png"
                className="card-img-top"
                alt="Card image cap"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                Explore and View Others Bugs
              </h5>
              <div className="card-info  text-center">
                <p className="">Browse The List of User Made Bugs and Help The Community Fix Them.</p>
              </div>
            </div>
          </div>
        </div>
      {/* EXPLORE BUGS */}


      {/* REPORT BUGS */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card card_container">
            <div className="card__image-container">
              <img
                src="../images/colored_bug_logo.png"
                className="bug_logo_magnified"
                alt="Card image cap"
              />
              <img
                src="../images/magnifying_glass_removed_glass.png"
                className="bug_magnifier"
                alt="Card image cap"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title ">
                Report Your Very Own Bugs
              </h5>
              <div className="card-info  text-center">
                <p className="">Have a Bug? Report It! We Allow For The Ability For Users To Report Any Bugs.</p>
              </div>
            </div>
          </div>
        </div>
      {/* REPORT BUGS */}


      {/* COMMENT ON BUGS */}
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card">
            <div className="card__image-container">
              <img
                  src="../images/chat_bubble_blue.png"
                  className="card-img-top"
                  alt="Card image cap"
                />
            </div>
            <div className="card-body">
              <h5 className="card-title">
                See What Others Have To Say About Bugs
              </h5>
              <div className="card-info  text-center">
                <p className="">Post Your Own Comments, Or View What Other Users Have To Say.</p>
              </div>
            </div>
          </div>
        </div>
      {/* COMMENT ON BUGS */}


      </div>
    </section>


  </div>
</section>




















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