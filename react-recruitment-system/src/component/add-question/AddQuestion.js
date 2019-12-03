import React from "react";
import PropTypes from "prop-types";

export const AddQuestion = (props) => {

    /*----------------------- VARIABLE REGION -----------------------*/
    const renderSwitchButton = () => {
        return (
            <div className="row justify-content-center">
                <button className="btn btn-primary" onClick={props.handleSwitchClick}>
                    Change to{props.isOpenQuestion ? " Close " : " Open "}Question
                </button>
            </div>
        );
    };

    const renderOpenQuestion = () => {
        return (
            <form onSubmit={props.handleSubmitOpenQuestion}>
                <input className="form-control mb-3" placeholder="Question"
                       name="openQuestion"
                />

                <input className="form-control mb-3" placeholder="Sample Answer"
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
                <input className="form-control mb-3" placeholder="Question" name="closeQuestion"/>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerA"/>
                    </div>
                    <input className="form-control" placeholder="Answer A" name="closeAnswerA"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerB"/>
                    </div>
                    <input className="form-control" placeholder="Answer B" name="closeAnswerB"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerC"/>
                    </div>
                    <input className="form-control" placeholder="Answer C" name="closeAnswerC"/>
                </div>

                <div className="input-group-prepend mb-2">
                    <div className="input-group-text">
                        <input type="checkbox" name="checkboxAnswerD"/>
                    </div>
                    <input className="form-control" placeholder="Answer D" name="closeAnswerD"/>
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
                    <h5 className="font-weight-bold mb-3">Add New Question</h5>
                </header>

                {renderSwitchButton()}

                <div className="card-body">
                    {props.isOpenQuestion ? renderOpenQuestion() : renderCloseQuestion()}
                </div>
            </section>
        </>
    );
};

AddQuestion.propTypes = {
    isOpenQuestion: PropTypes.bool,
    handleSwitchClick: PropTypes.func,
    handleSubmitOpenQuestion: PropTypes.func,
    handleSubmitCloseQuestion: PropTypes.func,
};

export default AddQuestion;
    