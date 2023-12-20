

/* eslint-disable */


// ******************* IMPORTS ******************* //

import { useEffect, useState } from 'react';
import axios from 'axios';

// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


// CSS
import "./BugScoreMedal.css"

// ******************* IMPORTS ******************* //






                                       // usersId passed from the component its in most likely from the isLoggedIn call
export default function BugScoreMedal(   {usersId, showToast}  ){


  const [bugsShot, setBugsShot] = useState(null);


  // If the users score in the backend == that of the score return the medals name. 
  const determineBugScoreTier = (bugsShotScore) => {
    // Your logic to determine the tier based on the score
    if(bugsShotScore >= 100000){
      return 'go-outside';
    }
    if(bugsShotScore >= 10000){
      return 'diamond-medal';
    }
    else if (bugsShotScore >= 100) {
      return 'gold-medal';
    } 
    else if (bugsShotScore >= 50) {
      return 'silver-medal';
    } 
    else if (bugsShotScore >= 25) {
      return 'bronze-medal';
    } 
    else {
      return 'no-medal'; // Or any other default class
    }
  };


  // Get the score of the user and plug it in if nothing its 0
  useEffect(() => {
    if (usersId) {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/users/bugsShot/${usersId}`, {
          withCredentials: true,
        })
        .then((response) => {
          const userBugScore = response.data.bugsShot || 0;
          setBugsShot(userBugScore);
        })
        .catch((error) => {
          console.error('Error fetching bug score:', error);
        });
    }
  }, [usersId]);


  // Plugs the bugsShot amount into the score tier to determine the medal to give then we check the tier below
  const bugsShotTier = determineBugScoreTier(bugsShot);



  return (
    <div>
      {bugsShot !== null && (
        <div className="bugs_score_container">

        <div className="bugsShot_title_container">
          <h1 className="bugsShot_title">Bugs You've Shot</h1>

          <div className="bouncing_text    justify-content-center">
            <h1 className="bugsShot_score">{bugsShot}</h1>
          </div>
        </div>



        {/* GO OUTSIDE MEDAL */}
        {/* {bugsShotTier === 'diamond-medal' && (
            <div className="medal_container">
              <h1 className="bugsShot_title">Please Go Outside Bro</h1>
              <div className="centered_shine_box">
                <div className="shine_box   diamond_shine">
                  <img className="diamond_medal  medal_images" src="/images/medals/outdoor_tier.png" alt="Gold Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* GO OUTSIDE MEDAL */}


        {/* DIAMOND MEDAL */}
          {/* {bugsShotTier === 'diamond-medal' && (
            <div className="medal_container">
              <h1 className="bugsShot_title">DIAMOND PLAYER</h1>
              <div className="centered_shine_box">
                <div className="shine_box   diamond_shine">
                  <img className="diamond_medal  medal_images" src="/images/medals/diamond_badge.png" alt="Gold Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* DIAMOND MEDAL */}


        {/* GOLD MEDAL */}
          {/* {bugsShotTier === 'gold-medal' && (
            <div className="medal_container ">
              <h1 className="bugsShot_title">You Are 1st Place</h1>

              <div className="centered_shine_box">
                <div className="shine_box   gold_shine">
                  <img className="gold_medal  medal_images" src="/images/medals/1st_gold_medal.png" alt="Gold Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* GOLD MEDAL */}


        {/* SILVER MEDAL */}
          {/* {bugsShotTier === 'silver-medal' && (
            <div className="medal_container">
              <h1 className="bugsShot_title">You Are 2nd Place</h1>

              <div className="centered_shine_box">
                <div className="shine_box   silver_shine">
                  <img className="silver_medal  medal_images" src="/images/medals/2nd_silver_medal.png" alt="Silver Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* SILVER MEDAL */}


        {/* BRONZE MEDAL */}
          {/* {bugsShotTier === 'bronze-medal' && (
            <div className="medal_container">
              <h1 className="bugsShot_title">You Are 3rd Place</h1>

              <div className="centered_shine_box">
                <div className="shine_box   bronze_shine">
                  <img className="bronze_medal  medal_images" src="/images/medals/3rd_bronze_medal.png" alt="Bronze Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* BRONZE MEDAL */}


        {/* NO MEDAL */}
          {/* {bugsShotTier === 'no-medal' && (
            <div className="medal_container">
              <h1 className="bugsShot_title">Shoot More Bugs!</h1>

              <div className="centered_shine_box">
                <div className="shine_box   grey_shine">
                  <img className="greyed_medal  medal_images" src="/images/medals/star_medal.png" alt="No Medal" />
                </div>
              </div>
            </div>
          )} */}
        {/* NO MEDAL */}

        </div>
      )}
      {bugsShot === null && (
        <span></span>
        // <img className="greyed_medal  shimmer  medal_images" src="/images/medals/star_medal.png" alt="No Medal" />
      )}
    </div>
  );
};