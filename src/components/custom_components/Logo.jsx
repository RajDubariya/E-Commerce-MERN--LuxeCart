import { useNavigate } from "react-router-dom";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <h1
      onClick={() => navigate("/home")}
      className="ruthie-regular text-4xl text-center cursor-pointer"
    >
      Luxe Cart
    </h1>
  );
};

export default Logo;
