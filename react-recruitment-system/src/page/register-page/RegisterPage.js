import React, {useState} from "react";
import "./RegisterPage.css";
import {LOGIN_PATH} from "../../constants";
import {Auth} from "aws-amplify";

export const RegisterPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
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

  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    if (isEmptyInputs(e.target.inputUsername, e.target.inputEmail,
      e.target.inputPassword, e.target.inputRepeatPassword, e.target.selectRole)) {
      alert("All inputs must be fill in");
      return;
    }

    if (e.target.inputPassword.value === e.target.inputRepeatPassword.value) {
      setUsername(e.target.inputUsername.value);
      setEmail(e.target.inputEmail.value);
      setPassword(e.target.inputPassword.value)
    } else {
      alert("Passwords don't match!")
    }

    try {
      await Auth.signUp({
        //  TODO
      });

      document.location.replace(LOGIN_PATH);
    } catch (e) {
      alert(e.message)
    }

  };

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <>
      <div className="container blur-background">
        <div className="row justify-content-center register-div">
          <form className="register-form" onSubmit={handleSubmitRegister}>
            <header className="h4 register-header">Register</header>

            <input className="form-control register-input" type="text"
                   placeholder="Username" name="inputUsername"
            />
            <input className="form-control register-input" type="text"
                   placeholder="E-mail" name="inputEmail"
            />
            <input className="form-control register-input" type="password"
                   placeholder="Password" name="inputPassword"
            />
            <input className="form-control register-input" type="password"
                   placeholder="Repeat Password" name="inputRepeatPassword"
            />

            <select className="browser-default custom-select register-input" name="selectRole">
              <option value="" disabled selected>Choose Role</option>
              <option value="0">Candidate</option>
              <option value="1">Recruiter</option>
            </select>

            <button className="btn btn-indigo register-button" type="submit">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
    