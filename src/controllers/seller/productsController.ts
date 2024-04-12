import { Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";
import fs from "fs";
import path from "path";
import { HasMany, HasOne } from "sequelize";
import Product_category from "../../db/models/product_category";
import Product from "../../db/models/product";
import Product_image from "../../db/models/product_image";
import Review from "../../db/models/review";
import User from "../../db/models/user";
import { slugify } from "voca";

async function deleteProductImages(product_id: any) {
    const product_images = await Product_image.findAll({ where: { product_id } });
    if (product_images.length > 0)
        product_images.forEach(async e => {
            if (fs.existsSync(path.join(`${__dirname}/../../../public/images/products/${e.filename}`)))
                await fs.promises.unlink(path.join(`${__dirname}/../../../public/images/products/${e.filename}`));
            await Product_image.destroy({ where: { filename: e.filename } });
        });
}
async function addProductImages(data: any, product_id: any) {
    let product_images: any[];
    if (!!!Array.isArray(data))
        product_images = Array(data);
    else product_images = data;

    product_images.forEach(async (e, i) => {
        let filename = (new Date().getTime()).toString(16);
        let extension = path.extname(e.path);
        let file = filename + '-' + i + extension;

        await fs.promises.copyFile(e.path, path.join(`${__dirname}/../../../public/images/products/${file}`));
        await Product_image.create({ filename: file, product_id });
    });
}
async function generateSlug(name: string) {
    let slug = slugify(name);
    if (await Product.findOne({ where: { slug } })) {
        let n: number = 0;
        while (await Product.findOne({ where: { slug: slug + '-' + n } })) {
            n++;
        }
        slug += '-' + n;
    }
    return slug;
}
async function addProductCategories(categories: any, product_id: any) {
    if (!!categories) {
        if (!Array.isArray(categories))
            categories = Array(categories);
        categories.forEach(async (e: any) => {
            await Product_category.create({ product_id: Number(product_id), category_id: e });
        });
    }
}
async function updateProductCategories(categories: any, product_id: any) {
    await Product_category.destroy({ where: { product_id } });
    await addProductCategories(categories, product_id);
}

const index = async (req: Request, res: Response) => {
    try {
        const seller = res.locals.seller;
        const products = await Product.findAll({
            where: { seller_id: seller.id ?? 0 },
            attributes: {
                exclude: ['description']
            },
            include: [
                {
                    association: 'categories',
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    association: new HasMany(Product, Review, {
                        foreignKey: 'product_id',
                        as: 'reviews'
                    })
                }
            ]
        });

        products.reverse();

        res.send({
            success: true,
            data: products
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
        const seller = res.locals.seller;

        await checkSchema({
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
            },
            stock: {
                notEmpty: { errorMessage: "Stok tidak boleh kosong." },
                isInt: { errorMessage: "Stok harus berupa bilangan bulat." },
                isNumeric: { errorMessage: "Stok harus berupa angka." }
            },
            price: {
                notEmpty: { errorMessage: "Harga tidak boleh kosong." },
                isNumeric: { errorMessage: "Harga harus berupa angka." }
            },
            weight: {
                notEmpty: { errorMessage: "Harga tidak boleh kosong." },
                isInt: { errorMessage: "Harga harus berupa bilangan bulat." },
                isNumeric: { errorMessage: "Harga harus berupa angka." }
            },
            product_images: {
                custom: {
                    options: (async e => {
                        if (!!!((req.files as any)?.product_images))
                            throw new Error('Gambar produk harus dicantumkan.');
                    })
                }
            }
        }).run(req);
        const vResult = validationResult(req);

        if (!vResult.isEmpty())
            return res.send({
                success: false,
                vError: !vResult.isEmpty(),
                vResult: vResult
            });

        let values: any = {
            name: req.body.name,
            description: req.body.description ?? '',
            stock: req.body.stock ?? 0,
            sold: 0,
            price: req.body.price ?? '0',
            weight: req.body.weight ?? 0,
            seller_id: seller.id ?? 0
        };

        values['slug'] = await generateSlug(values.name ?? '');

        const data = await Product.create(values);

        await addProductImages((req.files as any)?.product_images, data.id);

        let categories = req.body.categories;
        await addProductCategories(categories, data.id);

        return res.status(201).send({
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

const show = async (req: Request, res: Response) => {
    try {
        const seller = res.locals.seller;
        const product_id = req.params.product_id;
        const products = await Product.findOne({
            where: {
                id: product_id ?? 0,
                seller_id: seller.id ?? 0
            },
            include: [
                {
                    association: 'categories',
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                },
                {
                    association: new HasMany(Product, Review, {
                        foreignKey: 'product_id',
                        as: 'reviews'
                    }),
                    include: [
                        {
                            association: new HasOne(Review, User, {
                                as: 'user',
                                foreignKey: 'id',
                                sourceKey: 'user_id'
                            }),
                            attributes: {
                                exclude: ['id', 'password']
                            }
                        }
                    ]
                }
            ]
        });

        res.send({
            success: true,
            data: products
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
        const seller = res.locals.seller;
        const product_id = req.params.product_id;

        await checkSchema({
            name: {
                notEmpty: { errorMessage: "Nama tidak boleh kosong." },
            },
            stock: {
                notEmpty: { errorMessage: "Stok tidak boleh kosong." },
                isInt: { errorMessage: "Stok harus berupa bilangan bulat." },
                isNumeric: { errorMessage: "Stok harus berupa angka." }
            },
            price: {
                notEmpty: { errorMessage: "Harga tidak boleh kosong." },
                isNumeric: { errorMessage: "Harga harus berupa angka." }
            },
            weight: {
                notEmpty: { errorMessage: "Harga tidak boleh kosong." },
                isInt: { errorMessage: "Harga harus berupa bilangan bulat." },
                isNumeric: { errorMessage: "Harga harus berupa angka." }
            },
            product_images: {
                custom: {
                    options: (async e => {
                        if (!!!((req.files as any)?.product_images))
                            throw new Error('Gambar produk harus dicantumkan.');
                    })
                }
            }
        }).run(req);
        const vResult = validationResult(req);

        if (!vResult.isEmpty())
            return res.send({
                success: false,
                vError: !vResult.isEmpty(),
                vResult: vResult
            });

        let values: any = {
            name: req.body.name,
            description: req.body.description ?? '',
            stock: req.body.stock ?? 0,
            price: req.body.price ?? '0',
            weight: req.body.weight ?? 0,
        };
        values['slug'] = await generateSlug(values.name);

        const data = await Product.update(values, { where: { id: product_id ?? 0, seller_id: seller.id ?? 0 } });

        let categories = req.body.categories;
        await updateProductCategories(categories, product_id);

        await deleteProductImages(product_id);
        await addProductImages((req.files as any)?.product_images, product_id);

        return res.send({
            success: true,
            data,
            product_id,
            categories,
            values
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false
        });
    }
};

const destroy = async (req: Request, res: Response) => {
    try {
        const seller = res.locals.seller;
        const product_id = req.params.product_id;
        const data = await Product.findOne({
            where: {
                id: product_id ?? 0,
                seller_id: seller.id ?? 0
            }
        });
        if (!data) return res.status(404).send({ success: false, data });

        await deleteProductImages(product_id);

        const t = await Product.destroy({ where: { id: product_id ?? 0 } });

        return res.send({
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