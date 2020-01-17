import React, {useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import "./CreateTestPage.css";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import AddQuestion from "../../component/add-question/AddQuestion";

/**
 * This page is for creating test, it is available only for recruiter
 * @param props
 * @returns {*}
 * @constructor
 */
export const CreateTestPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [questionArray, setQuestionArray] = useState([]);
  const [language, setLanguage] = useState("");

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

  const handleDeleteQuestion = (index) => {
    let temp = questionArray.slice();
    temp.splice(index, 1);
    setQuestionArray(temp);
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
    // console.log(questionArray);
    let test = {
      "user": {
        "userToken": sessionStorage.getItem("token")
      },
      "testUUID": uuidv4(),
      "questions": questionArray,
      "lang": language,
    };

    axios.post(FIREBASE_PATH + "/test", test).then(() => {
      alert("Test has been sent");
      document.location.replace("/")
    });
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="blur-background">
      <AddQuestion
        handleSubmitOpenQuestion={handleSubmitOpenQuestion}
        handleSubmitCloseQuestion={handleSubmitCloseQuestion}
        handleSubmitNumericalQuestion={handleSubmitNumericalQuestion}
      />

      <DisplayQuestions
        isChangeable={true}
        noDelete={true}
        questionArray={questionArray}
        handleDeleteQuestion={handleDeleteQuestion}
        postTestToServer={postTestToServer}
        isLangDisplay={true}
        setLanguage={setLanguage}
      />
    </div>
  );
};

export default CreateTestPage;
