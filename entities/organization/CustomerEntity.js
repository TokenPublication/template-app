const { EntitySchema }= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const Customer = {
    name: 'Customer',
    target: 'Customer',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid'
        },
        name: {
            type: 'text',
            name: 'name'
        },
        surname: {
            type: 'text',
            name: 'surname'
        },
        email: {
            type: 'text',
            name: 'email'
        },
        phone: {
            type: 'text',
            name: 'phone'
        },
        idNumber: {
            type: 'text',
            name: 'id_number',
            nullable: false
        },
        password: {
            type: 'text',
            name: 'password'
        },
        ...BaseEntity
    },
    uniques: [
        {
            name: 'customer_email',
            columns: ['email']
        },
        {
            name: 'customer_phone',
            columns: ['phone']
        },
        {
            name: 'customer_id_number',
            columns: ['idNumber']
        }
    ],
    indices: [
        {
            name: "IDX_CUSTOMER_EMAIL",
            columns: ["email"]
        },
        {
            name: "IDX_CUSTOMER_PHONE",
            columns: ["phone"]
        },
        {
            name: "IDX_CUSTOMER_ID_NUMBER",
            columns: ["idNumber"]
        }
    ]
};

module.exports =  new EntitySchema(Customer);

