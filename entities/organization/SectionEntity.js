const { EntitySchema }= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const Section = {
    name: 'Section',
    target: 'Section',
    columns: {
        id: {
            primary: true,
            type: 'uuid'
        },
        name: {
            type: 'text',
            nullable: false
        },
        status: {
            type: 'int2',
            nullable: true
        },
        branchId: {
            type: 'text',
            nullable: false,
            name: 'branch_id'
        },
        ...BaseEntity
    },
    relations: {
        branch: {
            target: 'Branch',
            type: 'many-to-one',
            joinColumn: {
                name: 'branchId',
                referencedColumnName: 'id'
            },
            cascade: true,
            onDelete: 'CASCADE'
        }
    }
};

module.exports =  new EntitySchema(Section);



