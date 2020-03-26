import React, { useState, useReducer } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const SignUp = props => {
  const [user, setUser] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      username: "",
      email: "",
      password: ""
    }
  );
  const history = useHistory();
  const [errors, setErrors] = useState([]);

  const handleChange = event => {
    const key = event.target.name;
    const newValue = event.target.value;

    setUser({ [key]: newValue });
  };

  const handleSubmit = event => {
    event.preventDefault();

    let url = process.env.REACT_APP_API;

    axios
      .post(`${url}/user/signup`, {
        user,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res);
        if (res.data.token) {
          localStorage.setItem("x-auth-header", res.data.token);
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.jwt}`;

          // props.messageCreator( true, res.data.user.username )

          history.push("/profile/setup");
        } else {
          setErrors([res.data.msg]);
        }
      })
      .catch(err => console.log("catch error", err));
  }; //handleSubmit

  return (
    <div className="formContainer">
      <h2 className="formTitle">Sign up</h2>
      {errors && (
        <div id="signup-errors">
          <ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Username:</label>
          <br />
          <input
            value={user.username}
            onChange={handleChange}
            type="text"
            name="username"
            placeholder="username"
          />
        </div>
        <br />

        <div className="field">
          <label>Email:</label>
          <br />
          <input
            value={user.email}
            onChange={handleChange}
            type="text"
            name="email"
            placeholder="email"
          />
        </div>
        <br />

        <div className="field">
          <label>Password:</label>
          <br />
          <input
            value={user.password}
            onChange={handleChange}
            type="password"
            name="password"
            placeholder="password"
            autoComplete="on"
          />
        </div>
        <br />

        <button className="formButton" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignUp;
