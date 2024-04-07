import { Router } from "express";
import adminAuth from './auth';
import admins from './admins';
import categories from './categories';

const router = Router();

router.use(adminAuth);

router.use('/admins', admins);
router.use('/categories', categories);

export default router;