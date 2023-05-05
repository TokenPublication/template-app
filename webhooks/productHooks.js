const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');

module.exports = {
    addProduct: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.PRODUCT.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        // check if all categories are valid
        let categories = req_.data.result.merchantCategories;

        for(let i = 0; i < categories.length; i++) {
            if(!await dataSource.getRepository(ENTITIES.CategoryEntity).findOne({where:{id: categories[i].id}})) {
                return res.status(404).send({
                    message: "Category not found"
                });
            }
        }

        // check if merchant tax is valid
        let merchantTax = req_.data.result.merchantTax;
        if(!await dataSource.getRepository(ENTITIES.MerchantTaxEntity).findOne({where:{id: merchantTax.id}})) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        let product = dataSource.getRepository(ENTITIES.ProductEntity).create({
            id: req_.data.result.id,
            name: req_.data.result.name,
            barcode: req_.data.result.barcode,
            imageUrl: req_.data.result.imageUrl,
            amount: req_.data.result.amount,
            priority: req_.data.result.priority,
            merchantTaxId: req_.data.result.merchantTaxId,
            isForAllBranches: req_.data.result.isForAllBranches,
            isSector: req_.data.result.isSector,
            quantityTypeCode: req_.data.result.quantityType.code,
            quantityTypeName: req_.data.result.quantityType.name,
            quantityTypeAbbreviation: req_.data.result.quantityType.abbreviation
        });

        await dataSource.getRepository(ENTITIES.ProductEntity).save(product);

        // add to join table product_category
        for(let i = 0; i < categories.length; i++) {
            const query = await dataSource.createQueryBuilder().insert().into('product_category').values({
                productId: req_.data.result.id,
                categoryId: categories[i].id
            }).execute();

            if(!query) {
                return res.status(500).send({
                    message: "Error adding product to category"
                });
            }
        }

        // save product
        await dataSource.getRepository(ENTITIES.ProductEntity).save(product);

        return res.status(200).send({
            message: "Product added successfully"
        });
    },
    updateProduct: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.PRODUCT.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        // check if all categories are valid
        let categories = req_.data.result.merchantCategories;

        for(let i = 0; i < categories.length; i++) {
            if(!await dataSource.getRepository(ENTITIES.CategoryEntity).findOne({where:{id: categories[i].id}})) {
                return res.status(404).send({
                    message: "Category not found"
                });
            }
        }

        // check if merchant tax is valid
        let merchantTax = req_.data.result.merchantTax;
        if(!await dataSource.getRepository(ENTITIES.MerchantTaxEntity).findOne({where:{id: merchantTax.id}})) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        let product = await dataSource.getRepository(ENTITIES.ProductEntity).findOne({where:{id: req_.data.result.id}});

        if(!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        product.id = req_.data.result.id;
        product.name = req_.data.result.name;
        product.barcode = req_.data.result.barcode;
        product.imageUrl = req_.data.result.imageUrl;
        product.amount = req_.data.result.amount;
        product.priority = req_.data.result.priority;
        product.merchantTaxId = req_.data.result.merchantTaxId;
        product.isForAllBranches = req_.data.result.isForAllBranches;
        product.isSector = req_.data.result.isSector;
        product.quantityTypeCode = req_.data.result.quantityType.code;
        product.quantityTypeName = req_.data.result.quantityType.name;
        product.quantityTypeAbbreviation = req_.data.result.quantityType.abbreviation;

        // remove all categories from product
        const query = await dataSource.createQueryBuilder().delete().from('product_category').where('productId = :productId AND', {productId: product.id}).execute();
        // add to join table product_category
        for(let i = 0; i < categories.length; i++) {
            const query = await dataSource.createQueryBuilder().insert().into('product_category').values({
                productId: req_.data.result.id,
                categoryId: categories[i].id
            }).execute();

            if(!query) {
                return res.status(500).send({
                    message: "Error adding product to category"
                });
            }
        }

        // save product
        await dataSource.getRepository(ENTITIES.ProductEntity).save(product);

        return res.status(200).send({
            message: "Product updated successfully"
        });
    },
    deleteProduct: async (req, res) => {
        let product = await dataSource.getRepository(ENTITIES.ProductEntity).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!product) {
            return res.status(404).send({
                message: "Product not found"
            });
        }

        // soft delete by setting deleted_at
        product.deletedAt = new Date();

        // save product
        await dataSource.getRepository(ENTITIES.ProductEntity).save(product);

        return res.status(200).send({
            message: "Product deleted successfully"
        });
    },

    addCategory: async (req, res) => {        
        let req_ = await axios.get(remoteEndpoints.CATEGORY.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        let category = dataSource.getRepository(ENTITIES.CategoryEntity).create({
            id: req_.data.result.id,
            name: req_.data.result.name,
            imageUrl: req_.data.result.imageUrl,
            priority: req_.data.result.priority,
            status: req_.data.result.status,
            priority: req_.data.result.priority,
            code: req_.data.result.code
        });

        // save category
        await dataSource.getRepository(ENTITIES.CategoryEntity).save(category);

        return res.status(200).send({
            message: "Category added successfully"
        });

    },
    updateCategory: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.CATEGORY.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        let category = await dataSource.getRepository(ENTITIES.CategoryEntity).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        category.name = req_.data.result.name;
        category.imageUrl = req_.data.result.imageUrl;
        category.priority = req_.data.result.priority;
        category.status = req_.data.result.status;
        category.priority = req_.data.result.priority;
        category.code = req_.data.result.code;

        // save category
        await dataSource.getRepository(ENTITIES.CategoryEntity).save(category);

        return res.status(200).send({
            message: "Category updated successfully"
        });
    },
    deleteCategory: async (req, res) => {
        let category = await dataSource.getRepository(ENTITIES.CategoryEntity).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!category) {
            return res.status(404).send({
                message: "Category not found"
            });
        }

        category.deletedAt = new Date();

        // save category
        await dataSource.getRepository(ENTITIES.CategoryEntity).save(category);

        return res.status(200).send({
            message: "Category deleted successfully"
        });        
    },
    addMerchantTax: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.MERCHANT_TAX.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        let merchantTax = dataSource.getRepository.create({
            id: req_.data.result.id,
            amount: req_.data.result.amount,
            status: req_.data.result.status
        });

        // save merchant tax    
        await dataSource.getRepository(ENTITIES.MerchantTaxEntity).save(merchantTax);

        return res.status(200).send({
            message: "Merchant tax added successfully"
        });
    },
    updateMerchantTax: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.MERCHANT_TAX.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        let merchantTax = await dataSource.getRepository(ENTITIES.MerchantTaxEntity).findOne({
            where: {
                id: req.body.id
            }
        });
        if(!merchantTax) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        merchantTax.id = req_.data.result.id;
        merchantTax.amount = req_.data.result.amount;
        merchantTax.status = req_.data.result.status;

        // save merchant tax
        await dataSource.getRepository(ENTITIES.MerchantTaxEntity).save(merchantTax);

        return res.status(200).send({
            message: "Merchant tax updated successfully"
        });
    },
    deleteMerchantTax: async (req, res) => {
        // soft delete merchant tax
        let merchantTax = await dataSource.getRepository(ENTITIES.merchantTax).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!merchantTax) {
            return res.status(404).send({
                message: "Merchant tax not found"
            });
        }

        merchantTax.deletedAt = new Date();

        await dataSource.getRepository(ENTITIES.MerchantTaxEntity).save(merchantTax);

        return res.status(200).send({
            message: "Merchant tax deleted successfully"
        });

    }
}
