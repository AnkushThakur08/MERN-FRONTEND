import React from "react";
import ImageHelper from "./helper/ImageHelper";

const Card = ({ product, addtoCart = true, removefromCart = false }) => {
  const showAddToCart = () => {
    return (
      addtoCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-success mt-2 mb-2 w-100"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = () => {
    return (
      removefromCart && (
        <button
          onClick={() => {}}
          className="btn btn-block btn-outline-danger mt-2 mb-2 w-100"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">A photo from pexels</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          <ImageHelper />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          this photo looks great
        </p>
        <p className="btn btn-success rounded  btn-sm px-4 w-100">
          {" "}
          &#x20b9; 5
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removefromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
