import React, { useEffect } from 'react'
import LogOut from '../LogOut'
import Login from '../Login'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import '../../Main.css'

const Navbar = (props) => {



  return(
      <div className={ styles.Navbar } style={ props.openState ? { width: '20vw' } : {width: '5vw'} }>
        <div className={styles.logoContainer}>
          <img className={ styles.icon } src={require('../../assets/slug-icon.png')}></img>
        </div>
        <div className={ styles.menuIconWrapper }>
          <div className={ styles.menuIcon} onClick={ props.navOpen }></div>
        </div>

          {
          (localStorage.getItem('x-auth-header') !== null)
          ?
          <div>
            <Link to='/profile' ><button>Profile</button></Link>
            <Link to='/dashboard'><button>Dashboard</button></Link>
            <LogOut passHandleStatus={ props.handleStatus }/>
            {
              Object.keys(props.userData.preferences).map( outlet => {
                return (
                  <ul>

                    <li className={ styles.outletName }key={outlet}>{outlet}</li>
                    {
                      Object.keys(props.userData.preferences[outlet]).map( category => {

                        return(
                          <ul>
                            <li className={ styles.category }onClick={ () => props.feedSelectionHandler( outlet,  category) } key={ category  }>{category }</li>
                          </ul>
                        )
                      })
                    }
                  </ul>
                )
              })
            }
            </div>
            :
            <div>
              <Link to='/login'><button>Login</button></Link>
              <Link to='/signup'><button>Sign Up</button></Link>
            </div>
          }



      </div>
  )

}

export default Navbar;
