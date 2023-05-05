const {EntitySchema}= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const MerchantTax = {
    name: 'MerchantTax',
    target: 'MerchantTax',
    columns: {
        id: {
            primary: true,
            type: 'text'
        },
        amount: {
            type: 'int'
        },
        status: {
            type: 'int2'
        }
    },
};


module.exports =  new EntitySchema(MerchantTax);