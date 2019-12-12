import React, {useState} from "react";
import "./LoginPage.css";
import {Auth} from "aws-amplify";
import {SLASH} from "../../constants";

export const LoginPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isEmptyInputs = (...elements) => {
    let result = false;

    elements.forEach((it) => {
      if (it.value === "") {
        result = true;
      }
    });

    return result;
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    if (isEmptyInputs(e.target.inputUsername, e.target.inputPassword)) {
      alert("All inputs must be fill in");
      return;
    }

    try {
      await Auth.signIn(username, password);
      alert("Logged in");
      document.location.replace(SLASH);
    } catch (e) {
      alert(e.message);
    }
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="container blur-background">
      <div className="row justify-content-center sign-div">
        <form className="sign-form" onSubmit={handleSubmitLogin}>
          <header className="h4 sign-header">Sign in</header>

          <input className="form-control sign-input" value={username}
                 onChange={(e) => setUsername(e.target.value)}
                 type="text" name="inputUsername" placeholder="Username"
          />

          <input className="form-control sign-input" value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 type="password" name="inputPassword" placeholder="Password"
          />

          <button className="btn btn-indigo sign-button" type="submit">
            Sign in
          </button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;
