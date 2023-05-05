const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;

module.exports = {
    getOrdersSummary: async (req, res) => { 
        try{            
            let orders = await dataSource.getRepository(ENTITIES.OrderEntity).find({
                where: {
                    branchId: req.query.branchId
                },
                select: {
                    id: true,
                    total: true,
                    createdAt: true,
                    title: true,
                    tableId: true
                }
            });

            for(let i = 0;i < orders.length;i++) {
                if(orders[i].tableId) {
                    let table = await dataSource.getRepository(ENTITIES.TableEntity).findOne({
                        where: {
                            id: orders[i].tableId
                    }});
                    orders[i].tableName = table.name;
                    let section = await dataSource.getRepository(ENTITIES.SectionEntity).findOne({
                        where: {
                            id: table.sectionId
                        }
                    });
                    orders[i].sectionName = section.name;
                }
            }
            return res.json({result: orders});
        } catch {
            return res.status(400).json({message: "Invalid request"});
        }
    }, 
    getOrder: async (req, res) => {
        try {
            let order = await dataSource.getRepository(ENTITIES.OrderEntity).findOne({
                where: {
                    id: req.params.id
                }
            });

            let orderItems = await dataSource.getRepository(ENTITIES.OrderItemEntity).find({
                where: {
                    orderId: req.params.id
                }
            });

            for(let i = 0;i < orderItems.length;i++) {
                orderItems.orderId = null;
            }

            order.items = orderItems;
            return res.json({result: order});
        } catch (err) {
            console.log(err);
            res.status(400).json({message: "Invalid Request"});
        }
    }
}