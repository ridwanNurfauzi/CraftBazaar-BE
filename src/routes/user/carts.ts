import { Router } from "express";
import * as carts from "../../controllers/user/cartsController";
import { verifyToken } from "../../middleware/user/verify";

const router = Router();

router.get('/', verifyToken, carts.index);

router.post('/', verifyToken, carts.store);

router.delete('/:id', verifyToken, carts.destroy);

router.put('/increment/:product_id', verifyToken, carts.increment);
router.put('/decrement/:product_id', verifyToken, carts.decrement);

router.put('/select/:product_id', verifyToken, carts.select);

export default router;
