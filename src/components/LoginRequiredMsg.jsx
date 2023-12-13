
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import "../components/componentsCSS/LoginRequiredMsg.css"


import { Link } from "react-router-dom"





// ******************* IMPORTS ******************* //



export default function LoginFormRequiredMsg( ) {

  return(
    <>


<Link to="/login">

      <div class="main_login_div ">
        <h1 className="login_header">Please Log In To: 
        <div class="roller">
          <span id="rolling_login_text">
            Report Bugs<br/>
            View Bugs<br/>
            And<br/> 
            Shoot Bugs<br/>
          </span>
          {/* <span id="spare-time">AMONG US IS SO COOL!</span><br/> */}
        </div>
          
          </h1>
        </div>



            {/* FLYING BUG 1 */}
            <div className="first_bug_flys_across_login_screen">
              <img className="bug_fly_login_img crosshair_cursor" src="../images/colored_bug_logo.png" alt="Bug" />
            </div>
            {/* FLYING BUG 1 */}


            {/* FLYING BUG 2 */}
            <div className="second_bug_flys_across_login_screen   ">
              <img className="bug_fly_login_img crosshair_cursor" src="../images/colored_bug_logo.png" alt="Bug" />
            </div>
            {/* FLYING BUG 2 */}
</Link>



    </>
  )


}