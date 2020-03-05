import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Login from '../components/Login';
import SignUp from '../components/SignUp';

import styles from './Home.module.css';

const Home = () => {
  const [form, setForm] = useState('')


  const handleToggle = ( formID ) => {
    console.log('toggle', formID);

    if (formID === 'login') {
      setForm('login')
    } else {
      setForm('signup')
    }
  }

  useEffect( () => {

    // let url = '';
    // if (process.env.NODE_ENV !== 'production') {
    //   url = 'http://localhost:5000';
    // } else {
    //   url = 'https://slug-news.herokuapp.com';
    // }


    axios.get('https://slug-news.herokuapp.com/user/all')
      .then( res => {
        console.log(res);
      })
      .catch( err => console.warn(err) )

  }, [])


  return(
    <div className={ styles.container }>
      <h1>Welcome.</h1>

      <div className={styles.formContainer}>
        <div className={styles.formSelectors}>
            <div  className={styles.btn}><p onClick={ () => handleToggle('login') }>Login</p></div>
            <div onClick={ () => handleToggle('signup') } className={styles.btn}><p>Sign Up</p></div>
        </div>

        <div style={ (form === 'login') ? { display: 'block' } : { display: 'none' }}><Login /></div>

        <div style={ (form === 'signup') ? { display: 'block' } : { display: 'none' }}><SignUp /></div>



      </div>


    </div>
  )

};

export default Home;
