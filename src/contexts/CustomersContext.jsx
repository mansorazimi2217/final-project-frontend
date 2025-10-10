import { createContext, useReducer } from "react";

export const CustomerContext = createContext();

export const CustomerReducer = (state, action) => {
  console.log(state.mycustomers);
  switch (action.type) {
    case "SET_CUSTOMER":
      return { mycustomers: action.payload };
    case "CREATE_CUSTOMER":
      return { mycustomers: [action.payload, ...state.mycustomers] };
    case "DELETE_CUSTOMER":
      return {
        mycustomers: state.mycustomers.filter((w) => w._id !== action.payload),
      };
    case "UPDATE_CUSTOMER":
      return {
        mycustomers: state.mycustomers.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    default:
      return state;
  }
};

export const CustomerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CustomerReducer, {
    mycustomers: [],
  });

  return (
    <CustomerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CustomerContext.Provider>
  );
};
