import { CustomerContext } from "../contexts/CustomersContext";
import { useContext } from "react";

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
