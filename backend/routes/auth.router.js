import { Router } from "express";
import { AuthController } from "../contrallers/auth.controller.js";
import authenticated from "../middlewares/authenticated.middleware.js";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", authenticated, AuthController.logout);
router.post("/refresh", AuthController.refresh);

export default router;