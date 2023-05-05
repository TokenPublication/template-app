const { EntitySchema } = require('typeorm');

const Init = {
    name: 'Init',
    target: 'Init',
    columns: {
        id: {
            type: 'int',
            primary: true,
            generated: true
        },
        timestamp: {
            name: 'timestamp',
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: true,
            createDate: true,
        }
    }
}

module.exports = new EntitySchema(Init);