const { EntitySchema } = require('typeorm');

const City = {
    name: 'City',
    target: 'City',
    columns: {
        id: {
            primary: true,
            type: 'int8',
            generated: true
        },
        name: {
            type: 'text',
            name: 'name'
        },
        code: {
            name: 'code',
            type: 'int2',
            nullable: true
        },
        countryId: {
            name: 'country_id',
            type: 'int8',
        }
    },
    relations: {
        country: {
            target: 'Country',
            type: 'many-to-one',
            joinColumn: {
                name: 'countryId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    }
};

module.exports =  new EntitySchema(City);