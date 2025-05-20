import { useAuthContext } from "./useAuthContext";
// import { useProductsContext } from "./useProductsContext";
// import { useCustomerContext } from "./useCustomerContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  // const { dispatch: productDispatch } = useProductsContext();
  // const { dispatch: customerDispatch } = useCustomerContext();
  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    // productDispatch({ type: "SET_PRODUCT", payload: null });
    // customerDispatch({ type: "SET_CUSTOMER", payload: null });
    navigate("/login");
  };

  return logout;
};
