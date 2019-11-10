import React, {Component} from "react";
import {Route, Switch} from "react-router-dom";
import {
  CREATE_TEST_PATH,
  DELETE_TEST_PATH,
  DISPLAY_TEST_PATH,
  HOME_PATH,
  UPDATE_TEST_PATH
} from "../constants";
import CreateTest from "../page/create-test/CreateTest";
import Home from "../page/home/Home";
import DeleteTest from "../page/delete-test/DeleteTest";
import DisplayTest from "../page/display-test/DisplayTest";
import UpdateTest from "../page/update-test/UpdateTest";

export class Routes extends Component {

  /*------------------------ FIELDS REGION ------------------------*/

  /*------------------------ METHODS REGION ------------------------*/
  render() {
    return (
      <Switch>
        <Route exact path={HOME_PATH} component={Home}/>
        <Route exact path={CREATE_TEST_PATH} component={CreateTest}/>
        <Route exact path={DELETE_TEST_PATH} component={DeleteTest}/>
        <Route exact path={DISPLAY_TEST_PATH} component={DisplayTest}/>
        <Route exact path={UPDATE_TEST_PATH} component={UpdateTest}/>
      </Switch>
    );
  }
}

export default Routes;
    
