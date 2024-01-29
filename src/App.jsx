import './App.css'
import { Route, Routes } from "react-router-dom";
import Register from "./components/custom_components/Register";
import Login from "./components/custom_components/Login";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/signup" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
