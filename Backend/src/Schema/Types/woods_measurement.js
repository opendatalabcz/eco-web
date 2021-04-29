const pool = require('../../db');
const { GraphQLDate } = require('graphql-iso-date');
const { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLID } = require('graphql');

const WoodsMeasurementType = (types) => new GraphQLObjectType({
    name: 'Woods_Measurement',
    description: 'This represents a woods measurement',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        region_id: { type: GraphQLNonNull(GraphQLInt) },
        etc: { type: GraphQLInt },
        last_update: { type: GraphQLNonNull(GraphQLDate) },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                const region = await pool.query('SELECT * FROM region WHERE id = $1', [entry.region_id]);
                return region.rows[0];
            }
        }
    })
});

module.exports = WoodsMeasurementType;
