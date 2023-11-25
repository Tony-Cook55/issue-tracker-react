
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"



// CSS






// ******************* IMPORTS ******************* //



export default function LoadingPage( ) {

  return(
    <>
        <div className="text-center">
          <div className="" role="status">
            <h1 className=" ">Loading... FIX ME NOW <span className="spinner-border"></span></h1>
          </div>
        </div>
    </>
  )


}