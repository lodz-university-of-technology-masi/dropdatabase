import React, {useState} from "react";
import PropTypes from "prop-types";

export const AddQuestion = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [isOpenQuestion, setIsOpenQuestion] = useState(true);
  const [isClosedQuestion, setIsClosedQuestion] = useState(false);
  const [isNumericalQuestion, setIsNumericalQuestion] = useState(false);

  const handleSwitchToOpenQuestion = () => {
    setIsOpenQuestion(true);
    setIsClosedQuestion(false);
    setIsNumericalQuestion(false);
  };

  const handleSwitchToClosedQuestion = () => {
    setIsOpenQuestion(false);
    setIsClosedQuestion(true);
    setIsNumericalQuestion(false);
  };

  const handleSwitchToNumericalQuestion = () => {
    setIsOpenQuestion(false);
    setIsClosedQuestion(false);
    setIsNumericalQuestion(true);
  };

  const renderSwitchButton = () => {
    return (
      <div className="row justify-content-center">
        <button
          className={isOpenQuestion ? "btn btn-primary disabled" : "btn btn-primary"}
          onClick={handleSwitchToOpenQuestion}>
          Change to Open Question
        </button>

        <button
          className={isClosedQuestion ? "btn btn-primary disabled" : "btn btn-primary"}
          onClick={handleSwitchToClosedQuestion}>
          Change to Close Question
        </button>

        <button
          className={isNumericalQuestion ? "btn btn-primary disabled" : "btn btn-primary"}
          onClick={handleSwitchToNumericalQuestion}>
          Change to Numerical Question
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

  const renderNumericalQuestion = () => {
    return (
      <form onSubmit={props.handleSubmitNumericalQuestion}>
        <input className="form-control mb-3" placeholder="Question"
               name="numericalQuestion"
        />

        <input className="form-control mb-3" placeholder="Sample Answer"
               name="numericalAnswer" type="number"
        />

        <div className="row justify-content-center mt-3">
          <button type="submit" className="btn btn-primary">
            Add question to test
          </button>
        </div>
      </form>
    );
  };

  const renderSelectedQuestion = () => {
    if (isOpenQuestion === true && isClosedQuestion === false && isNumericalQuestion === false) {
      return renderOpenQuestion();
    } else if (isOpenQuestion === false && isClosedQuestion === true && isNumericalQuestion === false) {
      return renderCloseQuestion();
    } else if (isOpenQuestion === false && isClosedQuestion === false && isNumericalQuestion === true) {
      return renderNumericalQuestion();
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <section className="card border container mt-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-3">Add New Question</h5>
        </header>
        {renderSwitchButton()}
        <div className="card-body">
          {renderSelectedQuestion()}
        </div>
      </section>
    </>
  );
};

AddQuestion.propTypes = {
  handleSubmitOpenQuestion: PropTypes.func,
  handleSubmitCloseQuestion: PropTypes.func,
  handleSubmitNumericalQuestion: PropTypes.func,
};

export default AddQuestion;
    