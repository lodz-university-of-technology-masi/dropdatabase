import React, {useState} from "react";

export const CreateDisplayQuestions = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <section className="card container my-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-3">Questions in the Test</h5>
        </header>

        <ul className="list-group list-group-flush mt-3">
          {
            props.questionArray.map((it, index) => {
              return (
                <li className="list-group-item" key={index}>
                  {it.name}
                  <button className="btn btn-danger white-text float-right"
                          onClick={props.handleDeleteQuestion}
                  >
                    Delete
                  </button>
                </li>
              );
            })
          }
        </ul>

        <div className="row justify-content-center my-3">
          <button className="btn btn-primary" onClick={props.postTestToServer}>
            Create Test
          </button>
        </div>
      </section>
    </>
  );
};

export default CreateDisplayQuestions;
    