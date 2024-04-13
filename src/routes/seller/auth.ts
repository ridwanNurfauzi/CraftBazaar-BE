import { Router } from "express";
import * as auth from "../../controllers/seller/authController";
import { verifyToken } from "../../middleware/seller/verify";

const router = Router();

router.post('/login', auth.login);
router.post('/register', auth.register);

router.get('/profile', verifyToken, auth.getProfile);
router.put('/profile/:id', verifyToken, auth.updateProfile);

export default router;
