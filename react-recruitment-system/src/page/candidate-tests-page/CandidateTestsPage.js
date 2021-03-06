import React, {Fragment, useContext, useEffect, useState} from "react";
import axios from "axios";
import {
  CANDIDATE_API,
  FIREBASE_PATH,
  SOLVE_TEST_PATH,
  START_SOLVING_TEST,
  TESTS_PATH,
  UPDATE_INPUT
} from "../../constants";
import {AppContext} from "../../main/App";

/**
 * This page is for displaying assigned tests for selected candidate.
 * @param props
 * @returns {*}
 * @constructor
 */
export const CandidateTestsPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);
  const [candidateTestArray, setCandidateTestArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //TODO ADD AXIOS WITH REAL URL

  useEffect(() => {
    axios.get( "https://lwn1nhn8s4.execute-api.us-east-1.amazonaws.com/cc_candidates/myself", {
      params: {
        'token': sessionStorage.getItem('token')
      }
    })
      .then((res) => {
        console.log(res)
        setCandidateTestArray(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
        alert(err.message)
      });
  }, []);

  const handleStartSolvingButton = (it) => {
    dispatch({
      type: START_SOLVING_TEST,
      test: it,
    });
    sessionStorage.setItem('selectedTestToSolve', JSON.stringify(it));

    //TODO Tutaj jest wszystko ok bo sie dobrze obiekt wyswietla
    console.log(it);

    document.location.replace(SOLVE_TEST_PATH);
  };

  const renderTestId = (id) => {
    return (
      <h6 className="font-weight-bold text-center my-2">
        Test Identifier: {id}
      </h6>
    );
  };

  const renderStartSolvingButton = (it) => {
    return (
      <div className="row justify-content-center mt-2 mb-3">
        <button className="btn btn-primary"
                onClick={() => handleStartSolvingButton(it)}>
          Start Solving Test
        </button>
      </div>
    );
  };

  const renderTestPanel = (it, index) => {
    return (
      <Fragment key={index}>
        <section className="card container black-text my-5">
          <header className="card-header text-center">
            <h5 className="font-weight-bold black-text mb-1">Test</h5>
          </header>

          {renderTestId(it.testUUID)}
            <div>Recruter name: {it.user.userName}</div>
          {renderStartSolvingButton(it)}
        </section>
      </Fragment>
    );
  };

  /*------------------------ RETURN REGION ------------------------*/
  if (isLoaded) {
    return (
      candidateTestArray.map((it, index) => {
        return renderTestPanel(it, index);
      })
    );
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

export default CandidateTestsPage;
    