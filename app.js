import express from "express";
import categoryRoutes from "./src/routes/categoryRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

const app = express();
app.use(express.json());

// REGISTER ROUTES
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log("Server running on port 3000"));