import React, { useState, useEffect } from "react";
import Base from "./Base";
import Card from "./Card";
import NavBar from "./NavBar";

// API Call
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to Tees Store">
      <div className="row text-center">
        <p className="display-5 text-white">All your Favorate Tees</p>
        {products.map((product, index) => (
          <div key={index} className="col-4 mb-4">
            {" "}
            <Card product={product} />
          </div>
        ))}
      </div>
    </Base>
  );
};

export default Home;
