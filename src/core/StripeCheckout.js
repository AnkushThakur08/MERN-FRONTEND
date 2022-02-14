import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";

const StripeCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
    
  const [data, setData] = useState({
    loading: false,
    success: false,
    error: "",
    address: "",
  });

  const token = isAuthenticated() && isAuthenticated().token;
  const userId = isAuthenticated() && isAuthenticated().user._id;

  const getFinalAmout = () => {
    let amount = 0;
    products.map((individualProduct) => {
      amount = amount + individualProduct.price;
    });
    return amount;
  };

  const showStripeMethod = () => {
    return isAuthenticated() ? (
      <button className="btn btn-success">Payment With Stripe</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-warning">SignIn Required</button>
      </Link>
    );
  };

  return (
    <div>
      <h2 className="text-white">Stripe Checkout &#x20b9; {getFinalAmout()}</h2>
      {showStripeMethod()}
    </div>
  );
};

export default StripeCheckout;
