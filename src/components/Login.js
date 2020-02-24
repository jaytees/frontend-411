import React, { useState, useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [user, setUser] = useReducer(
    (state, newState) => ({...state, ...newState}),
    {
      username: '',
      password: ''
    }
  );
  const [errors, setErrors] = useState([]);
  const history = useHistory();

  const handleChange = (event) => {
    const key = event.target.name;
    const newValue = event.target.value;

    setUser({[key]: newValue})
  }

  const handleSubmit = (event) => {
      event.preventDefault();

      let url = '';
    if (process.env.NODE_ENV !== 'production') {
      url = 'http://localhost:5000';
    }

    // console.log('url', url);
      axios.post( `${url}/user/login`, {
        user,
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        }
      })
      .then( res => {
        // console.log( res );
        if (res.data.token) {

          localStorage.setItem('x-auth-header', res.data.token);
          // localStorage.setItem('userId', res.data.user.id);
          axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
          // props.loginMessage( true, res.data.user.name )

          history.push('/dashboard');

          // console.log('success', res);

        } else {

            setErrors(res.data.failure)
            // console.log(error)

        }
      })
      .catch( err => {
        console.warn( err );
      } );

      setUser({
        username: '',
        password: ''
      })


      // props.loginDisplay()
    }


  return(
    <div className="Login">

        <form onSubmit={handleSubmit}>
            <div className="field">
                <label>Username:</label>
                <br/>
                <input value={user.username} onChange={handleChange} type="text" name="username" placeholder="username"/>
            </div>
            <br/>

            <div className="field">
                <label>Password:</label>
                <br/>
                <input value={user.password} onChange={handleChange} type="password" name="password" placeholder="password"/>
            </div>
            <br/>

            <button className="formButton" type="submit">Submit</button>
        </form>
    </div>

  )
}

export default Login;
