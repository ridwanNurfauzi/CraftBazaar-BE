import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import Seller from "../../db/models/seller";

dotenv.config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_KEY as string, async (error: VerifyErrors | null, decode) => {
            if (error) {
                return res.status(500).send({
                    success: false,
                    auth: false,
                    status: res.statusCode,
                    error
                });
            } else {
                res.locals.seller = decode;
                if (res.locals.seller.role != 'seller')
                    return res.status(403).send({
                        success: false,
                        auth: false,
                        status: res.statusCode
                    });
                const data = await Seller.findOne({
                    where: { id: res.locals.seller.id }
                });

                if (!data)
                    return res.status(401).send({
                        success: false,
                        auth: false,
                        status: res.statusCode
                    });

                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            auth: false,
            status: res.statusCode
        });
    }
};

export {
    verifyToken
};
