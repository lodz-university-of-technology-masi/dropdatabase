import React from "react";
import {Route, Switch} from "react-router-dom";
import {CREATE_TEST_PATH, HOME_PATH, UPDATE_TEST_PATH} from "../constants";
import CreateTest from "../page/create-test/CreateTest";
import DisplayTest from "../page/display-test/DisplayTest";
import UpdateTest from "../page/update-test/UpdateTest";
import NotFound from "../page/not-found/NotFound";

export const Routes = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <Switch>
      <Route exact path={HOME_PATH} component={DisplayTest}/>
      <Route exact path={CREATE_TEST_PATH} component={CreateTest}/>
      <Route exact path={UPDATE_TEST_PATH} component={UpdateTest}/>
      <Route component={NotFound}/>
    </Switch>
  );
};

export default Routes;
