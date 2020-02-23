import React from 'react';
import './App.css';
import { Route, Switch, Link } from 'react-router-dom';

import SignUp from './components/SignUp';
import Setup from './views/Setup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
        <Switch>
            <Route exact path='/signup' component={ SignUp }/>
            <Route exact path='/dashboard/setup' component={ Setup }/>
            <Route exact path='/login' component={ Login }/>

            <Route exact path='/dashboard' component={ Dashboard }/>

        </Switch>
    </div>
  );
}

export default App;
