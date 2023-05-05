const { EntitySchema }= require('typeorm');
const CitySubdivision = {
    name: 'CitySubdivision',
    target: 'CitySubdivision',
    columns: {
        id: {
            primary: true,
            type: 'int8',
            generated: true
        },
        name: {
            type: 'text',
            name: 'name'
        },
        cityId: {
            type: 'int8',
            name: 'city_id'
        }
    },
    relations: {
        city: {
            target: 'City',
            type: 'many-to-one',
            joinColumn: {
                name: 'cityId',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    }
};

module.exports.default =  new EntitySchema(CitySubdivision);
