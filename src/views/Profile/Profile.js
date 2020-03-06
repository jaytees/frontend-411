import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import styles from './Profile.module.css'
import OutletViewer from '../../components/OutletViewer/OutletViewer'

const Profile = ( props ) => {
  const [outlets, setOutlets] = useState([]);
  const history = useHistory();

  //check user is logged in
  //refactor as used everytime
  const checkUserStatus = () => {

    const token = localStorage.getItem('x-auth-header');
    if (token){

      axios.defaults.headers.common['x-auth-header'] = token ;

    } else {

      history.push('/login');
    }

  };

  checkUserStatus();


  useEffect( () => {
    let mounted = true;
    let url = process.env.REACT_APP_API;

    axios.get(`${url}/outlet/index`)
      .then( res => {

        if (mounted) {
          setOutlets(res.data)
        }
        
      })
      .catch( err => console.warn( err ))

      return () => mounted = false;
  }, [])


  return(
    <div>
      <h1>Profile</h1>

      {
        outlets.length > 0
        ?
        <div className={ styles.outletsContainer }>
          {
            outlets.map( outlet => {
              return (
                <OutletViewer outletInfo={ outlet } handleSelection={ props.handleSelection } key={ outlet.outlet_name }/>
              )
            })
          }
        </div>
        :
        <p>Loading</p>
      }
    </div>

  )

};

export default Profile;

// when i was passing the selections back to profile
// <OutletViewer outletInfo={ outlet } submitSelections={ handleSubmit }/>


// const handleSubmit = ( outlet, selections ) => {
//     console.log('handleSubmit', outlet, selections);
//
//   const outletMatch = outlets.find( o => o.outlet_name === outlet);
//   console.log(outletMatch);
//
//   let categoryMatch = [];
//
//   for (let i = 0; i < selections.length; i++) {
//
//     categoryMatch.push(outletMatch.categories.find( c => c.category_name === selections[i] ))
//
//   };
//
//   console.log( categoryMatch );  //works
//
//   props.handleNewPreferences( outlet, categoryMatch )
//
// } //handleSubmit
