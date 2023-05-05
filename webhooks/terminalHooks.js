const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');

module.exports = {
    addTerminal: async (req, res) => {

        let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        let terminalBranch = dataSource.getRepository(ENTITIES.TerminalBranchEntity).create({
            branchId: req_.data.result.branchId,
            terminalId: req_.data.result.terminalId
        });

        await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);

        res.status(200).send('OK');
    },
    updateTerminal: async (req, res) => {

        let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
            where: {
                terminalId: req_.data.result.result.terminalId
            }
        });
        terminalBranch.branchId = req_.data.result.branchId;
        terminalBranch.terminalId = req.body.id;

        await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);

        res.status(200).send('OK');
    },
    deleteTerminal: async (req, res) => {

        let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.accessToken
            }
        });

        let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
            where: {
                terminalId: req_.data.result.result.terminalId
            }
        });
        terminalBranch.deletedAt = new Date();

        await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);
        res.status(200).send('OK');
    },
    addTerminalBulk: async (req, res) => {

        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });
            let terminalBranch = dataSource.getRepository(ENTITIES.TerminalBranchEntity).create({
                branchId: req_.data.result.branchId,
                terminalId: req_.data.result.result.terminalId
            });

            await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);
        }

        res.status(200).send('OK');
    },
    updateTerminalBulk: async (req, res) => {

        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });
            let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({terminalId: req.body.id[i]});
            terminalBranch.branchId = req_.data.result.branchId;

            await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);
        }
        res.status(200).send('OK');
    },
    deletTerminalBulk: async (req, res) => {

        for(let i = 0; i < req.body.id.length; i++) {
            let req_ = await axios.get(remote.TERMINAL.GET_BY_ID + req.body.id[i], {
                headers: {
                    'Authorization': 'Bearer ' + global.accessToken
                }
            });
            let terminalBranch = await dataSource.getRepository(ENTITIES.TerminalBranchEntity).findOne({
                where: {
                    id: req_.data.result.result.terminalId
                }
            });
            terminalBranch.deletedAt = new Date();

            await dataSource.getRepository(ENTITIES.terminalBranch).save(terminalBranch);
        }
        res.status(200).send('OK');
    }
}