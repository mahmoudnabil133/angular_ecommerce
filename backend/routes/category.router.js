import { Router } from "express";
import { CategoryController } from "../contrallers/category.controller.js"
import authenticated from "../middlewares/authenticated.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";

const router = Router();

// Public
router.get("/", CategoryController.getAll);
router.get("/:id", CategoryController.getById);

// Admin only
router.post("/", authenticated, authorized("admin"), CategoryController.createOne);
router.patch("/:id", authenticated, authorized("admin"), CategoryController.updateOne);
router.delete("/:id", authenticated, authorized("admin"), CategoryController.deleteOne);

export default router;