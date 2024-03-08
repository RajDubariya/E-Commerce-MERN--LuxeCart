import { truncateHeading } from "@/utils/constants";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products, fetchSimilarProducts }) => {
  const navigate = useNavigate();

  const renderStars = (product) => {
    const sumOfRatings = product?.ratings?.reduce((total, ratingobj) => {
      const rating = ratingobj?.rating;
      return total + rating;
    }, 0);

    const avgRating = Math.floor(sumOfRatings / product?.numberOfRatings);
    const stars = [];
    for (let i = 0; i < avgRating; i++) {
      stars.push(<TiStarFullOutline key={i} className="text-yellow-400" />);
    }
    return stars;
  };

  const handleClick = (id) => {
    if (id) {
      navigate(`/product/${id}`);
      fetchSimilarProducts(id);
    }
  };

  return (
    <>
      {products?.map((product) => (
        <motion.div
          className="cursor-pointer bg-white border border-slate-300/80 rounded-md shadow-md shadow-slate-300/50"
          key={product._id}
          onClick={() => handleClick(product?._id)}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className=" p-2">
            <div className=" flex justify-center items-center p-3">
              <img
                src={product.imageurl}
                alt={product.name}
                className="mix-blend-multiply h-[9rem]"
              />
            </div>

            <div className="p-3">
              <h5 className="mb-2 text-lg tracking-wide font-semibold text-slate-500  capitalize">
                {truncateHeading(product.name)}
              </h5>

              <p className="mb-2 text-sm tracking-tight font-semibold text-gray-500 ">
                <sup>₹</sup>
                {product.price}
              </p>
              <p className="mb-1 text-sm font-normal text-gray-700 ">
                Brand: {product.brand}
              </p>
              <span className="font-normal text-gray-700 flex py-1">
                {product.numberOfRatings > 0 ? (
                  renderStars(product)
                ) : (
                  <TiStarOutline className="text-yellow-400" />
                )}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.array.isRequired,
  fetchSimilarProducts: PropTypes.func,
};

export default ProductCard;
