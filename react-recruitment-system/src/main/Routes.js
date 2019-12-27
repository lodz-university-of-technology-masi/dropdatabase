import React, {useContext} from "react";
import {Route, Switch} from "react-router-dom";
import {
  CANDIDATE_LIST_PATH,
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
import CandidateListPage from "../page/candidate-list-page/CandidateListPage";
import {AppContext} from "./App";

export const Routes = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  const renderPrivateRoutes = (isUserLoggedIn, isRecruiter) => {
    if (isUserLoggedIn && isRecruiter) {
      return (
        <>
          <Route exact path={HOME_PATH} component={DisplayTest}/>
          <Route exact path={UPDATE_TEST_PATH} component={UpdateTest}/>
          <Route exact path={CREATE_TEST_PATH} component={CreateTest}/>
          <Route exact path={REGISTER_PATH} component={RegisterPage}/>
          <Route exact path={PROFILE_PATH} component={ProfilePage}/>
          <Route exact path={CANDIDATE_LIST_PATH} component={CandidateListPage}/>
        </>
      )
    } else if (isUserLoggedIn && !isRecruiter) {
      //TODO CHANGE COMPONENT IN HOME_PATH
      return (
        <>
          <Route exact path={HOME_PATH} component={DisplayTest}/>
          <Route exact path={PROFILE_PATH} component={ProfilePage}/>
        </>
      );
    } else {
      return (
        <Route exact path={LOGIN_PATH} component={LoginPage}/>
      );
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <Switch>
      {renderPrivateRoutes(state.isUserLoggedIn, Boolean(Number(state.userAccountType)))}
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
