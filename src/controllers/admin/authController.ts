import { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../db/models/admin";

const login = async (req: Request, res: Response) => {
    try {
        const values = {
            email: req.body.email ?? '',
            password: req.body.password ?? ''
        };

        const data = await Admin.findOne({
            where: {
                email: values.email
            }
        });

        let passwordIsCorrect: boolean;

        if (!!data)
            passwordIsCorrect = await bcrypt.compare(values.password, data?.password as string);
        else
            passwordIsCorrect = false;

        await checkSchema({
            email: {
                notEmpty: { errorMessage: "Email tidak boleh kosong." },
                isEmail: { errorMessage: "Email harus berupa email." },
                custom: {
                    options: (async e => {
                        if (!!!data)
                            throw new Error('Email tidak ditemukan.');
                    })
                }
            },
            password: {
                notEmpty: { errorMessage: 'Password tidak boleh kosong.' },
                isLength: {
                    options: { min: 6, max: 255 },
                    errorMessage: 'Password berisi minimal 6 dan maksimal 255 karakter.'
                },
                custom: {
                    options: async e => {
                        if (!passwordIsCorrect)
                            throw new Error('Password tidak tepat.');
                    }
                }
            }
        }).run(req);
        const vResult = validationResult(req);

        if (!vResult.isEmpty()) {
            return res.send({
                success: false,
                vError: !vResult.isEmpty(),
                vResult: vResult
            });
        }

        if (!!data) {
            jwt.sign(
                {
                    id: data?.id,
                    email: data?.email,
                    role: 'admin'
                }, process.env.JWT_KEY as string, {
                expiresIn: '30d'
            }, (error, token) => {
                return res.send({
                    success: !!data,
                    token
                });
            });
        }
        else {
            return res.status(500).send({
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const getProfile = async (req: Request, res: Response) => {
    try {
        const data = await Admin.findOne({
            where: {
                id: res.locals.admin.id
            },

        });

        res.send({
            success: true,
            data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

export {
    login,
    getProfile
};