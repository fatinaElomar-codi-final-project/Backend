import express from "express";
import uploadImage from "../middleware/upload.js";
import Product_controller from  ".././controllers/product_controller.js"
// import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", Product_controller.getAll);
router.get("/:id", Product_controller.getById);
// router.post("/",upload,Product_controller.addDish);
router.put( "/:id", uploadImage, Product_controller.updateProduct);
router.delete("/:id",Product_controller.deleteProduct);
router.post('/add', uploadImage('dishImage'), Product_controller.addProduct);
export default router;
