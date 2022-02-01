import React from "react";
import { Link, withRouter } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#FFFFFF" };
  }
};

const NavBar = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link style={currentTab(history, "/")} className="nav-link " to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/cart")}
            className="nav-link"
            to="/cart"
          >
            Cart
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/user/dashboard")}
            className="nav-link "
            to="/user/dashboard"
          >
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/admin/dashboard")}
            className="nav-link"
            to="/admin/dashboard"
          >
            Admin Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/signup")}
            className="nav-link "
            to="/signup"
          >
            SignUp
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/SignIn")}
            className="nav-link "
            to="/signIn"
          >
            SignIn
          </Link>
        </li>

        <li className="nav-item">
          <Link
            style={currentTab(history, "/signout")}
            className="nav-link "
            to="/signout"
          >
            SignOut
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default withRouter(NavBar);
