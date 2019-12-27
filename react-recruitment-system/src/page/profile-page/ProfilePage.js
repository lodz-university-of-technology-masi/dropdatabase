import React, {useState} from "react";
import "./ProfilePage.css";
import {Auth} from "aws-amplify";

export const ProfilePage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");

  Auth.currentAuthenticatedUser({
      bypassCache: false
    }
  ).then(user => {
      if (Number(user.attributes["custom:custom:account_type"]) === 0) {
        setUserType("Candidate");
      } else if (Number(user.attributes["custom:custom:account_type"]) === 1) {
        setUserType("Recruiter");
      }

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
              <label className="light-grey-font">Type:&nbsp;</label>
              {userType}
            </h5>

            <h5 className="card-title">
              <label className="light-grey-font">Email:&nbsp;</label>
              {email}
            </h5>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
    