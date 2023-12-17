


/* eslint-disable */

// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";

import BugGame from "./BugGame";

import "./BugGame.css"


  /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/
  import { IsUserLoggedIn } from "../IsUserLoggedIn";

  import LoginFormRequiredMsg from "../LoginRequiredMsg";
    /* LLLLLLLLLLL  IS USER LOGGED IN  LLLLLLLLLLL*/



// ******************* IMPORTS ******************* //




export default function BugGamePage(){




  return(
    <>

        <div className="bug_game_entrance_animation">
          <BugGame />
        </div>

    </>
  )
}