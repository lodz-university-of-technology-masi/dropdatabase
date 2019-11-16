import React, {useState} from "react";

export const Home = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="container mt-5">
      <div class="card text-center">
        <h3 class="card-header text-center">
          Home
        </h3>

        <div className="card-body">
          <h5>Decide what you want to do by clicking button in navigation section</h5>

          <ul className="list-group list-group-flush mt-3">
            <li className="list-group-item">Display Test</li>
            <li className="list-group-item">Create Test</li>
            <li className="list-group-item">Update Test</li>
            <li className="list-group-item">Delete Test</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
    