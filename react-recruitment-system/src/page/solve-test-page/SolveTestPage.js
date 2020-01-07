import React, {useContext, useState} from "react";
import {AppContext} from "../../main/App";
import EditQuestion from "../../component/edit-question/EditQuestion";
import uuidv4 from "uuid/v4";
import axios from "axios";
import {FIREBASE_PATH} from "../../constants";
import SolveQuestion from "../../component/solve-question/SolveQuestion";

/**
 * This page displaying test (ability to solve) selected by
 * Candidate from list - CandidateTestsPage.js
 * @param props
 * @returns {*}
 * @constructor
 */
export const SolveTestPage = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const {state, dispatch} = useContext(AppContext);

    let initAnswers = [];
    JSON.parse(sessionStorage.getItem('selectedTestToSolve')).questions.map((it, index) => {
        initAnswers.push("");
    });

    const [questionArray, setQuestionArray] = useState([]);

    sessionStorage.setItem('answers', JSON.stringify(initAnswers));

    // alert(sessionStorage.getItem('selectedTestToSolve'));
    console.log(JSON.parse(sessionStorage.getItem('selectedTestToSolve')).testUUID);

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

    const postSolutionToServer = () => {
        axios.post("https://lwn1nhn8s4.execute-api.us-east-1.amazonaws.com/cc_candidates/candidate", {
                'testUUID': JSON.parse(sessionStorage.getItem('selectedTestToSolve')).testUUID,
                'answers': JSON.parse(sessionStorage.getItem('answers')),
                'requestToken': sessionStorage.getItem('token')
            }
        ).then(function (response) {
            console.log(response);
            // handle success
            if(response.data === "FORBIDDEN") {
                alert("You can submit the test only once");
            } else {
                alert("Test has been sent");
            }

            document.location.replace('/');
        }).catch((error) => console.log(error));
        console.log({
            'testUUID': JSON.parse(sessionStorage.getItem('selectedTestToSolve')).testUUID,
            'answers': JSON.parse(sessionStorage.getItem('answers')),
            'requestToken': sessionStorage.getItem('token')
        })

    };

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <>
            <ul className="list-group list-group-flush mt-3">
                {
                    JSON.parse(sessionStorage.getItem('selectedTestToSolve')).questions.map((it, index) => {

                        return (
                            <SolveQuestion
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
                <button className="btn btn-success white-text" onClick={postSolutionToServer}>
                    Submit Test
                </button>
                <button className="btn btn-danger white-text"
                        onClick={() => document.location.replace('/')}>
                    Cancel
                </button>
            </div>
        </>
    );
};

export default SolveTestPage;
