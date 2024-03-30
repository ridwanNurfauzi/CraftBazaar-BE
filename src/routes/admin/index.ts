import { Router } from "express";
import adminAuth from './auth';
import admins from './admins';

const router = Router();

router.use(adminAuth);
router.use('/admins', admins);

export default router;