import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Cart from "./components/custom_components/Cart/Cart";
import Home from "./components/custom_components/Home";
import Login from "./components/custom_components/User/Login";
import Navbar from "./components/custom_components/Navbar";
import Product from "./components/custom_components/Product/Product";
import ProductByCategory from "./components/custom_components/Product/ProductsByCategory";
import Register from "./components/custom_components/User/Register";
import SellerPanel from "./components/custom_components/User/SellerPanel";
import UpdateUserForm from "./components/custom_components/User/UpdateUserForm";
import { getUser } from "./utils/userService";
import { Toaster } from "sonner";

function App() {
  const user = getUser();
  const location = useLocation();

  const isUserLoggedIn = !!user;
  const page = location.pathname === "/" || location.pathname === "/signup";

  //redirect user to home page if user is already logged in
  if (
    isUserLoggedIn &&
    (location.pathname === "/" || location.pathname === "/signup")
  ) {
    return <Navigate to="/home" />;
  }

  //redirect user to login  page if user is not logged in
  if (!isUserLoggedIn && !page) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Toaster richColors />
      {!page && <Navbar />}
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
        <Route path="/updatedetails" element={<UpdateUserForm />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
