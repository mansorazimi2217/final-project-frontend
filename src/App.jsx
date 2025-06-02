import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";
import Dashboard from "./pages/dashboard/Dashboard";
import Register2 from "./pages/register/Register2";
import Login2 from "./pages/login/Login2";
import UpdateProfileImage from "./pages/updates/UpdateProfile";
import ProductsPage from "./pages/produts/ProductsPage";
import CustomersPage from "./pages/CustomersPage";
import SellingPage from "./pages/sellProductPage/SellingPage";
import SoldProductsPage from "./pages/SoldProductsPage/SoldProductsPage";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import DueCustomersPage from "./pages/due/DueCustomersPage";
import ShowReturnDues from "./pages/due/ShowReturnDues";
import "./App.css";
import EarningReportPage from "./pages/earning/EarningReportsPage";
import ExpensesPage from "./pages/expenses/ExpensesPage";
import ExpensesLayout from "./pages/expenses/ExpensesLayout";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login2 />}></Route>
          <Route path="/register" element={<Register2 />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route
              path="/dashboard/updateprofile"
              element={<UpdateProfileImage />}
            ></Route>
            <Route
              path="/dashboard/products"
              element={<ProductsPage />}
            ></Route>
            <Route
              path="/dashboard/customers"
              element={<CustomersPage />}
            ></Route>
            <Route
              path="/dashboard/sellingpage"
              element={<SellingPage />}
            ></Route>
            <Route
              path="/dashboard/soldproducts"
              element={<SoldProductsPage />}
            ></Route>
            <Route
              path="/dashboard/duecustomers"
              element={<DueCustomersPage />}
            ></Route>
            <Route
              path="/dashboard/duecustomers/return"
              element={<ShowReturnDues />}
            ></Route>
            <Route
              path="/dashboard/earningreport"
              element={<EarningReportPage />}
            ></Route>
            <Route
              path="/dashboard/expenses"
              element={<ExpensesLayout />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
