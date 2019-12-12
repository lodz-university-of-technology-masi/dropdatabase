import React from "react";
import {Route, Switch} from "react-router-dom";
import {
  CREATE_TEST_PATH,
  HOME_PATH,
  LOGIN_PATH,
  PROFILE_PATH,
  REGISTER_PATH,
  UPDATE_TEST_PATH
} from "../constants";
import CreateTest from "../page/create-test/CreateTest";
import DisplayTest from "../page/display-test/DisplayTest";
import UpdateTest from "../page/update-test/UpdateTest";
import NotFound from "../page/not-found/NotFound";
import LoginPage from "../page/login-page/LoginPage";
import ProfilePage from "../page/profile-page/ProfilePage";
import RegisterPage from "../page/register-page/RegisterPage";
import PrivateRoute from "../component/private-route/PrivateRoute";

export const Routes = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <Switch>
      <PrivateRoute exact path={HOME_PATH} component={DisplayTest}/>
      <PrivateRoute exact path={CREATE_TEST_PATH} component={CreateTest}/>
      <PrivateRoute exact path={UPDATE_TEST_PATH} component={UpdateTest}/>
      <PrivateRoute exact path={REGISTER_PATH} component={RegisterPage}/>
      <PrivateRoute exact path={PROFILE_PATH} component={ProfilePage}/>

      <Route exact path={LOGIN_PATH} component={LoginPage}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
