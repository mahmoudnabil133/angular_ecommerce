import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/auth.router.js";
import userRouter from "./routes/user.router.js";
import productRouter from "./routes/product.router.js";
import categoryRouter from "./routes/category.router.js";
import cartRouter from "./routes/cart.router.js";

dotenv.config();

const app = express();
app.set("etag", false);

// Middlewares
app.use(morgan("dev"));
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", (req, res, next) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ DB connected"))
  .catch((e) => {
    console.error("❌ DB connection failed:", e.message);
    process.exit(1);
  });

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/cart", cartRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 App running on port ${PORT}`));