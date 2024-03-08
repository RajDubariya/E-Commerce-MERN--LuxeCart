import { getProducts } from "@/utils/productService";
import { useEffect, useState } from "react";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

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
    <div className="flex p-3">
      <div>
        <p className="pb-2 text-xl font-medium">Categories :</p>
        <CategoryFilter />
      </div>
      <div className="ml-4">
        <p className="pb-2 text-xl font-medium">Featured Products :</p>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          <ProductCard products={products} />
        </div>
      </div>
    </div>
  );
};

export default Home;
