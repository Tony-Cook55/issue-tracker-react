import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// LETS US CHANGE PAGES
import {  BrowserRouter } from "react-router-dom"


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* BrowserRouter Allows for the use of page change */}
      <BrowserRouter>
          {/* This is App.jsx */}
          <App />
      </BrowserRouter>
  </React.StrictMode>,
)
