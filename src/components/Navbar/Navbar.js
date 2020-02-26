import React, { useEffect } from 'react'
import LogOut from '../LogOut.js'

import styles from './Navbar.module.css'
import '../../Main.css'

const Navbar = (props) => {


  return(
      <div className={ styles.Navbar } style={ props.openState ? { width: '20vw' } : {width: '5vw'} }>

        <button onClick={ props.navOpen }>Nav</button>

          {
            props.userData
            ?
            props.userData.preferences.map( p => {
                return (
                  <div>
                  <div key={p.outlet_name}>{p.outlet_name}</div>
                  {
                    p.categories.map( c => {
                      return(
                        <div>
                          <div onClick={ () => props.feedSelectionHandler( p.outlet_name,  c.category_name) } key={ c.category_name }>{c.category_name}</div>
                        </div>

                      )
                    })
                  }
                  </div>
                )
              })
            :
            <div>Loading...</div>
          }

        <LogOut />
      </div>
  )

}

export default Navbar;
