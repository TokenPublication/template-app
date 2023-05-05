const { EntitySchema }= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const Branch = {
    name: 'Branch',
    target: 'Branch',
    columns: {
        id: {
            primary: true,
            type: 'text'
        },
        name: {
            type: 'text',
            name: 'name'
        },
        status: {
            type: 'int2',
            nullable: true,
            default: 0,
            name: 'status'
        },
        terminalId: {
            type: 'text',
            name: 'terminal_id'
        },
        ...BaseEntity
    },
    uniques: [
        {
            name: 'branch_name',
            columns: ['name']
        },  
        {
            name: 'branch_terminal_id',
            columns: ['terminalId']
        }
    ],
    indices: [
        {
            name: "IDX_BRANCH_NAME",
            columns: ["name"]
        },
        {
            name: "IDX_BRANCH_TERMINAL_ID",
            columns: ["terminalId"]
        }
    ],
};

module.exports =  new EntitySchema(Branch);





