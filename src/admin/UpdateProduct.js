import React, { useState, useEffect } from "react";
import { Link, Redirect, Route } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";

// Api Method
import {
  updateProduct,
  getCategories,
  getIndividualProduct,
} from "./helper/adminapicall";

const UpdateProduct = ({ match }) => {
  const { user, token } = isAuthenticated();

  //Creation of state
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getaRedirect: false,
    formData: "",
  });

  // Destructure
  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getaRedirect,
    formData,
  } = values;

  const preloadCategory = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  const preload = (productId) => {
    getIndividualProduct(productId).then((data) => {
      console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        preloadCategory();
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          stock: data.stock,
          category: data.category._id,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.productId);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    updateProduct(match.params.productId, user._id, token, formData).then(
      (data) => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            description: "",
            price: "",
            stock: "",
            photo: "",
            loading: false,
            createdProduct: data,
          });
          redirectWithDelay();
        }
      }
    );
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => {
    if (createdProduct) {
      return (
        <p className="display-6 text-success">Product Updated Successfully</p>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <p className="display-6 text-danger">{error}</p>;
    }
  };

  const redirectWithDelay = () => {
    if (!loading) {
      setTimeout(() => {
        <Route>
          <Redirect to="/admin/dashboard" />;
        </Route>;
        console.log("ANKUSH");
      }, 2000);
    }
  };

  const createProductForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group py-2">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>

      <div className="form-group py-2">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>

      <div className="form-group py-2">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>

      <div className="form-group py-2">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>

      <div className="form-group py-2">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>

          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group py-2">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success my-3"
      >
        Update Product
      </button>
    </form>
  );

  return (
    <Base
      title="Product Creation Section"
      description="Admin can add new product"
      className="container bg-info p-4"
    >
      <Link to="/admin/dashboard" className="btn btn-md btn-success mb-3">
        Admin Home
      </Link>

      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {errorMessage()}
          {successMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
