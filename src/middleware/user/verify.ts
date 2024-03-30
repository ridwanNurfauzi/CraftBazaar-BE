import jwt, { VerifyErrors } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import User from "../../db/models/user";

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
                res.locals.user = decode;
                if (res.locals.user.role != 'user')
                    return res.status(403).send({
                        success: false,
                        auth: false,
                        status: res.statusCode
                    });
                const data = await User.findOne({
                    where: { id: res.locals.user.id }
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
