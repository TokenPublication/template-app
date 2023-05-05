const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');

module.exports = {
    addOrder: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.ORDER.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });
        if(!req_.data) {
            return res.status(400).json({
                message: "Order not found"
            })
        }
        // find branch id with terminal id from 
        let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
            where: {    
                terminalId: req_.data.result.terminalId
            }
        });

        if(!terminalBranch) {
            return res.status(400).json({
                message: "Terminal not found"
            })
        }
        let order = dataSource.getRepository(ENTITIES.OrderEntity).create({
            id: req_.data.result.id,
            branchId: terminalBranch.branchId,
            customerId: req_.data.result.customerId,
            tableId: req_.data.result.tableId,
            total: req_.data.result.total,
            totalPayable: req_.data.result.totalPayable
        });

        if(!Array.isArray(req_.data.result.items)) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        for(let i = 0;i < req_.data.result.items.length;i++) {
            let orderItem = dataSource.getRepository(ENTITIES.OrderItemEntity).create({
            quantity: req_.data.result.items[i].quantity,
            price: req_.data.result.items[i].price,
            orderId: req_.data.result.id,
            merchantProductId: req_.data.result.merchantProductIdf
        });
            await dataSource.getRepository(ENTITIES.OrderItemEntity).save(orderItem);
        }

        await dataSource.getRepository(ENTITIES.OrderEntity).save(order);


        return res.status(200).json({
            message: "Order added successfully"
        })
    },
    updateOrder: async (req, res) => {

        let req_ = await axios.get(remoteEndpoints.ORDER.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        if(!req_.data) {
            return res.status(400).json({
                message: "Order not found"
            })
        }

        let order = await dataSource.getRepository(ENTITIES.OrderEntity).findOne({
            where: {
                id: req_.data.result.id
            }
        });

        if(!order) {
            return res.status(400).json({
                message: "Order not found"
            })
        }

        order.id = req_.data.result.id;

        // find branch id with terminal id from 
        let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
            where: {    
                terminalId: req_.data.result.terminalId
            }
        });

        if(!terminalBranch) {
            return res.status(400).json({
                message: "Terminal not found"
            })
        }

        order.branchId = terminalBranch.branch_id;
        order.customerId = req_.data.result.customerId;
        order.tableId = req_.data.result.tableId;
        order.total = req_.data.result.total;
        order.totalPayable = req_.data.result.totalPayable;

        await dataSource.getRepository(ENTITIES.OrderItemEntity).delete({
            where: {
                orderId: req_.data.result.id
            }
        });

        if(!Array.isArray(req_.data.result.items)) {
            return res.status(400).json({
                message: "Bad request"
            })
        }

        for(let i = 0;i < req_.data.result.items.length;i++) {
            let orderItem = dataSource.getRepository(ENTITIES.OrderItemEntity).create({
            quantity: req_.data.result.items[i].quantity,
            price: req_.data.result.items[i].price,
            orderId: req_.data.result.id,
            merchantProductId: req_.data.result.merchantProductId
        });
            await dataSource.getRepository(ENTITIES.OrderItemEntity).save(orderItem);
        }

        await dataSource.getRepository(ENTITIES.OrderEntity).save(order);

        return res.status(200).json({
            message: "Order updated successfully"
        })
    },
    deleteOrder: async (req, res) => {

        let order = await dataSource.getRepository(ENTITIES.OrderEntity).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!order) {
            return res.status(400).json({
                message: "Order not found"
            })
        }

        // soft delete
        order.deletedAt = new Date();

        await dataSource.getRepository(ENTITIES.OrderEntity).save(order);

        return res.status(200).json({
            message: "Order deleted successfully"
        })
    }
}