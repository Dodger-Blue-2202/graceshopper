import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import SingleProduct from "./components/SingleProduct";
import Users from "./components/Users";
import Cart from "./components/Cart";
import EditProduct from "./components/EditProduct";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { me } from "./store";
import Checkout from "./components/Checkout";
import AllProducts from "./components/AllProducts";

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/edit/:id" component={EditProduct} />
            <Route exact path="/checkout" component={Checkout} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/products" component={AllProducts} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/checkout" component={Checkout} />
            <Redirect to="/" />
          </Switch>
        )}
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
