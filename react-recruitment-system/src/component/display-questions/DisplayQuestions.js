import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {Link} from "react-router-dom";
import {UPDATE_TEST, USER_SESSION_ID} from "../../constants";
import {CREATE_TEST} from "../../constants";
import {
    FIREBASE_PATH
} from "../../constants";

export const DisplayQuestions = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
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

    // TODO ADD DISPLAY QUESTION ID
    const renderTestId = (id) => {
        return (
            <h6 className="font-weight-bold text-center mb-1">
                Test Identifier: {id}
            </h6>
        );
    };


    const renderWholeQuestion = (it, index) => {
        //TODO ADD MORE VALUE FROM ARRAY - MORE THAN IT.NAME
        let items = [];
        if (!it.isOpen) {
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
            })
            return (<ul className="list-group list-group-flush mt-3 card"><h4
                className="text-center">Question: {it.questionContent}</h4>{items}</ul>);
        } else {
            return (<ul className="list-group list-group-flush mt-3 card"><h4
                className="text-center">Question: {it.questionContent}</h4>
                <li className="list-group-item">Anwser: {it.questionAnswer}</li>
            </ul>);
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
                "userToken": USER_SESSION_ID
            },
            "testUUID": e.testUUID,
            "questions": e.questions
        };
        console.log(JSON.stringify(test));
//      console.log(questionArray)
//      let test = {
//          "user": {
//            "userToken": USER_SESSION_ID
//          },
//          "testUUID": uuidv4(),
//          "questions": questionArray
//      };
//      console.log(test);
        console.log(test);
        console.log(FIREBASE_PATH + "/test");
        axios.delete(FIREBASE_PATH + "/test", {
            headers: {
                'Content-Type': 'application/json'
            },
            data: test
        }).then(() => {
            alert("Test has been deleted");
            window.location.reload()
        }).catch((error) => console.log(error));
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

    const handleChangeTest = (e) => {
        let test = {
            "user": {
                "userToken": USER_SESSION_ID
            },
            "testUUID": e.testUUID,
            "questions": e.questions
        };

        console.log(test);

        // document.location.replace(UPDATE_TEST);
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
    /*------------------------ RETURN REGION ------------------------*/
    return (
        <>
            <section className="card container my-5">
                <header className="card-body row justify-content-center">
                    <h5 className="font-weight-bold mb-1">Questions in the Test</h5>
                </header>

                {!props.noDelete ? renderDeleteTestButton(props.all) : null}

                {props.isChangeable ? null : renderTestId(props.testUUID)}

                <ul className="list-group list-group-flush mt-3">
                    {
                        props.questionArray.map((it, index) => {
                            return (
                                props.isChangeable ? renderPartQuestion(it, index) : renderWholeQuestion(it, index)
                            );
                        })
                    }
                </ul>

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
};

export default DisplayQuestions;
    