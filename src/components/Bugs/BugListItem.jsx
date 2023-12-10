/* eslint-disable */


// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import "./BugListItem.css"

// ICONS //   Call them in like this    <FaClock/>
import { FaLock, FaPencilRuler } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
// ICONS //


// ******************* IMPORTS ******************* //









export default function BugListItem(  {bug, showToast }  ){

  return( 
    <>



<div className="item_list_container      delay-1  item_come_in_animation  item_pop">
  <div className="item_list_box_flex">


    {/* ITEM */} {/*  */}
    <div className="list_item">
          <Link to={`/bugItem/${bug._id}`} className="list_item_link">

            {/* This is the small bg in the corner */}
            <div className="background_circle_top_right"></div>
            <div className="background_circle_bottom_left"></div>

            {/* TITLE */}
            <div className="list_item_title">
              {bug.title}
              <h6 className="bugsId">{bug._id}</h6>
            </div>
            {/* TITLE */}




            {/* CLASSIFICATION */}
            <div className="item_section_container">
                <span className="item_section_title">Classification</span>
                <p className="item_highlighted">
                {bug.bugClassified.classification}
                </p>
            </div>
            {/* CLASSIFICATION */}


            {/* CREATED BY USER */}
            <div className="item_section_container">
              <span className="item_section_title">Created By User</span>
                <p className="item_highlighted">
                {bug.bugCreationInformation[0].bugCreatedByUser}
                </p>
            </div>
            {/* CREATED BY USER */}


            {/* CREATED ON DATE */}
            <div className="item_section_container">
              <span className="item_section_title">Created On</span>
              <p className="item_highlighted">
                {bug.bugCreationInformation[0].bugsCreationDate}
              </p>
            </div>
            {/* CREATED ON DATE */}


                                    <div class="social-share "> {/* d-flex */}
                                        <ul class="social-icon">
                                            <li class="social-icon-item">
                                                <a href="#" class="social-icon-link bi-twitter"></a>
                                            </li>

                                            <li class="social-icon-item">
                                                <a href="#" class="social-icon-link bi-facebook"></a>
                                            </li>

                                            <li class="social-icon-item">
                                                <a href="#" class="social-icon-link bi-pinterest"></a>
                                            </li>
                                        </ul>
                                    </div>


          </Link>
      </div>
      {/* ITEM */}
  </div>
</div>






</>
)



  
}