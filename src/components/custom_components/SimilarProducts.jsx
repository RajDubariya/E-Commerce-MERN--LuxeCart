import { similarProducts } from "@/utils/productService";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "./ProductCard";

const SimilarProducts = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const fetchSimilarProducts = async (id) => {
    try {
      const response = await similarProducts(id);
      setProducts(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSimilarProducts(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <p className="text-2xl font-semibold pb-3">Similar Products</p>
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
        {products.map((product) => (
          <SwiperSlide key={product?._id}>
            <ProductCard
              products={products}
              fetchSimilarProducts={fetchSimilarProducts}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

SimilarProducts.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default SimilarProducts;
