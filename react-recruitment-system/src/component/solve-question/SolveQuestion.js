import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AppContext} from "../../main/App";

export const SolveQuestion = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const {state, dispatch} = useContext(AppContext);
    const singleQuestion = JSON.parse(sessionStorage.getItem('selectedTestToSolve')).questions[props.questionIndex];

    const renderOpenQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitOpenQuestion}>
                <input className="form-control mb-3" defaultValue={singleQuestion.questionContent}
                       disabled={true}
                       name="openQuestion"
                />

                <input className="form-control mb-3"
                       name="openAnswer"
                       onChange={(e) => {
                           let tmp = JSON.parse(sessionStorage.getItem('answers'));
                           tmp[props.questionIndex] = e.target.value;
                           sessionStorage.setItem('answers', JSON.stringify(tmp));
                       }}
                />

            </form>
        );
    };

    const renderCloseQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitCloseQuestion}>
                <input className="form-control mb-3" defaultValue={singleQuestion.questionContent}
                       name="closeQuestion"
                       disabled={true}
                />

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerA"
                               onChange={(e) => {
                                   let tmp = JSON.parse(sessionStorage.getItem('answers'));

                                   if (!String(tmp[props.questionIndex]).includes('A')) {
                                       tmp[props.questionIndex] += 'A';
                                   } else {
                                       tmp[props.questionIndex] = tmp[props.questionIndex].replace('A', '');
                                   }
                                   sessionStorage.setItem('answers', JSON.stringify(tmp));
                               }}
                        />
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerA}
                           name="closeAnswerA"
                           disabled={true}
                    />
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerB"
                               onChange={(e) => {
                                   let tmp = JSON.parse(sessionStorage.getItem('answers'));

                                   if (!String(tmp[props.questionIndex]).includes('B')) {
                                       tmp[props.questionIndex] += 'B';
                                   } else {
                                       tmp[props.questionIndex] = tmp[props.questionIndex].replace('B', '');
                                   }
                                   sessionStorage.setItem('answers', JSON.stringify(tmp));
                               }}
                        />
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerB}
                           name="closeAnswerB"
                           disabled={true}
                    />
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerC"
                               onChange={(e) => {
                                   let tmp = JSON.parse(sessionStorage.getItem('answers'));

                                   if (!String(tmp[props.questionIndex]).includes('C')) {
                                       tmp[props.questionIndex] += 'C';
                                   } else {
                                       tmp[props.questionIndex] = tmp[props.questionIndex].replace('C', '');
                                   }
                                   sessionStorage.setItem('answers', JSON.stringify(tmp));
                               }}
                        />
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerC}
                           name="closeAnswerC"
                           disabled={true}
                    />
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerD"
                               onChange={(e) => {
                                   let tmp = JSON.parse(sessionStorage.getItem('answers'));

                                   if (!String(tmp[props.questionIndex]).includes('D')) {
                                       tmp[props.questionIndex] += 'D';
                                   } else {
                                       tmp[props.questionIndex] = tmp[props.questionIndex].replace('D', '');
                                   }
                                   sessionStorage.setItem('answers', JSON.stringify(tmp));
                               }}
                        />
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerD}
                           name="closeAnswerD"
                           disabled={true}
                    />
                </div>

            </form>
        );
    };

    const renderNumericalQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitNumericalQuestion}>
                <input className="form-control mb-3" name="numericalQuestion"
                       defaultValue={singleQuestion.questionContent}
                       disabled={true}
                />

                <input className="form-control mb-3" name="numericalAnswer" type="number"
                       onChange={(e) => {
                           let tmp = JSON.parse(sessionStorage.getItem('answers'));
                           tmp[props.questionIndex] = e.target.value;
                           sessionStorage.setItem('answers', JSON.stringify(tmp));
                       }}
                />
            </form>
        );
    };

    const renderSelectedQuestion = () => {
        if (singleQuestion.isOpen === true
            && singleQuestion.isClosed === false
            && singleQuestion.isNumerical === false) {
            return renderOpenQuestion();
        }

        if (singleQuestion.isOpen === false
            && singleQuestion.isClosed === true
            && singleQuestion.isNumerical === false) {
            return renderCloseQuestion();
        }

        if (singleQuestion.isOpen === false
            && singleQuestion.isClosed === false
            && singleQuestion.isNumerical === true) {
            return renderNumericalQuestion();
        }

        return null;
    };

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <>
            <section className="card container mt-5">
                <header className="card-body row justify-content-center">
                    <h5 className="font-weight-bold mb-3">Solve question</h5>
                </header>

                <div className="card-body">
                    {renderSelectedQuestion()}
                </div>
            </section>
        </>
    );
};

SolveQuestion.propTypes = {
    handleSubmitOpenQuestion: PropTypes.func,
    handleSubmitCloseQuestion: PropTypes.func,
    handleSubmitNumericalQuestion: PropTypes.func,
    questionIndex: PropTypes.number,
};

export default SolveQuestion;
    