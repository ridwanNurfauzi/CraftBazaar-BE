import { Router } from "express";
import userAuth from './auth';
import products from './products';
import categories from './categories';
import sellers from './sellers';
import carts from './carts';

const router = Router();

router.use(userAuth);
router.use('/products', products);
router.use('/categories', categories);
router.use('/sellers', sellers);
router.use('/carts', carts);

export default router;