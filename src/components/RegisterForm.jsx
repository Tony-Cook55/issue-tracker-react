
// This disables the stupid linter so we don't need props
/* eslint-disable */



// ******************* IMPORTS ******************* //


// Calls In Bootstrap for colors and things
import "bootstrap/dist/css/bootstrap.min.css"

// This is technical things like navbar
import "bootstrap/dist/js/bootstrap.min.js"

// CSS
import './componentsCSS/RegisterForm.css'


import React, { useState } from 'react';


// ******************* IMPORTS ******************* //



export default function RegisterForm(){

  return(
    <>
{/* Section: Design Block */}
<section className="scale-in-center">
  {/* Jumbotron --> */}
  <div className="px-4 py-5 px-md-5 text-center text-lg-start">
    <div className="container">
      <div className="row gx-lg-5 align-items-center">
        <div className="col-lg-6 mb-5 mb-lg-0">
          <h1 className="my-5 display-3 fw-bold">
            Register To Report Your Very Own 
            <span className="text-primary"> Bugs</span>
          </h1>
          <p >
            Register with your Email, Password, Full, Given, and Family name. 
          </p>
        </div>

        {/* This div sets the users form to be small and to the right */}
        <div className="col-lg-6 mb-5 mb-lg-0">
          <div className="card">
            <div className="card-body py-5 px-md-5">
              <form>


                {/* Full Name */}
                <div className="form-outline mb-4">
                  <input type="text" id="fullName" className="form-control" required/>
                  <label className="form-label" htmlFor="fullName">Full Name</label>
                </div>


                {/* 2 column grid layout with text inputs for the Given and Family names --> */}
                <div className="row">
                  <div className="col-md-6 mb-6">
                    <div className="form-outline">
                      <input type="text" id="givenName" className="form-control" />
                      <label className="form-label" htmlFor="givenName">Given name</label>
                    </div>
                  </div>
                  <div className="col-md-6 mb-4">
                    <div className="form-outline">
                      <input type="text" id="familyName" className="form-control" />
                      <label className="form-label" htmlFor="familyName">Family name</label>
                    </div>
                  </div>
                </div>


                {/* Email input --> */}
                <div className="form-outline mb-4">
                  <input type="email" id="email" className="form-control" />
                  <label className="form-label" htmlFor="email">Email address</label>
                </div>


                {/* Password input --> */}
                <div className="form-outline mb-4">
                  <input type="password" id="password" className="form-control" />
                  <label className="form-label" htmlFor="password">Password</label>
                </div>


                {/* Submit button --> */}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block mb-5 ">
                    Register
                  </button>
                </div>

                {/* GO TO LOGIN FORM BUTTON */}
                <div className="text-center">
                  <a className="link mt-4" href="/LoginForm" >
                    Login
                  </a>
                </div>
                {/* GO TO LOGIN FORM BUTTON */} 

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Jumbotron --> */}
</section>
{/* Section: Design Block --> */}
    </>
  ) // end of return






} // end of export