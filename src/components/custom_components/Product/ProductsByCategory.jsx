import { setProducts } from "@/redux/reducers/productReducer";
import { fetchProductData } from "@/utils/productService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "./ProductCard";

const ProductsByCategory = () => {
  const navigate = useNavigate();
  const { category } = useParams();
  // redux
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    try {
      fetchProductData(`category/${category}`).then((res) => {
        dispatch(setProducts(res.products));
      });
    } catch (error) {
      console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-3">
        <div className="text-2xl pb-3 font-semibold flex ">
          <p className="cursor-pointer" onClick={() => navigate("/home")}>
            Product /
          </p>
          <p className="ml-2 text-slate-400">{category}</p>
        </div>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
          <ProductCard products={products} />
        </div>
      </div>
    </>
  );
};

export default ProductsByCategory;
