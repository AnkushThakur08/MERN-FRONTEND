import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

// Restricted Routes
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashBoard} />
      </Switch>
    </Router>
  );
};

export default Routes;
