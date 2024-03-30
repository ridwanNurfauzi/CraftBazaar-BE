import { Request, Response } from "express";
import Admin from "../../db/models/admin";
import { checkSchema, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const index = async (req: Request, res: Response) => {
    try {
        const data = await Admin.findAll();
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

const store = async (req: Request, res: Response) => {
    try {
        res.locals.files = req.files;
        const photoIsExist = !!res.locals?.files.photo;

        const accounts = await Admin.findAll({
            where: { email: req.body.email ?? '' }
        });

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
                password: await bcrypt.hash(req.body.password, 7)
            };

            if (photoIsExist) {
                let filename = (new Date().getTime()).toString(16);
                let extension = path.extname(res.locals.files.photo.path);
                values['photo'] = filename + extension;

                await fs.promises.copyFile(res.locals.files.photo.path, path.join(`${__dirname}/../../../public/images/profiles/admin/${values['photo']}`));
            }

            const response = await Admin.create(values);

            return res.status(201).send({
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

const show = async (req: Request, res: Response) => {
    try {
        const data = await Admin.findOne({
            where: { id: req.params.id }
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

const update = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        res.locals.files = req.files;
        const photoIsExist = !!res.locals?.files.photo;

        const data = await Admin.findOne({ where: { id } });

        let values: any = {
            email: req.body.email,
            name: req.body.name
        };

        if (!!req.body.password)
            values['password'] = await bcrypt.hash(req.body.password, 7);

        await checkSchema({
            email: {
                notEmpty: { errorMessage: "Email tidak boleh kosong." },
                isEmail: { errorMessage: "Email harus berupa email." }
            },
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
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
            if (fs.existsSync(path.join(`${__dirname}/../../../public/images/profiles/admin/${data?.photo}`)))
                await fs.promises.unlink(path.join(`${__dirname}/../../../public/images/profiles/admin/${data?.photo}`));

            if (photoIsExist) {
                let filename = (new Date().getTime()).toString(16);
                let extension = path.extname(res.locals.files.photo.path);
                values['photo'] = filename + extension;

                await fs.promises.copyFile(res.locals.files.photo.path, path.join(`${__dirname}/../../../public/images/profiles/admin/${values['photo']}`));
            }
            else {
                values['photo'] = null;
            }

            const t = await Admin.update(values, { where: { id } });

            res.send({
                success: true,
                values
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const data = await Admin.findOne({
            where: { id }
        });
        const photoIsExist = !!data?.photo;

        if (photoIsExist)
            if (fs.existsSync(path.join(`${__dirname}/../../../public/images/profiles/admin/${data?.photo}`)))
                await fs.promises.unlink(path.join(`${__dirname}/../../../public/images/profiles/admin/${data?.photo}`));

        const t = await Admin.destroy({
            where: { id }
        });

        res.send({
            success: true,
            data,
            t
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

export {
    index,
    store,
    show,
    update,
    destroy
};