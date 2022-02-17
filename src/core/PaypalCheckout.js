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
  //   console.log(info.instance); /* undefined */
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

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success w-100" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <p className="display-5">Please login or add something to cart</p>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    console.log("NONCE IS:", nonce); /* Undefined */
    let getNonce = info?.instance?.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      console.log("NONCE IS:", nonce); /* I am getting the Data */
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getFinalAmount(),
      };
      console.log(paymentData);

      processPayment(userId, token, paymentData)
        .then((response) => {
          console.log(response);
          setInfo({ ...info, success: true, loading: false });

          console.log("PAYMENT SUCCESSFUL");
          console.log(response);

          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };

          createOrder(userId, token, orderData);

          cartEmpty(() => {
            console.log("Did we got a Crash");
          });

          setReload(!reload);
        })
        .catch((error) => {
          console.log(error);
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
    /* .catch((error) => {
        setInfo({ loading: false, success: false });
        console.log("PAYMENT FAILED");
      }); */
  };

  const getFinalAmount = () => {
    let amount = 0;
    products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  return (
    <div>
      <button className="btn btn-success">
        Payment With Paypal {getFinalAmount()}
      </button>
      {showDropIn()}
    </div>
  );
};

export default PaypalCheckout;
