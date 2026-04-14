import { Router } from "express";
import { UserController } from "../contrallers/user.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";

const router = Router();

// Admin only
router.get("/", authenticated, authorized("admin"), UserController.getAll);
router.get("/:id", authenticated, authorized("admin"), UserController.getById);
router.patch("/:id", authenticated, authorized("admin"), UserController.updateOne);
router.delete("/:id", authenticated, authorized("admin"), UserController.deleteOne);

export default router;