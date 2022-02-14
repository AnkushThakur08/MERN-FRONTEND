import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";

const Card = ({
  product,
  addtoCart = true,
  removefromCart = false,
  setReload = (f) => f,
  // function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "Default Title";
  const cardDescription = product ? product.description : "Default Description";
  const cardPrice = product ? product.price : "Default Price";

  const addToCart = () => {
    addItemToCart(product, () => setRedirect(true));
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCart = () => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
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
          onClick={() => {
            removeFromCart(product._id);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2 w-100"
        >
          Remove from cart
        </button>
      )
    );
  };
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        <div className="rounded border border-success p-2">
          {getARedirect(redirect)}
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4 w-100">
          {" "}
          &#x20b9; {cardPrice}
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
