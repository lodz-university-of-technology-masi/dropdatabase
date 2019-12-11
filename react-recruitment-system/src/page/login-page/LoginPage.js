import React, {useState} from "react";
import "./LoginPage.css";

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

  const handleSubmitLogin = (e) => {
    e.preventDefault();

    if (isEmptyInputs(e.target.inputUsername, e.target.inputPassword)) {
      alert("All inputs must be fill in");
      return;
    }

    setUsername(e.target.inputUsername.value);
    setPassword(e.target.inputPassword.value);
  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="container blur-background">
      <div className="row justify-content-center sign-div">
        <form className="sign-form" onSubmit={handleSubmitLogin}>
          <header className="h4 sign-header">Sign in</header>

          <input type="text" name="inputUsername"
                 className="form-control sign-input" placeholder="Username"
          />

          <input type="password" name="inputPassword"
                 className="form-control sign-input" placeholder="Password"
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
