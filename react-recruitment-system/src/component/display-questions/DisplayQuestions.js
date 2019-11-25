import React from "react";
import PropTypes from "prop-types";

export const DisplayQuestions = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const renderDeleteTestButton = () => {
    return (
      <div className="row justify-content-center mb-4">
        <button className="btn btn-danger white-text"
                onClick={props.handleDeleteTest}>
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
    if(!it.open){
        Object.keys(it).map((it2, index)=>{
            if(it2.includes("answer")){
               if(it.correct.includes(it2[it2.length-1])){
                items.push (
              <li className="list-group-item green" key={index}>
                   {it2}:  {it[it2]}
              </li>
            );    
               }else{
                   items.push (
              <li className="list-group-item" key={index}>
                   {it2}:  {it[it2]}
              </li>
            );   
               }
            }
        })
        return (<ul className="list-group list-group-flush mt-3 card"><h4 className="text-center">Question: {it.questionContent}</h4>{items}</ul>); 
    }else{
        return (<ul className="list-group list-group-flush mt-3 card"><h4 className="text-center">Question: {it.questionContent}</h4><li className="list-group-item">Anwser: {it.questionAnswer}</li></ul>); 
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

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <section className="card container my-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-1">Questions in the Test</h5>
        </header>

        {props.isRemovable ? renderDeleteTestButton() : null}

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

        {props.isChangeable ? renderCreateTestButton() : null}
      </section>
    </>
  );
};

DisplayQuestions.propTypes = {
  isChangeable: PropTypes.bool,
  isRemovable: PropTypes.bool,
  questionArray: PropTypes.array,
  handleDeleteQuestion: PropTypes.func,
  postTestToServer: PropTypes.func,
  handleDeleteTest: PropTypes.func,
};

export default DisplayQuestions;
    