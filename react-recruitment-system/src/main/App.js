import React, {useReducer} from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Routes from "./Routes";
import _ from 'lodash'
import {UPDATE_INPUT, UPDATE_LOGGED_IN, UPDATE_TOKEN} from "../constants";
import {Auth} from "aws-amplify";
import update from 'immutability-helper';

export const App = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const initialState = {
        testToBeChanged: '',
        testToBeChangedOrig: '',
        isUserLoggedIn: sessionStorage.getItem('isLoggedIn'), //TODO CHANGE TO FALSE
        USER_SESSION_ID: sessionStorage.getItem('token'),
    };

    function reducer(state, action) {
        switch (action.type) {
            case UPDATE_INPUT: {
                return update(state, {
                    testToBeChanged: {$set: action.test},
                    testToBeChangedOrig: {$set: _.cloneDeep(action.test)}
                });
            }

            case UPDATE_LOGGED_IN: {
                return update(state, {isUserLoggedIn: {$set: action.isLogged}});
            }

            case UPDATE_TOKEN: {
                return update(state, {USER_SESSION_ID: {$set: action.token}});
            }

            default:
                return initialState;
        }
    }

    const handleLogout = async () => {
        await Auth.signOut();
        dispatch({type: UPDATE_LOGGED_IN, isLogged: false});
        localStorage.setItem('isLoggedIn', false);
        localStorage.clear();
        sessionStorage.clear();
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <AppContext.Provider value={{state, dispatch}}>
            <BrowserRouter>
                <Navbar handleLogout={handleLogout} msg={"Recruitment System"}/>
                <Routes/>
            </BrowserRouter>
        </AppContext.Provider>
    );
};

// Create context object
export const AppContext = React.createContext();
export default App;
