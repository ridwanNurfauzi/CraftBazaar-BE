import { Router } from "express";
import * as products from "../../controllers/user/productsController";
import { verifyToken, getTokenDecode } from "../../middleware/user/verify";

const router = Router();

router.get('/', products.index);
router.get('/latest', products.latest);
router.get('/earliest', products.earliest);
router.get('/popular', products.popular);

router.get('/slug/:slug', getTokenDecode, products.getBySlug);
router.delete('/reviews/:id', verifyToken, products.removePersonalReview);
router.post('/reviews/post', verifyToken, products.addReview);

export default router;
