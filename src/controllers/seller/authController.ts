import { Request, Response } from "express";
import Seller from "../../db/models/seller";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";

const register = async (req: Request, res: Response) => {
    try {
        res.locals.files = req.files;
        const photoIsExist = !!res.locals?.files.photo;

        const accounts = await Seller.findAll({ where: { email: req.body.email ?? '' } });

        await checkSchema({
            email: {
                notEmpty: { errorMessage: "Email tidak boleh kosong." },
                isEmail: { errorMessage: "Email harus berupa email." },
                custom: {
                    options: (async e => {
                        if (accounts.length > 0)
                            throw new Error('Email yang anda masukkan sudah ada.');
                    })
                }
            },
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
            },
            password: {
                notEmpty: { errorMessage: 'Password tidak boleh kosong.' },
                isLength: {
                    options: { min: 6, max: 255 },
                    errorMessage: 'Password berisi minimal 6 dan maksimal 255 karakter.'
                }
            },
            confirm_password: {
                notEmpty: { errorMessage: 'Konfirmasi password tidak boleh kosong.' },
                custom: {
                    options: (async e => {
                        if (e != req.body.password)
                            throw new Error('Konfirmasi password harus sesuai dengan password');
                    })
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
        else {
            let values: any = {
                email: req.body.email,
                name: req.body.name,
                description: req.body.description,
                password: await bcrypt.hash(req.body.password, 7)
            };

            if (photoIsExist) {
                let filename = (new Date().getTime()).toString(16);
                let extension = path.extname(res.locals.files.photo.path);
                values['photo'] = filename + extension;

                await fs.promises.copyFile(res.locals.files.photo.path, path.join(`${__dirname}/../../../public/images/profiles/seller/${values['photo']}`));
            }

            const response = await Seller.create(values);

            return res.send({
                success: true,
                values,
                response
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const values = {
            email: req.body.email ?? '',
            password: req.body.password ?? ''
        };

        const data = await Seller.findOne({
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
                    role: 'seller'
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
        const data = await Seller.findOne({
            where: {
                id: res.locals.seller.id
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
    register,
    login,
    getProfile
};
