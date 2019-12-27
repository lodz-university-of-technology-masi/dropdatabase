import React, {useContext, useState} from "react";
import "./ProfilePage.css";
import {Auth} from "aws-amplify";
import {AppContext} from "../../main/App";

export const ProfilePage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const {state, dispatch} = useContext(AppContext);
  const [username, setUsername] = useState("");
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");

  Auth.currentAuthenticatedUser({
      bypassCache: false
    }
  ).then(user => {
      if (Number(state.userAccountType) === 0) {
        setUserType("Candidate");
      } else if (Number(state.userAccountType) === 1) {
        setUserType("Recruiter");
      }

      setUsername(user.username);
      setEmail(user.attributes.email);
    }
  ).catch(err => console.log(err));

  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="">
      <div className="blur-background_blur container personal-card">
        <div className="text-white mb-3">

          <div className="card-header text-center">
            Personal Information
          </div>

          <div className="card-body">
            <h5 className="card-title">
              <label className="mdb-color-text">Type:&nbsp;</label>
              {userType}
            </h5>

            <h5 className="card-title">
              <label className="mdb-color-text">Username:&nbsp;</label>
              {username}
            </h5>

            <h5 className="card-title">
              <label className="mdb-color-text">Email:&nbsp;</label>
              {email}
            </h5>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
    