import React, {useContext} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {CREATE_TEST_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH} from "../../constants";
import {AppContext} from "../../main/App";

export const Navbar = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  /**
   * Render single nav item
   * @param path - path to the page
   * @param value - text to display in nav item
   * @param isLogout - if true then value in context isUserLoggedIn
   * is set to false - user is logout
   * @returns {*}
   */
  const renderNavItem = (path, value, isLogout) => {
    return (
      <li className="nav-item">
        <Link
          to={path}
          className="nav-link"
          onClick={isLogout ? props.handleLogout : null}
        >
          {value}
        </Link>
      </li>
    );
  };

  /**
   * If user is logged in then return CreateTestPage, if not return Login and Register
   * @param isUserLoggedIn - if true user is logged in
   * @returns {*}
   */
  const renderNavItemList = (isUserLoggedIn) => {
    if (isUserLoggedIn) {
      return (
        <>
          {renderNavItem(CREATE_TEST_PATH, "Create Test")}
          {renderNavItem(LOGIN_PATH, "Logout", true)}
        </>
      );
    } else {
      return (
        <>
          {renderNavItem(LOGIN_PATH, "Login")}
          {renderNavItem(REGISTER_PATH, "Register")}
        </>
      )
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mdb-color">
      <Link to={HOME_PATH} className="navbar-brand">
        {props.msg}
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navList" aria-controls="navList"
              aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse" id="navList">
        <ul className="navbar-nav ml-auto">
          {renderNavItemList(state.isUserLoggedIn)}
        </ul>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  handleLogout: PropTypes.func,
};

export default Navbar;
