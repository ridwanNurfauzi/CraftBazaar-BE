import { Router } from "express";
import sellerAuth from './auth';

const router = Router();

router.use(sellerAuth);

export default router;