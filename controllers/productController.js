const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;

module.exports = {
    getProducts: async (req, res) => {
        const products = await dataSource.getRepository(ENTITIES.ProductEntity).find();
        res.json({result: products});
    }, 
    getCount: async (req, res) => {
        const count = await dataSource.getRepository(ENTITIES.ProductEntity).count();
        res.json({result: {count: count}});
    },
    getProduct: async (req, res) => {
        try {
        const product = await dataSource.getRepository(ENTITIES.ProductEntity).findOne({where: {id: req.params.id}});
        res.json({result: product});
        } catch {
            res.status(400).json({message: "Invalid ID"});
        }
    },
    getCategories: async (req, res) => {
        const categories = await dataSource.getRepository(ENTITIES.CategoryEntity).find();
        res.json({result: categories});
    }
}