import PropTypes from "prop-types";
import { TiStarFullOutline } from "react-icons/ti";

function ProductReviews({ product }) {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < rating; i++) {
      stars.push(
        <TiStarFullOutline key={i} className="text-yellow-400" size={16} />
      );
    }
    return stars;
  };

  const ratingsArray = product?.ratings;

  return (
    <>
      <p className="px-4 text-2xl font-semibold">Customer Reviews</p>
      {ratingsArray?.length > 0 ? (
        <div className="p-4 grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {ratingsArray?.map((rating) => (
            <div
              key={rating._id}
              className="border border-slate-300 p-3 px-5 capitalize rounded-md shadow-md"
            >
              <p className="text-xl text-slate-400">{rating.postedby?.name}</p>
              <div className="flex items-center py-0.5">
                {renderStars(rating.rating)}
              </div>
              <p>{rating?.review}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className=" capitalize text-center py-5 text-lg">
          no customer reviews !!
        </p>
      )}
    </>
  );
}

ProductReviews.propTypes = {
  product: PropTypes.object,
};
export default ProductReviews;
