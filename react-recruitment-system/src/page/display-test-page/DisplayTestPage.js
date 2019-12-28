import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import "./DisplayTestPage.css";
import {FIREBASE_PATH, TESTS_PATH} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import {AppContext} from "../../main/App";

/**
 * This page is for displaying, updating, deleting tests of selected recruiter,
 * it is available only for recruiter
 * @param props
 * @returns {[]|*}
 * @constructor
 */
export const DisplayTestPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);
  const [testArray, setTestArray] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(FIREBASE_PATH + TESTS_PATH, {
      params: {
        'token': sessionStorage.getItem('token')
      }
    })
      .then(res => {
        let temporaryArray = [];

        Array.from(res.data).forEach((it) => {
          if (state.username === it.user.userName) {
            temporaryArray.push(it);
          }
        });

        setTestArray(temporaryArray);
        setLoad(true);
      })
      .catch(err => {
        setError(err.message);
        setLoad(true);
      })
  }, []);

  /*------------------------ RETURN REGION ------------------------*/
  if (load) {
    let items = [];
    console.log(testArray)
    for (let test of testArray) {
      items.push(
        <DisplayQuestions
          questionArray={test.questions}
          testUUID={test.testUUID}
          key={test.testUUID}
          all={test}
        />
      );
    }

    return (items);
  } else {
    return (
      <div className="container margin-text text-center">
        <h2 className="font-weight-bold">
          Loading...
        </h2>
      </div>
    );
  }
};

export default DisplayTestPage;
