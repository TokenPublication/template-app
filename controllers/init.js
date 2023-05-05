const axios = require('axios');
const dataSource = require('../ormconfig').default
const ENTITIES = require('../entityExport');
const authController = require('./auth');
const remoteEndpoints = require('../config/remoteEndpoints');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    init: async (req, res) => {
        try {
            await authController.getAccessToken();
            let merchantReq = await axios.get(remoteEndpoints.MERCHANT.GET_MERCHANT, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!merchantReq) {
                res.status(400).send('Bad Request');
            }
            
            let merchant = dataSource.getRepository(ENTITIES.MerchantEntity).create({...merchantReq.data.result[0], createdAt:undefined, updatedAt:undefined,deletedAt:undefined});


            await dataSource.getRepository(ENTITIES.MerchantEntity).save(merchant);

            let branchReq = await axios.get(remoteEndpoints.BRANCH.GET_ALL, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            for(let i = 0; i < branchReq.data.result.length; i++) {
                let branch = dataSource.getRepository(ENTITIES.BranchEntity).create({
                    id: branchReq.data.result[i].id,
                    name: branchReq.data.result[i].name,
                    status: branchReq.data.result[i].status,
                    terminalId: "temp"
                });

                let branchTerminals = await axios.get(remoteEndpoints.TERMINAL.GET + branch.id, {
                    headers: {
                        'Authorization': 'Bearer ' + global.accessToken
                    }
                });

                console.log(branchTerminals.data);

                if(!branchTerminals.data) {
                    return res.status(400).send("Error while gathering terminals");
                }

                for(let j = 0; j < branchTerminals.data.result.length;j++) {
                    let terminalBranch = dataSource.getRepository(ENTITIES.TerminalBranchEntity).create({
                        branchId: branchReq.data.result[i].id,
                        terminalId: branchTerminals.data.result[j].id
                    });
                    await dataSource.getRepository(ENTITIES.TerminalBranchEntity).save(terminalBranch);
                }

                let sections = await axios.get(remoteEndpoints.SECTION.GET_ALL + branch.id, {
                    headers: {
                        'Authorization': 'Bearer ' + global.accessToken
                    }
                });

                if(!sections.data) {
                    return res.status(400).send("Error while gathering sections");
                }

                for(let j = 0; j < sections.data.result.length;j++) {
                    let section = dataSource.getRepository(ENTITIES.SectionEntity).create({
                        id: sections.data.result[j].id,
                        name: sections.data.result[j].name,
                        status: sections.data.result[j].status,
                        branchId: sections.data.result[j].branchId
                    });

                    let sectionTables = await axios.get(remoteEndpoints.TABLE.GET_ALL + section.id, {
                        headers: {
                            'Authorization': 'Bearer ' + global.accessToken
                        }
                    });

                    if(!sectionTables.data) {
                        return res(400).send("Error while gathering tables for section " + section.id);
                    }

                    for(let k = 0;k < sectionTables.data.result.length; k++) {
                        let table = dataSource.getRepository(ENTITIES.TableEntity).create({
                            id: sectionTables.data.result[k].id,
                            name: sectionTables.data.result[k].name,
                            sectionId: sectionTables.data.result[k].sectionId,
                            xCoordinate: sectionTables.data.result[k].xCoordinate,
                            yCoordinate: sectionTables.data.result[k].yCoordinate,
                            type: sectionTables.data.result[k].type
                        });

                        await dataSource.getRepository(ENTITIES.TableEntity).save(table);
                    }

                    await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
                }
        
                await dataSource.getRepository(ENTITIES.BranchEntity).save(branch);
            }

            let categoryReq = await axios.get(remoteEndpoints.CATEGORY.GET_ALL, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!categoryReq.data) {
                return res.status(400).send("Error while gathering categories");
            }

            
            for(let i = 0; i < categoryReq.data.result.length; i++) {
                let category = dataSource.getRepository(ENTITIES.CategoryEntity).create({
                    id: categoryReq.data.result[i].id,
                    name: categoryReq.data.result[i].name,
                    imageUrl: categoryReq.data.result[i].imageUrl,
                    status: categoryReq.data.result[i].status,
                    priority: categoryReq.data.result[i].priority,
                    code: categoryReq.data.result[i].code
                });
                await dataSource.getRepository(ENTITIES.CategoryEntity).save(category);
            }

            let merchantTaxReq = await axios.get(remoteEndpoints.MERCHANT_TAX.GET_ALL, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            })

            if(!merchantTaxReq.data) {
                return res.status(400).send("Error while gathering merchant taxes");
            }

            for(let i = 0; i < merchantTaxReq.data.result.length; i++) {
                let merchantTax = dataSource.getRepository(ENTITIES.MerchantTaxEntity).create({
                    id: merchantTaxReq.data.result[i].id,
                    name: merchantTaxReq.data.result[i].name,
                    amount: merchantTaxReq.data.result[i].amount,
                    status: merchantTaxReq.data.result[i].status
                });
                await dataSource.getRepository(ENTITIES.MerchantTaxEntity).save(merchantTax);
            }

            let productReq = await axios.get(remoteEndpoints.PRODUCT.GET_ALL, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!productReq.data) {
                return res.status(400).send("Error while gathering products");
            }

            
            for(let i = 0; i < productReq.data.result.length; i++) {
                let product = dataSource.getRepository(ENTITIES.ProductEntity).create({
                    id: productReq.data.result[i].id,
                    name: productReq.data.result[i].name,
                    barcode: productReq.data.result[i].barcode,
                    imageUrl: productReq.data.result[i].imageUrl,
                    amount: productReq.data.result[i].amount,
                    priority: productReq.data.result[i].priority,
                    merchantTaxId: productReq.data.result[i].merchantTaxId,
                    isForAllBranches: productReq.data.result[i].isForAllBranches,
                    isSector : productReq.data.result[i].isSector,
                    description: productReq.data.result[i].description,
                    quantityTypeCode: productReq.data.result[i].quantityType.code,
                    quantityTypeName: productReq.data.result[i].quantityType.name,
                    quantityTypeAbbreviation: productReq.data.result[i].quantityType.abbreviation,
                    status: productReq.data.result[i].status
                });
                await dataSource.getRepository(ENTITIES.ProductEntity).save(product);

                // clear product_category table
                await dataSource.createQueryBuilder().delete().from('product_category').where("productId = :id", {id: productReq.data.result[i].id}).execute();

                for(let j = 0; j < productReq.data.result[i].merchantCategories.length; j++)  {
                    const query = await dataSource.createQueryBuilder().insert().into('product_category').values({
                        productId: productReq.data.result[i].id,
                        categoryId: productReq.data.result[i].merchantCategories[j].id
                    }).execute().catch((err) => {
                        
                    });
                }
            }
            
            for(let i = 0; i < branchReq.data.result.length; i++) {
                let orderReq = await axios.get(remoteEndpoints.ORDER.GET_ALL + branchReq.data.result[i].id, {
                    headers: {
                        'Authorization': 'Bearer ' + global.accessToken
                    }
                });
        
                if(!orderReq.data) {
                    return res.status(400).send("Error while gathering orders");
                }
        
                for(let j = 0; j < orderReq.data.result.length; j++) {
                    let orderReq_ = await axios.get(remoteEndpoints.ORDER.GET_BY_ID + orderReq.data.result[j].id, {
                        headers: {
                            'Authorization': 'Bearer ' + global.accessToken
                        }
                    });

                    console.log(orderReq_.data.result);


                    let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
                        where: {    
                            terminalId: orderReq_.data.result.terminalId
                        }
                    });

                    console.log(terminalBranch);

                    let order = dataSource.getRepository(ENTITIES.OrderEntity).create({
                        id: orderReq_.data.result.id,
                        branchId: terminalBranch.branchId,
                        tableId: orderReq_.data.result.tableId,
                        total: orderReq_.data.result.total,
                        totalPayable: orderReq_.data.result.totalPayable
                    });

                    for(let k = 0; k < orderReq_.data.result.items.length; k++) {
                        let orderItem = dataSource.getRepository(ENTITIES.OrderItemEntity).create({
                            id: orderReq_.data.result.items[k].id,
                            quantity: orderReq_.data.result.items[k].quantity,
                            price: orderReq_.data.result.items[k].price,
                            orderId: order.id,
                            merchantProductId: orderReq_.data.result.items[k].merchantProductId
                        });

                        await dataSource.getRepository(ENTITIES.OrderItemEntity).save(orderItem);
                    }

                    await dataSource.getRepository(ENTITIES.OrderEntity).save(order);
                }
            }

            let init = dataSource.getRepository(ENTITIES.InitEntity).create({
                timestamp: new Date()
            });
            await dataSource.getRepository(ENTITIES.InitEntity).save(init);

            let hooks = await axios.get(remoteEndpoints.WEBHOOK.GET_ALL, {
                headers: {
                    'authorization': 'Bearer ' + global.accessToken
                }
            });

            if(hooks.data.result.length > 0) {
                for(let i = 0; i < hooks.data.result.length; i++) {
                    await axios.delete(remoteEndpoints.WEBHOOK.DELETE + hooks.data.result[i].id, {
                        headers: {
                            'Authorization': 'Bearer ' + global.accessToken
                        }
                    });
                }
            }

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_MERCHANT_PRODUCT'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_MERCHANT_PRODUCT'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_MERCHANT_PRODUCT'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });



            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_MERCHANT_CATEGORY'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_MERCHANT_CATEGORY'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_MERCHANT_CATEGORY'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });



            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_MERCHANT_TAX'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_MERCHANT_TAX'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_MERCHANT_TAX'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });


            
            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_ORDER'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_ORDER'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_ORDER'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'PAY_ORDER'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'TRANSFER_ORDER'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });



            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_SECTION'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_SECTION'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_SECTION'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });


            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_TABLE'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_TABLE'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_TABLE'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_TERMINAL'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_TERMINAL'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_TERMINAL'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });


            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'ADD_BRANCH'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'UPDATE_BRANCH'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            await axios.post(remoteEndpoints.WEBHOOK.CREATE, {
                address: 'https://' + req.hostname + '/api/webhook/event',
                topic: 'DELETE_BRANCH'
            }, {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            return res.send('Successfully initialized!');
        } catch (err) {
            console.log("ERROR", err);
            res.status(400).send(err);
        }
    }

}
