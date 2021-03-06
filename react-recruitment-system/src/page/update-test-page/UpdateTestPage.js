import React, {useContext, useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import {AppContext} from "../../main/App";
import EditQuestion from "../../component/edit-question/EditQuestion";

export const UpdateTestPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);
  const [questionArray, setQuestionArray] = useState([]);

  const areEmptyInputs = (...elements) => {
    let result = false;

    elements.forEach((it) => {
      if (it.value === "") {
        result = true;
      }
    });

    return result;
  };

  const clearTextInputs = (...elements) => {
    elements.forEach((it) => it.value = "")
  };

  const clearCheckboxes = (...elements) => {
    elements.forEach((it) => it.checked = false)
  };

  const handleSubmitOpenQuestion = (e) => {
    e.preventDefault();

    if (areEmptyInputs(e.target.openQuestion, e.target.openAnswer)) {
      alert("All inputs must be fill in");
      return;
    }

    const question = {
      id: uuidv4(),
      isOpen: true,
      isClosed: false,
      isNumerical: false,
      questionContent: e.target.openQuestion.value,
      questionAnswer: e.target.openAnswer.value,
    };

    setQuestionArray([...questionArray, question]);
    clearTextInputs(e.target.openQuestion, e.target.openAnswer);
  };

  const handleSubmitCloseQuestion = (e) => {
    e.preventDefault();

    if (e.target.checkboxAnswerA.checked === false
      && e.target.checkboxAnswerB.checked === false
      && e.target.checkboxAnswerC.checked === false
      && e.target.checkboxAnswerD.checked === false) {
      alert("In close quetions at least one answer must be marked as correct");
      return;
    }

    if (areEmptyInputs(e.target.closeQuestion, e.target.closeAnswerA,
      e.target.closeAnswerB, e.target.closeAnswerC, e.target.closeAnswerD)) {
      alert("All inputs must be fill in");
      return;
    }

    let temp = "";
    if (e.target.checkboxAnswerA.checked) {
      temp += "A"
    }
    if (e.target.checkboxAnswerB.checked) {
      temp += "B"
    }
    if (e.target.checkboxAnswerC.checked) {
      temp += "C"
    }
    if (e.target.checkboxAnswerD.checked) {
      temp += "D"
    }

    const question = {
      id: uuidv4(),
      isOpen: false,
      isClosed: true,
      isNumerical: false,
      questionContent: e.target.closeQuestion.value,
      answerA: e.target.closeAnswerA.value,
      answerB: e.target.closeAnswerB.value,
      answerC: e.target.closeAnswerC.value,
      answerD: e.target.closeAnswerD.value,
      correct: temp,
    };

    setQuestionArray([...questionArray, question]);

    clearTextInputs(e.target.closeQuestion, e.target.closeAnswerA,
      e.target.closeAnswerB, e.target.closeAnswerC, e.target.closeAnswerD
    );

    clearCheckboxes(
      e.target.checkboxAnswerA,
      e.target.checkboxAnswerB,
      e.target.checkboxAnswerC,
      e.target.checkboxAnswerD,
    );
  };

  const handleSubmitNumericalQuestion = (e) => {
    e.preventDefault();

    if (areEmptyInputs(e.target.numericalQuestion, e.target.numericalAnswer)) {
      alert("All inputs must be fill in");
      return;
    }

    const question = {
      id: uuidv4(),
      isOpen: false,
      isClosed: false,
      isNumerical: true,
      questionContent: e.target.numericalQuestion.value,
      questionAnswer: e.target.numericalAnswer.value,
    };

    setQuestionArray([...questionArray, question]);
    clearTextInputs(e.target.numericalQuestion, e.target.numericalAnswer);
  };

  const postTestToServer = () => {
    axios.delete(FIREBASE_PATH + "/test", {
      headers: {
        'Content-Type': 'application/json'
      },
      data: state.testToBeChangedOrig
    }).then(() => {
      console.log(JSON.stringify(state))
      axios.post(FIREBASE_PATH + "/test", state.testToBeChanged).then(() => {
        alert("Test has been updated");
        document.location.replace('/');
      });
    }).catch((error) => console.log(error));

  };

  /*------------------------ RETURN REGION ------------------------*/

  if (typeof (state.testToBeChanged.questions) === "undefined") {
    document.location.replace('/');
  }

  return (
    <>
      <ul className="list-group list-group-flush mt-3">
        {
          state.testToBeChanged.questions.map((it, index) => {
            return (
              <EditQuestion
                questionIndex={index}
                handleSubmitOpenQuestion={handleSubmitOpenQuestion}
                handleSubmitCloseQuestion={handleSubmitCloseQuestion}
                handleSubmitNumericalQuestion={handleSubmitNumericalQuestion}
              />
            );
          })
        }
      </ul>

      <div className="row justify-content-center mt-3">
        <button className="btn btn-success white-text" onClick={postTestToServer}>
          Update Test
        </button>
        <button className="btn btn-danger white-text"
                onClick={() => document.location.replace('/')}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default UpdateTestPage;
    