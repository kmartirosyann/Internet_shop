import React from "react";
import axios from "axios";

export const SET_DATA = "SET_DATA";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SORT_DATA_BY_PRICE_MIN = "SORT_DATA_MIN";
export const SORT_DATA_BY_PRICE_MAX = "SORT_DATA_MAX";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const TOGGLE_RIGHT_BLOCK = "TOGGLE_RIGHT_BLOCK";

const initialState = {
  data: [],
  categories: "all",
  itemprice: 0,
  cartItems: [],
  totalCount: 0,
  showRightBlock: false,
  count:0,
};

const reducer = (state, action) => {
  const actions = {
    [SET_DATA]: () => ({ ...state, data: action.payload }),
    [SET_CATEGORIES]: () => ({ ...state, categories: action.payload }),
    [SORT_DATA_BY_PRICE_MIN]: () => ({
      ...state,
      data: state.data.sort((a, b) => b.price - a.price),
    }),
    [SORT_DATA_BY_PRICE_MAX]: () => ({
      ...state,
      data: state.data.sort((a, b) => a.price - b.price),
    }),

    [ADD_TO_CART]: () => {
      const newItem = {
        ...state.cartItems,
        [action.payload.id]: !state.cartItems[action.payload.id]
          ? [action.payload]
          : [...state.cartItems[action.payload.id],action.payload ],
      };
        
      const allItems = [].concat.apply([], Object.values(newItem));
      const itemprice = allItems.reduce((sum, obj) => obj.item.price + sum, 0);
      
      return {
        ...state,
        cartItems: newItem,
        totalCount: allItems.length,
        itemprice: itemprice,
      };
    },
    [REMOVE_FROM_CART]:  () => {
      const itemLengt = state.cartItems[action.payload.id].length-1
      const cartItems = { ...state.cartItems,
        [action.payload.id]:state.cartItems[action.payload.id] && state.cartItems[action.payload.id].slice(0,itemLengt)};
     
      return {
        ...state,
        cartItems,
        totalCount: cartItems.length,
        itemprice:
          cartItems[action.payload.item.id] &&
          cartItems[action.payload.item.id].reduce(
            (result, { item }) => result + item.price,
            0
          ),
      };
    },
    [TOGGLE_RIGHT_BLOCK]: () => ({ ...state, showRightBlock: action.payload }),
  };
  console.log(state)
  return actions[action.type]();
};

export const MovieContext = React.createContext();

export const MovieProvider = (props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    let sort;
    if (state.categories === "all") {
      sort = "";
    } else sort = `/category/${state.categories}`;

    axios
      .get(`https://fakestoreapi.com/products${sort}`)
      .then(({ data }) => dispatch({ type: SET_DATA, payload: data }));
  }, [state.categories]);
  return (
    <MovieContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};
