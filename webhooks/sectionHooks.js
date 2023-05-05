const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');

module.exports = {
    addSection: async (req, res) => {
        let req_ = await axios.get(remoteEndpoints.SECTION.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': `Bearer ${global.accessToken}`
            }
        });
        if(!req_.data) {
            return res.status(400).send('Bad Request');
        }
        let section = dataSource.getRepository(ENTITIES.SectionEntity).create({
            id: req_.data.result.id,
            name: req_.data.result.name,
            status: req_.data.result.status,
            branch_id: req_.data.result.branchId
        });

        await dataSource.getRepository(ENTITIES.SectionEntity).save(section);

        return res.status(200).send('OK');
    },
    updateSection: async (req, res) => {

        let req_ = await axios.get(remoteEndpoints.SECTION.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': `Bearer ${global.accessToken}`
            }
        });
        if(!req_.data) {
            return res.status(400).send('Bad Request');
        }
        let section = await dataSource.getRepository(ENTITIES.SectionEntity).findOne({
            where: {
                id: req_.data.result.id
            }
        });
        if(!section) {
            return res.status(400).send('Bad Request');
        }
        section.id = req_.data.result.id;
        section.name = req_.data.result.name;
        section.status = req_.data.result.status;
        section.branch_id = req_.data.result.branchId;
        await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
        return res.status(200).send('OK');
    },
    deleteSection: async (req, res) => {
        let section = await dataSource.getRepository(ENTITIES.SectionEntity).findOne({
            where: {
                id: req.body.id
            }
        });
        if(!section) {
            return res.status(400).send('Bad Request');
        }
        section.deletedAt = new Date();
        await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
        return res.status(200).send('OK');
    },
    addSectionBulk: async (req, res) => {

        // iterate over id array 
        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remoteEndpoints.SECTION.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': `Bearer ${global.accessToken}`
                }
            });
            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }
            let section = dataSource.getRepository(ENTITIES.SectionEntity).create({
                id: req_.data.result.id,
                name: req_.data.result.name,
                status: req_.data.result.status,
                branch_id: req_.data.result.branchId
            });
        
            await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
        }
        return res.status(200).send('OK');
    },
    updateSectionBulk: async (req, res) => {

        // iterate over id array 
        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remoteEndpoints.SECTION.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': `Bearer ${global.accessToken}`
                }
            });
            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }
            let section = dataSource.getRepository(ENTITIES.SectionEntity).findOne({
                where: {
                    id: req.body.id[i]
                }
            });
            section.name = req_.data.result.name;
            section.status = req_.data.result.status;
            section.branch_id = req_.data.result.branchId;
    
            await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
        }
        return res.status(200).send('OK');
    },
    deleteSectionBulk: async (req, res) => {

        // iterate over id array 
        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remoteEndpoints.SECTION.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': `Bearer ${global.accessToken}`
                }
            });
            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }
            let section = dataSource.getRepository(ENTITIES.SectionEntity).findOne({
                where: {
                    id: req.body.id[i]
                }
            });
            section.deletedAt = new Date();
    
            await dataSource.getRepository(ENTITIES.SectionEntity).save(section);
        }
        return res.status(200).send('OK');
    }
}