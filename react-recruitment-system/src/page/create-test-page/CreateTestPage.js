import React, {useState} from "react";
import {FIREBASE_PATH, LANG_ENG} from "../../constants";
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
    const [language, setLanguage] = useState(LANG_ENG);

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
        console.log(questionArray);
        let test = {
            "user": {
                "userToken": sessionStorage.getItem("token")
            },
            "testUUID": uuidv4(),
            "questions": questionArray,
            "lang": language,
        };
        //
        axios.post(FIREBASE_PATH + "/test", test).then(() => {
            alert("Test has been sent");
            document.location.replace("/")
        });
    };
    const handleFile = () => {
        let f = document.getElementById('file-input').files[0];
        let contents;
        if (f) {
            let r = new FileReader();
            r.onload = function (e) {
                contents = e.target.result;
                let tab = contents.split('\n').map((it) => {
                    return it.replace(/"/g, '').replace(";;;;;;", '').split(';')
                });
                let lang = "";
                let qArray = [];
                for (let i = 0; i < tab.length; i++) {
                    if (tab[i].length > 1) {
                        let q = {};
                        q.id = tab[i][0];
                        q.isOpen = (tab[i][1] == "O");
                        q.isClosed = (tab[i][1] == "W");
                        q.isNumerical = (tab[i][1] == "L");
                        lang = tab[i][2];
                        q.questionContent = tab[i][3];
                        if (tab[i][1] == "W") {
                            q.answerA = tab[i][5];
                            q.answerB = tab[i][6];
                            q.answerC = tab[i][7];
                            q.answerD = tab[i][8];
                        } else
                            q.questionAnswer = tab[i][4];
                        qArray.push(q);
                    }

                }
                setQuestionArray([...qArray]);
                setLanguage(lang);
            };
            r.readAsText(f);
        } else {
            alert("Failed to load file");
        }
    };

    const renderDeleteQuestionButton = (index) => {
        return (
            <button className="btn btn-danger white-text float-right"
                    onClick={() => handleDeleteQuestion(index)}>
                Delete
            </button>
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

    const renderCreateTestButton = () => {
        return (
            <div className="row justify-content-center my-3">
                <button className="btn btn-primary" onClick={postTestToServer}>
                    Create Test
                </button>
            </div>
        );
    };

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <div className="blur-background">
            <AddQuestion
                handleSubmitOpenQuestion={handleSubmitOpenQuestion}
                handleSubmitCloseQuestion={handleSubmitCloseQuestion}
                handleSubmitNumericalQuestion={handleSubmitNumericalQuestion}
            />

            <div className="container card">
                <div className="custom-file-padding">
                    <h4>Import from file:</h4>
                    <div className="custom-file">
                        <input type="file" className="custom-file-input" id="file-input" onChange={handleFile}/>
                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                    </div>
                </div>
            </div>


            <section className="card container my-5">
                <header className="card-body row justify-content-center">
                    <h5 className="font-weight-bold mb-1">Questions in the Test</h5>
                </header>

                <ul className="list-group list-group-flush mt-3">
                    {
                        questionArray.map((it, index) => {
                            return (
                                renderPartQuestion(it, index)
                            );
                        })
                    }
                </ul>

                <div className="row justify-content-center mt-2">
                    <select className="browser-default custom-select register-input" name="selectLang"
                            onChange={(e) => setLanguage(e.target.value)}
                            required={true}
                    >
                        <option value="en" selected>English</option>
                        <option value="pl">Polish</option>
                    </select>
                </div>

                {renderCreateTestButton()}

            </section>
        </div>
    );
};

export default CreateTestPage;
