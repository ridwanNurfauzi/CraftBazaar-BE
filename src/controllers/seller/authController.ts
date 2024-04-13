import { Request, Response } from "express";
import Seller from "../../db/models/seller";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import path from "path";
import fs from "fs";
import { HasMany } from "sequelize";
import Subscription from "../../db/models/subscription";

function generateSellerCode() {
    const num = Math.floor(Math.random() * 0xffffff) + 1;
    let code = num.toString(16);
    while (code.length < 6) {
        code = '0' + code;
    }
    return code;
}

const register = async (req: Request, res: Response) => {
    try {
        res.locals.files = req.files;
        const photoIsExist = !!res.locals?.files.photo;

        const accounts = await Seller.findAll({ where: { email: req.body.email ?? '' } });
        const names = await Seller.findAll({ where: { name: req.body.name ?? '' } });

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
                custom: {
                    options: (async e => {
                        if (names.length > 0)
                            throw new Error('Nama yang anda masukkan sudah ada.');
                    })
                }
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

            let code = generateSellerCode();
            while (!!await Seller.findOne({ where: { code } })) {
                code = generateSellerCode();
            }
            values['code'] = code;

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
            include: [
                {
                    association: new HasMany(Seller, Subscription, {
                        foreignKey: 'seller_id',
                        as: 'subscriber'
                    })
                }
            ]
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

const updateProfile = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const data = await Seller.findOne({ where: { id } });

        res.locals.files = req.files;
        const photoIsExist = !!res.locals?.files.photo;

        await checkSchema({
            email: {
                notEmpty: { errorMessage: "Email tidak boleh kosong." },
                isEmail: { errorMessage: "Email harus berupa email." }
            },
            name: {
                notEmpty: { errorMessage: "Nama depan tidak boleh kosong." },
            },
            password: {
                custom: {
                    options: (async e => {
                        if (!!e) {
                            if (e.length < 6 || e.length > 255)
                                throw new Error('Password berisi minimal 6 dan maksimal 255 karakter.');
                        }
                    })
                }
            },
            confirm_password: {
                custom: {
                    options: (async e => {
                        if (!!req.body.password) {
                            if (!!!e)
                                throw new Error('Konfirmasi password tidak boleh kosong.');
                            if (e != req.body.password)
                                throw new Error('Konfirmasi password harus sesuai dengan password');
                        }
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
                description: req.body.description ?? '',
                photo: null
            };

            if (!!req.body.password)
                values['password'] = await bcrypt.hash(req.body.password, 7);

            if (fs.existsSync(path.join(`${__dirname}/../../../public/images/profiles/seller/${data?.photo}`)))
                await fs.promises.unlink(path.join(`${__dirname}/../../../public/images/profiles/seller/${data?.photo}`));

            if (photoIsExist) {
                let filename = (new Date().getTime()).toString(16);
                let extension = path.extname(res.locals.files.photo.path);
                values['photo'] = filename + extension;

                await fs.promises.copyFile(res.locals.files.photo.path, path.join(`${__dirname}/../../../public/images/profiles/seller/${values['photo']}`));
            }

            const response = await Seller.update(values, { where: { id } });

            return res.send({
                success: true,
                values,
                data: response
            });
        }
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
    getProfile,
    updateProfile
};
