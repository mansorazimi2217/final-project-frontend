import { ProductsContext } from "../contexts/ProductContext";
import { useContext } from "react";

export const useProductsContext = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
