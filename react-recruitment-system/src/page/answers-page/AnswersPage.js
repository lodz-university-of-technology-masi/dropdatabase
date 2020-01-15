import React, {Fragment, useEffect, useState} from "react";
import "./AnswersPage.css";
import axios from "axios";

/**
 * This page displaying list of answers for specific recruiter
 * @param props
 * @returns {unknown[]|*}
 * @constructor
 */
export const AnswersPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [answersArray, setAnswersArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    axios.get( "https://lwn1nhn8s4.execute-api.us-east-1.amazonaws.com/cc_candidates/candidate/solutions/all", {
      params: {
        'token': sessionStorage.getItem('token')
      }
    })
        .then((res) => {
          console.log(res);
          setAnswersArray(res.data);
          setIsLoaded(true);
        })
        .catch((err) => {
          setIsLoaded(true);
          alert(err.message)
        });
  }, [])

    const renderQuestions = (it) => {
        setTimeout(()=>{setFull(it)}, 100);
        return(it.test.questions.map((item, index) =>{
            console.log(it.testUUID);
            return (
                <div className="col-md-3"><div className="card col-md-12">
                    <div>Question: {item.questionContent}</div>
                    <div>Correct answer: {item.questionAnswer}</div>
                    <div>Answer: {it.answers[index]}</div>
                    <input type="range" list="tickmarks" min="0" max="10" id={"r"+it.testUUID+index} onChange={event=>{
                        setFull(it);
                        document.getElementById('score'+it.testUUID+index).innerHTML = document.getElementById('r'+it.testUUID+index).value*1
                    }}/>
                    <datalist id="tickmarks">
                      <option value="0"></option>
                      <option value="1"></option>
                      <option value="2"></option>
                      <option value="3"></option>
                      <option value="4"></option>
                      <option value="5"></option>
                      <option value="6"></option>
                      <option value="7"></option>
                      <option value="8"></option>
                      <option value="9"></option>
                      <option value="10"></option>
                    </datalist>
                    <div>Score: <span id={"score"+it.testUUID+index}>10</span></div>
                </div><br/></div>
            )
        }))
    }
    
  const handleSubmitScore = (it) => {

    try {
        console.log(document.getElementById('full'+it.testUUID).innerHTML);
      axios.post( "https://lwn1nhn8s4.execute-api.us-east-1.amazonaws.com/cc_candidates/candidate/solutions", {
        'requestToken': sessionStorage.getItem('token'),
        'score': document.getElementById('full'+it.testUUID).innerHTML,
        'testUUID': it.testUUID
    }).then((res) => {
        console.log(res);
          
        document.location.reload()
        })
    } catch (e) {
      alert(e.message)
    }

  };
    
    const perc2color = (perc) => {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    
    const setFull = (it)=>{
        var sum = 0;
        var i = 0;
        it.test.questions.map((item, index)=>{
            sum += document.getElementById('r'+it.testUUID+index).value*1;
            i = index;
        })
        document.getElementById('full'+it.testUUID).innerHTML = Math.floor((sum/(i+1))*1000)/100;
    }
    
    const displayScored = (score)=>{
        if(score){
            return (
                <h3 className='black-text' style={{background: perc2color(score)}}>Already scored for {score}%</h3>
            )
        }
        return
    }
  const renderAnswerPanel = (it, index) => {
    return (
      <Fragment key={index}>
        <section className="card container black-text my-5">
          <header className="card-header text-center">
            <h5 className="font-weight-bold black-text mb-1">Answer</h5>
            {displayScored(it.score)}
          </header>

          <h6 className="font-weight-bold text-center my-2">
            Answer Identifier: {it.testUUID}
          </h6>
        
          <div className="card-body">
            <h5 className="card-title">
              <label className="mdb-color-text">Username:&nbsp;</label>
              {it.username}
            </h5>

            <div className="row">
                {renderQuestions(it)}
            </div><hr/>
            <div>Score for answer <span id={"full"+it.testUUID}></span>%</div>
            <button className="btn btn-outline-dark" onClick={()=>{handleSubmitScore(it)}}>Send Score</button>
            
          </div>
        </section>
      </Fragment>
    )
  };

  /*------------------------ RETURN REGION ------------------------*/
  if (isLoaded) {
      
    answersArray.sort((it, other)=>{return (it.score)?1:-1});
    return (
    answersArray.map((it, index) => {          
        return renderAnswerPanel(it, index)
      })
    );
  } else {
    return (
      <div className="container margin-text text-center">
        <h2 className="font-weight-bold">
          Loading...
        </h2>
      </div>
    );
  }
};

export default AnswersPage;

    