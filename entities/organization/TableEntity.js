const {EntitySchema}= require('typeorm');
const BaseEntity= require('../BaseEntity.js');

const Table = {
    name: 'Table',
    target: 'Table',
    columns: {
        id: {
            primary: true,
            type: 'uuid'
        },
        name: {
            type: 'text'
        },
        type: {
            type: 'int',
            default: 0
        },
        xCoordinate: {
            type: 'float',
            name: 'x_coordinate',
            default: 0
        },
        yCoordinate: {
            type: 'float',
            name: 'y_coordinate',
            default: 0
        },
        sectionId: {
            type: 'text',
            nullable: false,
            name: 'section_id'
        }
    },
    relations: {
        section: {
            target: 'Section',
            type: 'many-to-one',
            joinColumn: {
                name: 'sectionId',
                referencedColumnName: 'id'
            },
            onDelete: 'CASCADE'
        }
    }
};


module.exports =  new EntitySchema(Table);