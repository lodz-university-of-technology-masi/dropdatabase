import React, {useContext} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
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
import {CreateTestPage} from "../page/create-test-page/CreateTestPage";
import PrivateRoute from "../component/private-route/PrivateRoute";
import CandidateTestsPage from "../page/candidate-tests-page/CandidateTestsPage";

export const Routes = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  const renderPrivateRoutes = (isUserLoggedIn, isRecruiter) => {
    if (isUserLoggedIn && isRecruiter) {
      return (
        <>
          <PrivateRoute exact path={HOME_PATH} component={DisplayTestPage}/>
          <PrivateRoute exact path={UPDATE_TEST_PATH} component={UpdateTestPage}/>
          <PrivateRoute exact path={CREATE_TEST_PATH} component={CreateTestPage}/>
          <PrivateRoute exact path={REGISTER_PATH} component={RegisterPage}/>
          <PrivateRoute exact path={PROFILE_PATH} component={ProfilePage}/>
          <PrivateRoute exact path={CANDIDATE_LIST_PATH} component={CandidateListPage}/>
        </>
      )
    } else if (isUserLoggedIn && !isRecruiter) {
      return (
        <>
          <PrivateRoute exact path={HOME_PATH} component={CandidateTestsPage}/>
          <PrivateRoute exact path={PROFILE_PATH} component={ProfilePage}/>
        </>
      );
    } else {
      return (
        <>
          <PrivateRoute exact path={HOME_PATH} component={DisplayTestPage}/>
          <Route exact path={LOGIN_PATH} component={LoginPage}/>
          <Redirect to={LOGIN_PATH}/>
        </>
      );
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <Switch>
      {renderPrivateRoutes(state.isUserLoggedIn, Boolean(Number(state.userAccountType)))}
    </Switch>
  );
};

export default Routes;
