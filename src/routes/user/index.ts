import { Router } from "express";
import userAuth from './auth';
import products from './products';

const router = Router();

router.use(userAuth);
router.use('/products', products);

export default router;