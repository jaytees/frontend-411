import React from 'react'
import LogOut from '../LogOut.js'
import axios from 'axios'

import styles from './Navbar.module.css'
import '../../Main.css'

const Navbar = (props) => {


  return(
      <div className={ styles.Navbar } style={ props.openState ? { width: '20vw' } : {width: '5vw'} }>

        <button onClick={ props.navOpen }>Nav</button>



        <LogOut />
      </div>
  )

}

export default Navbar;
