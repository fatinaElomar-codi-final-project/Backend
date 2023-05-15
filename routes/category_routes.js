import express from "express";
import category_controller from "../controllers/category_controller.js"
import uploadImage from ".././middleware/upload.js"
// import verifyToken, { verifyAdmin } from "../middleware/auth.js";
const router = express.Router();

router.get("/", category_controller.getAll);
router.get("/:id", category_controller.getById);
router.post('/add', uploadImage('CategoryImage'),category_controller.addCategory);

router.put( "/:id",  category_controller.updateCategorys);
router.delete("/:id",  category_controller.deleteCategory);  
export default router;
