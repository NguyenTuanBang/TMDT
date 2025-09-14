import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenvx from "@dotenvx/dotenvx"
import productRouter from './Route/product.Route.js';

dotenvx.config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)

app.use('/products', productRouter);

app.listen(process.env.PORT_LOCAL, () => {
    console.log(`Server is running on port ${process.env.PORT_LOCAL}`);
});
