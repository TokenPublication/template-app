const { EntitySchema } = require('typeorm');
const BaseEntity = require('../BaseEntity.js');


const Category = {
    name: 'Category',
    target: 'Category',
    columns: {
        id: {
            type: 'uuid',
            primary: true,

        },
        name: {
            type: 'text',
            name: 'name'
        },
        imageUrl: {
            type: 'text',
            name: 'image_url',
            nullable: true
        },
        status: {
            type: 'text',
            name: 'status',
            default: 0
        },
        priority: {
            type: 'int2',   
            name: 'priority',
            nullable: true,
            default: 0
        },
        code: {
            type: 'int2',
            name: 'code',
            nullable: true
        },
        ...BaseEntity
    },
    indices: [
        {
            name: "IDX_CATEGORY_ID",
            columns: ["id"],
            where: "deleted_at IS NULL"
        },
        {
            name: "IDX_CATEGORY_NAME",
            columns: ["name"],
            where: "deleted_at IS NULL"
        }
    ]
};


module.exports =  new EntitySchema(Category);




