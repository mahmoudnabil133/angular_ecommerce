import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import HTTPError from "../utils/HttpError.js";

export class CartController {
  // GET /cart  — get the logged-in user's cart
  static async getMyCart(req, res, next) {
    try {
      const userId = req.user.userId;
      let cart = await Cart.findOne({ userId }).populate("products", "name price inStock");

      if (!cart) {
        // Return an empty cart instead of an error — friendlier UX
        return res.status(200).json({ cart: { userId, products: [] } });
      }

      return res.status(200).json({ cart });
    } catch (err) {
      next(err);
    }
  }

  // POST /cart/add  — add a product to the cart  { productId }
  static async addProduct(req, res, next) {
    try {
      const userId = req.user.userId;
      const { productId } = req.body;

      if (!productId || !mongoose.Types.ObjectId.isValid(productId))
        return next(new HTTPError(400, "Valid productId is required"));

      const product = await Product.findById(productId);
      if (!product) return next(new HTTPError(404, "Product not found"));
      if (product.inStock <= 0)
        return next(new HTTPError(400, "Product is out of stock"));

      let cart = await Cart.findOne({ userId });

      if (!cart) {
        cart = await Cart.create({ userId, products: [productId] });
      } else {
        // Avoid duplicates — push only if not already present
        if (!cart.products.map(String).includes(String(productId))) {
          cart.products.push(productId);
          await cart.save();
        }
      }

      await cart.populate("products", "name price inStock");
      return res.status(200).json({ cart });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /cart/remove/:productId  — remove a product from the cart
  static async removeProduct(req, res, next) {
    try {
      const userId = req.user.userId;
      const { productId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(productId))
        return next(new HTTPError(400, "Invalid productId"));

      const cart = await Cart.findOne({ userId });
      if (!cart) return next(new HTTPError(404, "Cart not found"));

      const before = cart.products.length;
      cart.products = cart.products.filter((p) => String(p) !== String(productId));

      if (cart.products.length === before)
        return next(new HTTPError(404, "Product not in cart"));

      await cart.save();
      await cart.populate("products", "name price inStock");

      return res.status(200).json({ cart });
    } catch (err) {
      next(err);
    }
  }

  // DELETE /cart/clear  — empty the cart
  static async clearCart(req, res, next) {
    try {
      const userId = req.user.userId;
      const cart = await Cart.findOneAndUpdate(
        { userId },
        { products: [] },
        { new: true }
      );

      if (!cart) return next(new HTTPError(404, "Cart not found"));

      return res.status(200).json({ message: "Cart cleared", cart });
    } catch (err) {
      next(err);
    }
  }

  // Admin: GET /cart/all
  static async getAll(req, res, next) {
    try {
      const carts = await Cart.find()
        .populate("userId", "fullName email")
        .populate("products", "name price");

      return res.status(200).json({ carts });
    } catch (err) {
      next(err);
    }
  }
}