import { Router } from "express";

import {
  listProducts,
  showProduct,
  createProduct,
  editProduct,
  deleteProduct,
} from "../controllers/productController.js";

import validator from "../middlewares/validator.js";
import schema from "./productValidator.js";

const router = Router();
router.get("/", listProducts);
router.get("/:_id", showProduct);
router.post("/", validator(schema), createProduct);
router.put("/:_id", validator(schema), editProduct);
router.delete("/:_id", deleteProduct);

export default router; 