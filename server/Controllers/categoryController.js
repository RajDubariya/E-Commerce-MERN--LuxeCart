import Category from "../Models/category.js";

const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = new Category({
      name: category,
    });

    await newCategory.save();

    res.status(200).json(newCategory);
  } catch (error) {
    console.error(`error while creating category (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const getCategoryByName = async (req, res) => {
  try {
    const { category } = req.params;

    const foundCategory = await (
      await Category.findOne({ name: category })
    ).populate({
      path: "products",
    });

    res.status(200).json(foundCategory);
  } catch (error) {
    console.error(`error while fetching a category (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error(`error while fetching categories (backend)`);
    console.error(error);
    res.status(500).json(error);
  }
};

export { createCategory, getCategoryByName, getAllCategories };
