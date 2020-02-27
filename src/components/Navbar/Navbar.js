import React, { useEffect } from 'react'
import LogOut from '../LogOut.js'
import { Link } from 'react-router-dom'

import styles from './Navbar.module.css'
import '../../Main.css'

const Navbar = (props) => {

  // console.log(props.userData)


  return(
      <div className={ styles.Navbar } style={ props.openState ? { width: '20vw' } : {width: '5vw'} }>

        <button onClick={ props.navOpen }>Nav</button>
        <Link to='/profile'><button>Profile</button></Link>
        <Link to='/dashboard'><button>Dashboard</button></Link>

          {
            props.userData
            ?


            Object.keys(props.userData.preferences).map( outlet => {
                  console.log(outlet);
                return (
                  <div>

                  <div key={outlet}>{outlet}</div>
                    {
                      Object.keys(props.userData.preferences[outlet]).map( category => {
                          console.log(category);
                        return(
                          <div>
                            <div onClick={ () => props.feedSelectionHandler( outlet,  category) } key={ category  }>{category }</div>
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


// props.userData.preferences.map( p => {
//     return (
//       <div>
//       <div key={p.outlet_name}>{p.outlet_name}</div>
//       {
//         p.categories.map( c => {
//           return(
//             <div>
//               <div onClick={ () => props.feedSelectionHandler( p.outlet_name,  c.category_name) } key={ c.category_name }>{c.category_name}</div>
//             </div>
//
//           )
//         })
//       }
//       </div>
//     )
//   })
