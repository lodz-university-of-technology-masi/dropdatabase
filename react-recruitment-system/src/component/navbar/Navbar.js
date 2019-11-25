import React from "react";
import {Link} from "react-router-dom";
import {CREATE_TEST_PATH, DELETE_TEST_PATH, HOME_PATH, UPDATE_TEST_PATH} from "../../constants";

export const Navbar = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <nav className="navbar navbar-expand-lg navbar-dark mdb-color">
      <Link to={HOME_PATH} className="navbar-brand">
        {props.msg}
      </Link>

      <button className="navbar-toggler" type="button" data-toggle="collapse"
              data-target="#navList" aria-controls="navList"
              aria-expanded="false" aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"/>
      </button>

      <div className="collapse navbar-collapse" id="navList">
        <ul className="navbar-nav ml-auto">

          <li className="nav-item">
            <Link to={CREATE_TEST_PATH} className="nav-link">
              Create Test
            </Link>
          </li>

      {/*<li className="nav-item">
            <Link to={UPDATE_TEST_PATH} className="nav-link">
              Update Test
            </Link>
          </li>

          <li className="nav-item">
            <Link to={DELETE_TEST_PATH} className="nav-link">
              Delete Test
            </Link>
          </li>*/}

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
