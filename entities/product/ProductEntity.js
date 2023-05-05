const { EntitySchema }= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const Product = {
    name: 'Product',
    target: 'Product',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        name: {
            type: 'text',
            name: 'name'
        },
        barcode: {
            type: 'text',
            name: 'barcode'
        },
        imageUrl: {
            type: 'text',
            name: 'image_url'
        },
        amount: {
            type: 'int4',
            name: 'amount',
            default: 0,
            nullable: true
        },
        priority: {
            type: 'int2',
            name: 'priority',
            default: 0,
            nullable: true
        },
        merchantTaxId: {
            type: 'uuid',
            name: 'merchant_tax_id',
        },
        isForAllBranches: {
            type: 'bool',
            name: 'is_for_all_branches',
            default: true,
            nullable: true
        },
        isSector: {
            type: 'bool',
            name: 'is_sector',
            default: false,
            nullable: true
        },
        description: {
            type: 'text',
            name: 'description',
            nullable: true
        },
        quantityTypeCode: {
            type: 'text',
            name: 'quantity_type_code',
            default: 'C62'
        },
        quantityTypeName: {
            type: 'text',
            name: 'quantity_type_name',
        },
        quantityTypeAbbreviation: {
            type: 'text',
            name: 'quantity_type_abbreviation',
        },
        status: {
            type: 'int2',
            name: 'status',
            default: 0,
            nullable: true
        },
        merchantTaxId: {
            type: 'text',
            name: 'merchant_tax_id'
        },
        ...BaseEntity
    },
    relations: {
        categories: {
            target: 'Category',
            type: 'many-to-many',
            joinTable: {
                name: 'product_category',
                joinColumn: {
                    name: 'productId',
                    referencedColumnName: 'id'
                },
                inverseJoinColumn: {
                    name: 'categoryId',
                    referencedColumnName: 'id'
                }
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        merchantTaxId: {
            target: 'MerchantTax',
            type: 'many-to-one',
            joinColumn: {
                name: 'merchantTaxId',
            },
            onDelete: 'CASCADE'
        }
    },
    indices: [
        {
            name: 'IDX_PRODUCT_BARCODE',
            columns: ['barcode']
        },
        {   
            name: 'IDX_PRODUCT_NAME',
            columns: ['name']
        }
    ]
};

    
module.exports =  new EntitySchema(Product);