import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signIn" exact component={SignIn} />
      </Switch>
    </Router>
  );
};

export default Routes;
