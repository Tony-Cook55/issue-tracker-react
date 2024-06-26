

/* eslint-disable */


// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";
import "../components/componentsCSS/HomePage.css"

import { Link } from "react-router-dom";


import BugGame from "./BugGame/BugGame";


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






/* ^^^^^^^^^^^^ ON LINK CLICK REFRESH AND SCROLL TO TOP ^^^^^^^^^^^^ */     // onClick={scrollToTop}

// Scrolls to the top of the page
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" // Use "smooth" for a smooth scrolling effect, or "auto" for instant scrolling
  });
};

/* ^^^^^^^^^^^^ ON LINK CLICK REFRESH AND SCROLL TO TOP ^^^^^^^^^^^^ */




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










<div>
  <section className="full_screen_cards">
    <div className="full_screen_cards_content">


      <section className="container">
        <div className="row">

        {/* EXPLORE BUGS */}
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card card_container">
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
            <div className="card card_container">
              <div className="card__image-container">
                <img
                    src="../images/chat_bubble_blue.png"
                    className="card-img-top"
                    alt="Card image cap"
                  />
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  See What Others Have To Say
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
</div>




        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}
        <section className="full_screen_cards">
          <div className="full_screen_cards_content">

                  <h1 className="enter_firing_range_text">Enter The Firing Range</h1>

                  <img
                    src="/images/colored_bug_logo.png"
                    className="bug_image"
                    alt="Bug"
                  />


                <Link to="/bugGame" onClick={scrollToTop}>
                  <img
                    src="/images/crosshair_borderless.png"
                    className="firing_range_cross_hair"
                    alt="Crosshair"
                  />
                </Link>
          </div>
        </section>
        {/* xxxx ELIMINATE BUG ONCLICK EVENT GAME xxxx */}







        {/* LLLL LEADERBOARD LLLL */}
        {/* <section className="full_screen_cards">
          <div className="full_screen_cards_content">

                  <h1 className="enter_firing_range_text">Visit The Leaderboard </h1>

                <Link to="/leaderBoard">
                  <img
                    src="/images/medals/leaderboard.png"
                    className="leader_board_pic"
                    alt=""
                  />
                </Link>
          </div>
        </section> */}
        {/* LLLL LEADERBOARD LLLL */}






  {/* <div className="">
      <BugGame />
  </div> */}


    </>
  )

}