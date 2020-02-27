import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const LogOut = ( props ) => {
  let history = useHistory()

  const logOutSubmit = () =>{

    localStorage.removeItem('x-auth-header');
    delete axios.defaults.headers.common['Authorization'];
    // props.logOutMessage( false, 'Please login or sign up' );
    props.passHandleStatus( false );

    history.push('/')

  }

  return(
    <button onClick={logOutSubmit}>Log Out</button>
  )

}

export default LogOut
