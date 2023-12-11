
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"


import "../components/componentsCSS/LoginRequiredMsg.css"


// CSS






// ******************* IMPORTS ******************* //



export default function LoginFormRequiredMsg( ) {

  return(
    <>



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




      <section className={"full_screen_banner"}>
            <div className="full_screen_banner_content">
              {/* <h1 className="eliminate_bug_text">Log In To Eliminate The Bug</h1> */}
            </div>
      </section>
    </>
  )


}