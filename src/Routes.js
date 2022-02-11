import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Components
import Home from "./core/Home";
import SignIn from "./user/Signin";
import SignUp from "./user/Signup";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import AddCategory from "./admin/AddCategory";
import addProduct from "./admin/AddProduct";
import ManageCategories from "./admin/ManageCategories";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategories from "./admin/UpdateCategories";

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
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AddCategory}
        />

        <AdminRoute
          path="/admin/create/products"
          exact
          component={addProduct}
        />

        <AdminRoute
          path="/admin/categories"
          exact
          component={ManageCategories}
        />

        <AdminRoute
          path="/admin/allProducts"
          exact
          component={ManageProducts}
        />

        <AdminRoute
          path="/admin/product/update/:productId"
          exact
          component={UpdateProduct}
        />

        <AdminRoute
          path="/admin/categories/update/:categoryId"
          exact
          component={UpdateCategories}
        />
      </Switch>
    </Router>
  );
};

export default Routes;
