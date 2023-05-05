const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');

module.exports = {
    addTable: async (req, res) => {

        let req_ = await axios.get(remoteEndpoints.TABLE.GET_BY_ID + req.body.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken 
                }
            }
        );
        if(!req_.data) {
            return res.status(400).send('Bad Request');
        }

        let table = dataSource.getRepository(ENTITIES.TableEntity).create({
            id: req_.data.result.id,
            name: req_.data.result.name,
            type: req_.data.result.type,
            xCoordinate: req_.data.result.xCoordinate,
            yCoordinate: req_.data.result.yCoordinate,
            section_id: req_.data.result.sectionId
        });

        await dataSource.getRepository(ENTITIES.TableEntity).save(table);
        
        return res.status(200).send('OK');
    },
    updateTable: async (req, res) => {
        await dataSource.initialize();

        let req_ = await axios.get(remoteEndpoints.TABLE.GET_BY_ID + req.body.id,
            {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            }
        );

        if(!req_.data) {
            return res.status(400).send('Bad Request');
        }

        let table = await dataSource.getRepository(ENTITIES.TableEntity).findOne({
            where: {
                id: req_.data.result.id
            }
        });

        if(!table) {
            return res.status(400).send('Bad Request');
        }

        table.id = req_.data.result.id;
        table.name = req_.data.result.name;
        table.type = req_.data.result.type;
        table.xCoordinate = req_.data.result.xCoordinate;
        table.yCoordinate = req_.data.result.yCoordinate;
        table.section_id = req_.data.result.sectionId;

        await dataSource.getRepository(ENTITIES.TableEntity).save(table);

        return res.status(200).send('OK');
    },
    deleteTable: async (req, res) => {
        await dataSource.initialize();

        let table = await dataSource.getRepository(ENTITIES.TableEntity).findOne({
            where: {
                id: req.body.id
            }
        });

        if(!table) {
            return res.status(400).send('Bad Request');
        }

        table.deletedAt = new Date();
        await dataSource.getRepository(ENTITIES.TableEntity).save(table);

        return res.status(200).send('OK');
    },
    addTableBulk: async (req, res) => {
        await dataSource.initialize();

        // iterate over id array 
        for(let i = 0; i <  req.body.id.length;i++) {
            let req_ = await axios.get(remoteEndpoints.TABLE.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }

            let table = dataSource.getRepository(ENTITIES.TableEntity).create({
                id: req_.data.result.id,
                name: req_.data.result.name,
                type: req_.data.result.type,
                xCoordinate: req_.data.result.xCoordinate,
                yCoordinate: req_.data.result.yCoordinate,
                section_id: req_.data.result.sectionId
            });

            await dataSource.getRepository(ENTITIES.TableEntity).save(table);
        }
        return res.status(200).send('OK');
    },
    updateTableBulk: async (req, res) => {
        await dataSource.initialize();

        // iterate over id array 
        for(let i = 0; i <  req.body.id.length;i++) {
            let req_ = await axios.get(remoteEndpoints.TABLE.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }

            let table = await dataSource.getRepository(ENTITIES.TableEntity).findOne({
                where: {
                    id: req.body.id[i]
                }
            });
            table.id = req_.data.result.id;
            table.name = req_.data.result.name;
            table.type = req_.data.result.type;
            table.xCoordinate = req_.data.result.xCoordinate;
            table.yCoordinate = req_.data.result.yCoordinate;
            table.section_id = req_.data.result.sectionId;

            await dataSource.getRepository(ENTITIES.TableEntity).save(table);
        }
        return res.status(200).send('OK');
    },
    deleteTableBulk: async (req, res) => {
        await dataSource.initialize();

        // iterate over id array 
        for(let i = 0; i <  req.body.id.length;i++) {
            let req_ = await axios.get(remoteEndpoints.TABLE.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });

            if(!req_.data) {
                return res.status(400).send('Bad Request');
            }

            let table = await dataSource.getRepository(ENTITIES.TableEntity).findOne({
                where: {
                    id: req.body.id[i]
                }
            });
            table.deletedAt = new Date();

            await dataSource.getRepository(ENTITIES.TableEntity).save(table);
        }
        return res.status(200).send('OK');
    }
}

