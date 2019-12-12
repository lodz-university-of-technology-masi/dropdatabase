import React from "react";
import "./ProfilePage.css";

export const ProfilePage = (props) => {

  /*----------------------- VARIABLE REGION -----------------------*/
  // TODO ADD DISPLAYING REAL DATA FROM AWS
  /*------------------------ RETURN REGION ------------------------*/
  return (
    <div className="blur-background">
      <div className="container personal-card">
        <div className="card text-white indigo mb-3">

          <div className="card-header text-center">
            Personal Information
          </div>

          <div className="card-body">
            <h5 className="card-title">
              <label className="light-grey-font">Type:&nbsp;</label>
              {"temp"}
            </h5>

            <h5 className="card-title">
              <label className="light-grey-font">Email:&nbsp;</label>
              {"temp"}
            </h5>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
    