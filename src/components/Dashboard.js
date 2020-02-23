import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Dashboard = () => {
  const [user, setUser] = useState({
    username: '',
    email: ''
  });
  const history = useHistory();

  useEffect( () => {

    //check user is authenticated
    const token = localStorage.getItem('x-auth-header')
    if (token){
      // console.log('TOKEN FOUND!', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // setTokenHeaderSet( true );
    } else {

      history.push('/login');
    }

    let url = '';
    if (process.env.NODE_ENV !== 'production') {
      url = 'http://localhost:5000';
    }


    axios.get(`${url}/user/dashboard`, {
      headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
       'x-auth-header': token
     }})
    .then(res => {

      setUser({
        user: {
          username: res.data.username,
          email: res.data.email
      }})

    })
    .catch( err => console.warn(err))

  }, [] )




  return(
    <div className="dashboard-container">
        <h1>Dashboard</h1>

    </div>
  )
};

export default Dashboard;
