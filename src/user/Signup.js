import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

// Method Which interate with DB
import { signup } from "../auth/helper";

const SignUp = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    // We can create Multiple methods for email and password, but with EVENT(higher order Function) and [name] :... we CAN RESUSE THIS
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(console.log("Error in Signup"));
  };

  const signupForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left ">
          <form>
            <div className="form-group py-2">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
              />
            </div>

            <div className="form-group py-2">
              <label className="text-light">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="text"
                type="email"
              />
            </div>

            <div className="form-group py-2">
              <label className="text-light">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="text"
                type="password"
              />
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
