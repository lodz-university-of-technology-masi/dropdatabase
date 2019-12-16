import React, {useEffect, useState} from "react";
import axios from "axios";
import "./DisplayTest.css";
import {FIREBASE_PATH, TESTS_PATH, USER_SESSION_ID} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";

export const DisplayTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
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
        setTestArray(res.data);
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

export default DisplayTest;
