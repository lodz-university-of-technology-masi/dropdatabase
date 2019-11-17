import React from "react";
import {BrowserRouter} from "react-router-dom";
import Navbar from "../component/navbar/Navbar";
import Routes from "./Routes";

export const App = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <BrowserRouter>
      <Navbar msg={"Recruitment System"}/>
      <Routes/>
    </BrowserRouter>
  );
};

export default App;
