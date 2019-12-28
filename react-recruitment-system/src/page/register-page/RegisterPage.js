import React, {useState} from "react";
import "./RegisterPage.css";
import {HOME_PATH} from "../../constants";
import {Auth} from "aws-amplify";

export const RegisterPage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState(0);

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
      e.target.inputPassword, e.target.selectRole)) {
      alert("All inputs must be fill in");
      return;
    }

    try {
      await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
          'custom:custom:account_type': userRole,
        }
      });

      document.location.replace(HOME_PATH);
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
                   placeholder="Username" name="inputUsername" value={username}
                   onChange={(e) => setUsername(e.target.value)}
            />
            <input className="form-control register-input" type="text"
                   placeholder="E-mail" name="inputEmail" value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
            <input className="form-control register-input" type="password"
                   placeholder="Password" name="inputPassword" value={password}
                   onChange={(e) => setPassword(e.target.value)}
            />

            <select className="browser-default custom-select register-input" name="selectRole"
                    onChange={(e) => setUserRole(e.target.value)}>
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
    