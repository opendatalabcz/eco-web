const pool = require('../../db');
const { GraphQLString, GraphQLList } = require('graphql');

module.exports = {
    GET_HYDROMETEO_TYPE: (HydroMeteoType) => ({
        type: HydroMeteoType,
        description: 'A single HydroMeteoType',
        args: {
            id: { type: GraphQLString }
        },
        resolve: async (parent, args) => {
            const hydrometeoType = await pool.query('SELECT * FROM hydrometeo_types WHERE id = $1', [args.id]);
            const { id, name, unit } = hydrometeoType.rows[0]
            return { id: id, name: name, unit: unit.split(', ') };
        }
    }),
    GET_ALL_HYDROMETEO_TYPES: (HydroMeteoType) => ({
        type: new GraphQLList(HydroMeteoType),
        description: 'List of All HydroMeteoTypes',
        resolve: async () => {
            const allHydrometeoTypes = await pool.query('SELECT * FROM hydrometeo_types');
            rows = allHydrometeoTypes.rows
            rows.forEach(element => {
                element.unit = element.unit.split(', ');
            });
            return rows;
        }
    })
}
