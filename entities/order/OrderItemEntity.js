const { EntitySchema }= require('typeorm');
const BaseEntity= require("../BaseEntity.js");


const OrderItem = {
    name: 'OrderItem',
    target: 'OrderItem',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
            generated: 'uuid',
            name: 'id'
        },
        quantity: {
            type: 'int4',
            name: 'quantity'
        },
        price: {
            type: 'float8',
            name: 'price'
        },
        discount: {
            type: 'float8',
            name: 'discount',
            nullable: true,
            default: 0
        },
        orderId: {
            type: 'uuid',
            name: 'order_id'
        },
        merchantProductId: {
            type: 'uuid',
            name: 'product_id'
        },
        ...BaseEntity
    },
    uniques: [
        {
            name: 'UNIQUE_ORDER_ITEM',
            columns: ['orderId', 'merchantProductId']
        }
    ],
    relations: {
        order: {
            target: 'Order',
            type: 'many-to-one',
            joinColumn: {
                name: 'orderId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        product: {
            target: 'Product',
            type: 'many-to-one',
            joinColumn: {
                name: 'product_id',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    indices: [
        {
            name: 'IDX_ORDER_ITEM_ORDER_ID',
            columns: ['orderId']
        },
        {
            name: 'IDX_ORDER_ITEM_PRODUCT_ID',
            columns: ['merchantProductId']
        }
    ]
};


module.exports =  new EntitySchema(OrderItem);