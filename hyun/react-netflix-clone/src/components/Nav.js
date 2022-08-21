import React from 'react'
import { useState,useEffect } from 'react'

import "./Nav.css";

function Nav() {
const [show, setShow] = useState(false);

useEffect(() => {
  window.addEventListener("scroll",()=>{
      console.log(window.scrollY);
      if(window.scrollY>50){
        setShow(true);
      } else {
        setShow(false);
      }
  })

  return () => {
    window.removeEventListener("scroll",()=>{})
  }
}, [])


  return (
    <div className={`nav ${ show && "nav__black"}`}>
        <img
         alt="netflix logo"
         src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png"
         className="nav__logo"
         onClick={()=>window.location.reload()}
        />
        <img
         alt="User Logged"
         src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
         className="nav__avatar"
        />
    </div>
  )
}

export default Nav