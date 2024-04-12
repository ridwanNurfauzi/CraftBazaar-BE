import { Router } from "express";
import * as products from "../../controllers/seller/productsController";
import { verifyToken } from "../../middleware/seller/verify";

const router = Router();

router.get('/', verifyToken, products.index);

router.get('/:product_id', verifyToken, products.show);

router.post('/', verifyToken, products.store);

router.put('/:product_id', verifyToken, products.update);

router.delete('/:product_id', verifyToken, products.destroy);


export default router;
