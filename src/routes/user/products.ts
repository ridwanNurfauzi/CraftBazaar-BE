import { Router } from "express";
import * as products from "../../controllers/user/productsController";
import { verifyToken } from "../../middleware/user/verify";

const router = Router();

router.get('/', products.index);
router.get('/latest', products.latest);
router.get('/earliest', products.earliest);
router.get('/popular', products.popular);

router.get('/slug/:slug', products.getBySlug);

export default router;
