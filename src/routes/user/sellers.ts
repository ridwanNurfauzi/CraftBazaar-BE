import { Router } from "express";
import * as sellers from "../../controllers/user/sellersController";
import { verifyToken } from "../../middleware/user/verify";

const router = Router();

router.get('/', sellers.index);
router.get('/code/:code', sellers.show);
router.get('/subscriptions', verifyToken, sellers.subscriptions);
router.get('/subscriptions/products', verifyToken, sellers.productFromSubscriptions);

router.post('/subscribe', verifyToken, sellers.subscribe);

export default router;
