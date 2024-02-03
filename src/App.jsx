import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./components/custom_components/Register";
import Login from "./components/custom_components/Login";
import SellerPanel from "./components/custom_components/SellerPanel";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/seller" element={<SellerPanel />} />
      </Routes>
    </>
  );
}

export default App;
