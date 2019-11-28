import React, {useContext, useState} from "react";
import PropTypes from "prop-types";
import {AppContext} from "../../main/App";
import _ from 'lodash'

export const EditQuestion = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const {state, dispatch} = useContext(AppContext);
    const singleQuestion = state.testToBeChanged.questions[props.questionIndex];


    const renderOpenQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitOpenQuestion}>
                <input className="form-control mb-3" defaultValue={singleQuestion.questionContent}
                       name="openQuestion"
                />

                <input className="form-control mb-3" defaultValue={singleQuestion.questionAnswer}
                       name="openAnswer"
                />

                <div className="row justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary">
                        Add question to test
                    </button>
                </div>
            </form>
        );
    };

    const renderCloseQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitCloseQuestion}>
                <input className="form-control mb-3" defaultValue={singleQuestion.questionContent} name="closeQuestion"/>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerA" defaultChecked={String(singleQuestion.correct).includes('A')}/>
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerA} name="closeAnswerA"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerB" defaultChecked={String(singleQuestion.correct).includes('B')}/>
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerB} name="closeAnswerB"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerC" defaultChecked={String(singleQuestion.correct).includes('C')}/>
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerC} name="closeAnswerC"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerD" defaultChecked={String(singleQuestion.correct).includes('D')}/>
                    </div>
                    <input className="form-control" defaultValue={singleQuestion.answerD} name="closeAnswerD"/>
                </div>

                <div className="row justify-content-center mt-3">
                    <button type="submit" className="btn btn-primary">
                        Add question to test
                    </button>
                </div>
            </form>
        );
    };

    /*------------------------ RETURN REGION ------------------------*/
    return (
        <>
            <section className="card container mt-5">
                <header className="card-body row justify-content-center">
                    <h5 className="font-weight-bold mb-3">Edit question</h5>
                </header>

                <div className="card-body">
                    {props.isOpenQuestion ? renderOpenQuestion() : renderCloseQuestion()}
                </div>
            </section>
        </>
    );
};

EditQuestion.propTypes = {
    isOpenQuestion: PropTypes.bool,
    handleSwitchClick: PropTypes.func,
    handleSubmitOpenQuestion: PropTypes.func,
    handleSubmitCloseQuestion: PropTypes.func,
    questionIndex: PropTypes.number,
};

export default EditQuestion;
    