import { Router } from "express";
import * as categories from "../../controllers/seller/categoriesController";
import { verifyToken } from "../../middleware/seller/verify";

const router = Router();

router.get('/', categories.index);


export default router;
