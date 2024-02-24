import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/custom_components/Home";
import Login from "./components/custom_components/Login";
import Register from "./components/custom_components/Register";
import SellerPanel from "./components/custom_components/SellerPanel";
import Product from "./components/custom_components/Product";
import ProductByCategory from "./components/custom_components/ProductsByCategory";
import { getUser } from "./utils/userService";
import Navbar from "./components/custom_components/Navbar";
import Cart from "./components/custom_components/Cart";

function App() {
  const user = getUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/seller"
          element={
            user?.isSeller ? (
              <SellerPanel />
            ) : (
              <>
                <Navbar />
                <p className=" capitalize text-2xl text-center">
                  you can not access this page
                  <p className="text-base">(as you are not a seller)</p>
                </p>
              </>
            )
          }
        />
        <Route path="/home" element={<Home />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/category/:category" element={<ProductByCategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
