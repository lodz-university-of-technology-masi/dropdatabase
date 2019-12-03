import React from "react";
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
