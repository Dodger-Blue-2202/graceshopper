//Get/create order
//logged in user - get order from database

// guest we create order locally
//Add products to your order

//

import axios from "axios";
import { setError } from "./errorReducer";
import history from "../history";

const TOKEN = "token";
const ADD_TO_ORDER = "ADD_TO_ORDER";
const REMOVE_FROM_ORDER = "REMOVE_FROM_ORDER";
const SET_ORDER = "SET_ORDER";
/**
 * ACTION CREATORS
 */

//An order contains just a array of products and associated user maybe

const setOrder = (orders) => ({ type: SET_ORDER, orders });
const removeFromOrder = (product) => ({ type: REMOVE_FROM_ORDER, product });
const addToOrder = (order) => ({ type: ADD_TO_ORDER, order }); //will add product to orders array
/**
 * THUNK CREATORS
 */

export const fetchOrders = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    try {
      const res = await axios.get("/api/orders", {
        headers: { authorization: token },
      });
      //returns all orders if we have admin access
      dispatch(setOrder(res.data));
    } catch (err) {
      dispatch(setError("Error getting order data."));
    }
  }
};

export const removeFromCart = (product) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      await axios.delete(`/api/orders/products`, {
        data: product,
        headers: { authorization: token },
      });
    }
    dispatch(removeFromOrder(product));
    //update store
  } catch (err) {
    dispatch(setError("There was an error removing from cart"));
  }
};

export const addToCart = (product, qty) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      await axios.post(`/api/orders/products`, {
        data: { product, qty },
        headers: { authorization: token },
      });
    }
    dispatch(addToOrder({ product, qty }));
    //update store
  } catch (err) {
    dispatch(setError("There was an error adding to cart"));
  }
};

export const checkOut = (order) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  //VERIFY AUTHORIZATION WITH TOKEN
  try {
    await axios.put(`/api/orders/checkout`, {
      data: order,
      headers: { authorization: token },
    }); // if token exists in authorization then checkout order by setting isCart to false identified by token
    //Otherwise create an order and add that to order db with null user and checkout
    //then we want to create a new order to fill
    dispatch(setOrder([])); //clears cart to set up new order
  } catch (err) {
    dispatch(
      setError(
        "Error getting order data. Current user might not have admin access"
      )
    );
  }
};

export const signUp = (order) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    await axios.post(`/api/orders/`, {
      data: order,
      headers: { authorization: token },
    }); // signing up will add to the db all the items in your cart
  } catch (err) {
    dispatch(
      setError(
        "Error getting order data. Current user might not have admin access"
      )
    );
  }
};

export const logout = () => {
  //clear orders state when we log out of account
  return {
    type: SET_ORDER,
    orders: [],
  };
};

/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case SET_ORDER:
      return action.orders;
    case REMOVE_FROM_ORDER:
      return state.filter((item) => {
        return item.product.id !== action.product.id;
      });
    case ADD_TO_ORDER:
      var temp = -1;
      state.forEach((order, index) => {
        if (order.product.id === action.product.id) {
          temp = index;
        }
      });
      if (temp !== -1) {
        state[temp] = action.order;
        return state;
      } else {
        return [...state, action.order];
      }

    default:
      return state;
  }
}
