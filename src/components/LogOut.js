import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import styles from "./Navbar/Navbar.module.css";

const LogOut = props => {
  let history = useHistory();

  const logOutSubmit = () => {
    localStorage.removeItem("x-auth-header");
    delete axios.defaults.headers.common["Authorization"];
    // props.logOutMessage( false, 'Please login or sign up' );
    props.passHandleStatus(false);

    history.push("/");
  };

  return (
    <h4 className={styles.nav__links} onClick={logOutSubmit}>
      Log Out
    </h4>
  );
};

export default LogOut;
