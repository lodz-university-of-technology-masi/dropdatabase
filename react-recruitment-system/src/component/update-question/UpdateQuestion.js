import React, {useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import {USER_SESSION_ID} from "../../constants";
import axios from "axios";
import uuidv4 from "uuid/v4";
import "./CreateTest.css";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";

export const CreateTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  
 
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
