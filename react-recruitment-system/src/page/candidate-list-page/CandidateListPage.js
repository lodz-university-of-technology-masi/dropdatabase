import React, {Fragment, useEffect, useState} from "react";
import "./CandidateListPage.css";
import axios from "axios";

/**
 * This page displaying list of candidates for specific recruiter
 * @param props
 * @returns {unknown[]|*}
 * @constructor
 */
export const CandidateListPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [candidateArray, setCandidateArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //TODO ADD AXIOS WITH REAL URL AND REMOVE TEMP DATA IN ARRAY BELOW
    // axios.get("")
    //   .then((res) => {
    //     setCandidateArray(res.data);
    //     setIsLoaded(true);
    //   })
    //   .catch((err) => {
    //     setIsLoaded(true);
    //     alert(err.message)
    //   });

    // setIsLoaded(true);
    // setCandidateArray([
    //   {
    //     "username": "Kamil",
    //     "email": "abc@gmail.com"
    //   },
    //   {
    //     "username": "Artur",
    //     "email": "acde@gmail.com"
    //   }]);

  }, []);

  const renderCandidateId = (id) => {
    return (
      <h6 className="font-weight-bold text-center my-2">
        Candidate Identifier: {id}
      </h6>
    );
  };

  const renderDeleteCandidateButton = (it) => {
    return (
      <div className="row justify-content-center mt-2 mb-3">
        <button className="btn btn-danger" onClick={() => handleDeleteCandidate(it)}>
          Delete Candidate
        </button>
      </div>
    );
  };

  const renderCandidatePanel = (it, index) => {
    return (
      <Fragment key={index}>
        <section className="card container black-text my-5">
          <header className="card-header text-center">
            <h5 className="font-weight-bold black-text mb-1">Candidate</h5>
          </header>

          {renderCandidateId("15151515151515151VFUVFVNFKVSKLNVFNVFLFKVNFNVLFD")}

          <div className="card-body">
            <h5 className="card-title">
              <label className="mdb-color-text">Username:&nbsp;</label>
              {it.username}
            </h5>

            <h5 className="card-title">
              <label className="mdb-color-text">Email:&nbsp;</label>
              {it.email}
            </h5>
          </div>

          {renderDeleteCandidateButton(index)}
        </section>
      </Fragment>
    )
  };

  const handleDeleteCandidate = (index) => {
    let temp = [...candidateArray];
    temp.splice(index, 1);
    setCandidateArray(temp);
  };

  /*------------------------ RETURN REGION ------------------------*/
  if (isLoaded) {
    return (
      candidateArray.map((it, index) => {
        return renderCandidatePanel(it, index)
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

export default CandidateListPage;
    