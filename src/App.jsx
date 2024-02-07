import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/custom_components/Home";
import Login from "./components/custom_components/Login";
import Register from "./components/custom_components/Register";
import SellerPanel from "./components/custom_components/SellerPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/seller" element={<SellerPanel />} />
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
