import { setCategory } from "@/redux/reducers/categoryReducer";
import { getCategories } from "@/utils/categoryService";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    getCategories("getcategories").then((res) => {
      dispatch(setCategory(res));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="border border-slate-300 rounded-md h-fit px-3 py-2 ">
      {categories.map((category) => (
        <div
          key={category?._id}
          className="py-1"
          onClick={() => navigate(`/category/${category.name}`)}
        >
          <p className="bg-slate-500/80 rounded-lg py-1 px-2 text-white cursor-pointer">
            {category.name}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CategoryFilter;
