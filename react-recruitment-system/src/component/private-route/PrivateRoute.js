import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {Redirect, Route} from "react-router-dom";
import {LOGIN_PATH} from "../../constants";
import {AppContext} from "../../main/App";

export const PrivateRoute = ({component: Component, ...rest}) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <Route{...rest} render={(props) => (
      state.isUserLoggedIn ? <Component {...props} /> : <Redirect to={LOGIN_PATH}/>
    )}
    />
  );
};

export default PrivateRoute;
    