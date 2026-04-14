import { Router } from "express";
import { CartController } from "../contrallers/cart.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";
import authorized from "../middlewares/authorized.middleware.js";

const router = Router();

// All cart routes require authentication
router.use(authenticated);

// Admin route
router.get("/all", authorized("admin"), CartController.getAll);
// User routes
router.get("/", CartController.getMyCart);
router.post("/add", CartController.addProduct);
router.delete("/remove/:productId", CartController.removeProduct);
router.delete("/clear", CartController.clearCart);


export default router;