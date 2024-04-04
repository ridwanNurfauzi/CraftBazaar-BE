import { Router } from "express";
import * as products from "../../controllers/user/productsController";
import { verifyToken } from "../../middleware/user/verify";

const router = Router();

router.get('/', products.index);

router.get('/slug/:slug', products.getBySlug);

export default router;
