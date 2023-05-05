const branchHooks = require('./branchHooks');
const productHooks = require('./productHooks');
const orderHooks = require('./orderHooks');
const sectionHooks = require('./sectionHooks');
const tableHooks = require('./tableHooks');
const terminalHooks = require('./terminalHooks');

const axios = require('axios');
const auth = require('../controllers/auth');

// main entry point for webhook callbacks, incoming requests will include:
// createdAt: events creation time id: According to the event type, product, order, terminal etc. 
// id: (arrays of uuids for bulk operations, uuid for others)
// merchantId: Your merchants id operation: Topic name. For example; ADD_TERMINAL
module.exports = async (req,res) => {
    console.log(req.body);

    // check req body contains required fields
    if (!req.body.id || !req.body.operation) {
        return res.status(400).send('Bad Request');
    }

    // check if we have a valid access token, if not get one
    if(!global.accessToken || !global.expiresAt || global.expiresAt < Date.now()) {
        console.log('Getting new access token');
        await auth.getAccessToken();
    }

    let operation = req.body.operation;
    if(Array.isArray(req.body.id)) {
        operation = operation + '(BULK)';
    }

    // call appropriate handler for event type
    // TODO: add handlers for other event types
    switch (operation) {
        case 'ADD_BRANCH': 
            brancHooks.addBranch(req, res);
            break;
        case 'UPDATE_BRANCH':
            branchHooks.updateBranch(req, res);
            break;
        case 'DELETE_BRANCH':
            branchHooks.deleteBranch(req, res);
            break;
        case 'ADD_MERCHANT_PRODUCT':
            productHooks.addProduct(req, res);
            break;
        case 'UPDATE_MERCHANT_PRODUCT':
            productHooks.updateProduct(req, res);
            break;
        case 'DELETE_MERCHANT_PRODUCT':
            productHooks.deleteProduct(req, res);
            break;
        case 'ADD_MERCHANT_CATEGORY':
            productHooks.addCategory(req, res);
            break;
        case 'UPDATE_MERCHANT_CATEGORY':
            productHooks.updateCategory(req, res);
            break;
        case 'DELETE_MERCHANT_CATEGORY':
            productHooks.deleteCategory(req, res);
            break;
        case 'ADD_MERCHANT_TAX':
            productHooks.addTax(req, res);
            break;
        case 'UPDATE_MERCHANT_TAX':
            productHooks.updateTax(req, res);
            break;
        case 'DELETE_MERCHANT_TAX':
            productHooks.deleteTax(req, res);
            break;
        case 'ADD_ORDER': 
            orderHooks.addOrder(req, res);
            break;
        case 'UPDATE_ORDER':
            orderHooks.updateOrder(req, res);
            break;
        case 'DELETE_ORDER':
            orderHooks.deleteOrder(req, res);
            break;    
        case 'PAY_ORDER':
            orderHooks.updateOrder(req, res);
            break;
        case 'ADD_SECTION':
            sectionHooks.addSection(req, res);
            break;
        case 'UPDATE_SECTION':
            sectionHooks.updateSection(req, res);
            break;
        case 'DELETE_SECTION':
            sectionHooks.deleteSection(req, res);
            break;
        case 'ADD_SECTION(BULK)':
            sectionHooks.addSectionBulk(req, res);
            break;
        case 'UPDATE_SECTION(BULK)':
            sectionHooks.updateSectionBulk(req, res);
            break;
        case 'DELETE_SECTION(BULK)':
            sectionHooks.deleteSectionBulk(req, res);
            break;
        case 'ADD_TABLE':
            tableHooks.addTable(req, res);
            break;
        case 'UPDATE_TABLE':
            tableHooks.updateTable(req, res);
            break;
        case 'DELETE_TABLE':
            tableHooks.deleteTable(req, res);
            break;
        case 'ADD_TABLE(BULK)':
            tableHooks.addTableBulk(req, res);
            break;
        case 'UPDATE_TABLE(BULK)':
            tableHooks.updateTableBulk(req, res);
            break;
        case 'DELETE_TABLE(BULK)':
            tableHooks.deleteTableBulk(req, res);
            break;
        case 'ADD_TERMINAL': 
            terminalHooks.addTerminal(req, res);
            break;
        case 'UPDATE_TERMINAL': 
            terminalHooks.updateTerminal(req, res);
            break;
        case 'DELETE_TERMINAL':
            terminalHooks.deleteTerminal(req, res);
            break;
        case 'ADD_TERMINAL(BULK)': 
            terminalHooks.addTerminalBulk(req, res);
            break;
        case 'UPDATE_TERMINAL(BULK)':
            terminalHooks.updateTerminalBulk(req, res);
            break;
        case 'DELETE_TERMINAL(BULK)':
            terminalHooks.deleteTerminalBulk(req, res);
            break;
        default:
            break;
    }
}