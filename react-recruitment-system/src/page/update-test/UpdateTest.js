import React, {useEffect, useState, useContext} from "react";
import {DISPLAY_TEST, UPDATE_TEST, USER_SESSION_ID} from "../../constants";
import DisplayQuestions from "../../component/display-questions/DisplayQuestions";
import axios from "axios";
import {FIREBASE_PATH} from "../../constants";
import uuidv4 from "uuid/v4";
import {AppContext, zmienna} from "../../main/App";
import AddQuestion from "../../component/add-question/AddQuestion";
import EditQuestion from "../../component/edit-question/EditQuestion";
import {Link} from "react-router-dom";

export const DeleteTest = (props) => {


    /*----------------------- VARIABLE REGION -----------------------*/
    const {state, dispatch} = useContext(AppContext);

    const testToBeChangedOrig1 = state.testToBeChanged;
    const testToBeChangedOrig2 = testToBeChangedOrig1;

    // TEMPORARY ARRAY TO DELETE
//  const [questionArray, setQuestionArray] = useState([
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//    {"name": "vfvfvfv"},
//  ]);
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
        console.log(e.target);

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

    const handleOnChangeOpenQuestion = (e) => {
        console.log(e.target)
        // e.preventDefault();
        //
        // if (areEmptyInputs(e.target.openQuestion, e.target.openAnswer)) {
        //     alert("All inputs must be fill in");
        //     return;
        // }
        //
        // const question = {
        //     id: uuidv4(),
        //     isOpen: true,
        //     questionContent: e.target.openQuestion.value,
        //     questionAnswer: e.target.openAnswer.value,
        // };
        //
        // setQuestionArray([...questionArray, question]);
        // clearTextInputs(e.target.openQuestion, e.target.openAnswer);
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
        console.log(state.testToBeChangedOrig);
        console.log(FIREBASE_PATH + "/test");
        axios.delete(FIREBASE_PATH + "/test", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: state.testToBeChangedOrig
        }).then(() => {
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
            {/*    {() => {*/}
            {/*        if(typeof (state.testToBeChanged.questions) === 'undefined')*/}
            {/*            return(<Link to={DISPLAY_TEST} className="nav-link"/>)*/}
            {/*}}*/}
            <ul className="list-group list-group-flush mt-3">
                {
                    state.testToBeChanged.questions.map((it, index) => {
                        return (
                            <EditQuestion
                                isOpenQuestion={state.testToBeChanged.questions[index].isOpen}
                                handleSwitchClick={handleSwitchClick}
                                handleSubmitOpenQuestion={handleSubmitOpenQuestion}
                                handleOnChangeOpenQuestion={handleOnChangeOpenQuestion}
                                handleSubmitCloseQuestion={handleSubmitCloseQuestion}
                                questionIndex={index}
                            />

                        );
                    })
                }
            </ul>

            <div className="row justify-content-center mt-3">
                <button className="btn btn-success white-text"
                        onClick={
                            postTestToServer
                        }>
                    Update Test
                </button>
                <button className="btn btn-danger white-text"
                        onClick={() => {
                            document.location.replace('/')
                        }
                        }>
                    Cancel
                </button>
            </div>
        </>
    );
};
export default DeleteTest;
    