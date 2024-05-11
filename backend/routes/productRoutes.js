import  express from "express";
const router= express.Router();
import { getProductBydId,getProducts } from "../controllers/productController.js";



router.route('/').get(getProducts);
router.route('/:id').get(getProductBydId);



export default router;