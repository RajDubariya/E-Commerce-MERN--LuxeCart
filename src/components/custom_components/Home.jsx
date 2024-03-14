import { setProducts } from "@/redux/reducers/productReducer";
import { fetchProductData } from "@/utils/productService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryFilter from "./Product/CategoryFilter";
import ProductCard from "./Product/ProductCard";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    try {
      fetchProductData("getproducts").then((res) => {
        dispatch(setProducts(res));
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
