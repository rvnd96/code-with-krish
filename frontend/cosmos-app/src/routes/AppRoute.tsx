import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CustomerPage from "../pages/CustomerPage";
import ProductPage from "../pages/ProductPage";
import OrderPage from "../pages/OrderPage";
import Layout from "../layout/Layout";
import AddCustomer from "../components/AddCustomer";

const AppRoute = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="/customers/add" element={<AddCustomer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoute;
