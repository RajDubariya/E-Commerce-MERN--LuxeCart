import { getProducts } from "@/utils/productService";
import { useEffect, useState } from "react";
import User from "./User";
import Logo from "./Logo";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(<TiStarFullOutline key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  return (
    <>
      <div>
        <nav className="border-b p-3 px-6 flex items-center justify-between">
          <Logo />
          <User />
        </nav>
        <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-5 p-3">
          {products?.map((product) => (
            <div key={product._id}>
              <div className="bg-white border border-gray-200 rounded-md shadow p-2">
                <div className=" flex justify-center items-center p-3">
                  <img
                    src={product.imageurl}
                    alt={product.name}
                    className="mix-blend-multiply h-[10rem]"
                  />
                </div>

                <div className="p-3">
                  <h5 className="mb-2 text-xl tracking-tight text-gray-900 capitalize">
                    {product.name}
                  </h5>

                  <p className="mb-2 text-sm tracking-tight font-normal text-gray-700 ">
                    <sup>₹</sup>
                    {product.price}
                  </p>
                  <p className="mb-1 text-sm font-normal text-gray-700 ">
                    Brand: {product.brand}
                  </p>
                  <span className="font-normal text-gray-700 flex py-1">
                    {product.rating > 0 ? (
                      renderStars(product.rating)
                    ) : (
                      <TiStarOutline className=" text-yellow-400" />
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
