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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-3">
        <div className="text-2xl pb-3 font-semibold flex">
          <p>Product /</p>
          <p className="ml-2 text-slate-400">{category}</p>
        </div>
        <ProductCard products={products} />
      </div>
    </>
  );
};

export default ProductsByCategory;
