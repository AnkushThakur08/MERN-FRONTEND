import React from "react";
import { API } from "../backend";
import Base from "./Base";
import NavBar from "./NavBar";

const Home = () => {
  return (
    <Base title="Home Page" description="I love Ankita">
      <h1 className="display-4 bg-transparent">Hello Front End</h1>
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">Test</button>
        </div>  
      </div>
    </Base>
  );
};

export default Home;
