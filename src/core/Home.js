import React from "react";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <Base title="Home Page" description="I love Ankita">
      <div className="row text-center">
        <div className="col-4">
          <Card />
        </div>
        <div className="col-4">
          <Card />
        </div>
        <div className="col-4">
          <Card />
        </div>
      </div>
    </Base>
  );
};

export default Home;
