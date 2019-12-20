import React, {useContext} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Link} from "react-router-dom";
import {FIREBASE_PATH, UPDATE_INPUT, UPDATE_TEST} from "../../constants";

import {AppContext} from '../../main/App'

export const DisplayQuestions = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);

  const renderDeleteTestButton = (it) => {
    return (
      <div className="row right mb-4">
        <button className="btn btn-danger white-text"
                onClick={() => {
                  handleDeleteTest(it)
                }}>
          Delete Test
        </button>
      </div>
    );
  };

  const renderTestId = (id) => {
    return (
      <h6 className="font-weight-bold text-center mb-1">
        Test Identifier: {id}
      </h6>
    );
  };

  const renderWholeQuestion = (it, index) => {
    let items = [];
    if (!it.isOpen) {
      Object.keys(it).map((it2, index) => {
        if (it2.includes("answer")) {
          if (it.correct && it.correct.includes(it2[it2.length - 1])) {
            items.push(
              <li className="list-group-item green" key={index}>
                {it2}: {it[it2]}
              </li>
            );
          } else {
            items.push(
              <li className="list-group-item" key={index}>
                {it2}: {it[it2]}
              </li>
            );
          }
        }
      });

      return (
        <ul className="list-group list-group-flush mt-3 card">
          <h4 className="text-center">
            Question: {it.questionContent}
          </h4>{items}
        </ul>
      );
    } else {
      return (
        <ul className="list-group list-group-flush mt-3 card">
          <h4 className="text-center">
            Question: {it.questionContent}
          </h4>
          <li className="list-group-item">
            Anwser: {it.questionAnswer}
          </li>
        </ul>
      );
    }

    return (
      <li className="list-group-item" key={index}>
        {JSON.stringify(it)}
      </li>
    );
  };

  const renderPartQuestion = (it, index) => {
    return (
      <li className="list-group-item" key={index}>
        {it.questionContent}
        {renderDeleteQuestionButton(index)}
      </li>
    );
  };
  const handleDeleteTest = (e) => {
    let test = {
      "user": {
        "userToken": sessionStorage.getItem('token')
      },
      "testUUID": e.testUUID,
      "questions": e.questions
    };

    axios.delete(FIREBASE_PATH + "/test", {
      headers: {
        'Content-Type': 'application/json'
      },
      data: test
    }).then(() => {
      alert("Test has been deleted");
      window.location.reload()
    }).catch((error) => console.log(error));
  };
  const renderDeleteQuestionButton = (index) => {
    return (
      <button className="btn btn-danger white-text float-right"
              onClick={() => props.handleDeleteQuestion(index)}>
        Delete
      </button>
    );
  };

  const renderCreateTestButton = () => {
    return (
      <div className="row justify-content-center my-3">
        <button className="btn btn-primary" onClick={props.postTestToServer}>
          Create Test
        </button>
      </div>
    );
  };

  const handleChangeTest = (e) => {
    let test = {
      "user": {
        "userToken": sessionStorage.getItem('token')
      },
      "testUUID": e.testUUID,
      "questions": e.questions
    };

    const test_orig = test;

    dispatch({type: UPDATE_INPUT, test: test});
  };
  const renderChangeTestButton = (it) => {
    return (
      <div className="row justify-content-center my-3">
        <Link to={UPDATE_TEST} className="nav-link">

          <button className="btn btn-primary" onClick={() => {
            handleChangeTest(it)
          }}>
            Change Test
          </button>
        </Link>
      </div>
    );
  };
  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <section className="card container my-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-1">Questions in the Test</h5>
        </header>

        {!props.noDelete ? renderDeleteTestButton(props.all) : null}

        {props.isChangeable ? null : renderTestId(props.testUUID)}

        <ul className="list-group list-group-flush mt-3">
          {
            props.questionArray.map((it, index) => {
              return (
                props.isChangeable ? renderPartQuestion(it, index) : renderWholeQuestion(it, index)
              );
            })
          }
        </ul>

        {(props.isChangeable && !props.isForChange) ? renderCreateTestButton() : renderChangeTestButton(props.all)}
      </section>
    </>
  );
};

DisplayQuestions.propTypes = {
  isChangeable: PropTypes.bool,
  noDelete: PropTypes.bool,
  isRemovable: PropTypes.bool,
  questionArray: PropTypes.array,
  handleDeleteQuestion: PropTypes.func,
  postTestToServer: PropTypes.func,
  handleDeleteTest: PropTypes.func,
  isForChange: PropTypes.bool,
  callback: PropTypes.func,
};

export default DisplayQuestions;
    