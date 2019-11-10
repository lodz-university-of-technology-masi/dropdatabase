import React, {Component} from "react";
import Styles from "./App.module.css"
import Navbar from "../component/navbar/Navbar";
import Routes from "./Routes";
import {BrowserRouter} from "react-router-dom";

export class App extends Component {

  /*------------------------ FIELDS REGION ------------------------*/

  /*------------------------ METHODS REGION ------------------------*/

  /*------------------------ RENDER REGION ------------------------*/
  render() {
    return (
      <BrowserRouter>
        <div className={Styles.App}>
          <Navbar msg={"Recruitment System"}/>
          <Routes/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
