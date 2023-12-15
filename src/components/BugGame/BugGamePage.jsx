


/* eslint-disable */

// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";

import BugGame from "./BugGame";

import "./BugGame.css"

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
