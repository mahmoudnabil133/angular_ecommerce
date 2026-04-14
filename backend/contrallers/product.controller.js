import mongoose from "mongoose";
import Product from "../models/product.model.js";
import HTTPError from "../utils/HttpError.js";

export class ProductController {
  static async getAll(req, res, next) {
    try {
      const { category, minPrice, maxPrice, inStock, page = 1, limit = 10 } = req.query;
      const filter = {};

      if (category) filter.categoryId = category;
      if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
      }
      if (inStock === "true") filter.inStock = { $gt: 0 };

      const skip = (Number(page) - 1) * Number(limit);
      const total = await Product.countDocuments(filter);
      const docs = await Product.find(filter)
        .populate("categoryId", "name")
        .skip(skip)
        .limit(Number(limit));

      return res.status(200).json({
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        docs,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid product id"));

      const doc = await Product.findById(id).populate("categoryId", "name");
      if (!doc) return next(new HTTPError(404, "Product not found"));

      return res.status(200).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async createOne(req, res, next) {
    try {
      const doc = await Product.create(req.body);
      return res.status(201).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async updateOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid product id"));

      const doc = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return next(new HTTPError(404, "Product not found"));

      return res.status(200).json({ doc });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id))
        return next(new HTTPError(400, "Invalid product id"));

      const doc = await Product.findByIdAndDelete(id);
      if (!doc) return next(new HTTPError(404, "Product not found"));

      return res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
}