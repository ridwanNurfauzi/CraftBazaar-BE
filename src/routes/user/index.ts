import { Router } from "express";
import userAuth from './auth';
import products from './products';
import categories from './categories';

const router = Router();

router.use(userAuth);
router.use('/products', products);
router.use('/categories', categories);

export default router;