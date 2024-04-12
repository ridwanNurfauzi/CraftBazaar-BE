import { Router } from "express";
import sellerAuth from './auth';
import products from './products';

const router = Router();

router.use(sellerAuth);
router.use('/products', products);

export default router;