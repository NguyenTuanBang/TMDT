import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenvx from "@dotenvx/dotenvx";
import productRouter from './Route/product.Route.js';
import userRouter from './Route/userRoutes.js';
import path from 'path';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import globalErrorHandle from './Controller/errorController.js';
import AppError from './utils/appError.js';

dotenvx.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.use('/products', productRouter);
app.use("/api/users", userRouter);

// phục vụ file tĩnh
app.use(
  "/img/avatars",
  express.static(path.join(__dirname, "public/img/avatars"))
);

// xử lý 404
app.use((req, res, next) => {
  next(new AppError(`Không tìm thấy ${req.originalUrl} trên server này!`, 404));
});

// xử lý error
app.use(globalErrorHandle);

app.listen(process.env.PORT_LOCAL, () => {
  console.log(`Server is running on port ${process.env.PORT_LOCAL}`);
});
