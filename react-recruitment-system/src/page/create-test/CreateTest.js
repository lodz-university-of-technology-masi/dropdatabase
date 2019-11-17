import React, {useEffect, useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import "./CreateTest.css";
import DisplayQuestions
  from "../../component/display-questions/DisplayQuestions";
import AddQuestion from "../../component/add-question/AddQuestion";

export const CreateTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);

  const handleSwitchClick = () => {
    setIsOpenQuestion(!isOpenQuestion);
  };

  const handleDeleteQuestion = () => {
    console.log("delete")
  };

  const handleSubmitOpenQuestion = (e) => {
    e.preventDefault();

    const question = {
      id: uuidv4(),
      isOpen: true,
      questionContent: e.target.openQuestion.value,
      questionAnswer: e.target.openAnswer.value,
    };

    setQuestionArray([...questionArray, question]);
  };

  const handleSubmitCloseQuestion = (e) => {
    e.preventDefault();

    let temp = "";
    if (e.target.checkboxAnswerA.checked) {
      temp += ";A"
    }
    if (e.target.checkboxAnswerB.checked) {
      temp += ";B"
    }
    if (e.target.checkboxAnswerC.checked) {
      temp += ";C"
    }
    if (e.target.checkboxAnswerD.checked) {
      temp += ";D"
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
  };

  const postTestToServer = () => {
    axios.post(FIREBASE_PATH, questionArray).then(() => alert("Test has been sent"));
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <AddQuestion
        isOpenQuestion={isOpenQuestion}
        handleSwitchClick={handleSwitchClick}
        handleSubmitOpenQuestion={handleSubmitOpenQuestion}
        handleSubmitCloseQuestion={handleSubmitCloseQuestion}
      />

      <DisplayQuestions
        isChangeable={true}
        questionArray={questionArray}
        handleDeleteQuestion={handleDeleteQuestion}
        postTestToServer={postTestToServer}
      />
    </>
  );
};

export default CreateTest;
