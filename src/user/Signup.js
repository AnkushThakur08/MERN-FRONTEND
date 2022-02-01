import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

const SignUp = () => {
  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group py-2">
              <label className="text-light">Name</label>
              <input className="form-control" type="text" />
            </div>

            <div className="form-group py-2">
              <label className="text-light">Email</label>
              <input className="form-control" type="text" type="email" />
            </div>

            <div className="form-group py-2">
              <label className="text-light">Password</label>
              <input className="form-control" type="text" type="password" />
            </div>

            <div class="d-grid py-3">
              <button className="btn btn-success btn-lg" type="button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  
  return (
    <Base title="Signup Here!!" description="Enter the Deatils to Signup">
      {signupForm()}
    </Base>
  );
};

export default SignUp;
