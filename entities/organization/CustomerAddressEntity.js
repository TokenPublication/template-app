const { EntitySchema } = require('typeorm');
const BaseEntity = require("../BaseEntity.js");

const CustomerAddress = {
    name: 'CustomerAddress',
    target: 'CustomerAddress',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            unique: true,
        },
        address: {
            type: 'text',
            name: 'address'
        },
        name: {
            type: 'text',
            name: 'name'
        },
        customerId: {
            type: 'uuid',
            name: 'customer_id'
        },
        citysubdivisionId: {
            type: 'uuid',
            name: 'citysubdivision_id'
        },
        cityId: {
            type: 'uuid',
            name: 'city_id'
        },
        countryId: {
            type: 'uuid',
            name: 'country_id'
        },
        ...BaseEntity
    },
    uniques: [
        {
            name: 'customer_address_name',
            columns: ['name']
        }
    ],
    relations: {
        customer: {
            target: 'Customer',
            type: 'many-to-one',
            joinColumn: {
                name: 'customerId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        city: {
            target: 'City',
            type: 'many-to-one',
            joinColumn: {
                name: 'cityId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        citysubdivision: {
            target: 'CitySubdivision',
            type: 'many-to-one',
            joinColumn: {
                name: 'citysubdivisionId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        country: {
            target: 'Country',
            type: 'many-to-one',
            joinColumn: {
                name: 'countryId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    indices: [
        {
            name: 'IDX_CUSTOMER_ADDRESS_ID',
            columns: ['id']
        },
        {
            name: 'IDX_CUSTOMER_ADDRESS_NAME',
            columns: ['name']
        }
    ]
};

module.exports =  new EntitySchema(CustomerAddress);

