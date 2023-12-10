
// ******************* IMPORTS ******************* //

// CSS
import { useEffect, useState } from "react";
import "../components/componentsCSS/HomePage.css"


// ******************* IMPORTS ******************* //


export default function HomePage(){



  const [showCrosshair, setShowCrosshair] = useState(false);

  const [bugShot, setBugShot] = useState(false);


  const handleCrosshairClick = () => {
    setShowCrosshair(false);

    // Trigger bug shot effect after a delay
    setTimeout(() => {
      setBugShot(true);

      // Reset bug shot effect after another delay
      setTimeout(() => {
        setBugShot(false);
      }, 500);
    }, 500);
  };


  useEffect(() => {

    // Set a timeout to show the crosshair after 4 seconds
    const crosshairTimeout = setTimeout(() => {
      setShowCrosshair(true);
    }, 2000);

    // Clear timeouts on component unmount
    return () => {
      clearTimeout(crosshairTimeout);
    };
  }, []); // Run this effect only once when the component mounts


  return(
    <>




<div className="home-container">



<section className={"full_screen_banner"}>
      <div className="full_screen_banner_content">
        {/* <h1 className="eliminate_bug_text">Log In To Eliminate The Bug</h1> */}

        <h3>TEXT HERE</h3>

      </div>
</section>




    <section className="features-section">
        <div className="feature">
          <h2>Track Bugs</h2>
          <p>Efficiently log and manage bugs in your projects.</p>
        </div>
        <div className="feature">
          <h2>Edit Bugs</h2>
          <p>Edit bug details and keep your information up-to-date.</p>
        </div>
        <div className="feature">
          <h2>Comment on Bugs</h2>
          <p>Collaborate with your team by adding comments to bugs.</p>
        </div>
      </section>



      <section className="features-section">
        <div className="feature">
          <h2>Track Bugs</h2>
          <p>Efficiently log and manage bugs in your projects.</p>
        </div>
        <div className="feature">
          <h2>Edit Bugs</h2>
          <p>Edit bug details and keep your information up-to-date.</p>
        </div>
        <div className="feature">
          <h2>Comment on Bugs</h2>
          <p>Collaborate with your team by adding comments to bugs.</p>
        </div>
      </section>
    </div>



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