import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import {FIREBASE_PATH, SOLVE_TEST_PATH, TESTS_PATH} from "../../constants";

/**
 * This page is for displaying assigned tests for selected candidate.
 * @param props
 * @returns {*}
 * @constructor
 */
export const CandidateTestsPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [candidateTestArray, setCandidateTestArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  //TODO ADD AXIOS WITH REAL URL
  useEffect(() => {
    axios.get(FIREBASE_PATH + TESTS_PATH, {
      params: {
        'token': sessionStorage.getItem('token')
      }
    })
      .then((res) => {
        setCandidateTestArray(res.data);
        setIsLoaded(true);
      })
      .catch((err) => {
        setIsLoaded(true);
        alert(err.message)
      });
  }, []);

  const renderTestId = (id) => {
    return (
      <h6 className="font-weight-bold text-center my-2">
        Test Identifier: {id}
      </h6>
    );
  };

  const renderStartSolvingButton = () => {
    return (
      <div className="row justify-content-center mt-2 mb-3">
        <button className="btn btn-primary"
                onClick={() => document.location.replace(SOLVE_TEST_PATH)}>
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
          {renderStartSolvingButton()}
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
    