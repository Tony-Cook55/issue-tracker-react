
/* eslint-disable */

// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";
import "./BugGame.css"

import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

import axios from "axios";


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/






import Confetti from 'react-dom-confetti';

/* Imports the mp3 sound to play on bug hit */
import bugClickSound from "/images/vault_tec_lunchbox.mp3";

// ******************* IMPORTS ******************* //




export default function BugGame(){


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  
    const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/


  const [hits, setHits] = useState(0);
  const [bugClicked, setBugClicked] = useState(false);
  const [bugVisible, setBugVisible] = useState(true);
  const [bugPosition, setBugPosition] = useState({ x: 0, y: 0 });

  const [confettiPosition, setConfettiPosition] = useState({ x: 0, y: 0 });

  const [isAudioEnabled, setIsAudioEnabled] = useState(true); // Added state for audio

  // Create an audio element for vault sound on click
  const bugClickAudio = new Audio(bugClickSound);




// +B +B +B +B +B +B +B +B +B +B  BUG GAME UPDATING POINTS  +B +B +B +B +B +B +B +B +B +B  */
  // Gets the new backend route of finding logged in user and updating the bugsShot score
  const updateUsersScore = async (score) => {
    try {
      // Send the bugsShot to the server using the new route and pass in the score
      await axios.patch(`${import.meta.env.VITE_API_URL}/api/users/updateBugsShot`, { bugsShot: score }, { withCredentials: true })
      .then(response => { 

        console.log(response.data.Point_Gained);
        // console.log(response.data);
        // showToast(response.data.Point_Gained, "success");
    
      })
      .catch(error => 
        console.log(error)
      );
    } catch (error) {
      console.error("Error updating bugsShot:", error);
    }
  };
// +B +B +B +B +B +B +B +B +B +B  BUG GAME UPDATING POINTS  +B +B +B +B +B +B +B +B +B +B  */




  // On Bug being shot
  const handleBugClick = (event) => {

    setBugClicked(true);


    // Fetch bug score from the server using the user's profile ID
  if (isLoggedIn) {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/users/bugsShot/${usersId}`, {
        withCredentials: true,
      })
      .then((response) => {
          // Ensure that the response contains the expected structure
          if (response.data && response.data.bugsShot !== undefined) {
            const currentBugScore = response.data.bugsShot || 0;

            setHits((prevHits) => {
              const newHits = prevHits + 1;

              /* Calculate the new bug score based on that of the bugsShot in server */
              const newBugScore = Number(currentBugScore) + 1;

              /* Send bugsShot to the server */
              updateUsersScore(newBugScore);

              return newHits;
            });
          } else {
            console.error("Invalid response structure");
          }
      })
      .catch((error) => {
        console.error("Error fetching bug score:", error);
      });
  }
  else {
    /* Update the on-screen score without saving it to localStorage */
    setHits((prevHits) => prevHits + 1);
  }




    /* LLLLL ADD SCORE BASED ON LOCAL STORAGE LLLLL */
      // /* Retrieve the current bug score from local storage */
      // const currentBugScore = localStorage.getItem('bugsShot') || 0;

      // /* If the user is logged in they will gain point in local storage */
      // if (isLoggedIn) {

      //   setHits((prevHits) => {
      //     const newHits = prevHits + 1;
    
      //     /* Calculate the new bug score */
      //     const newBugScore = Number(currentBugScore) + 1;
    
      //     /* Update local storage with the new bug score */
      //     localStorage.setItem('bugsShot', newBugScore);

      //     /* Send bugsShot to the server */
      //     updateUsersScore(newBugScore);
    
      //     return newHits;
      //   });
      // } 
      // /* If user isn't logged in they will only update score board */
      // else {
      //   /* Update the on-screen score without saving it to localStorage */
      //   setHits((prevHits) => prevHits + 1);
      // }
    /* LLLLL ADD SCORE BASED ON LOCAL STORAGE LLLLL */




    // Hide the bug after a delay
    setBugVisible(false);

    // Set the bug position for the confetti to follow
    setBugPosition({ x: event.clientX, y: event.clientY });

    // Set the bug position for the confetti to follow
    setConfettiPosition({ x: event.clientX, y: event.clientY });



    // Play the bug click sound only if audio is enabled
    if (isAudioEnabled) {
      bugClickAudio.play();
    }


    // Reset the bug visibility and position after another delay
    setTimeout(() => {
      setBugVisible(true);
      setBugClicked(false);

      // Set the bug position for the confetti to follow
      setBugPosition({ x: event.clientX, y: event.clientY });

      // Reset the confetti position
      setConfettiPosition({ x: 0, y: 0 });

    }, 2000); // Adjust the delay as needed


  };



    // Function to toggle audio
    const toggleAudio = () => {
      setIsAudioEnabled((prev) => !prev);
    };


  const confettiConfig = {
    angle: 100,
    spread: 60,
    startVelocity: 50,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 1000,
    stagger: 3,
    width: '30px',
    height: '30px',
    colors: ['#12cf21', '#3e9946', '#43b64c', '#9df7a5', '#13e024'],
    // colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };



  return(
    <>







<div className="bug-container  fade_in_view">

    {/* ssssss SCOREBOARD ssssss */}
    <div className="container  score_board_container  justify-content-center text-center">
        <div className=" sb_row">

          <div className=" col-heading">
            <h1 className="score_board_title">Shoot The Bugs!</h1>
          </div>

          <div className=" number_display" id="scoreHome">{hits}</div>
          {/* {isLoggedIn ? (
            <div className="number_display" id="scoreHome">
              {hits}
            </div>
          ) : (
            <div className="score_board_title">
              Log in to keep track of your score!
            </div>
          )} */}


          {/* Toggle button for audio */}
          <button  className="audioBtn" onClick={toggleAudio}>
            {isAudioEnabled ? 
              <FaVolumeUp/>  : 
              <FaVolumeMute/>
            }
          </button>
          {/* Toggle button for audio */}


        </div>
      </div>
    {/* ssssss SCOREBOARD ssssss */}



      {bugVisible && (
        <div>
            <div
              className={`bug_flys_across_screen ${bugClicked ? 'bug_clicked' : ''}`}
              onClick={handleBugClick}
              // style={{ position: 'absolute', left: bugPosition.x, top: bugPosition.y }}
            >
              <img className="bug_fly_img" src="../images/colored_bug_logo.png" alt="Bug" />
            </div>

            {/* <div
              className={`bug_flys_across_screen_reverse ${bugClicked ? 'bug_clicked' : ''}`}
              onClick={handleBugClick}
              // style={{ position: 'absolute', left: bugPosition.x, top: bugPosition.y }}
            >
              <img className="bug_fly_img" src="../images/colored_bug_logo.png" alt="Bug" />
            </div> */}
        </div>
      )}


      <div
        className="confetti_fullScreen"
        style={{ position: 'absolute', left: confettiPosition.x, top: confettiPosition.y }}
      >
        <div className="confetti_content"></div>
        <Confetti active={bugClicked} config={confettiConfig} />
      </div>

</div>




      {/* This is the bug image that fly's across the screen*/}
        {/* <div className="bug_flys_across_screen">
          <img className="bug_fly_img" src="../images/colored_bug_logo.png"></img>
        </div> */}




    </>
  )

}