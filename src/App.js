import React, { useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './Main.css'
import Navbar from './components/Navbar/Navbar'

import SignUp from './components/SignUp';
import Login from './components/Login';
import LogOut from './components/LogOut'

import Dashboard from './views/Dashboard/Dashboard';
import Setup from './views/Setup';


function App() {
  const [open, setOpen] = useState(false)

  const navControl = () => {
    open ? setOpen( false ) : setOpen(true)
  }

  /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
  // const closeNav = () => {
  //   setOpen(false);
  // }


  return (
    <div className="App" style={ open ? { backgroundColor: 'rgba(0,0,0,0.1)'} : { backgroundColor: 'white' }}>

      <Navbar navOpen={ navControl } openState={ open }/>


        <div className="main" style={ open ? { marginLeft: '20vw' } : {marginLeft: '5vw'} }>

          <Switch>
              <Route exact path='/signup' component={ SignUp }/>
              <Route exact path='/login' component={ Login }/>

              <Route exact path='/profile/setup' component={ Setup }/>
              <Route exact path='/dashboard' component={ Dashboard }/>

          </Switch>
        </div>

    </div>
  );
}

export default App;
