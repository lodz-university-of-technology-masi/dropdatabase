import React, {useEffect, useState} from "react";
import {FIREBASE_PATH} from "../../constants";
import axios from "axios";
import "./CreateTest.css";

export const CreateTest = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [questionArray, setQuestionArray] = useState([
    {"name": "sample"},
    {"name": "sample2"},
    {"name": "sample3"},
  ]);

  const postTest = () => {
    axios.post(FIREBASE_PATH, questionArray).then(() => alert("Test has been sent"));
  };

  const handleSwitchClick = () => {
    setIsOpenQuestion(!isOpenQuestion);
  };

  const onClickSubmitOpenQuestion = () => {

  };

  const onClickSubmitCloseQuestion = () => {

  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <section className="card container mt-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-3">Add New Question</h5>
        </header>

        <div className="row justify-content-center">
          <button className="btn btn-primary" onClick={handleSwitchClick}>
            Change to {isOpenQuestion ? "Close Question" : "Open Question"}
          </button>
        </div>

        <div className="card-body">
          {
            isOpenQuestion ?
              <form>
                <input className="form-control mb-3" placeholder="Question"
                       onInput={(e) => console.log(e.target.value)}
                />
                <input className="form-control mb-3" placeholder="Sample Answer"
                       onInput={(e) => console.log(e.target.value)}
                />
              </form>
              :
              <form>
                <input className="form-control mb-3" placeholder="Question"
                       onInput={(e) => console.log(e.target.value)}
                />

                <div className="input-group-prepend mb-2">
                  <div className="input-group-text">
                    <input type="checkbox"/>
                  </div>
                  <input className="form-control" placeholder="Answer A"
                         onInput={(e) => console.log(e.target.value)}
                  />
                </div>

                <div className="input-group-prepend mb-2">
                  <div className="input-group-text">
                    <input type="checkbox"/>
                  </div>
                  <input className="form-control" placeholder="Answer B"
                         onInput={(e) => console.log(e.target.value)}
                  />
                </div>

                <div className="input-group-prepend mb-2">
                  <div className="input-group-text">
                    <input type="checkbox"/>
                  </div>
                  <input className="form-control" placeholder="Answer C"
                         onInput={(e) => console.log(e.target.value)}
                  />
                </div>

                <div className="input-group-prepend mb-2">
                  <div className="input-group-text">
                    <input type="checkbox"/>
                  </div>
                  <input className="form-control" placeholder="Answer D"
                         onInput={(e) => console.log(e.target.value)}
                  />
                </div>
              </form>
          }

          <div className="row justify-content-center">
            <button className="btn btn-primary">
              Add question to test
            </button>
          </div>

        </div>
      </section>

      <section className="card container mt-5">
        <header className="card-body row justify-content-center">
          <h5 className="font-weight-bold mb-3">Question in the Test</h5>
        </header>

        <ul className="list-group list-group-flush mt-3">
          {
            questionArray.map((it, index) => {
              return <li className="list-group-item" key={index}>{it.name}</li>
            })
          }
        </ul>

        <div className="row justify-content-center">
          <button className="btn btn-primary" onClick={postTest}>
            Create Test
          </button>
        </div>

      </section>
    </>
  );
};

export default CreateTest;
