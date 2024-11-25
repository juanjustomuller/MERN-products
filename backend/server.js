import express from 'express';
import dotenv from 'dotenv';
import path from "path";
import { connectDb } from './config/db.js';
import productRoute from './routes/productRoute.js';

dotenv.config();

const app = express();

app.use(express.json()); //nos permite recibir data json a traves del req.body
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

app.use('/api/products', productRoute)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDb();
    console.log("Server started at http://localhost:" + PORT)
})