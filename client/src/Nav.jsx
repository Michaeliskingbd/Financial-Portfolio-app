import React from 'react'
import avatar from "./ascot1.png"

const Nav = () => {
  return (
    <nav>
           <h1>WealthFront</h1>
           <div className='nav-picture'>
          <img src={avatar} alt='pp'/>
        </div>
    </nav>
  )
}

export default Nav