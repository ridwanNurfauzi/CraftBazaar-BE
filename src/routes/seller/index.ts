import { Router } from "express";
import sellerAuth from './auth';
import products from './products';
import categories from './categories';

const router = Router();

router.use(sellerAuth);
router.use('/products', products);
router.use('/categories', categories);

export default router;