import React, {useEffect, useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import "./CreateTest.css";
import CreateDisplayQuestions
  from "../../component/create-display-questions/CreateDisplayQuestions";
import AddQuestion from "../../component/add-question/AddQuestion";

export const CreateTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [questionArray, setQuestionArray] = useState([]);

  console.log(FIREBASE_PATH);

  const handleSwitchClick = () => {
    setIsOpenQuestion(!isOpenQuestion);
  };

  const handleDeleteQuestion = () => {
    console.log("delete")
  };

  const handleSubmitOpenQuestion = (e) => {
    console.log("open");
    console.log(e.target.openQuestion.value);
    let question = {
      id: uuidv4(),
    };
    setQuestionArray([...questionArray, question]);
  };

  const handleSubmitCloseQuestion = () => {
    console.log("close");
    let question = {
      id: uuidv4(),
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

      <CreateDisplayQuestions
        questionArray={questionArray}
        handleDeleteQuestion={handleDeleteQuestion}
        postTestToServer={postTestToServer}
      />
    </>
  );
};

export default CreateTest;
