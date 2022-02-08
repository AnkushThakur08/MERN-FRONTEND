import React, { useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [error, setError] = useState(true);
  const [success, setSuccess] = useState(false);
  // const [message, setMessage] = useState("");

  const { user, token } = isAuthenticated();

  const goBack = () => {
    return (
      <div className="mt-2">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };

  const handleChange = (event) => {
    setError("");
    setName(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    // Backend Request
    createCategory(user._id, token, { name }).then((data) => {
      // setMessage(data.error);
      if (data.error) {
        setError(data.error);
        setSuccess(false);
      } else {
        setError("");
        setSuccess(true);
        setName("");
      }
    });
  };

  const successMessage = () => {
    if (success) {
      return (
        <p className="display-6 text-success">Category Created Successfully</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="display-6 text-danger">{error}</p>;
    }
  };

  /*  const showMessage = () => {
    if (message) {
      return <p className="display-6 text-danger">{message}</p>;
    }
  }; */

  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category</p>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Ex. Summer"
          onChange={handleChange}
          value={name}
          autoFocus
          required
        />

        <button onClick={onSubmit} className="btn btn-outline-info mb-2">
          Create Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Create a Category"
      description="Add a New Category for T-Shirts"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {/* {showMessage()} */}
          {successMessage()}
          {errorMessage()}
          {myCategoryForm()}
          {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
