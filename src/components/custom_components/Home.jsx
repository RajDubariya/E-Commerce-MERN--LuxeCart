import { getProducts } from "@/utils/productService";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Navbar from "./Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const products = await getProducts();
        setProducts(products);
      };
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <Navbar />
      <ProductCard products={products} />
    </>
  );
};

export default Home;
