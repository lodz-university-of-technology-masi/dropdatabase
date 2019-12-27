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
import {AppContext} from "./App";
import LoginPage from "../page/login-page/LoginPage";
import ProfilePage from "../page/profile-page/ProfilePage";
import RegisterPage from "../page/register-page/RegisterPage";
import CandidateListPage from "../page/candidate-list-page/CandidateListPage";
import DisplayTestPage from "../page/display-test-page/DisplayTestPage";
import UpdateTestPage from "../page/update-test-page/UpdateTestPage";
import {NotFoundPage} from "../page/not-found-page/NotFoundPage";
import {CreateTestPage} from "../page/create-test-page/CreateTestPage";

export const Routes = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  const renderPrivateRoutes = (isUserLoggedIn, isRecruiter) => {
    if (isUserLoggedIn && isRecruiter) {
      return (
        <>
          <Route exact path={HOME_PATH} component={DisplayTestPage}/>
          <Route exact path={UPDATE_TEST_PATH} component={UpdateTestPage}/>
          <Route exact path={CREATE_TEST_PATH} component={CreateTestPage}/>
          <Route exact path={REGISTER_PATH} component={RegisterPage}/>
          <Route exact path={PROFILE_PATH} component={ProfilePage}/>
          <Route exact path={CANDIDATE_LIST_PATH} component={CandidateListPage}/>
        </>
      )
    } else if (isUserLoggedIn && !isRecruiter) {
      //TODO CHANGE COMPONENT IN HOME_PATH
      return (
        <>
          <Route exact path={HOME_PATH} component={DisplayTestPage}/>
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
      <Route component={NotFoundPage}/>
    </Switch>
  );
};

export default Routes;
