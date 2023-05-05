const { EntitySchema }= require('typeorm');
const BaseEntity= require('../BaseEntity.js');



const Order = {
    name: 'Order',
    target: 'Order',
    columns: {
        id: {
            type: 'uuid',
            primary: true,
        },
        // enum for delivery type
        deliveryType: {
            type: 'enum',
            enum: ['delivery', 'pickup'],
            default: 'pickup'
        },
        // enum for payment type
        paymentType: {
            type: 'enum',
            enum: ['web', 'branch'],
            name: 'payment_type',
            default: 'web'
        },
        // enum for order status
        status: {
            type: 'enum',
            enum: ['pending', 'in_progress', 'completed', 'canceled'],
            name: 'status',
            default: 'pending'
        },
        branchId: {
            type: 'uuid',
            name: 'branch_id'
        },
        customerId: {
            type: 'uuid',
            name: 'customer_id',
            nullable: true
        },
        tableId: {
            type: 'uuid',
            name: 'table_id',
            nullable: true
        },
        total: {
            type: 'int',
            name: 'total'
        },
        totalPayable: {
            type: 'int',
            name: 'total_payable'
        },
        basketNo: {
            type: 'int',
            name: 'basket_no',
            nullable: true
        },
        title: {
            type: 'text',
            nullable: true
        },
        ...BaseEntity
    },
    relations: {
        branch: {
            target: 'Branch',
            type: 'many-to-one',
            joinColumn: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        customer: {
            target: 'Customer',
            type: 'many-to-one',
            joinColumn: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        order_items: {
            target: 'OrderItem',
            type: 'one-to-many',
            joinTable: true,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    indices: [
        {   
            name: 'IDX_ORDER_ID',
            columns: ['id']
        },
        {
            name: 'IDX_ORDER_BRANCH_ID',
            columns: ['branchId']
        },
        {
            name: 'IDX_ORDER_CUSTOMER_ID',
            columns: ['customerId']
        }
    ],
    uniques: [
        {
            name: 'UNQ_ORDER_ID',
            columns: ['id']
        }
    ]

};

module.exports =  new EntitySchema(Order);