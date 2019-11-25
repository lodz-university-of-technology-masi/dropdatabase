import React, {useState,useEffect} from "react";
import {zmienna} from '../../main/App.js'
import {FIREBASE_PATH} from "../../constants";
import {USER_SESSION_ID} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import "./CreateTest.css";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import AddQuestion from "../../component/add-question/AddQuestion";

export const CreateTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);
        useEffect(() => {

           // zmienna = "hasjdkas";
        });
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

  const handleSwitchClick = () => {
    setIsOpenQuestion(!isOpenQuestion);
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

  const postTestToServer = () => {
      console.log(questionArray)
      let test = {
          "user": {
            "userToken": USER_SESSION_ID
          },
          "testUUID": uuidv4(),
          "questions": questionArray
      };
      console.log(test);
      axios.post(FIREBASE_PATH+"/test", test).then(() => {alert("Test has been sent");document.location.replace('/')});
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      {zmienna}
      <AddQuestion
        isOpenQuestion={isOpenQuestion}
        handleSwitchClick={handleSwitchClick}
        handleSubmitOpenQuestion={handleSubmitOpenQuestion}
        handleSubmitCloseQuestion={handleSubmitCloseQuestion}
      />

      <DisplayQuestions
        isChangeable={true}
      noDelete={true}
        questionArray={questionArray}
        handleDeleteQuestion={handleDeleteQuestion}
        postTestToServer={postTestToServer}
      />
    </>
  );
};

export default CreateTest;
