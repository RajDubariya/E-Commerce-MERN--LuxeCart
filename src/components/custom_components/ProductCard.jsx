import PropTypes from "prop-types";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ products }) => {
  const navigate = useNavigate();

  const renderStars = (product) => {
    const sumOfRatings = product?.ratings.reduce(
      (total, rating) => total + rating,
      0
    );

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
    }
  };

  return (
    <>
      <div className="grid xl:grid-cols-6 md:grid-cols-3 sm:grid-cols-2 gap-5 p-3 ">
        {products?.map((product) => (
          <div
            className="cursor-pointer"
            key={product._id}
            onClick={() => handleClick(product?._id)}
          >
            <div className="bg-white border border-gray-200 rounded-md shadow-md p-2">
              <div className=" flex justify-center items-center p-3">
                <img
                  src={product.imageurl}
                  alt={product.name}
                  className="mix-blend-multiply h-[9rem]"
                />
              </div>

              <div className="p-3">
                <h5 className="mb-2 text-lg tracking-wide font-semibold text-gray-900 capitalize">
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
                  {product.numberOfRatings > 0 ? (
                    renderStars(product)
                  ) : (
                    <TiStarOutline className="text-yellow-400" />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

ProductCard.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ProductCard;