import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const ProductsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { products: action.payload };
    case "CREATE_PRODUCT":
      return { products: [action.payload, ...state.products] };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((w) => w._id !== action.payload._id),
      };
    case "UPDATE_PRODUCT":
      return {
        products: state.products.map((product) =>
          product._id === action.payload._id ? action.payload : product
        ),
      };
    default:
      return state;
  }
};

export const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, {
    products: [],
  });

  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
