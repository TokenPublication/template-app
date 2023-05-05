const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;

module.exports = {
    getBranches: async (req,res) => {       
        let branches = await dataSource.getRepository(ENTITIES.BranchEntity).find();
        res.json({result: branches});
    },
    getTerminal: async (req,res) => {
        // get branch id from query string
        let branchId = req.query.branchId;
        let terminal = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).find({where: {branchId: branchId}});
        res.json({result: terminal});
    },
    getMerchant: async (req,res) => {
        let merchant = await dataSource.getRepository(ENTITIES.MerchantEntity).find();
        res.json({result: merchant});
    },
    getSections: async (req,res) => {
        let sections = await dataSource.getRepository(ENTITIES.SectionEntity).find();
        res.json({result: sections});
    },
    getTables: async (req,res) => {
        let tables = await dataSource.getRepository(ENTITIES.TableEntity).find();
        res.json({result: tables});
    }
}
