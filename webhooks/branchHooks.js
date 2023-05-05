const ENTITIES = require('../entityExport');
const dataSource = require('../ormconfig').default;
const axios = require('axios');
const remoteEndpoints = require('../config/remoteEndpoints');
module.exports = {
    addBranch: async (req, res) => {

        let req_ = await axios.get(remoteEndpoints.BRANCH.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.acessToken
            }
        });

        if(!req_.data) {
            return res.status(400).json({
                message: 'Invalid request'
            });
        } else {
            let branch = dataSource.getRepository(ENTITIES.BranchEntity).create({
                id: req_.data.result.id,
                name: req_.data.result.name,
                terminalId: "temp"
            });
            
            // Get all terminals and choose the one starts with WP
            let terminals = await axios.get(remoteEndpoints.TERMINAL.GET_ALL + req.body.id, {
                headers: {
                    'Authorization': 'Bearer ' + global.acessToken
                }
            });

            if(terminals.data.result.length > 0) {
                let terminal = terminals.data.find(terminal => terminal.terminalId.startsWith('WP'));
                if(terminal) {
                    branch.terminalId = terminal.terminalId;
                    for(let i = 0;i < terminals.data.result.length;i++) {
                        await dataSource.getRepository(ENTITIES.TerminalBranchEntity).save({
                            branchId: branch.id,
                            terminalId: terminals.data.result[i].terminalId
                        })
                    }
                } else {
                    return res.status(400).json({
                        message: 'No terminals found'
                    });
                }
            } else {
                return res.status(400).json({
                    message: 'No terminals found'
                });
            }
            branch.status = req_.data.result.status;
            dataSource.getRepository(ENTITIES.Branch).save(branch);
            return res.status(200).json({
                message: 'Branch added successfully'
            });
        }
    },
    updateBranch: async (req, res) => {

        let req_ = await axios.get(remoteEndpoints.BRANCH.GET_BY_ID + req.body.id, {
            headers: {
                'Authorization': 'Bearer ' + global.acessToken
            }
        });

        if(!req_.data) {
            return res.status(400).json({
                message: 'Invalid request'
            });
        } else {
            
            let branch = await dataSource.getRepository(ENTITIES.Branch).findOne({
                where: {
                    id: req.body.id
                }
            });
            if(!branch) {
                return res.status(404).json({
                    message: 'Branch not found'
                });
            }
            branch.name = req_.data.result.name;
            branch.status = req_.data.result.status;
            dataSource.getRepository(ENTITIES.Branch).save(branch);
            return res.status(200).json({
                message: 'Branch updated successfully'
            });
        }
    },
    deleteBranch: async (req, res) => {
        await datSource.initiliaze();

        let branch = await dataSource.getRepository(ENTITIES.Branch).findOne({
            where: {
                id: req.body.id
            }
        });
        if(!branch) {
            return res.status(404).json({
                message: 'Branch not found'
            });
        }

        // soft delete by setting deleted_at
        branch.deleted_at = new Date();

        dataSource.getRepository(ENTITIES.Branch).save(branch);
        return res.status(200).json({
            message: 'Branch deleted successfully'
        });
    }
}