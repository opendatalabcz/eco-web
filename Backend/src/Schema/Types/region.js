const pool = require('../../db');
const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLID } = require('graphql');

const RegionType = (types) => new GraphQLObjectType({
    name: 'Region',
    description: 'This represents a region',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
        shortcut: { type: GraphQLNonNull(GraphQLString) },
        country_name: { type: GraphQLNonNull(GraphQLString) },
        country_shortcut: { type: GraphQLNonNull(GraphQLString) },
        stations: {
            type: new GraphQLList(types.StationType),
            resolve: async (entry) => {
                const allStations = await pool.query('SELECT * FROM station WHERE region_id = $1', [entry.id]);
                return allStations.rows;
            }
        }
    })
});

module.exports = RegionType;
