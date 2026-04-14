import { Router } from "express";
import { ProductController } from "../contrallers/product.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";

const router = Router();

// Public
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
// router.post("/", ProductController.createOne);
// router.patch("/:id",  ProductController.updateOne);
// router.delete("/:id",  ProductController.deleteOne);

// Admin only
router.post("/", authenticated, authorized("admin"), ProductController.createOne);
router.patch("/:id", authenticated, authorized("admin"), ProductController.updateOne);
router.delete("/:id", authenticated, authorized("admin"), ProductController.deleteOne);

export default router;