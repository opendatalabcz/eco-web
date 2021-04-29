const pool = require('../../db');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLFloat, GraphQLID } = require('graphql');

const StationType = (types) => new GraphQLObjectType({
    name: 'Station',
    description: 'This represents a station',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        region_id: { type: GraphQLNonNull(GraphQLInt) },
        station_type: { type: GraphQLNonNull(GraphQLInt) },
        location_name: { type: GraphQLNonNull(GraphQLString) },
        longitude: { type: GraphQLFloat },
        latitude: { type: GraphQLFloat },
        height: { type: GraphQLFloat },
        region: {
            type: types.RegionType,
            resolve: async (entry) => {
                const region = await pool.query('SELECT * FROM region WHERE id = $1', [entry.region_id]);
                return region.rows[0];
            }
        }
    })
});

module.exports = StationType;
