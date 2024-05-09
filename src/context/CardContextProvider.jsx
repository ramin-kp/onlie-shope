import React, { useContext, useEffect, useReducer } from "react";
import { createContext } from "react";
import { sumProducts } from "../utils/helpers";
const productsData = JSON.parse(localStorage.getItem("products"));
const initialState = productsData || {
  selectedItems: [],
  total: 0,
  itemCounter: 0,
  checkout: false,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (
        !state.selectedItems.find((product) => product.id === action.payload.id)
      ) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
      }
      return {
        ...state,
        checkout: false,
        ...sumProducts(state.selectedItems),
      };

    case "REMOVE_ITEM":
      const newSelectedItem = state.selectedItems.filter(
        (product) => product.id !== action.payload.id
      );

      return {
        selectedItems: [...newSelectedItem],
        ...sumProducts(newSelectedItem),
      };

    case "INCREASE":
      const increaseIndex = state.selectedItems.findIndex(
        (product) => product.id === action.payload.id
      );

      state.selectedItems[increaseIndex].quantity++;
      return { ...state, ...sumProducts(state.selectedItems) };
    case "DECREASE":
      const decreaseIndex = state.selectedItems.findIndex(
        (product) => product.id === action.payload.id
      );
      state.selectedItems[decreaseIndex].quantity--;
      return {
        ...state,
        ...sumProducts(state.selectedItems),
      };
    case "CHECKOUT":
      return { selectedItems: [], total: 0, itemCounter: 0, checkout: true };

    default:
      throw new Error("error");
  }
};

const CardContext = createContext();

function CardContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(state));
  }, [state]);

  return (
    <CardContext.Provider value={{ state, dispatch }}>
      {children}
    </CardContext.Provider>
  );
}

const useCard = () => {
  const { state, dispatch } = useContext(CardContext);
  return [state, dispatch];
};

export default CardContextProvider;

export { useCard };
