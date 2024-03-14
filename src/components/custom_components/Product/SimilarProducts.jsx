import { setSimilarProducts } from "@/redux/reducers/productReducer";
import { fetchProductData } from "@/utils/productService";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ productId }) => {
  const dispatch = useDispatch();
  const { similarProducts } = useSelector((state) => state.product);

  const fetchSimilarProducts = (id) => {
    try {
      fetchProductData(`similar/${id}`).then((res) => {
        dispatch(setSimilarProducts(res));
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSimilarProducts(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="p-4">
        <p className="text-2xl font-semibold pb-3">Similar Products</p>
        {similarProducts?.length > 0 ? (
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 50,
              },
            }}
            modules={[Pagination]}
          >
            {similarProducts.map((product) => (
              <SwiperSlide key={product?._id}>
                <ProductCard
                  products={similarProducts}
                  fetchSimilarProducts={fetchSimilarProducts}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className=" capitalize text-center py-5 text-lg">
            no similar products
          </p>
        )}
      </div>
    </>
  );
};

SimilarProducts.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default SimilarProducts;
