import express, { Request, Response, Router } from "express";
import userRoutes from './user';
import sellerRoutes from './seller';
import adminRoutes from './admin';

import expressListEndpoints from "express-list-endpoints";
import path from "path";

const router = Router();

router.use('/public', express.static(path.join(__dirname, '../../public')));

router.get('/', (req: Request, res: Response) => {
    return res.send({
        success: true
    });
});

router.use('/user', userRoutes);
router.use('/seller', sellerRoutes);
router.use('/admin', adminRoutes);

router.all((expressListEndpoints(router).map(e => e.path)), (req: Request, res: Response) => {
    res.status(405).send({
        success: false,
        status: res.statusCode
    });
});

router.use((req: Request, res: Response) => {
    res.status(404).send({
        success: false,
        status: res.statusCode
    });
});

export default router;
