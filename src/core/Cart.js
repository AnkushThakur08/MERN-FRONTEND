import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";

import { loadCart } from "./helper/CartHelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  console.log(products);

  const loadAllProducts = () => {
    return (
      <div>
        <h1 className="display-5">Your SuperAwesome Tees</h1>
        {products.map((product, index) => (
          <>
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removefromCart={true}
              setReload={setReload}
              reload={reload}
            />
            <br />
          </>
        ))}
      </div>
    );
  };

  const checkout = () => {
    return (
      <div>
        <h1 className="display-5">Checkout</h1>
      </div>
    );
  };

  return (
    <Base
      title="Cart Section"
      description="What you are waiting for! PURCHASE IT"
    >
      <div className="row">
        <div className="col-6 text-center">{loadAllProducts()}</div>
        <div className="col-6">{checkout()}</div>
      </div>
    </Base>
  );
};

export default Cart;
