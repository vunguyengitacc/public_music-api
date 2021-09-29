import Result from "../../helpers/result.helper";
import Category from "./category.model";

const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find().lean();
    return Result.success(res, { categories });
  } catch (err) {
    next(err);
  }
};

const getOne = async (req, res, next) => {
  try {
    const categoryId = req.params;
    const category = await Category.findById(categoryId)
      .populate("songs")
      .lean();
    return Result.success(res, { category });
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const data = { ...req.body };
    const newCategory = await Category.create(data);
    return Result.success(res, { newCategory });
  } catch (err) {
    next(err);
  }
};

const categoryController = {
  getAll,
  getOne,
  create,
};

export default categoryController;
