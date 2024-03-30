import { Router } from "express";
import userAuth from './auth';

const router = Router();

router.use(userAuth);

export default router;