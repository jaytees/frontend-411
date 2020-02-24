import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';

const LogOut = () => {
  let history = useHistory()

  const logOutSubmit = () =>{

    localStorage.removeItem('x-auth-header');
    delete axios.defaults.headers.common['Authorization'];
    // props.logOutMessage( false, 'Please login or sign up' );

    history.push('/signup')

  }

  return(
    <button onClick={logOutSubmit} id="logOut-link">Log Out</button>
  )

}

export default LogOut
