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
        <div className="jumbotron text-white text-center py-4">
          <h2 className="display-5">{title}</h2>
          <p className="lead">{description}</p>
        </div>

        <div className={className}>{children}</div>
      </div>

      {/* <footer className="footer fixed-bottom mt-auto">
        <div className="container-fluid bg-success text-white text-center py-6">
          <h6>If you have any questions, please free to reach out!</h6>
          <button className="btn btn-warning mb-2">Contact Us</button>
        </div>

        <div className="container text-center">
          <span className="text-muted">
            An Amazing place to <span className="text-white">Buy T-shirt</span>
          </span>
        </div>
      </footer> */}
    </div>
  );
};

export default Base;
