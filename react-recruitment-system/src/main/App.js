import React, {useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Routes from "./Routes";
import _ from 'lodash'

export const App = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const initialState = {
    testToBeChanged: '',
    testToBeChangedOrig: '',
    isUserLoggedIn: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case 'UPDATE_INPUT':
        return {
          testToBeChanged: action.test,
          testToBeChangedOrig: _.cloneDeep(action.test),
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
