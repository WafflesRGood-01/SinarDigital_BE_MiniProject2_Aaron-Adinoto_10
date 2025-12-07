import express from "express";
import * as productController from "../controllers/productController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.get("/", productController.getAll);
router.post("/", upload.single("image"), productController.create);
router.put("/:id", upload.single("image"), productController.update);
router.delete("/:id", productController.remove);

export default router;