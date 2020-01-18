import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Link} from "react-router-dom";
import {FIREBASE_PATH, LANG_ENG, LANG_PL, UPDATE_INPUT, UPDATE_TEST} from "../../constants";
import {CSVLink} from "react-csv";
import {AppContext} from "../../main/App"
import {Parser} from "json2csv";
import _ from "lodash";

export const DisplayQuestions = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const {state, dispatch} = useContext(AppContext);
    const [localQuestionArray, setLocalQuestionArray] = useState(props.questionArray);
    const [lang, setLang] = useState(_.cloneDeep(props.all.lang));

    const renderDeleteTestButton = (it) => {
        return (
            <div className="row right mb-4">
                <button className="btn btn-danger white-text"
                        onClick={() => {
                            handleDeleteTest(it)
                        }}>
                    Delete Test
                </button>
            </div>
        );
    };

    const renderTestId = (id) => {
        return (
            <h6 className="font-weight-bold text-center mb-1">
                Test Identifier: {id}
            </h6>
        );
    };

    const renderDeleteQuestionButton = (index) => {
        return (
            <button className="btn btn-danger white-text float-right"
                    onClick={() => props.handleDeleteQuestion(index)}>
                Delete
            </button>
        );
    };

    const renderCreateTestButton = () => {
        return (
            <div className="row justify-content-center my-3">
                <button className="btn btn-primary" onClick={props.postTestToServer}>
                    Create Test
                </button>
            </div>
        );
    };

    const renderChangeTestButton = (it) => {
        return (
            <div className="row justify-content-center my-3">
                <Link to={UPDATE_TEST} className="nav-link">

                    <button className="btn btn-primary" onClick={() => {
                        handleChangeTest(it)
                    }}>
                        Change Test
                    </button>
                </Link>
            </div>
        );
    };
    const renderExportTestButton = (it) => {
        if (typeof it !== "undefined") {
            let test = [];

            for (const key in it.questions) {
                let item = it.questions[key];
                let type = "";
                let answers = "";
                let question = "";
                let id = item.id;
                if (item.isClosed) {
                    type = "W";
                    answers = "4;" + item.answerA + ";" + item.answerB + ";" + item.answerC + ";" + item.answerD;
                } else if (item.isNumerical) {
                    type = "L";
                    answers = item.questionAnswer;
                } else if (item.isOpen) {
                    type = "O";
                    answers = item.questionAnswer;
                }
                question = item.questionContent;
                let line = id + ";" + type + ";" + it.lang + ";" + question + ";" + answers + ";";
                test.push(line);
            }
            let csv = "";
            test.forEach(function (row) {
                csv += row;
                csv += "\n";
            });
            return (
                <div className="row justify-content-center my-3">
                    <div>
                        <a className="btn btn-primary white-text"
                           href={"data:text/plain;charset=utf-8, " + encodeURI(csv)} target={"_blank"}
                           download={it.testUUID + ".csv"}>Export
                            test</a>
                    </div>
                </div>
            );
        }
    };

    const renderWholeQuestion = (it, index) => {
        let items = [];

        if (it.isOpen || it.isNumerical) {
            return (
                <ul key={index} className="list-group list-group-flush mt-3 card">
                    <h4 className="text-center">
                        Question: {it.questionContent}
                    </h4>
                    <li className="list-group-item">
                        Answer: {it.questionAnswer}
                    </li>
                </ul>
            );
        }

        if (it.isClosed) {
            Object.keys(it).map((it2, index) => {
                if (it2.includes("answer")) {
                    if (it.correct && it.correct.includes(it2[it2.length - 1])) {
                        items.push(
                            <li className="list-group-item green" key={index}>
                                {it2}: {it[it2]}
                            </li>
                        );
                    } else {
                        items.push(
                            <li className="list-group-item" key={index}>
                                {it2}: {it[it2]}
                            </li>
                        );
                    }
                }
            });

            return (
                <ul key={index} className="list-group list-group-flush mt-3 card">
                    <h4 className="text-center">
                        Question: {it.questionContent}
                    </h4>{items}
                </ul>
            );
        }

        return (
            <li className="list-group-item" key={index}>
                {JSON.stringify(it)}
            </li>
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

    const handleDeleteTest = (e) => {
        let test = {
            "user": {
                "userToken": sessionStorage.getItem("token")
            },
            "testUUID": e.testUUID,
            "questions": e.questions
        };

        axios.delete(FIREBASE_PATH + "/test", {
            headers: {
                "Content-Type": "application/json"
            },
            data: test
        }).then(() => {
            alert("Test has been deleted");
            window.location.reload()
        }).catch((error) => console.log(error));
    };

    const handleChangeTest = (e) => {
        let test = {
            "user": {
                "userToken": sessionStorage.getItem("token")
            },
            "testUUID": e.testUUID,
            "questions": e.questions
        };

        const test_orig = test;

        dispatch({type: UPDATE_INPUT, test: test});
    };

    const handleExportTest = (e) => {
        if (typeof e !== "undefined") {
            let test = {
                "questions": [],
                "testUUID": e.testUUID,
                "lang": e.lang,
            };

            for (let item in e.questions) {
                let type = "";
                let answers = "";
                let question = "";
                let correct = "";
                let id = item.id;
                if (item.isClosed) {
                    type = "W";
                    answers = item.answerA + "|" + item.answerB + "|" + item.answerC + "|" + item.answerD
                    correct = item.correct.length.toString();
                } else if (item.isNumerical) {
                    type = "L";
                    answers = item.questionAnswer;
                    correct = "|";
                } else if (item.isOpen) {
                    type = "O";
                    answers = item.questionAnswer;
                    correct = "|";
                }
                question = item.questionContent;
                let newItem = {
                    "id": id,
                    "type": type,
                    "question": question,
                    "correct": correct,
                    "answers": answers
                };
                test.questions.append(newItem);
            }

            const headers = [
                "id",
                "type",
                "lang",
                "question",
                "answers",
                "correct"
            ];
            const fields = ["questions.id", "questions.type", "lang", "questions.question", "questions.answers", "question.correct"];
            const json2csvParser = new Parser({
                fields,
                unwind: ["langs", "langs.questions", "langs.questions.answers", "langs.questions.correct", "candidate_logins"],
                header: false
            });

            /*return tests.map(item => (
                <tr>
                    <th>
                        {item.testName}
                    </th>
                    <th>
                        <CSVLink data={json2csvParser.parse(item)}
                                 filename={`${item.testName}.csv`}
                                 className="btn btn-warning"
                                 headers={headers}>Export</CSVLink>
                    </th>
                </tr>
            ));*/
        }
    };

    const handleTranslateButton = (test) => {
        axios.post(
            "https://n5608yixy5.execute-api.us-east-1.amazonaws.com/dictionary/translate", test)
            .then((res) => {
                setLocalQuestionArray(res.data.questions);
                if (lang === LANG_ENG) {
                    setLang(LANG_PL);
                    test.lang = LANG_PL;
                } else if (lang === LANG_PL) {
                    setLang(LANG_ENG);
                    test.lang = LANG_ENG;
                }
            })
    };

    const renderTranslateLangButton = (test) => {
        if (lang === LANG_ENG) {
            return (
                <div className="row justify-content-center">
                    <button className="btn btn-primary" onClick={() => handleTranslateButton(test)}>
                        Translate to Polish
                    </button>
                </div>
            );
        } else if (lang === LANG_PL) {
            return (
                <div className="row justify-content-center">
                    <button className="btn btn-primary" onClick={() => handleTranslateButton(test)}>
                        Translate to English
                    </button>
                </div>
            );
        }
    };

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <>
            <section className="card container my-5">
                <header className="card-body row justify-content-center">
                    <h5 className="font-weight-bold mb-1">Questions in the Test</h5>
                </header>

                {!props.noDelete ? renderDeleteTestButton(props.all) : null}
                {props.isTranslate ? renderTranslateLangButton(props.all) : null}

                {renderExportTestButton(props.all)}
                {props.isChangeable ? null : renderTestId(props.testUUID)}

                <ul className="list-group list-group-flush mt-3">
                    {
                        localQuestionArray.map((it, index) => {
                            return (
                                props.isChangeable ? renderPartQuestion(it, index) : renderWholeQuestion(it, index)
                            );
                        })
                    }
                </ul>

                {props.isLangDisplay ?
                    <div className="row justify-content-center mt-2">
                        <select className="browser-default custom-select register-input" name="selectLang"
                                onChange={(e) => props.setLanguage(e.target.value)}
                                required={true}
                        >
                            <option value="en">English</option>
                            <option value="pl">Polish</option>
                        </select>
                    </div>
                    :
                    null
                }

                {(props.isChangeable && !props.isForChange) ? renderCreateTestButton() : renderChangeTestButton(props.all)}

            </section>
        </>
    );
};

DisplayQuestions.propTypes = {
    isChangeable: PropTypes.bool,
    noDelete: PropTypes.bool,
    isRemovable: PropTypes.bool,
    questionArray: PropTypes.array,
    handleDeleteQuestion: PropTypes.func,
    postTestToServer: PropTypes.func,
    handleDeleteTest: PropTypes.func,
    isForChange: PropTypes.bool,
    callback: PropTypes.func,
    isLangDisplay: PropTypes.bool,
    setLanguage: PropTypes.func,
    isTranslate: PropTypes.bool,
};

export default DisplayQuestions;
    