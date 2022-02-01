import React from "react";
import NavBar from "./NavBar";

const Base = ({
  title = "My Title",
  description = "This is Description",
  className = "text-white p-4",
  children,
}) => {
  return (
    <div>
      <NavBar />
      <div className="container-fluid">
        <div className="jumbotron text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <div className={className}>{children}</div>
      </div>

      <footer className="footer mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you have any questions, please free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>

        <div className="container">
          <span className="text-muted">
            An Amazing place to <span className="text-white">Buy</span> T-shirt
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Base;
