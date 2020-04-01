import React from "react";
import LogOut from "../LogOut";
import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import "../../Main.css";

const Navbar = props => {
  return (
    <div
      className={styles.Navbar}
      style={props.openState ? { width: "20vw" } : { width: "min-content" }}
    >
      <div className={styles.logoContainer}>
        <img
          className={styles.icon}
          src={require("../../assets/slug-icon.png")}
          alt="slug logo"
        ></img>
      </div>
      <div className={styles.menuIconWrapper}>
        <div className={styles.menuIcon} onClick={props.navOpen}></div>
      </div>

      {localStorage.getItem("x-auth-header") !== null ? (
        <div>
          <div className={styles.nav__controls}>
            <Link to="/profile">
              <h4 className={styles.nav__links}>Profile</h4>
            </Link>
            <Link to="/dashboard">
              <h4 className={styles.nav__links}>Dashboard</h4>
            </Link>
          </div>
          {Object.keys(props.userData.preferences).map(outlet => {
            let outletID = outlet.split(" ").join("-");
            return (
              <ul key={outlet}>
                <li className={styles.outletName}>
                  <img
                    src={require(`../../assets/${outletID}.png`)}
                    id={styles.outletID}
                    className={styles.icon}
                    alt={outlet}
                  ></img>
                </li>
                {Object.keys(props.userData.preferences[outlet]).map(
                  (category, i) => {
                    return (
                      <ul key={category}>
                        <li
                          className={styles.category}
                          onClick={() =>
                            props.feedSelectionHandler(outlet, category)
                          }
                        >
                          <h4 className={styles.nav__links}>{category}</h4>
                        </li>
                      </ul>
                    );
                  }
                )}
              </ul>
            );
          })}
          <LogOut passHandleStatus={props.handleStatus} />
        </div>
      ) : (
        <div className={styles.nav__controls}>
          <Link to="/login">
            <h4 className={styles.nav__links}>Login</h4>
          </Link>
          <Link to="/signup">
            <h4 className={styles.nav__links}>Sign Up</h4>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
