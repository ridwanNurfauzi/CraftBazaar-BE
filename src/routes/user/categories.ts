import { Router } from "express";
import * as categories from "../../controllers/user/categoriesController";
import { verifyToken } from "../../middleware/user/verify";

const router = Router();

router.get('/', categories.index);

router.get('/:category', categories.getProductByCategory);

export default router;
