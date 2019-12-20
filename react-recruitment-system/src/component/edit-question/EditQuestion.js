import React, {useContext} from "react";
import PropTypes from "prop-types";
import {AppContext} from "../../main/App";

export const EditQuestion = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);
  const singleQuestion = state.testToBeChanged.questions[props.questionIndex];

  const renderOpenQuestion = () => {
    return (
      <form onSubmit={props.handleSubmitOpenQuestion}>
        <input className="form-control mb-3" defaultValue={singleQuestion.questionContent}
               name="openQuestion"
               onChange={(e) =>
                 state.testToBeChanged.questions[props.questionIndex].questionContent = e.target.value}
        />

        <input className="form-control mb-3" defaultValue={singleQuestion.questionAnswer}
               name="openAnswer"
               onChange={(e) =>
                 state.testToBeChanged.questions[props.questionIndex].questionAnswer = e.target.value}
        />

      </form>
    );
  };

  const renderCloseQuestion = () => {
    return (
      <form onSubmit={props.handleSubmitCloseQuestion}>
        <input className="form-control mb-3" defaultValue={singleQuestion.questionContent}
               name="closeQuestion"
               onChange={(e) => {
                 state.testToBeChanged.questions[props.questionIndex].questionContent = e.target.value;
               }}
        />

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox" name="checkboxAnswerA"
                   defaultChecked={String(singleQuestion.correct).includes('A')}
                   onChange={(e) => {
                     if (!String(state.testToBeChanged.questions[props.questionIndex].correct).includes('A')) {
                       state.testToBeChanged.questions[props.questionIndex].correct += 'A';
                     } else {
                       state.testToBeChanged.questions[props.questionIndex].correct = state
                         .testToBeChanged.questions[props.questionIndex].correct.replace('A', '')
                     }
                   }}/>
          </div>
          <input className="form-control" defaultValue={singleQuestion.answerA}
                 name="closeAnswerA"
                 onChange={(e) => {
                   state.testToBeChanged.questions[props.questionIndex].answerA = e.target.value;
                 }}
          />
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox" name="checkboxAnswerB"
                   defaultChecked={String(singleQuestion.correct).includes('B')}
                   onChange={(e) => {
                     if (!String(state.testToBeChanged.questions[props.questionIndex].correct).includes('B')) {
                       state.testToBeChanged.questions[props.questionIndex].correct += 'B';
                     } else {
                       state.testToBeChanged.questions[props.questionIndex].correct = state
                         .testToBeChanged.questions[props.questionIndex].correct.replace('B', '')
                     }
                   }}/>
          </div>
          <input className="form-control" defaultValue={singleQuestion.answerB}
                 name="closeAnswerB"
                 onChange={(e) => {
                   state.testToBeChanged.questions[props.questionIndex].answerB = e.target.value;
                 }}/>
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox" name="checkboxAnswerC"
                   defaultChecked={String(singleQuestion.correct).includes('C')}
                   onChange={(e) => {
                     if (!String(state.testToBeChanged.questions[props.questionIndex].correct).includes('C')) {
                       state.testToBeChanged.questions[props.questionIndex].correct += 'C';
                     } else {
                       state.testToBeChanged.questions[props.questionIndex].correct = state
                         .testToBeChanged.questions[props.questionIndex].correct.replace('C', '')
                     }
                   }}/>
          </div>
          <input className="form-control" defaultValue={singleQuestion.answerC}
                 name="closeAnswerC"
                 onChange={(e) => {
                   state.testToBeChanged.questions[props.questionIndex].answerC = e.target.value;
                 }}/>
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox" name="checkboxAnswerD"
                   defaultChecked={String(singleQuestion.correct).includes('D')}
                   onChange={(e) => {
                     if (!String(state.testToBeChanged.questions[props.questionIndex].correct).includes('D')) {
                       state.testToBeChanged.questions[props.questionIndex].correct += 'D';
                     } else {
                       state.testToBeChanged.questions[props.questionIndex].correct = state
                         .testToBeChanged.questions[props.questionIndex].correct.replace('D', '')
                     }
                   }}/>
          </div>
          <input className="form-control" defaultValue={singleQuestion.answerD}
                 name="closeAnswerD"
                 onChange={(e) => {
                   state.testToBeChanged.questions[props.questionIndex].answerD = e.target.value;
                 }}/>
        </div>

      </form>
    );
  };

  const renderNumericalQuestion = () => {
    return (
      <form onSubmit={props.handleSubmitNumericalQuestion}>
        <input className="form-control mb-3" name="numericalQuestion"
               defaultValue={singleQuestion.questionContent}
               onChange={(e) =>
                 state.testToBeChanged.questions[props.questionIndex].questionContent = e.target.value}
        />

        <input className="form-control mb-3" name="numericalAnswer" type="number"
               defaultValue={singleQuestion.questionAnswer}
               onChange={(e) =>
                 state.testToBeChanged.questions[props.questionIndex].questionAnswer = e.target.value}
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
          <h5 className="font-weight-bold mb-3">Edit question</h5>
        </header>

        <div className="card-body">
          {renderSelectedQuestion()}
        </div>
      </section>
    </>
  );
};

EditQuestion.propTypes = {
  handleSubmitOpenQuestion: PropTypes.func,
  handleSubmitCloseQuestion: PropTypes.func,
  handleSubmitNumericalQuestion: PropTypes.func,
  questionIndex: PropTypes.number,
};

export default EditQuestion;
    