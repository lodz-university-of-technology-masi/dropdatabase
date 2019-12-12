import React, {useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Routes from "./Routes";
import _ from 'lodash'
import {UPDATE_INPUT, UPDATE_LOGGED_IN} from "../constants";

export const App = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const initialState = {
    testToBeChanged: '',
    testToBeChangedOrig: '',
    isUserLoggedIn: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case UPDATE_INPUT:
        return {
          testToBeChanged: action.test,
          testToBeChangedOrig: _.cloneDeep(action.test),
        };

      case UPDATE_LOGGED_IN:
        return {
          isUserLoggedIn: action.isLogged,
        };

      default:
        return initialState;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <AppContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar msg={"Recruitment System"}/>
        <Routes/>
      </BrowserRouter>
    </AppContext.Provider>
  );
};

// Create context object
export const AppContext = React.createContext();
export default App;
