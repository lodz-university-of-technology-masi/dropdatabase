import React, {useState} from "react";
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
      <form>
        <input className="form-control mb-3" placeholder="Question"
               name="openQuestion"
        />

        <input className="form-control mb-3" placeholder="Sample Answer"
               name="openAnswer"
        />

        <div className="row justify-content-center mt-3">
          <button className="btn btn-primary" onClick={props.handleSubmitOpenQuestion}>
            Add question to test
          </button>
        </div>
      </form>
    );
  };

  //TODO ADD SUBMITING DATA FROM FORM - NOW RERENDER AFTER BUTTON CLICK AND ADD '?' TO PATH
  const renderCloseQuestion = () => {
    return (
      <form>
        <input className="form-control mb-3" placeholder="Question"

        />

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox"/>
          </div>
          <input className="form-control" placeholder="Answer A"

          />
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox"/>
          </div>
          <input className="form-control" placeholder="Answer B"

          />
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox"/>
          </div>
          <input className="form-control" placeholder="Answer C"

          />
        </div>

        <div className="input-group-prepend mb-2">
          <div className="input-group-text">
            <input type="checkbox"/>
          </div>
          <input className="form-control" placeholder="Answer D"

          />
        </div>

        <div className="row justify-content-center mt-3">
          <button className="btn btn-primary" onClick={props.handleSubmitCloseQuestion}>
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
    