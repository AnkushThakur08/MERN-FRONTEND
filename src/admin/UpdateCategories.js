import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

// API Calls
import { getIndividualCategory, updateCategories } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateCategories = ({ match }) => {
  const { user, token } = isAuthenticated();

  const [values, setValues] = useState({
    name: "",
    error: true,
    success: false,
    updateCategory: "",
  });

  const { name, error, success, updateCategory } = values;

  const preload = (categoryId) => {
    getIndividualCategory(categoryId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, eror: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.categoryId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = event.target.value;

    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    if (updateCategory) {
      return (
        <p className="display-6 text-success">Category updated Successfully</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="display-6 text-danger">{error}</p>;
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "" });
    updateCategories(match.params.categoryId, user._id, token, { name }).then(
      (data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            updateCategory: data,
          });
        }
      }
    );
  };

  const goBack = () => {
    return (
      <div className="mt-2">
        <Link className="btn btn-sm btn-success mb-3" to="/admin/dashboard">
          Admin Home
        </Link>
      </div>
    );
  };
  const myCategoryForm = () => (
    <form>
      <div className="form-group">
        <p className="lead">Enter the Category Name</p>
        <input
          type="text"
          className="form-control my-3"
          placeholder="Ex. Summer"
          onChange={handleChange("name")}
          value={name}
          autoFocus
          required
        />

        <button onClick={onSubmit} className="btn btn-outline-info mb-2">
          Update Category
        </button>
      </div>
    </form>
  );

  return (
    <Base
      title="Manage Category Section"
      description="Manager your Categories here"
      className="container bg-info p-4"
    >
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
          {goBack()}
          {errorMessage()}
          {successMessage()}
          {myCategoryForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateCategories;
