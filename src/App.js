import React, { useState, useEffect } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import './Main.css'
import Navbar from './components/Navbar/Navbar'

import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './components/LogOut'

import Dashboard from './views/Dashboard/Dashboard';
import Setup from './views/Setup';
import Profile from './views/Profile/Profile';


function App() {
  const [user, setUser] = useState({ username: '',
            email: '',
            preferences: [] });
  const [userFeeds, setUserFeeds] = useState([]);

  const [open, setOpen] = useState(false)
  const history = useHistory();


  const navControl = () => {
    open ? setOpen( false ) : setOpen(true)
  }


  useEffect( () => {

    //check user is authenticated
    const token = localStorage.getItem('x-auth-header');
    if (token){

      axios.defaults.headers.common['x-auth-header'] = token ;

    } else {

      history.push('/login');
    }

      let url = '';
    if (process.env.NODE_ENV !== 'production') {
      url = 'http://localhost:5000';
    }


    axios.get(`${url}/user/dashboard`)
    .then(res => {

      const user = {
          username: res.data.username,
          email: res.data.email,
          preferences: res.data.preferences
      }

      const feeds = [];
      res.data.preferences.forEach( pref => {

        pref.categories.forEach( cat => {
          feeds.push({
            label: cat.category_name, 
            outlet_name: pref.outlet_name,
            endpoint: cat.category_url,
            visible: true
          });
        }) // categories.forEach

      }); // preferences.forEach

      setUserFeeds( feeds )
      setUser( user )

    })
    .catch( err => console.warn(err))

  }, [] ) //useEffect


  const onFeedItemClick = (outlet, category) => {
    const itemIndex = userFeeds.findIndex( f => f.outlet_name === outlet && f.label === category );

    const feedsCopy = [...userFeeds];
    feedsCopy[itemIndex].visible = !feedsCopy[itemIndex].visible;
    setUserFeeds( feedsCopy );

  };


  const submitNewPreferences = ( outlet, updates ) => {
    console.log('from submit new', updates );

    const userOutlet = user.preferences.find( o => o.outlet_name === outlet);
    console.log( userOutlet );

    const categoriesCopy = [...userOutlet.categories, ...updates];
    console.log( categoriesCopy );

  }


  return (
    <div className="App" style={ open ? { backgroundColor: 'rgba(0,0,0,0.1)'} : { backgroundColor: 'white' }}>

      <Navbar navOpen={ navControl } openState={ open } userData={ user } feedSelectionHandler={ onFeedItemClick }/>


        <div className="main" style={ open ? { marginLeft: '20vw' } : {marginLeft: '5vw'} }>

          <Switch>
              <Route exact path='/signup' component={ SignUp }/>
              <Route exact path='/login' component={ Login }/>



              <Route exact path='/profile/setup' component={ Setup }/>
              <Route exact path='/profile' render={( props ) =>
              ( <Profile {...props} handleNewPreferences={ submitNewPreferences }/> )}
            />



              <Route exact path='/dashboard'
                render={( props ) =>
                ( <Dashboard {...props} userFeedData={ userFeeds }/> )}
              />

          </Switch>
        </div>

    </div>
  );
}

export default App;
