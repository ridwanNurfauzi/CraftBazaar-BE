import { Router } from "express";
import * as auth from "../../controllers/admin/authController";
import { verifyToken } from "../../middleware/admin/verify";

const router = Router();

router.post('/login', auth.login);

router.get('/profile', verifyToken, auth.getProfile);
router.put('/profile/:id', verifyToken, auth.updateProfile);

export default router;
