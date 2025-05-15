import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { ProductsContextProvider } from "./contexts/ProductContext.jsx";
import { CustomerContextProvider } from "./contexts/CustomersContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <CustomerContextProvider>
          <App />
        </CustomerContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
