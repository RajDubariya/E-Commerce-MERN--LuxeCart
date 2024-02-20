import { getProductsByCategory } from "@/utils/productService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsByCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const response = await getProductsByCategory(category);
        setProducts(response?.products);
      };

      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <>
      <ProductCard products={products} />
    </>
  );
};

export default ProductsByCategory;
