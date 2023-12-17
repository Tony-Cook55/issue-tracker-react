
/* eslint-disable */

// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";

import axios from "axios";

import "./LeaderBoard.css"



  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/

// ******************* IMPORTS ******************* //




export default function LeaderBoard(){


    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/        // import { IsUserLoggedIn } from "../IsUserLoggedIn";      import LoginFormRequiredMsg from "../LoginRequiredMsg";  

  // Use the IsUserLoggedIn component to get authentication information 
  const { isLoggedIn, userFullName, usersId, roles } = IsUserLoggedIn(); // Once logged in these will become not null

  // if not logged in and no info is passed from local storage from IsUserLoggedIn.jsx This is false and send Message
  if (!isLoggedIn) {
    return <LoginFormRequiredMsg />;
  }
  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/








  const [bugsShot, setBugsShot] = useState([]);

  useEffect(() => { 

    axios.get(`${import.meta.env.VITE_API_URL}/api/users/bugsShot/leaderBoard`, {withCredentials: true,})
    .then((response) => {
      const scoresData = response.data || [];
      setBugsShot(scoresData);
    })
    .catch((error) => {
      console.error('Error fetching bug scores:', error);
    });

  }, []); // Fetch bug scores on component mount


  // Sort the users based on bugsShot in descending order
  const sortedUsers = bugsShot.sort((a, b) => b.bugsShot - a.bugsShot);

  // Take only the top 5 users
  const top5Users = sortedUsers.slice(0, 5);



  return(
    <>

{/* {top5Users.map((score) => (
  <div>
    <div key={score._id}>
      <p>{score._id}</p>
      <p>{score.fullName}</p>
      <p>{score.bugsShot || 0}</p>
    </div>
  </div>
))} */}





<div className="d-flex align-items-center justify-content-center">
      <div className="leader_board_container">
        <div className="leader_board_title_container">
          <h1 className="leader_board_title text-center">Leader Board</h1>

        </div>
        <div id="leaderboard">
          <tr className="first_place_ribbon"></tr>
          <table>
            {top5Users.map((user, index) => (
              <tr className="mapped_scores_container" key={user._id}>
                <td className="placement">{index + 1}</td>
                <td className="users_name">{user.fullName}</td>
                <td className="points">{user.bugsShot || 0} Shot</td>
              </tr>
            ))}
          </table>

          {/* <div id="buttons">
            <button className="exit">Exit</button>
            <button className="continue">Continue</button>
          </div> */}

        </div>
      </div>
    </div>
    
    </>
  )


}