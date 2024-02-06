import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/custom_components/Home";
import Login from "./components/custom_components/Login";
import Register from "./components/custom_components/Register";
import SellerPanel from "./components/custom_components/SellerPanel";
import { useEffect, useState } from "react";
import { getUser } from "./utils/userService";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const user = getUser();
    setUser(user);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/signup" element={user ? <Home /> : <Register />} />
        <Route path="/seller" element={<SellerPanel />} />
        <Route path="/home" element={user ? <Home /> : <Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
