const { EntitySchema }= require('typeorm');
const BaseEntity= require("../BaseEntity.js");

const Merchant = {
    name: 'Merchant',
    target: 'Merchant',
    columns: {
        id: {
            primary: true,
            type: 'text'
        },
        name: {
            type: 'text',
            name: 'name'
        },
        companyName: {
            type: 'text',
            name: 'company_name'
        },
        email: {
            type: 'text',
            name: 'email'
        },
        status: {
            type: 'int2',
            nullable: true,
            default: 0,
            name: 'status'
        },
        nace: {
            type: 'text',
            name: 'nace',
            nullable: true
        },
        ...BaseEntity
    },
    uniques: [
        {
            name: 'UNQ_MERCHANT_NAME',
            columns: ['name']
        },
        {
            name: 'UNQ_MERCHANT_ID',
            columns: ['id']
        }
    ],
    indices: [
        {
            name: "IDX_MERCHANT_NAME",
            columns: ["name"]
        },
        {
            name: "IDX_MERCHANT_ID",
            columns: ["id"]
        }
    ]
};

module.exports =  new EntitySchema(Merchant);

            

