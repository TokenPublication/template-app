const { EntitySchema } = require('typeorm');

const Country = {
    name: 'Country',
    target: 'Country',
    columns: {
        id: {
            primary: true,
            type: 'int8',
            generated: true,
        },
        name: {
            type: 'text',
            name: 'name',
        },
        code: {
            type: 'text',
            name: 'code',
        },
    },
    uniques: [
        {
            name: 'UNQ_COUNTRY_NAME',
            columns: ['name'],
        },
        {
            name: 'UNQ_COUNTRY_CODE',
            columns: ['code']
        }
    ],
};

module.exports =  new EntitySchema(Country);
