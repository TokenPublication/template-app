const {EntitySchema}= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const TerminalBranch = {
    name: 'TerminalBranch',
    target: 'TerminalBranch',
    columns: {
        id: {
            primary: true,
            type: 'uuid',
            generated: 'uuid'
        },
        terminalId: {
            type: 'text',
            nullable: false,
            name: 'terminal_id'
        },
        branchId: {
            type: 'text',
            nullable: false,
            name: 'branch_id'
        },
        ...BaseEntity
    },
};

module.exports =  new EntitySchema(TerminalBranch);
