import { createContext, useReducer } from "react";

export const CustomerContext = createContext();

export const CustomerReducer = (state, action) => {
  switch (action.type) {
    case "SET_SELL":
      return { sellings: action.payload };
    case "CREATE_SELL":
      return { sellings: [action.payload, ...state.sellings] };
    case "DELETE_SELL":
      return {
        sellings: state.sellings.filter((w) => w._id !== action.payload),
      };
    case "UPDATE_SELL":
      return {
        sellings: state.sellings.map((sell) =>
          sell._id === action.payload._id ? action.payload : sell
        ),
      };
    default:
      return state;
  }
};

export const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, {
    sellings: [],
  });

  return (
    <CustomerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};
