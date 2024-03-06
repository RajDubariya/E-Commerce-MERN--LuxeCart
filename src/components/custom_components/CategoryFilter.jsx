import { getCategories } from "@/utils/categoryService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CategoryFilter = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  useEffect(() => {
    fetchCategories();
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
