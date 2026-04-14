import mongoose from "mongoose";
import Category from "../models/category.model.js";
import HTTPError from "../utils/HttpError.js";

export class CategoryController {
  static async getAll(req, res, next) {
    try {
      const docs = await Category.find().sort({ name: 1 });
      return res.status(200).json({ docs });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid category id"));

      const doc = await Category.findById(id);
      if (!doc) return next(new HTTPError(404, "Category not found"));

      return res.status(200).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const doc = await Category.create(req.body);
      return res.status(201).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid category id"));

      const doc = await Category.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return next(new HTTPError(404, "Category not found"));

      return res.status(200).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid category id"));

      const doc = await Category.findByIdAndDelete(id);
      if (!doc) return next(new HTTPError(404, "Category not found"));

      return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}