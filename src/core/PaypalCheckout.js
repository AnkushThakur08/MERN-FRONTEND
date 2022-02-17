import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";
import { getmeToken, processPayment } from "./helper/PaypalHelper";

import DropIn from "braintree-web-drop-in-react";

const PaypalCheckout = ({
  products,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const showDriopIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-lg w-100" onClick={() => {}}>
              Pay with PayPal
            </button>
          </div>
        ) : (
          <p className="display-5">Please Login or add Something to Cart</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <button className="btn btn-success">Payment With Paypal</button>
      {showDriopIn()}
    </div>
  );
};

export default PaypalCheckout;
