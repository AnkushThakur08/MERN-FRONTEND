import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import StripeCheckoutButton from "react-stripe-checkout";

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

  const makePayment = (token) => {
    //
  };

  const showStripeMethod = () => {
    return isAuthenticated() ? (
      <StripeCheckoutButton
        stripeKey=""
        token={makePayment}
        amount={getFinalAmout() * 100}
        currency="INR"
        name="Purchase your Tees"
        billingAddress
        shippingAddress
      >
        <button className="btn btn-success">Payment With Stripe</button>
      </StripeCheckoutButton>
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
